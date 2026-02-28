/**
 * Interview question card.
 */

export default function QuestionCard({ question, index }) {
  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-sm">
          {index + 1}
        </span>
        <span className="text-xs font-medium text-gray-400 uppercase">{question.category}</span>
      </div>
      <p className="text-gray-800 font-medium">{question.question}</p>
    </div>
  );
}
