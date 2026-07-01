import { useState } from 'react'
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil, HiOutlineSearch, HiOutlineCheckCircle } from 'react-icons/hi'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import { Input, TextArea, Select } from '../components/ui/FormControls.jsx'
import { EmptyState, CardSkeletonGrid } from '../components/ui/States.jsx'
import { useCrud } from '../hooks/useCrud.js'

const empty = { title: '', description: '', category: '', priority: 'medium', deadline: '' }

export default function Tasks() {
  const { items, loading, create, update, remove, refresh } = useCrud('/api/tasks')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  function openCreate() {
    setEditing(null)
    setForm(empty)
    setModalOpen(true)
  }

  function openEdit(task) {
    setEditing(task)
    setForm({ ...task, deadline: task.deadline ? task.deadline.slice(0, 10) : '' })
    setModalOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = { ...form, deadline: form.deadline || null }
    if (editing) await update(editing.id, payload)
    else await create(payload)
    setModalOpen(false)
  }

  async function handleSearch(e) {
    e.preventDefault()
    refresh({ search, status: priorityFilter || undefined })
  }

  return (
    <div>
      <PageHeader
        title="Tasks"
        subtitle="Everything you need to get done, prioritized."
        action={<Button onClick={openCreate}><HiOutlinePlus size={16} /> New task</Button>}
      />

      <form onSubmit={handleSearch} className="mb-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <HiOutlineSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-mist-700" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks…"
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-2.5 pl-9 pr-3 text-sm text-mist-100 placeholder:text-mist-700 outline-none focus:border-violet-400/50"
          />
        </div>
        <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="w-40">
          <option value="">All priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </Select>
        <Button type="submit" variant="secondary">Filter</Button>
      </form>

      {loading ? (
        <CardSkeletonGrid />
      ) : items.length === 0 ? (
        <EmptyState icon={HiOutlineCheckCircle} title="No tasks yet" description="Add your first task to start tracking what matters today." action={<Button onClick={openCreate}>Add a task</Button>} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <Card key={t.id} className={t.completed ? 'opacity-60' : ''}>
              <div className="flex items-start justify-between gap-2">
                <button onClick={() => update(t.id, { completed: !t.completed })} className="mt-0.5">
                  <HiOutlineCheckCircle size={18} className={t.completed ? 'text-violet-400' : 'text-mist-700'} />
                </button>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium text-mist-100 ${t.completed ? 'line-through' : ''}`}>{t.title}</p>
                  {t.description && <p className="mt-1 text-xs text-mist-500 line-clamp-2">{t.description}</p>}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] capitalize ${
                      t.priority === 'high' ? 'bg-red-500/15 text-red-400' : t.priority === 'low' ? 'bg-white/[0.06] text-mist-500' : 'bg-amber/15 text-amber'
                    }`}>{t.priority}</span>
                    {t.category && <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] text-mist-500">{t.category}</span>}
                    {t.deadline && <span className="text-[11px] text-mist-700">{new Date(t.deadline).toLocaleDateString()}</span>}
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button onClick={() => openEdit(t)} className="text-mist-700 hover:text-mist-100"><HiOutlinePencil size={15} /></button>
                  <button onClick={() => remove(t.id)} className="text-mist-700 hover:text-red-400"><HiOutlineTrash size={15} /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit task' : 'New task'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <TextArea label="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Select label="Priority" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </div>
          <Input label="Deadline" type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
          <Button type="submit" className="w-full">{editing ? 'Save changes' : 'Create task'}</Button>
        </form>
      </Modal>
    </div>
  )
}
