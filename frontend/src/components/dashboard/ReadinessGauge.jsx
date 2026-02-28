/**
 * Circular readiness gauge for the dashboard.
 */

export default function ReadinessGauge({ score = 0 }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 75) return '#22c55e';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="160" className="-rotate-90">
        {/* Background circle */}
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="12" />
        {/* Score circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute mt-14">
        <span className="text-3xl font-bold" style={{ color: getColor() }}>
          {Math.round(score)}
        </span>
        <span className="text-gray-400 text-sm block text-center">/ 100</span>
      </div>
      <p className="mt-2 font-semibold text-gray-600">Readiness Score</p>
    </div>
  );
}
