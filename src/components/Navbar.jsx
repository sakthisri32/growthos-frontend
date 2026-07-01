import { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'

const links = [
  { label: 'Product', href: '#features' },
  { label: 'Log', href: '#log' },
  { label: 'Stories', href: '#stories' },
  { label: 'Pricing', href: '#pricing' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-violet-400 to-skyline text-sm font-bold text-ink-950">
            G
          </span>
          GrowthOS
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-mist-500 transition-colors hover:text-mist-100"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#login" className="text-sm text-mist-300 transition-colors hover:text-mist-100">
            Log in
          </a>
          <a
            href="#get-started"
            className="rounded-lg bg-mist-100 px-4 py-2 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.03]"
          >
            Get started
          </a>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="text-mist-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-mist-300" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#login" className="text-sm text-mist-300">Log in</a>
            <a
              href="#get-started"
              className="w-fit rounded-lg bg-mist-100 px-4 py-2 text-sm font-semibold text-ink-950"
            >
              Get started
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
