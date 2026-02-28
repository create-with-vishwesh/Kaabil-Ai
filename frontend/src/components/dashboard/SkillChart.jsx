/**
 * Recharts-based skill breakdown chart for the dashboard.
 */

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export default function SkillChart({ breakdown = [] }) {
  const chartData = breakdown.map((item) => ({
    category: item.category,
    score: item.score,
    fullMark: item.max_score,
  }));

  if (chartData.length === 0) {
    return <p className="text-gray-400 text-center py-10">No data yet</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart data={chartData}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fill: '#6b7280' }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#2563eb"
          fill="#3b82f6"
          fillOpacity={0.3}
        />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
}
