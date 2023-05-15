import math
import os
from pathlib import Path
from typing import List, Optional

import openai
import pandas as pd
from openai.embeddings_utils import cosine_similarity, get_embedding

OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]


class Spokesman:
    def __init__(
        self, database_path: Path, name: str = "倉島悠吏", personal_data_length=1024, embeddings_engine: str = "text-embedding-ada-002", completion_engine: str = "gpt-3.5-turbo"
    ):
        self.name = name
        self.personal_data_length = personal_data_length
        self.embeddings_engine = embeddings_engine
        self.completion_engine = completion_engine
        self.personal_data = self.build_database(database_path)

    def build_database(self, database_path):
        df = pd.read_csv(database_path)
        _data = dict(
            df.where(df.notnull(), None)
        )
        return [
            {
                "question": {
                    "text": question,
                    "embeddings": self.get_embedding(question),
                },
                "answers": {
                    0: {
                        "text": _data["Unnamed: 2"].to_list()[1:][i],
                        "embeddings": self.get_embedding(_data["Unnamed: 2"].to_list()[1:][i]),
                    },
                    1: {
                        "text": _data["Unnamed: 3"].to_list()[1:][i],
                        "embeddings": self.get_embedding(_data["Unnamed: 3"].to_list()[1:][i]),
                    },
                    2: {
                        "text": _data["Unnamed: 4"].to_list()[1:][i],
                        "embeddings": self.get_embedding(_data["Unnamed: 4"].to_list()[1:][i]),
                    },
                },
            }
            for i, question in enumerate(_data["Unnamed: 1"].to_list()[1:])
            if _data["Unnamed: 2"].to_list()[1:][i]
            or _data["Unnamed: 3"].to_list()[1:][i]
            or _data["Unnamed: 4"].to_list()[1:][i]
        ]

    def get_embedding(self, text: Optional[str]):
        if text is None:
            return None
        return get_embedding(
            text,
            engine=self.embeddings_engine
        )

    def completion(self, message: str):
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
        messages.append({"role": "user", "content": prompt})

        for resp in openai.ChatCompletion.create(
            model=self.completion_engine,
            messages=messages,
            max_tokens=1024,
            stream=True,
        ):
            if "content" in resp.choices[0].delta:
                print(resp.choices[0].delta["content"])
                yield resp.choices[0].delta["content"]
            else:
                continue

    def cos_similarity(self, embeddings1: List[int], embeddings2: List[int]):
        if not embeddings1 or not embeddings2:
            return -2
        return cosine_similarity(embeddings1, embeddings2)

    def extract_personal_data(self, message: str):
        similarity_ranks = []
        message_embeddings = self.get_embedding(message)
        for i in range(len(self.personal_data)):
            answers = self.personal_data[i]["answers"]
            similarity_ranks.append(
                {
                    "id": i,
                    "values": {
                        "q": self.cos_similarity(
                            message_embeddings, self.personal_data[i]["question"]["embeddings"]
                        ),
                        "answers": {
                            0: self.cos_similarity(message_embeddings, answers[0]["embeddings"]),
                            1: self.cos_similarity(message_embeddings, answers[1]["embeddings"]),
                            2: self.cos_similarity(message_embeddings, answers[2]["embeddings"]),
                        },
                    },
                }
            )

        extracted = ""
        sorted_similarity_ranks = sorted(
            similarity_ranks, key=lambda x: x["values"]["q"], reverse=True
        )
        while True:
            row = sorted_similarity_ranks.pop(0)
            idx = row["id"]
            answers = row["values"]["answers"]
            ans_id = max(answers, key=answers.get)

            print(self.personal_data[idx]["question"]["text"])
            new_text = f'「{self.personal_data[idx]["question"]["text"]}」に対する回答：{self.personal_data[idx]["answers"][ans_id]["text"]}[SEP]'
            if len(extracted) + len(new_text) < self.personal_data_length:
                extracted += new_text
            else:
                break
        extracted = extracted.strip("[SEP]")
        return extracted
