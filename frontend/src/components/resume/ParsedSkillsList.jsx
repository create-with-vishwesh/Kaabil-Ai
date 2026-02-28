/**
 * Display parsed skills from resume.
 */

export default function ParsedSkillsList({ skills }) {
  if (!skills) return null;

  const sections = [
    { title: 'Technical Skills', items: skills.technical || [], color: 'bg-blue-100 text-blue-800' },
    { title: 'Soft Skills', items: skills.soft || [], color: 'bg-green-100 text-green-800' },
    { title: 'Tools & Frameworks', items: skills.tools || [], color: 'bg-purple-100 text-purple-800' },
  ];

  return (
    <div className="space-y-4">
      {sections.map((s) => (
        <div key={s.title}>
          <h4 className="font-semibold text-gray-700 mb-2">{s.title}</h4>
          <div className="flex flex-wrap gap-2">
            {s.items.length > 0 ? (
              s.items.map((item) => (
                <span key={item} className={`px-3 py-1 rounded-full text-sm font-medium ${s.color}`}>
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">None detected</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
