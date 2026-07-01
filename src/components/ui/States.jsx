export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="glass flex flex-col items-center justify-center rounded-2xl px-6 py-16 text-center">
      {Icon && <Icon className="mb-4 h-10 w-10 text-mist-700" />}
      <p className="font-display text-base font-semibold text-mist-300">{title}</p>
      {description && <p className="mt-1.5 max-w-sm text-sm text-mist-500">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-lg bg-white/[0.06] ${className}`} />
}

export function CardSkeletonGrid({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass rounded-2xl p-5">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="mt-3 h-3 w-full" />
          <Skeleton className="mt-2 h-3 w-5/6" />
        </div>
      ))}
    </div>
  )
}
