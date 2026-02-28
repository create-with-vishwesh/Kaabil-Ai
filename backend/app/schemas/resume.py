"""Pydantic schemas for resume upload & parsing."""

from pydantic import BaseModel
from typing import List, Optional


class ParsedSkills(BaseModel):
    technical: List[str] = []
    soft: List[str] = []
    tools: List[str] = []


class ResumeUploadResponse(BaseModel):
    id: str
    filename: str
    extracted_text: str
    parsed_skills: ParsedSkills
    education: Optional[str] = None
    experience_summary: Optional[str] = None
