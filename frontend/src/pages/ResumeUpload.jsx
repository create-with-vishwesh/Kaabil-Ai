/**
 * Resume upload page.
 */

import { useState } from 'react';
import ResumeUploader from '../components/resume/ResumeUploader';
import ParsedSkillsList from '../components/resume/ParsedSkillsList';

export default function ResumeUpload() {
  const [result, setResult] = useState(null);

  return (
    <div className="page-container max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Upload Resume</h1>
      <p className="text-gray-500 mb-8">
        Upload your resume (PDF) and our AI will extract your skills, education, and experience.
      </p>

      <ResumeUploader onUploadComplete={setResult} />

      {result && (
        <div className="mt-8 space-y-6">
          {/* Skills */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Extracted Skills</h2>
            <ParsedSkillsList skills={result.parsed_skills} />
          </div>

          {/* Education */}
          {result.education && (
            <div className="card">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Education</h2>
              <p className="text-gray-600">{result.education}</p>
            </div>
          )}

          {/* Experience */}
          {result.experience_summary && (
            <div className="card">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Experience Summary</h2>
              <p className="text-gray-600">{result.experience_summary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
