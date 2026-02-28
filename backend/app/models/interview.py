"""MongoDB document shape for interview sessions."""

from datetime import datetime, timezone


def new_interview_doc(user_id: str, session_id: str, target_role: str, questions: list) -> dict:
    return {
        "user_id": user_id,
        "session_id": session_id,
        "target_role": target_role,
        "questions": questions,
        "answers": [],
        "evaluations": [],
        "overall_score": None,
        "created_at": datetime.now(timezone.utc),
    }
