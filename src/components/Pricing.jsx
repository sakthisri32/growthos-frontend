import { HiCheck } from 'react-icons/hi'

const included = [
  'All 9 modules, unlimited entries',
  'AI coach — daily and weekly plans',
  'Progress analytics & heat maps',
  'CSV and PDF export',
  'Email + Google login'
]

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-violet-400">pricing</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-mist-100">
          Free, because tracking your growth shouldn't have a paywall.
        </h2>
      </div>

      <div className="glass relative mx-auto mt-12 max-w-md rounded-2xl p-8">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-500 px-3 py-1 text-[11px] font-semibold text-white">
          Currently the only plan
        </div>
        <p className="font-display text-4xl font-semibold text-mist-100">
          ₹0 <span className="text-base font-normal text-mist-500">/ forever</span>
        </p>
        <ul className="mt-6 space-y-3">
          {included.map((i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-mist-300">
              <HiCheck className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
              {i}
            </li>
          ))}
        </ul>
        
          href="/register"
          className="mt-8 block w-full rounded-lg bg-violet-500 py-3 text-center text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          Create your account
        </a>
      </div>
    </section>
  )
}
