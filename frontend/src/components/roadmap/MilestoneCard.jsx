/**
 * Roadmap timeline milestone card.
 */

export default function MilestoneCard({ milestone }) {
  return (
    <div className="card border-l-4 border-primary-500">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-primary-600 uppercase tracking-wide">
          Week {milestone.week}
        </span>
      </div>
      <h4 className="text-lg font-semibold text-gray-800">{milestone.title}</h4>
      <p className="text-gray-600 mt-1 text-sm">{milestone.description}</p>

      {milestone.skills?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {milestone.skills.map((s) => (
            <span key={s} className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">
              {s}
            </span>
          ))}
        </div>
      )}

      {milestone.resources?.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-semibold text-gray-500 mb-1">Resources</p>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            {milestone.resources.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
