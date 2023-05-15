import math
import os
from pathlib import Path
from typing import List

import openai
import pandas as pd
import spacy
from openai.embeddings_utils import cosine_similarity, get_embedding

OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]


class Spokesman:
    def __init__(
        self, database_path: Path, name: str = "倉島悠吏", personal_data_length=1024
    ):
        _data = dict(pd.read_csv(database_path))
        self.personal_data = [
            {
                "id": i,
                "question": {
                    "text": question,
                    "embeddings": get_embedding(
                        question, engine="text-embedding-ada-002"
                    ),
                },
                "answers": {
                    0: {
                        "text": self.nan2None(_data["Unnamed: 2"].to_list()[1:][i]),
                        "embeddings": get_embedding(
                            self.nan2None(_data["Unnamed: 2"].to_list()[1:][i]),
                            engine="text-embedding-ada-002",
                        ),
                    }
                    if self.nan2None(_data["Unnamed: 2"].to_list()[1:][i])
                    else None,
                    1: {
                        "text": self.nan2None(_data["Unnamed: 3"].to_list()[1:][i]),
                        "embeddings": get_embedding(
                            self.nan2None(_data["Unnamed: 3"].to_list()[1:][i]),
                            engine="text-embedding-ada-002",
                        ),
                    }
                    if self.nan2None(_data["Unnamed: 3"].to_list()[1:][i])
                    else None,
                    2: {
                        "text": self.nan2None(_data["Unnamed: 4"].to_list()[1:][i]),
                        "embeddings": get_embedding(
                            self.nan2None(_data["Unnamed: 4"].to_list()[1:][i]),
                            engine="text-embedding-ada-002",
                        ),
                    }
                    if self.nan2None(_data["Unnamed: 4"].to_list()[1:][i])
                    else None,
                },
            }
            for i, question in enumerate(_data["Unnamed: 1"].to_list()[1:])
            if self.nan2None(_data["Unnamed: 2"].to_list()[1:][i])
            or self.nan2None(_data["Unnamed: 3"].to_list()[1:][i])
            or self.nan2None(_data["Unnamed: 4"].to_list()[1:][i])
        ]

        self.vectorizer = spacy.load("ja_core_news_md")
        self.personal_data_length = personal_data_length
        self.name = name

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
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=1024,
            stream=True,
        ):
            if "content" in resp.choices[0].delta:
                print(resp.choices[0].delta["content"])
                yield resp.choices[0].delta["content"]
            else:
                continue

    def cos_similarity(self, text: str, embeddings: str):
        text_embeddings = get_embedding(text, engine="text-embedding-ada-002")

        return cosine_similarity(text_embeddings, embeddings)

    def extract_personal_data(self, message: str):
        similarity_ranks = []
        for i in range(len(self.personal_data)):
            answers = self.personal_data[i]["answers"]
            similarity_ranks.append(
                {
                    "id": i,
                    "values": {
                        "q": self.cos_similarity(
                            message, self.personal_data[i]["question"]["embeddings"]
                        ),
                        "answers": {
                            0: self.cos_similarity(message, answers[0]["embeddings"])
                            if answers[0]
                            else -2,
                            1: self.cos_similarity(message, answers[1]["embeddings"])
                            if answers[1]
                            else -2,
                            2: self.cos_similarity(message, answers[2]["embeddings"])
                            if answers[2]
                            else -2,
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

    def nan2None(self, text: str):
        if isinstance(text, float) and math.isnan(text):
            return None
        else:
            return text
