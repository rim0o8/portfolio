import os
import math
from pathlib import Path
from typing import List
import openai
import spacy
import pandas as pd

OPENAI_API_KEY = os.environ['OPENAI_API_KEY']


class Spokesman:
    def __init__(self, database_path: Path, name: str = '倉島悠吏', personal_data_length=512):
        _data = dict(pd.read_csv(database_path))
        self.personal_data = [
            {
                'question': question,
                'answers': [
                    self.nan2None(_data['Unnamed: 2'].to_list()[1:][i]),
                    self.nan2None(_data['Unnamed: 3'].to_list()[1:][i]),
                    self.nan2None(_data['Unnamed: 4'].to_list()[1:][i]),
                ]
            }
            for i, question in enumerate(_data['Unnamed: 1'].to_list()[1:])
        ]

        self.vectorizer = spacy.load('ja_core_news_md')
        self.personal_data_length = personal_data_length
        self.name = name

    def completion(self, message: str):
        messages = [{"role": "system", "content": f'{self.name}という人物に成り切ってください。あなたは人事担当者などからの質問に対して{self.name}の代わりに誠実な回答を行います。'}]
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
            if 'content' in resp.choices[0].delta:
                print(resp.choices[0].delta['content'])
                yield resp.choices[0].delta['content']
            else:
                continue

    def cos_similarity(self, text1: str, text2: str):
        vec1 = self.vectorizer(text1)
        vec2 = self.vectorizer(text2)

        return vec1.similarity(vec2)

    def extract_personal_data(self, message: str):
        extracted = ''
        similarity_ranks = []
        for i in range(len(self.personal_data)):
            answers = self.personal_data[i]['answers']
            q_sim = self.cos_similarity(message, self.personal_data[i]['question'])
            a0_sim = self.cos_similarity(message, answers[0]) if answers[0] else -1
            a1_sim = self.cos_similarity(message, answers[1]) if answers[1] else -1
            a2_sim = self.cos_similarity(message, answers[2]) if answers[2] else -1

            similarity_ranks.append({'id': i, 'values': [q_sim + a0_sim, q_sim + a1_sim, q_sim + a2_sim]})

        while True:
            sorted_similarity_ranks = sorted(similarity_ranks, key=lambda x: max(x['values']), reverse=True)

            idx = sorted_similarity_ranks[0]['id']
            values = sorted_similarity_ranks[0]['values']
            ans_id = values.index(max(values))

            if len(extracted) < self.personal_data_length:
                extracted += self.personal_data[ans_id]['answers'][ans_id] + '[SEP]'
            else:
                break
        extracted = extracted.strip('[SEP]')
        return extracted

    def nan2None(self, text: str):
        if isinstance(text, float) and math.isnan(text):
            return None
        else:
            return text