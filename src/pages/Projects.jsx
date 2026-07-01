import { useState } from 'react'
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil, HiOutlineFolder, HiOutlineExternalLink } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import { Input, TextArea, Select } from '../components/ui/FormControls.jsx'
import { EmptyState, CardSkeletonGrid } from '../components/ui/States.jsx'
import { useCrud } from '../hooks/useCrud.js'

const empty = { title: '', description: '', status: 'planning', github_link: '', demo_link: '', tech_stack: '' }
const statusColor = { planning: 'bg-white/[0.06] text-mist-500', in_progress: 'bg-amber/15 text-amber', completed: 'bg-emerald-500/15 text-emerald-400', archived: 'bg-white/[0.04] text-mist-700' }

export default function Projects() {
  const { items, loading, create, update, remove } = useCrud('/api/projects')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)

  function openCreate() { setEditing(null); setForm(empty); setModalOpen(true) }
  function openEdit(p) { setEditing(p); setForm(p); setModalOpen(true) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (editing) await update(editing.id, form)
    else await create(form)
    setModalOpen(false)
  }

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Everything you've built, with status and links."
        action={<Button onClick={openCreate}><HiOutlinePlus size={16} /> New project</Button>}
      />

      {loading ? (
        <CardSkeletonGrid />
      ) : items.length === 0 ? (
        <EmptyState icon={HiOutlineFolder} title="No projects yet" description="Log a project to track its status and links." action={<Button onClick={openCreate}>Add a project</Button>} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Card key={p.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-mist-100">{p.title}</p>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] capitalize ${statusColor[p.status]}`}>{p.status.replace('_', ' ')}</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(p)} className="text-mist-700 hover:text-mist-100"><HiOutlinePencil size={15} /></button>
                  <button onClick={() => remove(p.id)} className="text-mist-700 hover:text-red-400"><HiOutlineTrash size={15} /></button>
                </div>
              </div>
              {p.description && <p className="mt-2 text-xs text-mist-500 line-clamp-2">{p.description}</p>}
              {p.tech_stack && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.tech_stack.split(',').map((t) => <span key={t} className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] text-mist-500">{t.trim()}</span>)}
                </div>
              )}
              <div className="mt-3 flex gap-3">
                {p.github_link && <a href={p.github_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-mist-500 hover:text-mist-100"><FaGithub size={14} /> Code</a>}
                {p.demo_link && <a href={p.demo_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-mist-500 hover:text-mist-100"><HiOutlineExternalLink size={14} /> Demo</a>}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit project' : 'New project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <TextArea label="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="planning">Planning</option>
            <option value="in_progress">In progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </Select>
          <Input label="Tech stack (comma separated)" value={form.tech_stack} onChange={(e) => setForm({ ...form, tech_stack: e.target.value })} placeholder="React, FastAPI, PostgreSQL" />
          <Input label="GitHub link" value={form.github_link} onChange={(e) => setForm({ ...form, github_link: e.target.value })} />
          <Input label="Demo link" value={form.demo_link} onChange={(e) => setForm({ ...form, demo_link: e.target.value })} />
          <Button type="submit" className="w-full">{editing ? 'Save changes' : 'Add project'}</Button>
        </form>
      </Modal>
    </div>
  )
}
