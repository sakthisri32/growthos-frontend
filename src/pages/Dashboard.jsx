import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineFire, HiOutlineClock, HiOutlineFlag, HiOutlineSparkles, HiOutlineCheckCircle } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/client.js'
import Card from '../components/ui/Card.jsx'
import { Skeleton } from '../components/ui/States.jsx'

const QUOTES = [
  'Small daily improvements lead to staggering long-term results.',
  'Discipline is choosing between what you want now and what you want most.',
  'You do not rise to the level of your goals; you fall to the level of your systems.',
  'The expert in anything was once a beginner who refused to quit.',
  'Progress, not perfection.'
]

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const { user } = useAuth()
  const [summary, setSummary] = useState(null)
  const [tasks, setTasks] = useState([])
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const quote = QUOTES[new Date().getDate() % QUOTES.length]

  useEffect(() => {
    Promise.all([
      api.get('/api/analytics/summary'),
      api.get('/api/tasks', { params: { page_size: 5 } }),
      api.get('/api/habits')
    ])
      .then(([s, t, h]) => {
        setSummary(s.data)
        setTasks(t.data.filter((x) => !x.completed).slice(0, 5))
        setHabits(h.data)
      })
      .finally(() => setLoading(false))
  }, [])

  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
  const bestStreak = habits.length ? Math.max(...habits.map((h) => h.current_streak)) : 0

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-mist-500">{today}</p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-mist-100">
          {greeting()}, {user?.name?.split(' ')[0]}.
        </h1>
        <p className="mt-2 max-w-xl text-sm italic text-mist-500">“{quote}”</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={HiOutlineFire} label="Current streak" value={loading ? null : `${bestStreak}d`} accent="text-amber" />
        <StatCard icon={HiOutlineClock} label="Learning hours" value={loading ? null : summary?.total_learning_hours} accent="text-skyline-400" />
        <StatCard icon={HiOutlineCheckCircle} label="Task completion" value={loading ? null : `${summary?.task_completion_rate || 0}%`} accent="text-violet-400" />
        <StatCard icon={HiOutlineFlag} label="Goals done" value={loading ? null : `${summary?.goals_completed || 0}/${summary?.goals_total || 0}`} accent="text-mist-100" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-mist-100">Upcoming tasks</h2>
            <Link to="/dashboard/tasks" className="text-xs text-violet-400 hover:text-violet-300">View all</Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : tasks.length === 0 ? (
            <p className="text-sm text-mist-500">Nothing open — add a task to get started.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((t) => (
                <li key={t.id} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3.5 py-2.5">
                  <span className="text-sm text-mist-300">{t.title}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] capitalize ${
                    t.priority === 'high' ? 'bg-red-500/15 text-red-400' : t.priority === 'low' ? 'bg-white/[0.06] text-mist-500' : 'bg-amber/15 text-amber'
                  }`}>{t.priority}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-2">
            <HiOutlineSparkles className="text-violet-400" />
            <h2 className="font-display text-base font-semibold text-mist-100">Quick actions</h2>
          </div>
          <div className="space-y-2">
            
            <QuickLink to="/dashboard/journal" label="Write today's journal" />
            <QuickLink to="/dashboard/habits" label="Check in a habit" />
            <QuickLink to="/dashboard/tasks" label="Add a task" />
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-3 font-display text-base font-semibold text-mist-100">Habits today</h2>
          {loading ? (
            <Skeleton className="h-16 w-full" />
          ) : habits.length === 0 ? (
            <p className="text-sm text-mist-500">No habits yet. Build your first streak today.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {habits.map((h) => (
                <span key={h.id} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-mist-300">
                  {h.name} · <span className="text-amber">{h.current_streak}d</span>
                </span>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="mb-3 font-display text-base font-semibold text-mist-100">Skill snapshot</h2>
          {loading ? (
            <Skeleton className="h-16 w-full" />
          ) : (
            <p className="text-sm text-mist-500">
              {summary?.total_skills || 0} skills tracked, averaging{' '}
              <span className="text-mist-100">{summary?.avg_skill_progress || 0}%</span> progress.
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <Card className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.04]">
        <Icon className={accent} size={20} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-mist-700">{label}</p>
        {value === null ? <Skeleton className="mt-1 h-5 w-12" /> : <p className="font-display text-lg font-semibold text-mist-100">{value}</p>}
      </div>
    </Card>
  )
}

function QuickLink({ to, label }) {
  return (
    <Link to={to} className="block rounded-lg bg-white/[0.03] px-3.5 py-2.5 text-sm text-mist-300 transition-colors hover:bg-white/[0.06] hover:text-mist-100">
      {label}
    </Link>
  )
}
