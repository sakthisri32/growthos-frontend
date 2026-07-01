import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let start
    let frame
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])
  return value
}

const skills = [
  { label: 'python', value: 82 },
  { label: 'react', value: 64 },
  { label: 'ml', value: 47 }
]

export default function LedgerCard() {
  const streak = useCountUp(47)
  const hours = useCountUp(126)
  const xp = useCountUp(2840)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="glass relative w-full max-w-md rounded-2xl p-5 font-mono"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <span className="text-xs uppercase tracking-widest text-mist-500">growth.log</span>
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-white/[0.03] p-3">
          <p className="text-[10px] uppercase tracking-wider text-mist-500">streak</p>
          <p className="mt-1 text-xl font-semibold text-amber">
            {streak}<span className="text-xs text-mist-500"> d</span>
          </p>
        </div>
        <div className="rounded-xl bg-white/[0.03] p-3">
          <p className="text-[10px] uppercase tracking-wider text-mist-500">hours</p>
          <p className="mt-1 text-xl font-semibold text-mist-100">{hours}</p>
        </div>
        <div className="rounded-xl bg-white/[0.03] p-3">
          <p className="text-[10px] uppercase tracking-wider text-mist-500">xp</p>
          <p className="mt-1 text-xl font-semibold text-skyline-400">+{xp}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {skills.map((s, i) => (
          <div key={s.label}>
            <div className="mb-1 flex justify-between text-[11px] text-mist-500">
              <span>{s.label}</span>
              <span>{s.value}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.value}%` }}
                transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-skyline-400"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] px-3 py-2 text-[11px] text-mist-300">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
        coach: 3 hrs free today — ship the auth module
      </div>
    </motion.div>
  )
}
