export function Input({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-medium text-mist-500">{label}</span>}
      <input
        className={`w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-mist-100 placeholder:text-mist-700 outline-none transition-colors focus:border-violet-400/50 focus:bg-white/[0.05] ${className}`}
        {...props}
      />
    </label>
  )
}

export function TextArea({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-medium text-mist-500">{label}</span>}
      <textarea
        className={`w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-mist-100 placeholder:text-mist-700 outline-none transition-colors focus:border-violet-400/50 focus:bg-white/[0.05] ${className}`}
        {...props}
      />
    </label>
  )
}

export function Select({ label, children, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-medium text-mist-500">{label}</span>}
      <select
        className={`w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-mist-100 outline-none transition-colors focus:border-violet-400/50 focus:bg-white/[0.05] ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  )
}
