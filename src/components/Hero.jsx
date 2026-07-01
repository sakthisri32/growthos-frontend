import { motion } from 'framer-motion'
import LedgerCard from './LedgerCard.jsx'

export default function Hero() {
  return (
    <section id="top" className="relative bg-aurora bg-dot-grid">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 pt-16 md:grid-cols-2 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-mist-500">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            now tracking 12,000+ growth logs
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-mist-100 sm:text-5xl">
            Build skills.
            <br />
            <span className="text-gradient">Track growth.</span>
            <br />
            Achieve greatness.
          </h1>

          <p className="mt-5 max-w-md text-base text-mist-500">
            GrowthOS is the operating system for people who build themselves —
            skills, habits, projects, and research, compounding in one place
            instead of scattered across twelve apps.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#get-started"
              className="rounded-lg bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(124,58,237,0.4),0_8px_24px_rgba(124,58,237,0.35)] transition-transform hover:scale-[1.03]"
            >
              Get started — it's free
            </a>
            <a
              href="#login"
              className="rounded-lg border border-white/[0.1] px-6 py-3 text-sm font-semibold text-mist-100 transition-colors hover:bg-white/[0.04]"
            >
              Log in
            </a>
          </div>

          <p className="mt-4 text-xs text-mist-700">No credit card. Cancel anytime you stop growing.</p>
        </motion.div>

        <div className="flex justify-center md:justify-end">
          <LedgerCard />
        </div>
      </div>
    </section>
  )
}
