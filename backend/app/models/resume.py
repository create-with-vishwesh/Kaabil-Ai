"""MongoDB document shape for resumes."""

from datetime import datetime, timezone


def new_resume_doc(user_id: str, filename: str, extracted_text: str, parsed_skills: dict) -> dict:
    return {
        "user_id": user_id,
        "filename": filename,
        "extracted_text": extracted_text,
        "parsed_skills": parsed_skills,
        "education": None,
        "experience_summary": None,
        "uploaded_at": datetime.now(timezone.utc),
    }
