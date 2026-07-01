const quotes = [
  {
    text: 'I stopped checking five apps every morning. GrowthOS is the one screen that tells me if yesterday counted.',
    name: 'Aditi R.',
    role: 'CS undergrad, building an ML portfolio'
  },
  {
    text: 'The AI coach turning "3 free hours" into an actual ordered plan is the only planning tool I have not abandoned.',
    name: 'Marcus T.',
    role: 'Indie developer'
  },
  {
    text: 'My startup idea board and research notes finally live next to my habit streaks. Turns out that context matters.',
    name: 'Priya N.',
    role: 'First-time founder'
  }
]

export default function Testimonials() {
  return (
    <section id="stories" className="border-y border-white/[0.06] bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-violet-400">in the field</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-mist-100 sm:text-4xl">
          Built for people already in motion.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.name} className="glass flex h-full flex-col justify-between rounded-2xl p-6">
              <blockquote className="text-sm leading-relaxed text-mist-300">“{q.text}”</blockquote>
              <figcaption className="mt-6 border-t border-white/[0.06] pt-4">
                <p className="text-sm font-semibold text-mist-100">{q.name}</p>
                <p className="text-xs text-mist-500">{q.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
