/**
 * Answer text input for mock interview.
 */

import { useState } from 'react';

export default function AnswerInput({ questionId, onSubmit, disabled }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(questionId, answer.trim());
      setAnswer('');
    }
  };

  return (
    <div className="mt-3">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        rows={4}
        className="input-field resize-none"
        disabled={disabled}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !answer.trim()}
        className="btn-primary mt-2 disabled:opacity-50"
      >
        {disabled ? 'Evaluating...' : 'Submit Answer'}
      </button>
    </div>
  );
}
