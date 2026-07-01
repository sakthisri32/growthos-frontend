import { useState } from 'react'
import { HiOutlinePlus, HiOutlineTrash, HiOutlineBookOpen } from 'react-icons/hi'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import { Input, TextArea, Select } from '../components/ui/FormControls.jsx'
import { EmptyState, CardSkeletonGrid } from '../components/ui/States.jsx'
import { useCrud } from '../hooks/useCrud.js'

const empty = { date: new Date().toISOString().slice(0, 10), todays_learning: '', problems_faced: '', ideas: '', tomorrow_plan: '', mood: 'good', tags: '' }
const moods = { great: '🤩', good: '🙂', neutral: '😐', bad: '😕', terrible: '😣' }

export default function Journal() {
  const { items, loading, create, remove } = useCrud('/api/journal')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(empty)

  async function handleSubmit(e) {
    e.preventDefault()
    await create(form)
    setModalOpen(false)
    setForm({ ...empty, date: new Date().toISOString().slice(0, 10) })
  }

  return (
    <div>
      <PageHeader
        title="Journal"
        subtitle="What you learned, what broke, what's next."
        action={<Button onClick={() => setModalOpen(true)}><HiOutlinePlus size={16} /> New entry</Button>}
      />

      {loading ? (
        <CardSkeletonGrid />
      ) : items.length === 0 ? (
        <EmptyState icon={HiOutlineBookOpen} title="No entries yet" description="Write your first journal entry — it takes a minute." action={<Button onClick={() => setModalOpen(true)}>Write today's entry</Button>} />
      ) : (
        <div className="space-y-3">
          {items.map((j) => (
            <Card key={j.id}>
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-mist-100">
                  {moods[j.mood] || ''} {j.date ? new Date(j.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) : ''}
                </p>
                <button onClick={() => remove(j.id)} className="text-mist-700 hover:text-red-400"><HiOutlineTrash size={15} /></button>
              </div>
              {j.todays_learning && <p className="mt-2 text-sm text-mist-300"><span className="text-mist-700">Learned: </span>{j.todays_learning}</p>}
              {j.problems_faced && <p className="mt-1 text-sm text-mist-300"><span className="text-mist-700">Problems: </span>{j.problems_faced}</p>}
              {j.tomorrow_plan && <p className="mt-1 text-sm text-mist-300"><span className="text-mist-700">Tomorrow: </span>{j.tomorrow_plan}</p>}
              {j.tags && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {j.tags.split(',').map((t) => <span key={t} className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] text-mist-500">{t.trim()}</span>)}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New journal entry">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <Select label="Mood" value={form.mood} onChange={(e) => setForm({ ...form, mood: e.target.value })}>
              {Object.keys(moods).map((m) => <option key={m} value={m}>{moods[m]} {m}</option>)}
            </Select>
          </div>
          <TextArea label="Today's learning" rows={2} value={form.todays_learning} onChange={(e) => setForm({ ...form, todays_learning: e.target.value })} />
          <TextArea label="Problems faced" rows={2} value={form.problems_faced} onChange={(e) => setForm({ ...form, problems_faced: e.target.value })} />
          <TextArea label="Ideas" rows={2} value={form.ideas} onChange={(e) => setForm({ ...form, ideas: e.target.value })} />
          <TextArea label="Tomorrow's plan" rows={2} value={form.tomorrow_plan} onChange={(e) => setForm({ ...form, tomorrow_plan: e.target.value })} />
          <Input label="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="python, debugging, motivation" />
          <Button type="submit" className="w-full">Save entry</Button>
        </form>
      </Modal>
    </div>
  )
}
