"""
AI-powered mock interview – question generation and answer evaluation.
"""

import uuid
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.ai.client import call_llm
from app.ai.prompts import interview_questions_prompt, answer_evaluation_prompt
from app.ai.parser import safe_get, ensure_list, clamp_score
from app.db.collections import INTERVIEWS
from app.models.interview import new_interview_doc
from app.core.exceptions import NotFoundException


async def start_interview(
    db: AsyncIOMotorDatabase,
    user_id: str,
    target_role: str,
    difficulty: str,
    num_questions: int,
) -> dict:
    """Generate interview questions and create a session."""
    prompt = interview_questions_prompt(target_role, difficulty, num_questions)
    ai_result = await call_llm(prompt)

    questions = ensure_list(safe_get(ai_result, "questions"))
    session_id = uuid.uuid4().hex

    doc = new_interview_doc(user_id, session_id, target_role, questions)
    await db[INTERVIEWS].insert_one(doc)

    return {"session_id": session_id, "questions": questions}


async def evaluate_answer(
    db: AsyncIOMotorDatabase,
    user_id: str,
    session_id: str,
    question_id: int,
    answer: str,
) -> dict:
    """Evaluate a single answer and store the result."""
    session = await db[INTERVIEWS].find_one({"session_id": session_id, "user_id": user_id})
    if not session:
        raise NotFoundException("Interview session")

    # Find the question text
    question_text = ""
    for q in session.get("questions", []):
        if q.get("id") == question_id:
            question_text = q.get("question", "")
            break

    prompt = answer_evaluation_prompt(question_text, answer, session["target_role"])
    ai_result = await call_llm(prompt)

    evaluation = {
        "question_id": question_id,
        "score": clamp_score(safe_get(ai_result, "score", 5)),
        "feedback": safe_get(ai_result, "feedback", ""),
        "ideal_answer": safe_get(ai_result, "ideal_answer", ""),
    }

    # Persist answer and evaluation
    await db[INTERVIEWS].update_one(
        {"session_id": session_id},
        {
            "$push": {
                "answers": {"question_id": question_id, "answer": answer},
                "evaluations": evaluation,
            }
        },
    )

    return evaluation


async def get_interview_result(db: AsyncIOMotorDatabase, user_id: str, session_id: str) -> dict:
    """Return the full interview result with overall score."""
    session = await db[INTERVIEWS].find_one({"session_id": session_id, "user_id": user_id})
    if not session:
        raise NotFoundException("Interview session")

    evaluations = session.get("evaluations", [])
    scores = [e.get("score", 0) for e in evaluations]
    overall = round(sum(scores) / len(scores), 1) if scores else 0

    return {
        "session_id": session_id,
        "evaluations": evaluations,
        "overall_score": overall,
        "strengths": [e["feedback"] for e in evaluations if e.get("score", 0) >= 7],
        "improvements": [e["feedback"] for e in evaluations if e.get("score", 0) < 7],
    }
