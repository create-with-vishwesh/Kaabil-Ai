"""
All prompt templates used by AI services.
Each function returns the formatted prompt string.
"""


def skill_extraction_prompt(resume_text: str) -> str:
    return f"""Analyze the following resume text and extract skills.

Return JSON with this exact structure:
{{
  "technical": ["skill1", "skill2"],
  "soft": ["skill1", "skill2"],
  "tools": ["tool1", "tool2"],
  "education": "degree and institution summary",
  "experience_summary": "brief experience summary"
}}

Resume text:
\"\"\"
{resume_text}
\"\"\"
"""


def skill_gap_prompt(target_role: str, current_skills: list[str]) -> str:
    skills_str = ", ".join(current_skills) if current_skills else "None listed"
    return f"""Perform a skill gap analysis for a fresher targeting the role: "{target_role}".

Current skills: {skills_str}

Return JSON with this exact structure:
{{
  "matching_skills": ["skill1", "skill2"],
  "missing_skills": [
    {{"skill": "name", "level": "missing|beginner|intermediate", "priority": "high|medium|low"}}
  ],
  "gap_percentage": 45.0,
  "summary": "Brief overall assessment"
}}
"""


def roadmap_prompt(target_role: str, current_skills: list[str], timeline_weeks: int) -> str:
    skills_str = ", ".join(current_skills) if current_skills else "None listed"
    return f"""Create a learning roadmap for a fresher wanting to become a "{target_role}".

Current skills: {skills_str}
Timeline: {timeline_weeks} weeks

Return JSON with this exact structure:
{{
  "milestones": [
    {{
      "week": 1,
      "title": "Milestone title",
      "description": "What to do",
      "skills": ["skill1"],
      "resources": ["resource link or name"]
    }}
  ],
  "summary": "Brief roadmap overview"
}}
"""


def interview_questions_prompt(target_role: str, difficulty: str, num_questions: int) -> str:
    return f"""Generate {num_questions} interview questions for a fresher applying for "{target_role}".
Difficulty: {difficulty}

Return JSON with this exact structure:
{{
  "questions": [
    {{
      "id": 1,
      "question": "Question text",
      "category": "technical|behavioral|situational"
    }}
  ]
}}
"""


def answer_evaluation_prompt(question: str, answer: str, target_role: str) -> str:
    return f"""Evaluate the following interview answer for the role "{target_role}".

Question: {question}
Candidate's Answer: {answer}

Return JSON with this exact structure:
{{
  "score": 7,
  "feedback": "Detailed feedback",
  "ideal_answer": "What an ideal answer would cover"
}}
"""


def portfolio_prompt(target_role: str, skills: list[str], num_projects: int) -> str:
    skills_str = ", ".join(skills) if skills else "None listed"
    return f"""Suggest {num_projects} portfolio projects for a fresher targeting "{target_role}".

Known skills: {skills_str}

Return JSON with this exact structure:
{{
  "projects": [
    {{
      "title": "Project Name",
      "description": "Brief description",
      "tech_stack": ["tech1", "tech2"],
      "difficulty": "beginner|intermediate|advanced",
      "estimated_hours": 20,
      "learning_outcomes": ["outcome1", "outcome2"]
    }}
  ]
}}
"""
