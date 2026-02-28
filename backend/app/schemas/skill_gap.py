"""Pydantic schemas for AI skill gap analysis."""

from pydantic import BaseModel
from typing import List


class SkillGapRequest(BaseModel):
    target_role: str
    current_skills: List[str] = []


class SkillDetail(BaseModel):
    skill: str
    level: str  # "missing", "beginner", "intermediate", "advanced"
    priority: str  # "high", "medium", "low"


class SkillGapResult(BaseModel):
    target_role: str
    matching_skills: List[str]
    missing_skills: List[SkillDetail]
    gap_percentage: float
    summary: str
