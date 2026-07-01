import { useState } from 'react'
import { HiOutlinePlus, HiOutlineTrash, HiOutlineBeaker, HiOutlineBookmark, HiOutlineExternalLink } from 'react-icons/hi'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import { Input, TextArea } from '../components/ui/FormControls.jsx'
import { EmptyState, CardSkeletonGrid } from '../components/ui/States.jsx'
import { useCrud } from '../hooks/useCrud.js'

const empty = { topic: '', paper_title: '', link: '', notes: '', ideas: '', is_bookmarked: false }

export default function Research() {
  const { items, loading, create, update, remove } = useCrud('/api/research')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(empty)

  async function handleSubmit(e) {
    e.preventDefault()
    await create(form)
    setModalOpen(false)
    setForm(empty)
  }

  return (
    <div>
      <PageHeader
        title="Research"
        subtitle="Topics, papers, bookmarks, and the ideas they spark."
        action={<Button onClick={() => setModalOpen(true)}><HiOutlinePlus size={16} /> New entry</Button>}
      />

      {loading ? (
        <CardSkeletonGrid />
      ) : items.length === 0 ? (
        <EmptyState icon={HiOutlineBeaker} title="No research logged" description="Save a topic or paper you're exploring." action={<Button onClick={() => setModalOpen(true)}>Add research</Button>} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <Card key={r.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-mist-100">{r.topic}</p>
                  {r.paper_title && <p className="text-xs text-mist-500">{r.paper_title}</p>}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => update(r.id, { is_bookmarked: !r.is_bookmarked })} className={r.is_bookmarked ? 'text-amber' : 'text-mist-700 hover:text-mist-100'}>
                    <HiOutlineBookmark size={16} />
                  </button>
                  <button onClick={() => remove(r.id)} className="text-mist-700 hover:text-red-400"><HiOutlineTrash size={15} /></button>
                </div>
              </div>
              {r.notes && <p className="mt-2 text-xs text-mist-500 line-clamp-3">{r.notes}</p>}
              {r.link && <a href={r.link} target="_blank" rel="noreferrer" className="mt-2 flex w-fit items-center gap-1 text-xs text-violet-400 hover:text-violet-300"><HiOutlineExternalLink size={13} /> Open source</a>}
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New research entry">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Topic" required value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} />
          <Input label="Paper title" value={form.paper_title} onChange={(e) => setForm({ ...form, paper_title: e.target.value })} />
          <Input label="Link" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
          <TextArea label="Notes" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <TextArea label="Ideas sparked" rows={2} value={form.ideas} onChange={(e) => setForm({ ...form, ideas: e.target.value })} />
          <Button type="submit" className="w-full">Save</Button>
        </form>
      </Modal>
    </div>
  )
}
