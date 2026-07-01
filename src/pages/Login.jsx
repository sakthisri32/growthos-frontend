import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout.jsx'
import { Input } from '../components/ui/FormControls.jsx'
import Button from '../components/ui/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { FcGoogle } from 'react-icons/fc'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate(location.state?.from || '/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not log in. Check your details and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to pick up where your streak left off."
      footer={
        <>
          New to GrowthOS?{' '}
          <Link to="/register" className="font-medium text-violet-400 hover:text-violet-300">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="••••••••"
        />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-mist-500 hover:text-mist-100">
            Forgot password?
          </Link>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Logging in…' : 'Log in'}
        </Button>

        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-white/[0.08]" />
          <span className="text-xs text-mist-700">or</span>
          <div className="h-px flex-1 bg-white/[0.08]" />
        </div>

        <Button type="button" variant="secondary" className="w-full">
          <FcGoogle size={18} /> Continue with Google
        </Button>
      </form>
    </AuthLayout>
  )
}
