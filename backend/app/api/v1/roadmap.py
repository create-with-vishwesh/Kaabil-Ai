"""
Roadmap generation routes.
"""

from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_db, get_current_user
from app.schemas.roadmap import RoadmapRequest, RoadmapResponse
from app.services import roadmap_service

router = APIRouter(prefix="/roadmap", tags=["Roadmap"])


@router.post("/generate", response_model=RoadmapResponse)
async def generate_roadmap(
    body: RoadmapRequest,
    user_id: str = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await roadmap_service.generate(
        db, user_id, body.target_role, body.current_skills, body.timeline_weeks
    )
