/**
 * AI Learning Roadmap page.
 */

import { useState, useEffect } from 'react';
import API from '../api/axios';
import Loader from '../components/common/Loader';
import MilestoneCard from '../components/roadmap/MilestoneCard';

export default function Roadmap() {
  const [targetRole, setTargetRole] = useState('');
  const [weeks, setWeeks] = useState(12);
  const [currentSkills, setCurrentSkills] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await API.get('/resume/skills');
        setCurrentSkills([...(data.technical || []), ...(data.tools || [])]);
      } catch {
        // No resume yet
      }
    };
    fetchSkills();
  }, []);

  const handleGenerate = async () => {
    if (!targetRole.trim()) return;
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/roadmap/generate', {
        target_role: targetRole,
        current_skills: currentSkills,
        timeline_weeks: weeks,
      });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning Roadmap</h1>
      <p className="text-gray-500 mb-8">
        Get a personalized week-by-week plan to reach your career goal.
      </p>

      {/* Input */}
      <div className="card mb-8">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="input-field"
              placeholder="e.g. Full Stack Developer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timeline (Weeks)</label>
            <input
              type="number"
              value={weeks}
              onChange={(e) => setWeeks(parseInt(e.target.value) || 12)}
              className="input-field"
              min={4}
              max={52}
            />
          </div>
        </div>
        <button
          onClick={handleGenerate}
          className="btn-primary mt-4"
          disabled={loading || !targetRole.trim()}
        >
          {loading ? 'Generating...' : 'Generate Roadmap'}
        </button>
      </div>

      {loading && <Loader message="AI is building your roadmap..." />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {result && !loading && (
        <div>
          {/* Summary */}
          <div className="card mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Roadmap for {result.target_role} — {result.total_weeks} weeks
            </h2>
            <p className="text-gray-600">{result.summary}</p>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {result.milestones?.map((m, i) => (
              <MilestoneCard key={i} milestone={m} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
