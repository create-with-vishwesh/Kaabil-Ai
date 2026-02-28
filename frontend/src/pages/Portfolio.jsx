/**
 * Portfolio project generator page.
 */

import { useState, useEffect } from 'react';
import API from '../api/axios';
import Loader from '../components/common/Loader';
import ProjectSuggestionCard from '../components/portfolio/ProjectSuggestionCard';

export default function Portfolio() {
  const [targetRole, setTargetRole] = useState('');
  const [numProjects, setNumProjects] = useState(3);
  const [skills, setSkills] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await API.get('/resume/skills');
        setSkills([...(data.technical || []), ...(data.tools || [])]);
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
      const { data } = await API.post('/portfolio/generate', {
        target_role: targetRole,
        skills,
        num_projects: numProjects,
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
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Portfolio Projects</h1>
      <p className="text-gray-500 mb-8">
        Get AI-generated project ideas tailored to your target role and current skills.
      </p>

      {/* Input */}
      <div className="card mb-8">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="input-field"
              placeholder="e.g. ML Engineer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Projects</label>
            <input
              type="number"
              value={numProjects}
              onChange={(e) => setNumProjects(parseInt(e.target.value) || 3)}
              className="input-field"
              min={1}
              max={10}
            />
          </div>
        </div>
        <button
          onClick={handleGenerate}
          className="btn-primary mt-4"
          disabled={loading || !targetRole.trim()}
        >
          {loading ? 'Generating...' : 'Generate Projects'}
        </button>
      </div>

      {loading && <Loader message="AI is crafting project ideas..." />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {result && !loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.projects?.map((p, i) => (
            <ProjectSuggestionCard key={i} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
