import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineDownload, HiOutlineTrash } from 'react-icons/hi'
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import { Input } from '../components/ui/FormControls.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/client.js'

export default function Settings() {
  const { user, setUser, logout } = useAuth()
  const navigate = useNavigate()

  const [profileForm, setProfileForm] = useState({ name: user?.name || '' })
  const [profileMsg, setProfileMsg] = useState('')

  const [pwForm, setPwForm] = useState({ old_password: '', new_password: '', confirm: '' })
  const [pwMsg, setPwMsg] = useState('')
  const [pwError, setPwError] = useState('')

  const [deleteConfirm, setDeleteConfirm] = useState('')

  async function saveProfile(e) {
    e.preventDefault()
    const res = await api.put('/api/users/me', { name: profileForm.name })
    setUser(res.data)
    localStorage.setItem('growthos_user', JSON.stringify(res.data))
    setProfileMsg('Profile saved.')
    setTimeout(() => setProfileMsg(''), 3000)
  }

  async function changePassword(e) {
    e.preventDefault()
    setPwError('')
    if (pwForm.new_password !== pwForm.confirm) { setPwError("Passwords don't match."); return }
    try {
      await api.post('/api/users/me/change-password', { old_password: pwForm.old_password, new_password: pwForm.new_password })
      setPwMsg('Password updated.')
      setPwForm({ old_password: '', new_password: '', confirm: '' })
      setTimeout(() => setPwMsg(''), 3000)
    } catch (err) {
      setPwError(err.response?.data?.detail || 'Failed to update password.')
    }
  }

  async function exportData() {
    const res = await api.get('/api/users/me/export')
    const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `growthos-export-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function deleteAccount() {
    if (deleteConfirm !== 'DELETE') return
    await api.delete('/api/users/me')
    logout()
    navigate('/')
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Profile, security, and data." />

      <div className="space-y-5 max-w-xl">
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <HiOutlineUser className="text-violet-400" />
            <h2 className="text-sm font-semibold text-mist-100">Profile</h2>
          </div>
          <form onSubmit={saveProfile} className="space-y-4">
            <Input label="Display name" value={profileForm.name} onChange={(e) => setProfileForm({ name: e.target.value })} />
            <Input label="Email" value={user?.email || ''} disabled className="opacity-50" />
            {profileMsg && <p className="text-xs text-emerald-400">{profileMsg}</p>}
            <Button type="submit">Save profile</Button>
          </form>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-2">
            <HiOutlineLockClosed className="text-violet-400" />
            <h2 className="text-sm font-semibold text-mist-100">Change password</h2>
          </div>
          <form onSubmit={changePassword} className="space-y-4">
            <Input label="Current password" type="password" value={pwForm.old_password} onChange={(e) => setPwForm({ ...pwForm, old_password: e.target.value })} />
            <Input label="New password" type="password" value={pwForm.new_password} onChange={(e) => setPwForm({ ...pwForm, new_password: e.target.value })} />
            <Input label="Confirm new password" type="password" value={pwForm.confirm} onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })} />
            {pwError && <p className="text-xs text-red-400">{pwError}</p>}
            {pwMsg && <p className="text-xs text-emerald-400">{pwMsg}</p>}
            <Button type="submit">Update password</Button>
          </form>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-2">
            <HiOutlineDownload className="text-violet-400" />
            <h2 className="text-sm font-semibold text-mist-100">Export data</h2>
          </div>
          <p className="mb-4 text-sm text-mist-500">Download everything in your account as a single JSON file.</p>
          <Button variant="secondary" onClick={exportData}>Download my data</Button>
        </Card>

        <Card className="border border-red-500/20">
          <div className="mb-4 flex items-center gap-2">
            <HiOutlineTrash className="text-red-400" />
            <h2 className="text-sm font-semibold text-red-400">Delete account</h2>
          </div>
          <p className="mb-4 text-sm text-mist-500">This permanently deletes your account and all data. Type <span className="font-mono text-mist-100">DELETE</span> to confirm.</p>
          <div className="flex gap-2">
            <Input
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="Type DELETE"
              className="flex-1"
            />
            <Button variant="danger" onClick={deleteAccount} disabled={deleteConfirm !== 'DELETE'}>
              Delete
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
