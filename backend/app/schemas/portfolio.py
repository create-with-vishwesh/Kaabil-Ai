"""Pydantic schemas for AI portfolio project generator."""

from pydantic import BaseModel
from typing import List


class PortfolioRequest(BaseModel):
    target_role: str
    skills: List[str] = []
    num_projects: int = 3


class ProjectSuggestion(BaseModel):
    title: str
    description: str
    tech_stack: List[str]
    difficulty: str
    estimated_hours: int
    learning_outcomes: List[str]


class PortfolioResponse(BaseModel):
    target_role: str
    projects: List[ProjectSuggestion]
