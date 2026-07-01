const modules = [
  'timetable', 'tasks', 'skills', 'habits', 'goals', 'projects',
  'journal', 'ai coach', 'research', 'startup ideas', 'reading list', 'achievements'
]

export default function LogStrip() {
  const row = [...modules, ...modules]
  return (
    <div id="log" className="overflow-hidden border-y border-white/[0.06] bg-ink-900/60 py-4">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10">
        {row.map((m, i) => (
          <span key={i} className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-mist-700">
            <span className="h-1 w-1 rounded-full bg-mist-700" />
            {m}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
