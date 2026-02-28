"""
AI-powered portfolio project suggestion generator.
"""

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.ai.client import call_llm
from app.ai.prompts import portfolio_prompt
from app.ai.parser import safe_get, ensure_list
from app.db.collections import PORTFOLIOS


async def generate(
    db: AsyncIOMotorDatabase,
    user_id: str,
    target_role: str,
    skills: list[str],
    num_projects: int,
) -> dict:
    """Generate portfolio project suggestions via LLM and persist."""
    prompt = portfolio_prompt(target_role, skills, num_projects)
    ai_result = await call_llm(prompt)

    projects = ensure_list(safe_get(ai_result, "projects"))

    result = {"target_role": target_role, "projects": projects}
    await db[PORTFOLIOS].insert_one({"user_id": user_id, **result})
    return result
