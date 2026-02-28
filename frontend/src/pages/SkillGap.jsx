/**
 * Skill gap analysis page.
 */

import { useState, useEffect } from 'react';
import API from '../api/axios';
import Loader from '../components/common/Loader';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

export default function SkillGap() {
  const [targetRole, setTargetRole] = useState('');
  const [currentSkills, setCurrentSkills] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchingSkills, setFetchingSkills] = useState(true);

  // Fetch current skills from resume
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await API.get('/resume/skills');
        const all = [...(data.technical || []), ...(data.tools || [])];
        setCurrentSkills(all);
      } catch {
        // No resume yet — that's fine
      } finally {
        setFetchingSkills(false);
      }
    };
    fetchSkills();
  }, []);

  const handleAnalyze = async () => {
    if (!targetRole.trim()) return;
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/skill-gap/analyze', {
        target_role: targetRole,
        current_skills: currentSkills,
      });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const priorityColor = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' };

  return (
    <div className="page-container max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Skill Gap Analysis</h1>
      <p className="text-gray-500 mb-8">
        Enter your target role and we'll compare your current skills against what's required.
      </p>

      {/* Input */}
      <div className="card mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Target Role</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="input-field flex-1"
            placeholder="e.g. Frontend Developer, Data Scientist"
          />
          <button onClick={handleAnalyze} className="btn-primary" disabled={loading || !targetRole.trim()}>
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
        {currentSkills.length > 0 && (
          <p className="text-sm text-gray-400 mt-2">
            Using {currentSkills.length} skills from your resume
          </p>
        )}
      </div>

      {loading && <Loader message="AI is analyzing your skill gaps..." />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {result && !loading && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Results: {result.target_role}</h2>
              <span className="text-2xl font-bold text-primary-600">
                {Math.round(100 - result.gap_percentage)}% match
              </span>
            </div>
            <p className="text-gray-600">{result.summary}</p>
          </div>

          {/* Matching skills */}
          {result.matching_skills?.length > 0 && (
            <div className="card">
              <h3 className="font-bold text-gray-800 mb-3">✅ Matching Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.matching_skills.map((s) => (
                  <span key={s} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Missing skills chart */}
          {result.missing_skills?.length > 0 && (
            <div className="card">
              <h3 className="font-bold text-gray-800 mb-4">📊 Missing Skills by Priority</h3>
              <ResponsiveContainer width="100%" height={result.missing_skills.length * 50 + 40}>
                <BarChart data={result.missing_skills} layout="vertical" margin={{ left: 100 }}>
                  <XAxis type="number" domain={[0, 1]} hide />
                  <YAxis type="category" dataKey="skill" tick={{ fontSize: 13 }} width={100} />
                  <Tooltip />
                  <Bar dataKey={() => 1} name="Priority" radius={[0, 6, 6, 0]}>
                    {result.missing_skills.map((entry, i) => (
                      <Cell key={i} fill={priorityColor[entry.priority] || '#6b7280'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
