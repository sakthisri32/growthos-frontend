# GrowthOS — Landing Page

Phase 1 deliverable: the marketing/landing page for GrowthOS, built with React + Vite + Tailwind + Framer Motion.

## Run it

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Build for production

```bash
npm run build
```

Outputs to `dist/`, ready to deploy on Vercel (just point Vercel at this folder, framework preset: Vite).

## What's here

- `index.html` — entry, loads Inter / Space Grotesk / JetBrains Mono
- `src/App.jsx` — assembles the page
- `src/components/`
  - `Navbar.jsx` — sticky glass nav, mobile menu
  - `Hero.jsx` — headline + CTA + the LedgerCard
  - `LedgerCard.jsx` — the signature element: an animated "live dashboard" mockup (count-up streak/hours/xp, animated skill bars, AI coach hint)
  - `LogStrip.jsx` — scrolling marquee of all 9 modules
  - `Features.jsx` — 9-module feature grid with scroll-reveal
  - `Testimonials.jsx` — social proof
  - `Pricing.jsx` — single free-tier card (per spec)
  - `CTA.jsx` — closing call to action
  - `Footer.jsx` — sitemap + legal line
- `tailwind.config.js` — design tokens (colors, fonts, gradients, glass shadow)

## Design notes

- Background: near-black `#07060B` with a violet/blue aurora glow + faint dot grid (an IDE/dashboard cue, not a generic blob).
- Display type: Space Grotesk (technical, geometric) paired with Inter for body and JetBrains Mono for stats/data — reflects the dev/builder audience.
- Signature element: the `LedgerCard` in the hero is a live, animated readout (streak, hours, XP, skill bars, AI coach line) — it embodies "track growth" literally rather than illustrating it abstractly.
- Respects `prefers-reduced-motion`; keyboard focus rings are visible (violet outline).

## Next phases (not in this delivery)

Auth pages, dashboard shell + sidebar, and the 9 feature modules themselves, plus the FastAPI backend and Postgres schema — happy to build any of these next.
