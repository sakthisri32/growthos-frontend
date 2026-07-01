import { Link } from 'react-router-dom'

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-aurora bg-dot-grid px-6 py-12">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2 font-display text-lg font-semibold text-mist-100">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-violet-400 to-skyline text-sm font-bold text-ink-950">
            G
          </span>
          GrowthOS
        </Link>

        <div className="glass rounded-2xl p-7">
          <h1 className="font-display text-xl font-semibold text-mist-100">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-mist-500">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>

        {footer && <p className="mt-6 text-center text-sm text-mist-500">{footer}</p>}
      </div>
    </div>
  )
}
