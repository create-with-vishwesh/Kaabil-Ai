"""Pydantic schemas for AI roadmap generation."""

from pydantic import BaseModel
from typing import List, Optional


class RoadmapRequest(BaseModel):
    target_role: str
    current_skills: List[str] = []
    timeline_weeks: int = 12


class Milestone(BaseModel):
    week: int
    title: str
    description: str
    skills: List[str]
    resources: List[str] = []


class RoadmapResponse(BaseModel):
    target_role: str
    total_weeks: int
    milestones: List[Milestone]
    summary: str
