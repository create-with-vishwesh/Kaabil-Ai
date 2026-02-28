/**
 * Reusable score card for the dashboard.
 */

export default function ScoreCard({ title, score, maxScore = 100, icon, color = 'primary' }) {
  const pct = Math.round((score / maxScore) * 100);
  const colorMap = {
    primary: 'text-primary-600 bg-primary-50 border-primary-200',
    green: 'text-green-600 bg-green-50 border-green-200',
    amber: 'text-amber-600 bg-amber-50 border-amber-200',
    purple: 'text-purple-600 bg-purple-50 border-purple-200',
  };

  return (
    <div className={`card border ${colorMap[color]}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        <span className="text-2xl font-bold">{pct}%</span>
      </div>
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-current rounded-full h-2 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
