import math
import os
from pathlib import Path
from typing import Dict, List, Optional, Union

import openai
import pandas as pd
from openai.embeddings_utils import cosine_similarity, get_embedding

OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]


class Spokesman:
    def __init__(
        self,
        database_path: Path,
        name: str = "倉島悠吏",
        personal_data_length=1024,
        embeddings_engine: str = "text-embedding-ada-002",
        completion_engine: str = "gpt-3.5-turbo",
        generate_max_tokens: int = 1024,
    ) -> None:
        self.name = name
        self.personal_data_length = personal_data_length
        self.embeddings_engine = embeddings_engine
        self.completion_engine = completion_engine
        self.personal_data = self.build_database(database_path)
        self.generate_max_tokens = generate_max_tokens

    def build_database(
        self, database_path
    ) -> List[Dict[str, Dict[str, Union[str, List[int]]]]]:
        df = pd.read_csv(database_path)
        df = df.iloc[1:]
        df = df.where(df.notnull(), None)
        df = df[df[["Unnamed: 2", "Unnamed: 3", "Unnamed: 4"]].notnull().any(axis=1)]

        def build_dict(row) -> Dict[str, Dict[str, Union[str, int]]]:
            question = row["Unnamed: 1"]
            answers = {
                i: {
                    "text": row[f"Unnamed: {i+2}"],
                    "embeddings": self.get_embedding(row[f"Unnamed: {i+2}"]),
                }
                for i in range(3)
            }
            return {
                "question": {
                    "text": question,
                    "embeddings": self.get_embedding(question),
                },
                "answers": answers,
            }

        output = df.apply(build_dict, axis=1).tolist()

        return output

    def get_embedding(self, text: Optional[str]) -> Optional[List[int]]:
        if text is None:
            return None
        return get_embedding(text, engine=self.embeddings_engine)

    def completion(self, message: str) -> str:
        messages = [
            {
                "role": "system",
                "content": f"{self.name}という人物に成り切ってください。あなたは人事担当者などからの質問に対して{self.name}の代わりに誠実な回答を行います。",
            }
        ]
        personal_data = self.extract_personal_data(message)
        prompt = f"""{personal_data}
        上記のデータをもとに、以下の質問に論理的かつ魅力的に答えてください。
        ただし、上記データは[SEP]で各章に分割されており、内容を混同してはいけません。
        また、必ずしも質問に関係のあるデータが与えられるわけではないので、使用するデータは取捨選択してください。
        わからない場合は、わからないと答えてください。

        質問：{message}
        """
        print(prompt)
        messages.append({"role": "user", "content": prompt})

        for resp in openai.ChatCompletion.create(
            model=self.completion_engine,
            messages=messages,
            max_tokens=self.generate_max_tokens,
            stream=True,
        ):
            if "content" in resp.choices[0].delta:
                yield resp.choices[0].delta["content"]
            else:  # NOTE: 最初の出力はdeltaにcontentがなくroleが含まれる
                continue

    def cos_similarity(self, embeddings1: List[int], embeddings2: List[int]) -> int:
        if not embeddings1 or not embeddings2:
            return -2
        return cosine_similarity(embeddings1, embeddings2)

    def extract_personal_data(self, message: str) -> str:
        similarity_ranks = []
        message_embeddings = self.get_embedding(message)
        for i in range(len(self.personal_data)):
            similarity_ranks.append(
                {
                    "id": i,
                    "values": {
                        "question": self.cos_similarity(
                            message_embeddings,
                            self.personal_data[i]["question"]["embeddings"],
                        ),
                        "answers": {
                            ans_id: self.cos_similarity(
                                message_embeddings,
                                self.personal_data[i]["answers"][ans_id]["embeddings"],
                            )
                            for ans_id in range(3)
                        },
                    },
                }
            )

        sorted_similarity_ranks = sorted(
            similarity_ranks, key=lambda x: x["values"]["question"], reverse=True
        )
        extracted = ""
        while True:
            row = sorted_similarity_ranks.pop(0)
            idx = row["id"]
            answers = row["values"]["answers"]
            ans_id = max(answers, key=answers.get)

            new_text = f'「{self.personal_data[idx]["question"]["text"]}」に対する回答：{self.personal_data[idx]["answers"][ans_id]["text"]}[SEP]'
            if len(extracted) + len(new_text) < self.personal_data_length:
                extracted += new_text
            else:
                break
        extracted = extracted.strip("[SEP]")
        return extracted
