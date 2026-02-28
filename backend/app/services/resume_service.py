"""
Resume upload, PDF parsing via PyMuPDF, and AI-powered skill extraction.
"""

import fitz  # PyMuPDF
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.ai.client import call_llm
from app.ai.prompts import skill_extraction_prompt
from app.ai.parser import safe_get, ensure_list
from app.db.collections import RESUMES
from app.models.resume import new_resume_doc
from app.utils.file_utils import save_temp_file, delete_file


async def upload_and_parse(db: AsyncIOMotorDatabase, user_id: str, file_bytes: bytes, filename: str) -> dict:
    """Save PDF, extract text, call AI for skill extraction, persist to DB."""
    # 1. Save temp file and extract text
    tmp_path = save_temp_file(file_bytes, ".pdf")
    try:
        text = _extract_text(tmp_path)
    finally:
        delete_file(tmp_path)

    # 2. AI skill extraction
    prompt = skill_extraction_prompt(text[:4000])  # limit token usage
    ai_result = await call_llm(prompt)

    parsed_skills = {
        "technical": ensure_list(safe_get(ai_result, "technical")),
        "soft": ensure_list(safe_get(ai_result, "soft")),
        "tools": ensure_list(safe_get(ai_result, "tools")),
    }

    education = safe_get(ai_result, "education", "")
    experience = safe_get(ai_result, "experience_summary", "")

    # 3. Persist to MongoDB
    doc = new_resume_doc(user_id, filename, text, parsed_skills)
    doc["education"] = education
    doc["experience_summary"] = experience
    result = await db[RESUMES].insert_one(doc)

    # 4. Also update user skills
    all_skills = list(set(parsed_skills["technical"] + parsed_skills["tools"]))
    await db["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$addToSet": {"skills": {"$each": all_skills}}},
    )

    return {
        "id": str(result.inserted_id),
        "filename": filename,
        "extracted_text": text[:2000],
        "parsed_skills": parsed_skills,
        "education": education,
        "experience_summary": experience,
    }


async def get_user_skills(db: AsyncIOMotorDatabase, user_id: str) -> dict:
    """Return the most recent parsed skills for a user."""
    doc = await db[RESUMES].find_one(
        {"user_id": user_id},
        sort=[("uploaded_at", -1)],
    )
    if not doc:
        return {"technical": [], "soft": [], "tools": []}
    return doc.get("parsed_skills", {"technical": [], "soft": [], "tools": []})


def _extract_text(filepath) -> str:
    """Extract all text from a PDF using PyMuPDF."""
    doc = fitz.open(str(filepath))
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text.strip()
