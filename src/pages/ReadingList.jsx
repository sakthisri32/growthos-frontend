import { useState } from 'react'
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil, HiOutlineLibrary, HiOutlineExternalLink } from 'react-icons/hi'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import { Input, Select } from '../components/ui/FormControls.jsx'
import { EmptyState, CardSkeletonGrid } from '../components/ui/States.jsx'
import { useCrud } from '../hooks/useCrud.js'

const empty = { title: '', type: 'book', link: '', completion_percent: 0 }
const typeIcon = { book: '📚', blog: '📝', paper: '🔬', video: '🎬' }

export default function ReadingList() {
  const { items, loading, create, update, remove } = useCrud('/api/reading-list')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [filter, setFilter] = useState('all')

  function openCreate() { setEditing(null); setForm(empty); setModalOpen(true) }
  function openEdit(r) { setEditing(r); setForm(r); setModalOpen(true) }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = { ...form, completion_percent: Number(form.completion_percent) }
    if (editing) await update(editing.id, payload)
    else await create(payload)
    setModalOpen(false)
  }

  const filtered = filter === 'all' ? items : items.filter((i) => i.type === filter)

  return (
    <div>
      <PageHeader
        title="Reading List"
        subtitle="Books, blogs, papers, and videos — all in one queue."
        action={<Button onClick={openCreate}><HiOutlinePlus size={16} /> Add item</Button>}
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {['all', 'book', 'blog', 'paper', 'video'].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${filter === t ? 'bg-violet-500 text-white' : 'border border-white/[0.08] text-mist-500 hover:text-mist-100'}`}
          >
            {t === 'all' ? 'All' : `${typeIcon[t]} ${t}s`}
          </button>
        ))}
      </div>

      {loading ? (
        <CardSkeletonGrid />
      ) : filtered.length === 0 ? (
        <EmptyState icon={HiOutlineLibrary} title="Nothing in your list" description="Add something to read, watch, or study." action={<Button onClick={openCreate}>Add an item</Button>} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <Card key={r.id}>
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-mist-100 truncate">{typeIcon[r.type]} {r.title}</p>
                  <span className="text-[11px] capitalize text-mist-500">{r.type}</span>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button onClick={() => openEdit(r)} className="text-mist-700 hover:text-mist-100"><HiOutlinePencil size={15} /></button>
                  <button onClick={() => remove(r.id)} className="text-mist-700 hover:text-red-400"><HiOutlineTrash size={15} /></button>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-1 flex justify-between text-[11px] text-mist-500">
                  <span>Progress</span>
                  <span>{r.completion_percent}%</span>
                </div>
                <input
                  type="range" min="0" max="100"
                  value={r.completion_percent}
                  onChange={(e) => update(r.id, { completion_percent: Number(e.target.value) })}
                  className="w-full accent-violet-500"
                />
              </div>

              {r.link && (
                <a href={r.link} target="_blank" rel="noreferrer" className="mt-2 flex w-fit items-center gap-1 text-xs text-violet-400 hover:text-violet-300">
                  <HiOutlineExternalLink size={13} /> Open
                </a>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit item' : 'Add to reading list'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Select label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="book">Book</option>
            <option value="blog">Blog</option>
            <option value="paper">Research Paper</option>
            <option value="video">Video</option>
          </Select>
          <Input label="Link (optional)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
          <Input label="Progress %" type="number" min="0" max="100" value={form.completion_percent} onChange={(e) => setForm({ ...form, completion_percent: e.target.value })} />
          <Button type="submit" className="w-full">{editing ? 'Save changes' : 'Add to list'}</Button>
        </form>
      </Modal>
    </div>
  )
}
