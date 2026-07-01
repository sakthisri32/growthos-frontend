import { useState } from 'react'
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil, HiOutlineAcademicCap } from 'react-icons/hi'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import { Input, Select } from '../components/ui/FormControls.jsx'
import { EmptyState, CardSkeletonGrid } from '../components/ui/States.jsx'
import { useCrud } from '../hooks/useCrud.js'

const empty = { name: '', category: '', level: 'beginner', progress_percent: 0, learning_hours: 0 }

export default function Skills() {
  const { items, loading, create, update, remove } = useCrud('/api/skills')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)

  function openCreate() {
    setEditing(null)
    setForm(empty)
    setModalOpen(true)
  }

  function openEdit(skill) {
    setEditing(skill)
    setForm(skill)
    setModalOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = { ...form, progress_percent: Number(form.progress_percent), learning_hours: Number(form.learning_hours) }
    if (editing) await update(editing.id, payload)
    else await create(payload)
    setModalOpen(false)
  }

  return (
    <div>
      <PageHeader
        title="Skill Tracker"
        subtitle="Python, ML, React, Cloud — whatever you're leveling up."
        action={<Button onClick={openCreate}><HiOutlinePlus size={16} /> New skill</Button>}
      />

      {loading ? (
        <CardSkeletonGrid />
      ) : items.length === 0 ? (
        <EmptyState icon={HiOutlineAcademicCap} title="No skills tracked yet" description="Add a skill to start logging hours and progress." action={<Button onClick={openCreate}>Add a skill</Button>} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <Card key={s.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-mist-100">{s.name}</p>
                  {s.category && <p className="text-xs text-mist-500">{s.category}</p>}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(s)} className="text-mist-700 hover:text-mist-100"><HiOutlinePencil size={15} /></button>
                  <button onClick={() => remove(s.id)} className="text-mist-700 hover:text-red-400"><HiOutlineTrash size={15} /></button>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-1 flex justify-between text-[11px] text-mist-500">
                  <span className="capitalize">{s.level}</span>
                  <span>{s.progress_percent}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-skyline-400" style={{ width: `${s.progress_percent}%` }} />
                </div>
              </div>

              <p className="mt-3 text-xs text-mist-500">{s.learning_hours} hours logged</p>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit skill' : 'New skill'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Skill name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Python, React, Docker…" />
          <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="AI, Web, Cloud…" />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Level" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Select>
            <Input label="Progress %" type="number" min="0" max="100" value={form.progress_percent} onChange={(e) => setForm({ ...form, progress_percent: e.target.value })} />
          </div>
          <Input label="Learning hours" type="number" min="0" step="0.5" value={form.learning_hours} onChange={(e) => setForm({ ...form, learning_hours: e.target.value })} />
          <Button type="submit" className="w-full">{editing ? 'Save changes' : 'Add skill'}</Button>
        </form>
      </Modal>
    </div>
  )
}
