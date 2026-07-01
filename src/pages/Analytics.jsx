import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  RadialLinearScale, ArcElement, Tooltip, Legend, Filler
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import api from '../api/client.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import { Skeleton } from '../components/ui/States.jsx'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Tooltip, Legend, Filler)

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { backgroundColor: '#100E1B', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#615A78', font: { size: 11 } } },
    y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#615A78', font: { size: 11 } } }
  }
}

export default function Analytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/analytics/summary').then((r) => setData(r.data)).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div>
      <PageHeader title="Progress Analytics" subtitle="Your effort, visualized." />
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((k) => <Card key={k}><Skeleton className="h-48 w-full" /></Card>)}
      </div>
    </div>
  )

  const lineData = {
    labels: data.daily_hours.map((d) => d.date.slice(5)),
    datasets: [{
      label: 'Hours', data: data.daily_hours.map((d) => d.hours),
      borderColor: '#7C3AED', backgroundColor: 'rgba(124,58,237,0.1)',
      fill: true, tension: 0.4, pointBackgroundColor: '#7C3AED', pointRadius: 4
    }]
  }

  const barData = {
    labels: data.weekly_progress.map((w) => w.week),
    datasets: [{
      label: 'Completion %', data: data.weekly_progress.map((w) => w.completion),
      backgroundColor: 'rgba(124,58,237,0.7)', borderRadius: 8
    }]
  }

  const doughnutData = {
    labels: data.skill_breakdown.slice(0, 8).map((s) => s.name),
    datasets: [{
      data: data.skill_breakdown.slice(0, 8).map((s) => s.progress),
      backgroundColor: ['#7C3AED','#3B82F6','#10B981','#F5A623','#EF4444','#EC4899','#8B5CF6','#06B6D4'],
      borderWidth: 0
    }]
  }

  const statCards = [
    { label: 'Tasks completed', value: `${data.completed_tasks} / ${data.total_tasks}`, sub: `${data.task_completion_rate}% rate` },
    { label: 'Skills tracked', value: data.total_skills, sub: `avg ${data.avg_skill_progress}% progress` },
    { label: 'Learning hours', value: data.total_learning_hours, sub: 'total logged' },
    { label: 'Best habit streak', value: `${data.best_habit_streak}d`, sub: `${data.habit_count} habits` },
  ]

  return (
    <div>
      <PageHeader title="Progress Analytics" subtitle="The shape of your effort, not just the totals." />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <Card key={s.label}>
            <p className="text-[11px] uppercase tracking-wide text-mist-700">{s.label}</p>
            <p className="mt-1 font-display text-2xl font-semibold text-mist-100">{s.value}</p>
            <p className="text-xs text-mist-500">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="mb-4 text-sm font-semibold text-mist-100">Daily learning hours (last 7 days)</p>
          <div className="h-48">
            <Line data={lineData} options={chartDefaults} />
          </div>
        </Card>

        <Card>
          <p className="mb-4 text-sm font-semibold text-mist-100">Weekly task completion</p>
          <div className="h-48">
            <Bar data={barData} options={chartDefaults} />
          </div>
        </Card>

        <Card>
          <p className="mb-4 text-sm font-semibold text-mist-100">Skill progress breakdown</p>
          {data.skill_breakdown.length === 0 ? (
            <p className="text-sm text-mist-500">Add skills to see the breakdown.</p>
          ) : (
            <div className="h-48">
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'right', labels: { color: '#9C95B5', font: { size: 11 }, boxWidth: 10 } },
                    tooltip: { backgroundColor: '#100E1B', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }
                  }
                }}
              />
            </div>
          )}
        </Card>

        <Card>
          <p className="mb-4 text-sm font-semibold text-mist-100">Goals summary</p>
          <div className="flex items-center justify-center h-48 gap-10">
            <div className="text-center">
              <p className="font-display text-4xl font-semibold text-violet-400">{data.goals_completed}</p>
              <p className="mt-1 text-xs text-mist-500">Completed</p>
            </div>
            <div className="h-16 w-px bg-white/[0.06]" />
            <div className="text-center">
              <p className="font-display text-4xl font-semibold text-mist-300">{data.goals_total}</p>
              <p className="mt-1 text-xs text-mist-500">Total</p>
            </div>
            <div className="h-16 w-px bg-white/[0.06]" />
            <div className="text-center">
              <p className="font-display text-4xl font-semibold text-emerald-400">
                {data.goals_total ? Math.round((data.goals_completed / data.goals_total) * 100) : 0}%
              </p>
              <p className="mt-1 text-xs text-mist-500">Rate</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
