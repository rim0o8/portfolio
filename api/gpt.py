from pathlib import Path
from typing import Dict, List, Optional, Union

import pandas as pd
from openai import OpenAI
from openai.embeddings_utils import cosine_similarity, get_embedding

client = OpenAI()


class Spokesman:
    def __init__(
        self,
        database_path: Path,
        name: str = "倉島悠吏",
        embeddings_engine: str = "text-embedding-ada-002",
        completion_engine: str = "gpt-3.5-turbo",
        generate_max_tokens: int = 1024,
    ) -> None:
        self.name = name
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

    def update_personal_data(self, question: str, answer: str):
        self.personal_data.append(
            {
                "question": {
                    "text": question,
                    "embeddings": self.get_embedding(question),
                },
                "answers": {
                    0: {"text": answer, "embeddings": self.get_embedding(answer)},
                    1: {"text": None, "embeddings": None},
                    2: {"text": None, "embeddings": None},
                },
            }
        )

    def completion(self, message: str) -> str:
        personal_data = self.extract_personal_data(message)
        messages = []
        system_message_1 = f"あなたは{self.name}です。"
        system_message_2 = "これまで対話していない前提で話してください。"
        system_message_3 = (
            "これまでの対話で触れられた内容以外のことは話さないでください。"
        )

        for i, item in enumerate(personal_data):
            if (
                len("".join([item["content"] for item in messages]))
                + len(item["question"])
                + len(item["answer"])
                + len(message)
                + len(system_message_1)
                + len(system_message_2)
                + len(system_message_3)
                > self.generate_max_tokens
            ):
                break

            messages.append(
                {
                    "role": "user",
                    "content": item["question"],
                }
            )
            messages.append(
                {
                    "role": "assistant",
                    "content": item["answer"],
                }
            )

        messages.append(
            {
                "role": "system",
                "content": system_message_1,
            }
        )
        messages.append(
            {
                "role": "system",
                "content": system_message_2,
            }
        )
        messages.append(
            {
                "role": "system",
                "content": system_message_3,
            }
        )

        messages.append(
            {
                "role": "user",
                "content": "これまでの対話はなかった前提で内容を要約して、次の質問に答えてください："
                + message,
            }
        )

        input_text = ""
        for msg in messages:
            if msg["role"] == "user":
                user = "人事担当者"
            elif msg["role"] == "assistant":
                user = self.name
            elif msg["role"] == "assistant":
                user = "注釈"

            input_text += f'{user}: {msg["content"]}\n{self.name}: '

        ans = ""
        stream = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": input_text,
                }
            ],
            max_tokens=self.generate_max_tokens,
            stream=True,
        )
        for resp in stream:
            print(resp)
            if resp.choices[0].finish_reason:
                self.update_personal_data(message, ans)
            if resp.choices[0].delta.content is not None:
                content = resp.choices[0].delta.content
                ans += content
                yield content

    def cos_similarity(self, embeddings1: List[int], embeddings2: List[int]) -> int:
        if not embeddings1 or not embeddings2:
            return -2
        return cosine_similarity(embeddings1, embeddings2)

    def extract_personal_data(self, message: str) -> List[Dict[str, str]]:
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
        extracted = []
        while sorted_similarity_ranks:
            row = sorted_similarity_ranks.pop(0)
            idx = row["id"]
            answers = row["values"]["answers"]
            ans_id = max(answers, key=answers.get)
            extracted.append(
                {
                    "question": self.personal_data[idx]["question"]["text"],
                    "answer": self.personal_data[idx]["answers"][ans_id]["text"],
                }
            )

        return extracted
