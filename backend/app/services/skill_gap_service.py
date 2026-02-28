"""
AI-powered skill gap analysis.
"""

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.ai.client import call_llm
from app.ai.prompts import skill_gap_prompt
from app.ai.parser import safe_get, ensure_list
from app.db.collections import SKILL_GAPS


async def analyze(db: AsyncIOMotorDatabase, user_id: str, target_role: str, current_skills: list[str]) -> dict:
    """Run skill gap analysis via LLM and persist result."""
    prompt = skill_gap_prompt(target_role, current_skills)
    ai_result = await call_llm(prompt)

    result = {
        "target_role": target_role,
        "matching_skills": ensure_list(safe_get(ai_result, "matching_skills")),
        "missing_skills": ensure_list(safe_get(ai_result, "missing_skills")),
        "gap_percentage": float(safe_get(ai_result, "gap_percentage", 0)),
        "summary": safe_get(ai_result, "summary", ""),
    }

    # Persist
    await db[SKILL_GAPS].insert_one({"user_id": user_id, **result})
    return result
