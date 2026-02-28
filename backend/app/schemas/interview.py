"""Pydantic schemas for mock interview."""

from pydantic import BaseModel
from typing import List, Optional


class InterviewStartRequest(BaseModel):
    target_role: str
    difficulty: str = "intermediate"  # "beginner", "intermediate", "advanced"
    num_questions: int = 5


class InterviewQuestion(BaseModel):
    id: int
    question: str
    category: str  # "technical", "behavioral", "situational"


class InterviewStartResponse(BaseModel):
    session_id: str
    questions: List[InterviewQuestion]


class AnswerSubmission(BaseModel):
    session_id: str
    question_id: int
    answer: str


class AnswerEvaluation(BaseModel):
    question_id: int
    score: int  # 1-10
    feedback: str
    ideal_answer: str


class InterviewResult(BaseModel):
    session_id: str
    evaluations: List[AnswerEvaluation]
    overall_score: float
    strengths: List[str]
    improvements: List[str]
