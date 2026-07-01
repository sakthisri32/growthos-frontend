import { useState } from 'react'
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil, HiOutlineLightBulb } from 'react-icons/hi'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import { Input, TextArea, Select } from '../components/ui/FormControls.jsx'
import { EmptyState, CardSkeletonGrid } from '../components/ui/States.jsx'
import { useCrud } from '../hooks/useCrud.js'

const empty = { title: '', problem: '', solution: '', market: '', competitors: '', revenue_model: '', mvp: '', status: 'idea' }
const statusColor = { idea: 'bg-white/[0.06] text-mist-500', validating: 'bg-amber/15 text-amber', building: 'bg-skyline/15 text-skyline-400', launched: 'bg-emerald-500/15 text-emerald-400' }

export default function StartupIdeas() {
  const { items, loading, create, update, remove } = useCrud('/api/startup-ideas')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)

  function openCreate() { setEditing(null); setForm(empty); setModalOpen(true) }
  function openEdit(s) { setEditing(s); setForm(s); setModalOpen(true) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (editing) await update(editing.id, form)
    else await create(form)
    setModalOpen(false)
  }

  return (
    <div>
      <PageHeader
        title="Startup Ideas"
        subtitle="Problem, solution, market — structured like investors expect."
        action={<Button onClick={openCreate}><HiOutlinePlus size={16} /> New idea</Button>}
      />

      {loading ? (
        <CardSkeletonGrid />
      ) : items.length === 0 ? (
        <EmptyState icon={HiOutlineLightBulb} title="No ideas logged" description="Capture your first startup idea before it slips away." action={<Button onClick={openCreate}>Add an idea</Button>} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <Card key={s.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-mist-100">{s.title}</p>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] capitalize ${statusColor[s.status]}`}>{s.status}</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(s)} className="text-mist-700 hover:text-mist-100"><HiOutlinePencil size={15} /></button>
                  <button onClick={() => remove(s.id)} className="text-mist-700 hover:text-red-400"><HiOutlineTrash size={15} /></button>
                </div>
              </div>
              {s.problem && <p className="mt-2 text-xs text-mist-500 line-clamp-2"><span className="text-mist-700">Problem: </span>{s.problem}</p>}
              {s.solution && <p className="mt-1 text-xs text-mist-500 line-clamp-2"><span className="text-mist-700">Solution: </span>{s.solution}</p>}
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit idea' : 'New startup idea'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <TextArea label="Problem" rows={2} value={form.problem} onChange={(e) => setForm({ ...form, problem: e.target.value })} />
          <TextArea label="Solution" rows={2} value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} />
          <TextArea label="Market" rows={2} value={form.market} onChange={(e) => setForm({ ...form, market: e.target.value })} />
          <TextArea label="Competitors" rows={2} value={form.competitors} onChange={(e) => setForm({ ...form, competitors: e.target.value })} />
          <TextArea label="Revenue model" rows={2} value={form.revenue_model} onChange={(e) => setForm({ ...form, revenue_model: e.target.value })} />
          <TextArea label="MVP" rows={2} value={form.mvp} onChange={(e) => setForm({ ...form, mvp: e.target.value })} />
          <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="idea">Idea</option>
            <option value="validating">Validating</option>
            <option value="building">Building</option>
            <option value="launched">Launched</option>
          </Select>
          <Button type="submit" className="w-full">{editing ? 'Save changes' : 'Add idea'}</Button>
        </form>
      </Modal>
    </div>
  )
}
