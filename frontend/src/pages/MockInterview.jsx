/**
 * Mock Interview page – start session, answer questions, get feedback.
 */

import { useState } from 'react';
import API from '../api/axios';
import Loader from '../components/common/Loader';
import QuestionCard from '../components/interview/QuestionCard';
import AnswerInput from '../components/interview/AnswerInput';
import FeedbackPanel from '../components/interview/FeedbackPanel';

export default function MockInterview() {
  const [targetRole, setTargetRole] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [numQuestions, setNumQuestions] = useState(5);
  const [session, setSession] = useState(null);
  const [evaluations, setEvaluations] = useState({});
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(null);
  const [error, setError] = useState('');
  const [finalResult, setFinalResult] = useState(null);

  const handleStart = async () => {
    if (!targetRole.trim()) return;
    setError('');
    setLoading(true);
    setSession(null);
    setEvaluations({});
    setFinalResult(null);
    try {
      const { data } = await API.post('/interview/start', {
        target_role: targetRole,
        difficulty,
        num_questions: numQuestions,
      });
      setSession(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to start interview');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (questionId, answer) => {
    setEvaluating(questionId);
    try {
      const { data } = await API.post('/interview/evaluate', {
        session_id: session.session_id,
        question_id: questionId,
        answer,
      });
      setEvaluations((prev) => ({ ...prev, [questionId]: data }));
    } catch (err) {
      setError(err.response?.data?.detail || 'Evaluation failed');
    } finally {
      setEvaluating(null);
    }
  };

  const handleFinish = async () => {
    try {
      const { data } = await API.get(`/interview/result/${session.session_id}`);
      setFinalResult(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get results');
    }
  };

  return (
    <div className="page-container max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Mock Interview</h1>
      <p className="text-gray-500 mb-8">
        Practice with AI-generated questions and get instant feedback on your answers.
      </p>

      {/* Setup */}
      {!session && (
        <div className="card mb-8">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="input-field"
                placeholder="e.g. Backend Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="input-field"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Questions</label>
              <input
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value) || 5)}
                className="input-field"
                min={1}
                max={15}
              />
            </div>
          </div>
          <button
            onClick={handleStart}
            className="btn-primary mt-4"
            disabled={loading || !targetRole.trim()}
          >
            {loading ? 'Generating questions...' : 'Start Interview'}
          </button>
        </div>
      )}

      {loading && <Loader message="AI is preparing your interview..." />}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Questions */}
      {session && !finalResult && (
        <div className="space-y-6">
          {session.questions?.map((q, i) => (
            <div key={q.id}>
              <QuestionCard question={q} index={i} />
              {!evaluations[q.id] ? (
                <AnswerInput
                  questionId={q.id}
                  onSubmit={handleSubmitAnswer}
                  disabled={evaluating === q.id}
                />
              ) : (
                <FeedbackPanel evaluation={evaluations[q.id]} />
              )}
            </div>
          ))}

          <div className="text-center mt-8">
            <button onClick={handleFinish} className="btn-primary">
              Finish & See Results
            </button>
          </div>
        </div>
      )}

      {/* Final result */}
      {finalResult && (
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Interview Results</h2>
          <p className="text-4xl font-bold text-primary-600 mb-4">
            {finalResult.overall_score}/10
          </p>

          {finalResult.strengths?.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-green-700 mb-2">✅ Strengths</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {finalResult.strengths.map((s, i) => <li key={i}>• {s}</li>)}
              </ul>
            </div>
          )}

          {finalResult.improvements?.length > 0 && (
            <div>
              <h3 className="font-semibold text-amber-700 mb-2">🔧 Areas to Improve</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {finalResult.improvements.map((s, i) => <li key={i}>• {s}</li>)}
              </ul>
            </div>
          )}

          <button onClick={() => { setSession(null); setFinalResult(null); setEvaluations({}); }} className="btn-secondary mt-6">
            Start New Interview
          </button>
        </div>
      )}
    </div>
  );
}
