import { useState } from 'react'
import { HiOutlinePlus, HiOutlineTrash, HiOutlineFire, HiOutlineCheck } from 'react-icons/hi'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import { Input } from '../components/ui/FormControls.jsx'
import { EmptyState, CardSkeletonGrid } from '../components/ui/States.jsx'
import { useCrud } from '../hooks/useCrud.js'
import api from '../api/client.js'

const empty = { name: '', target_per_day: 1 }

function last7Days() {
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d
  })
}

export default function Habits() {
  const { items, setItems, loading, create, remove } = useCrud('/api/habits')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const days = last7Days()

  async function handleSubmit(e) {
    e.preventDefault()
    await create(form)
    setModalOpen(false)
    setForm(empty)
  }

  async function checkIn(habit) {
    const res = await api.post(`/api/habits/${habit.id}/check-in`)
    setItems((prev) => prev.map((h) => (h.id === habit.id ? res.data : h)))
  }

  function isDoneOn(habit, date) {
    const logs = habit.logs ? JSON.parse(habit.logs) : []
    return logs.includes(date.toISOString().slice(0, 10))
  }

  return (
    <div>
      <PageHeader
        title="Habit Tracker"
        subtitle="Wake up, exercise, code, read — consistency compounds."
        action={<Button onClick={() => setModalOpen(true)}><HiOutlinePlus size={16} /> New habit</Button>}
      />

      {loading ? (
        <CardSkeletonGrid count={4} />
      ) : items.length === 0 ? (
        <EmptyState icon={HiOutlineFire} title="No habits yet" description="Add a habit and check in daily to start a streak." action={<Button onClick={() => setModalOpen(true)}>Add a habit</Button>} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((h) => {
            const doneToday = isDoneOn(h, new Date())
            return (
              <Card key={h.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-mist-100">{h.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-amber">
                      <HiOutlineFire size={14} /> {h.current_streak} day streak · best {h.longest_streak}
                    </p>
                  </div>
                  <button onClick={() => remove(h.id)} className="text-mist-700 hover:text-red-400"><HiOutlineTrash size={15} /></button>
                </div>

                <div className="mt-4 flex justify-between">
                  {days.map((d) => {
                    const done = isDoneOn(h, d)
                    const isToday = d.toDateString() === new Date().toDateString()
                    return (
                      <div key={d.toISOString()} className="flex flex-col items-center gap-1">
                        <span className="text-[10px] text-mist-700">{d.toLocaleDateString(undefined, { weekday: 'narrow' })}</span>
                        <span className={`grid h-6 w-6 place-items-center rounded-md text-[10px] ${
                          done ? 'bg-violet-500 text-white' : isToday ? 'border border-violet-400/50 text-mist-500' : 'bg-white/[0.04] text-mist-700'
                        }`}>
                          {done && <HiOutlineCheck size={12} />}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <Button
                  variant={doneToday ? 'secondary' : 'primary'}
                  onClick={() => checkIn(h)}
                  disabled={doneToday}
                  className="mt-4 w-full"
                >
                  {doneToday ? "Done for today" : 'Check in today'}
                </Button>
              </Card>
            )
          })}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New habit">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Habit name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Exercise, Meditation, Coding…" />
          <Input label="Target per day" type="number" min="1" value={form.target_per_day} onChange={(e) => setForm({ ...form, target_per_day: Number(e.target.value) })} />
          <Button type="submit" className="w-full">Add habit</Button>
        </form>
      </Modal>
    </div>
  )
}
