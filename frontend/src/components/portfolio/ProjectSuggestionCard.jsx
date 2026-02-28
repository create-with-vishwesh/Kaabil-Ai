/**
 * Project suggestion card for portfolio page.
 */

export default function ProjectSuggestionCard({ project }) {
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-amber-100 text-amber-700',
    advanced: 'bg-red-100 text-red-700',
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-bold text-gray-800">{project.title}</h4>
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${difficultyColor[project.difficulty] || ''}`}>
          {project.difficulty}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-3">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tech_stack?.map((t) => (
          <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>⏱ ~{project.estimated_hours}h</span>
        <span>{project.learning_outcomes?.length || 0} outcomes</span>
      </div>

      {project.learning_outcomes?.length > 0 && (
        <ul className="mt-3 text-sm text-gray-600 list-disc list-inside space-y-1">
          {project.learning_outcomes.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
