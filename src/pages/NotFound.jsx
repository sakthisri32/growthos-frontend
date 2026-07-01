import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-aurora bg-dot-grid px-6 text-center">
      <p className="font-mono text-6xl font-bold text-violet-500/40">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-mist-100">Page not found</h1>
      <p className="mt-2 max-w-xs text-sm text-mist-500">
        The page you're looking for doesn't exist, or you don't have access to it.
      </p>
      <Link to="/dashboard" className="mt-7 rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-600">
        Back to dashboard
      </Link>
    </div>
  )
}
