"""
Resume upload and skill extraction routes.
"""

from fastapi import APIRouter, Depends, UploadFile, File
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_db, get_current_user
from app.schemas.resume import ResumeUploadResponse, ParsedSkills
from app.services import resume_service

router = APIRouter(prefix="/resume", tags=["Resume"])


@router.post("/upload", response_model=ResumeUploadResponse)
async def upload_resume(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    content = await file.read()
    return await resume_service.upload_and_parse(db, user_id, content, file.filename)


@router.get("/skills", response_model=ParsedSkills)
async def get_skills(
    user_id: str = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await resume_service.get_user_skills(db, user_id)
