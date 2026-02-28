"""Pydantic schemas for user profiles."""

from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


class UserProfile(BaseModel):
    id: str
    name: str
    email: EmailStr
    target_role: Optional[str] = None
    skills: List[str] = []
    created_at: datetime
    updated_at: datetime


class UserUpdate(BaseModel):
    name: Optional[str] = None
    target_role: Optional[str] = None
    skills: Optional[List[str]] = None
