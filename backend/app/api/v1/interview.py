"""
Mock interview routes.
"""

from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_db, get_current_user
from app.schemas.interview import (
    InterviewStartRequest,
    InterviewStartResponse,
    AnswerSubmission,
    AnswerEvaluation,
    InterviewResult,
)
from app.services import interview_service

router = APIRouter(prefix="/interview", tags=["Mock Interview"])


@router.post("/start", response_model=InterviewStartResponse)
async def start_interview(
    body: InterviewStartRequest,
    user_id: str = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await interview_service.start_interview(
        db, user_id, body.target_role, body.difficulty, body.num_questions
    )


@router.post("/evaluate", response_model=AnswerEvaluation)
async def evaluate_answer(
    body: AnswerSubmission,
    user_id: str = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await interview_service.evaluate_answer(
        db, user_id, body.session_id, body.question_id, body.answer
    )


@router.get("/result/{session_id}", response_model=InterviewResult)
async def get_result(
    session_id: str,
    user_id: str = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await interview_service.get_interview_result(db, user_id, session_id)
