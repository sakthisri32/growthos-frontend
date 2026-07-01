import { useState } from 'react'
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil, HiOutlineCalendar } from 'react-icons/hi'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import { Input, Select } from '../components/ui/FormControls.jsx'
import { EmptyState } from '../components/ui/States.jsx'
import { useCrud } from '../hooks/useCrud.js'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const COLORS = ['#7C3AED', '#3B82F6', '#10B981', '#F5A623', '#EF4444', '#EC4899', '#8B5CF6']
const empty = { title: '', day_of_week: 0, start_time: '09:00', end_time: '10:00', color: '#7C3AED', recurrence: 'weekly' }

export default function Timetable() {
  const { items, loading, create, update, remove } = useCrud('/api/timetable')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [view, setView] = useState('week')

  function openCreate() { setEditing(null); setForm(empty); setModalOpen(true) }
  function openEdit(e) { setEditing(e); setForm(e); setModalOpen(true) }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = { ...form, day_of_week: Number(form.day_of_week) }
    if (editing) await update(editing.id, payload)
    else await create(payload)
    setModalOpen(false)
  }

  const todayIndex = (new Date().getDay() + 6) % 7

  return (
    <div>
      <PageHeader
        title="Timetable"
        subtitle="Color-coded blocks across your week."
        action={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setView(view === 'week' ? 'list' : 'week')}>
              {view === 'week' ? 'List view' : 'Week view'}
            </Button>
            <Button onClick={openCreate}><HiOutlinePlus size={16} /> Add block</Button>
          </div>
        }
      />

      {loading ? (
        <Card><p className="text-sm text-mist-500">Loading timetable…</p></Card>
      ) : items.length === 0 ? (
        <EmptyState icon={HiOutlineCalendar} title="No blocks yet" description="Add your first time block — class, study session, workout." action={<Button onClick={openCreate}>Add a block</Button>} />
      ) : view === 'week' ? (
        <div className="overflow-x-auto">
          <div className="min-w-[640px] grid grid-cols-7 gap-2">
            {DAYS.map((day, idx) => {
              const dayItems = items.filter((i) => i.day_of_week === idx)
              return (
                <div key={day}>
                  <p className={`mb-2 text-center text-xs font-semibold uppercase tracking-wider ${idx === todayIndex ? 'text-violet-400' : 'text-mist-500'}`}>{day.slice(0, 3)}</p>
                  <div className="space-y-1.5 min-h-[120px]">
                    {dayItems.map((b) => (
                      <div
                        key={b.id}
                        className="group relative cursor-pointer rounded-lg p-2 text-xs"
                        style={{ background: `${b.color}22`, borderLeft: `3px solid ${b.color}` }}
                        onClick={() => openEdit(b)}
                      >
                        <p className="font-medium text-mist-100 truncate">{b.title}</p>
                        <p className="text-mist-500">{b.start_time}–{b.end_time}</p>
                        <button
                          onClick={(e) => { e.stopPropagation(); remove(b.id) }}
                          className="absolute right-1 top-1 hidden text-mist-700 hover:text-red-400 group-hover:block"
                        >
                          <HiOutlineTrash size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((b) => (
            <Card key={b.id} className="flex items-center justify-between gap-3">
              <div className="h-8 w-1 shrink-0 rounded-full" style={{ background: b.color }} />
              <div className="flex-1">
                <p className="text-sm font-medium text-mist-100">{b.title}</p>
                <p className="text-xs text-mist-500">{DAYS[b.day_of_week]} · {b.start_time}–{b.end_time}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(b)} className="text-mist-700 hover:text-mist-100"><HiOutlinePencil size={15} /></button>
                <button onClick={() => remove(b.id)} className="text-mist-700 hover:text-red-400"><HiOutlineTrash size={15} /></button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit block' : 'New time block'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Algorithms lecture, Morning run…" />
          <Select label="Day" value={form.day_of_week} onChange={(e) => setForm({ ...form, day_of_week: e.target.value })}>
            {DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
          </Select>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start time" type="time" required value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} />
            <Input label="End time" type="time" required value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} />
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-mist-500">Color</p>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button type="button" key={c} onClick={() => setForm({ ...form, color: c })}
                  className={`h-7 w-7 rounded-full transition-transform hover:scale-110 ${form.color === c ? 'ring-2 ring-white ring-offset-1 ring-offset-ink-950' : ''}`}
                  style={{ background: c }} />
              ))}
            </div>
          </div>
          <Select label="Recurrence" value={form.recurrence} onChange={(e) => setForm({ ...form, recurrence: e.target.value })}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="once">Once</option>
          </Select>
          <Button type="submit" className="w-full">{editing ? 'Save changes' : 'Add block'}</Button>
        </form>
      </Modal>
    </div>
  )
}
