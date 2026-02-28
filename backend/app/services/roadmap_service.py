"""
AI-powered learning roadmap generation.
"""

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.ai.client import call_llm
from app.ai.prompts import roadmap_prompt
from app.ai.parser import safe_get, ensure_list
from app.db.collections import ROADMAPS


async def generate(
    db: AsyncIOMotorDatabase,
    user_id: str,
    target_role: str,
    current_skills: list[str],
    timeline_weeks: int,
) -> dict:
    """Generate a learning roadmap via LLM and persist."""
    prompt = roadmap_prompt(target_role, current_skills, timeline_weeks)
    ai_result = await call_llm(prompt)

    result = {
        "target_role": target_role,
        "total_weeks": timeline_weeks,
        "milestones": ensure_list(safe_get(ai_result, "milestones")),
        "summary": safe_get(ai_result, "summary", ""),
    }

    await db[ROADMAPS].insert_one({"user_id": user_id, **result})
    return result
