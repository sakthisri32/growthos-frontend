export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-mist-100">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-mist-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
