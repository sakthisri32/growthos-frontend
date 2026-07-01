import { motion } from 'framer-motion'
import {
  HiOutlineSparkles, HiOutlineChartBar, HiOutlineCalendar, HiOutlineBookOpen,
  HiOutlineLightBulb, HiOutlineCode, HiOutlineCheckCircle, HiOutlineFire,
  HiOutlineAcademicCap
} from 'react-icons/hi'

const features = [
  { icon: HiOutlineSparkles, title: 'AI Coach', desc: 'Tell it how many hours you have — it builds the order: study, build, revise.' },
  { icon: HiOutlineChartBar, title: 'Skill tracking', desc: 'Every skill gets a level, hours logged, and milestones that actually move.' },
  { icon: HiOutlineFire, title: 'Habit tracking', desc: 'Daily, weekly, monthly streaks with a calendar that shows the real pattern.' },
  { icon: HiOutlineAcademicCap, title: 'Progress charts', desc: 'Line, bar, pie, and heat maps — the shape of your effort, not just totals.' },
  { icon: HiOutlineBookOpen, title: 'Journal', desc: 'What you learned, what broke, what tomorrow needs. One entry a day.' },
  { icon: HiOutlineCalendar, title: 'Timetable', desc: 'Color-coded blocks across day, week, and month — built to be moved around.' },
  { icon: HiOutlineLightBulb, title: 'Startup planner', desc: 'Problem, solution, market, MVP — structured the way investors expect.' },
  { icon: HiOutlineCheckCircle, title: 'Research planner', desc: 'Topics, papers, bookmarks, and notes, linked instead of scattered in tabs.' },
  { icon: HiOutlineCode, title: 'GitHub tracker', desc: 'Pull your repos and commits into the same view as everything else.' }
]

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-xl">
        <p className="font-mono text-xs uppercase tracking-widest text-violet-400">the platform</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-mist-100 sm:text-4xl">
          Nine modules. One source of truth.
        </h2>
        <p className="mt-4 text-mist-500">
          Every part of GrowthOS writes to the same ledger, so your dashboard
          reflects what you actually did — not what you meant to do.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="glass group rounded-2xl p-6 transition-colors hover:bg-white/[0.05]"
          >
            <f.icon className="h-6 w-6 text-violet-400" />
            <h3 className="mt-4 font-display text-lg font-semibold text-mist-100">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist-500">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
