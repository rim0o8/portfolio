from typing import Any, Dict, List, Optional
from datetime import datetime

from gpt import Spokesman
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from pathlib import Path

app = FastAPI()


origins = [
    'http://localhost:3000',
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


class Question(BaseModel):
    text: str


spokesman = Spokesman(Path('job_hunt_sheet.csv'))

@app.post('/aboutme', response_class=StreamingResponse,)
async def aboutme(record: Question):
    return StreamingResponse(spokesman.completion(record.text), media_type="text/event-stream")
