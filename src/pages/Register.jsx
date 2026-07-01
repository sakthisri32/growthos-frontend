import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout.jsx'
import { Input } from '../components/ui/FormControls.jsx'
import Button from '../components/ui/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { FcGoogle } from 'react-icons/fc'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not create your account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Free forever. Your first log entry takes 90 seconds."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-violet-400 hover:text-violet-300">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Ada Lovelace"
        />
        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="At least 8 characters"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating account…' : 'Create account'}
        </Button>

        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-white/[0.08]" />
          <span className="text-xs text-mist-700">or</span>
          <div className="h-px flex-1 bg-white/[0.08]" />
        </div>

        <Button type="button" variant="secondary" className="w-full">
          <FcGoogle size={18} /> Continue with Google
        </Button>

        <p className="text-center text-[11px] text-mist-700">
          By creating an account you agree to GrowthOS's Terms and Privacy Policy.
        </p>
      </form>
    </AuthLayout>
  )
}
