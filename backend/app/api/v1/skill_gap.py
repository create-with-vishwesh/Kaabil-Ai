"""
Skill gap analysis routes.
"""

from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_db, get_current_user
from app.schemas.skill_gap import SkillGapRequest, SkillGapResult
from app.services import skill_gap_service

router = APIRouter(prefix="/skill-gap", tags=["Skill Gap"])


@router.post("/analyze", response_model=SkillGapResult)
async def analyze_skill_gap(
    body: SkillGapRequest,
    user_id: str = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await skill_gap_service.analyze(
        db, user_id, body.target_role, body.current_skills
    )
