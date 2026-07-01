import { useState } from 'react'
import { HiOutlinePlus, HiOutlineTrash, HiOutlineFlag } from 'react-icons/hi'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import { Input, Select } from '../components/ui/FormControls.jsx'
import { EmptyState, CardSkeletonGrid } from '../components/ui/States.jsx'
import { useCrud } from '../hooks/useCrud.js'

const empty = { title: '', term: 'daily', target_date: '' }
const terms = ['daily', 'weekly', 'monthly', 'yearly', 'short_term', 'long_term']

export default function Goals() {
  const { items, loading, create, update, remove } = useCrud('/api/goals')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(empty)

  async function handleSubmit(e) {
    e.preventDefault()
    await create({ ...form, target_date: form.target_date || null })
    setModalOpen(false)
    setForm(empty)
  }

  return (
    <div>
      <PageHeader
        title="Goals"
        subtitle="Daily to long-term — track what you're working toward."
        action={<Button onClick={() => setModalOpen(true)}><HiOutlinePlus size={16} /> New goal</Button>}
      />

      {loading ? (
        <CardSkeletonGrid />
      ) : items.length === 0 ? (
        <EmptyState icon={HiOutlineFlag} title="No goals set" description="Set a goal — daily, weekly, or long-term." action={<Button onClick={() => setModalOpen(true)}>Add a goal</Button>} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => (
            <Card key={g.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-mist-100">{g.title}</p>
                  <span className="mt-1 inline-block rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] capitalize text-mist-500">{g.term.replace('_', ' ')}</span>
                </div>
                <button onClick={() => remove(g.id)} className="text-mist-700 hover:text-red-400"><HiOutlineTrash size={15} /></button>
              </div>

              <div className="mt-4">
                <div className="mb-1 flex justify-between text-[11px] text-mist-500">
                  <span>Completion</span>
                  <span>{g.completion_percent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={g.completion_percent}
                  onChange={(e) => update(g.id, { completion_percent: Number(e.target.value), completed: Number(e.target.value) === 100 })}
                  className="w-full accent-violet-500"
                />
              </div>
              {g.target_date && <p className="mt-2 text-[11px] text-mist-700">Target: {new Date(g.target_date).toLocaleDateString()}</p>}
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New goal">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Goal" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Select label="Term" value={form.term} onChange={(e) => setForm({ ...form, term: e.target.value })}>
            {terms.map((t) => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
          </Select>
          <Input label="Target date" type="date" value={form.target_date} onChange={(e) => setForm({ ...form, target_date: e.target.value })} />
          <Button type="submit" className="w-full">Add goal</Button>
        </form>
      </Modal>
    </div>
  )
}
