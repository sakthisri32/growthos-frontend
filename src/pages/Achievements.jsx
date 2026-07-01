import { useEffect, useState } from 'react'
import { HiOutlineBadgeCheck } from 'react-icons/hi'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import { EmptyState } from '../components/ui/States.jsx'
import api from '../api/client.js'

const ALL_BADGES = [
  { key: '30_day_streak', title: '30 Day Streak', description: 'Keep any habit alive for 30 consecutive days.', emoji: '🔥' },
  { key: '100_hours_coding', title: '100 Hours Coding', description: 'Log 100+ learning hours across coding skills.', emoji: '💻' },
  { key: 'python_master', title: 'Python Master', description: 'Reach 90%+ progress on a Python skill.', emoji: '🐍' },
  { key: 'ai_explorer', title: 'AI Explorer', description: 'Create your first AI or ML skill.', emoji: '🤖' },
  { key: 'startup_thinker', title: 'Startup Thinker', description: 'Log your first startup idea.', emoji: '💡' },
]

export default function Achievements() {
  const [unlocked, setUnlocked] = useState([])
  const [loading, setLoading] = useState(true)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    api.get('/api/achievements').then((r) => setUnlocked(r.data)).finally(() => setLoading(false))
  }, [])

  async function checkNow() {
    setChecking(true)
    try {
      const res = await api.post('/api/achievements/check')
      if (res.data.length > 0) {
        const refreshed = await api.get('/api/achievements')
        setUnlocked(refreshed.data)
      }
    } finally {
      setChecking(false)
    }
  }

  const unlockedKeys = new Set(unlocked.map((a) => a.badge_key))

  return (
    <div>
      <PageHeader
        title="Achievements"
        subtitle="Badges earned by doing the work consistently."
        action={
          <Button variant="secondary" onClick={checkNow} disabled={checking}>
            {checking ? 'Checking…' : 'Check for new badges'}
          </Button>
        }
      />

      {loading ? (
        <p className="text-sm text-mist-500">Loading…</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_BADGES.map((badge) => {
            const earned = unlockedKeys.has(badge.key)
            const earnedData = unlocked.find((a) => a.badge_key === badge.key)
            return (
              <Card key={badge.key} className={`transition-opacity ${earned ? '' : 'opacity-40'}`}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{badge.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-mist-100">{badge.title}</p>
                    <p className="mt-0.5 text-xs text-mist-500">{badge.description}</p>
                    {earned && earnedData && (
                      <p className="mt-1.5 text-[11px] text-violet-400">
                        Unlocked {new Date(earnedData.unlocked_at).toLocaleDateString()}
                      </p>
                    )}
                    {!earned && (
                      <p className="mt-1.5 flex items-center gap-1 text-[11px] text-mist-700">
                        🔒 Locked
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {!loading && unlocked.length === 0 && (
        <p className="mt-6 text-center text-sm text-mist-500">
          No badges unlocked yet — start logging habits, skills, and ideas.
        </p>
      )}
    </div>
  )
}
