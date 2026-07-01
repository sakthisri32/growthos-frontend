const columns = [
  { title: 'Product', links: ['Features', 'Pricing', 'AI Coach', 'Changelog'] },
  { title: 'Resources', links: ['Docs', 'Guides', 'Roadmap', 'Status'] },
  { title: 'Company', links: ['About', 'Blog', 'Contact'] }
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold text-mist-100">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-violet-400 to-skyline text-sm font-bold text-ink-950">
              G
            </span>
            GrowthOS
          </a>
          <p className="mt-3 max-w-xs text-sm text-mist-500">
            The operating system for people who build themselves.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-widest text-mist-700">{col.title}</p>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-mist-500 transition-colors hover:text-mist-100">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-mist-700 sm:flex-row">
        <p>© {new Date().getFullYear()} GrowthOS. All rights reserved.</p>
        <p>Built for students, developers, founders, and researchers.</p>
      </div>
    </footer>
  )
}
