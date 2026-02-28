/**
 * Feedback panel showing evaluation results for a submitted answer.
 */

export default function FeedbackPanel({ evaluation }) {
  if (!evaluation) return null;

  const scoreColor =
    evaluation.score >= 7 ? 'text-green-600' : evaluation.score >= 5 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-700">Evaluation</span>
        <span className={`text-xl font-bold ${scoreColor}`}>{evaluation.score}/10</span>
      </div>
      <p className="text-gray-600 text-sm mb-3">{evaluation.feedback}</p>
      <details className="text-sm">
        <summary className="cursor-pointer text-primary-600 font-medium">View ideal answer</summary>
        <p className="mt-2 text-gray-600">{evaluation.ideal_answer}</p>
      </details>
    </div>
  );
}
