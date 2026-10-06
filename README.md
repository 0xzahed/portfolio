# Zahed — Portfolio

A cinematic portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, Motion and Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Editing content

Everything you'd want to change lives in **`src/data/portfolio.ts`** — name, email, socials, SEO, projects, skills, experience, the "currently building" block, philosophy and contact copy.

Search that file for `REPLACE` to find every placeholder. Before you deploy, set at least:

| Field | Why |
| --- | --- |
| `person.email` | Contact button, footer, copy-to-clipboard |
| `socials[]` | GitHub, LinkedIn and X links |
| `site.url` | Canonical URLs, sitemap, Open Graph |
| `experience[]` | Placeholder history — replace with your real roles |
| `github.username` | Turns on live contributions, repos and languages |

### Projects

Each project in `projects[]` gets a homepage section and its own case-study page at `/work/<slug>`. Fields:

- `visual` picks one of the code-built visuals: `console`, `stream`, `feed`, `commerce`, `vision`.
- `image` (optional) replaces the visual with a real screenshot. Put the file in `public/projects/` and set `{ src, alt, width, height }`.
- `liveUrl` / `githubUrl` show links only when set.
- `caseStudy` fills the case-study page: problem, approach, engineering highlights, outcome.

To add a new visual type, create a component in `src/components/projects/visuals/`, add its key to `ProjectVisualKind` in `src/lib/types.ts`, and register it in `visuals/index.tsx`.

### GitHub activity

With `github.username` set, the activity section fetches your public repos, top languages and last-year contributions at build time and refreshes daily (ISR). Nothing is invented: if no username is set, or GitHub is unreachable, the grid renders empty and the stats show a dash. Add a `GITHUB_TOKEN` environment variable to raise the API rate limit.

## How it's built

```
src/
  app/                 layout, home, /work/[slug], sitemap, robots, OG image, icon
  components/
    layout/            Nav (with fullscreen mobile menu), Footer
    sections/          Hero, HeroField (WebGL), About, SelectedWork, Engineering,
                       Experience, Activity, CurrentlyBuilding, Philosophy, Contact
    projects/          ProjectSection + code-built visuals
    providers/         Intro state, Lenis smooth scroll, LazyMotion
    ui/                Preloader, Cursor, Magnetic, Reveal, Grain, ScrollProgress…
  data/portfolio.ts    all content
  fonts/               self-hosted Archivo (width + weight axes), Geist, Geist Mono
  hooks/  lib/
```

**Type.** Archivo's variable width axis is the signature: headlines stretch from condensed to wide during the opening, project titles widen on hover, and the philosophy section's last word widens as it fades. The `.display` class reads `--wdth`; set `[--wdth:80]` (62–125) on any display element.

**Motion.** One opening sequence (counter → curtain → headline reveal), then scroll-driven moments: the About statement brightens word by word, project visuals unmask, Piku's phones drift sideways, the timeline brightens the active year, and the philosophy section is pinned.

**Performance decisions.**
- The hero shader is raw WebGL (no Three.js), renders below native resolution at 30fps, pauses off-screen, starts after hydration, and falls back to a static gradient on software-rendered GPUs.
- Project visuals are separate chunks and mount only as they near the viewport.
- Each homepage section is its own Suspense boundary, so React hydrates in slices.
- Motion runs through `LazyMotion` with the `domAnimation` feature set.
- Fonts are self-hosted with `next/font/local` — builds don't depend on Google Fonts.
- Phones skip the preloader counter and the width morph, and scroll natively (Lenis only drives mouse/trackpad scrolling).

**Accessibility.** Skip link, semantic landmarks, keyboard-operable tabs (arrow keys, Home/End), visible focus, ARIA on the mobile menu, decorative visuals hidden from assistive tech, and `prefers-reduced-motion` respected throughout (no preloader, no shader, no scroll-driven motion, native scrolling).

## Deploy

Works on Vercel out of the box. Set `site.url` first so canonical URLs and the sitemap point at your domain.
