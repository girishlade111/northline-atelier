# Northline Atelier

A pixel-faithful marketing site for an architecture & interiors studio.
**Pure Astro** — no UI frameworks, no Tailwind, no animation libraries.
Static output (SSG), bilingual **English + French**.

**Live:** https://northline-atelier.pages.dev

## Features

- **Bilingual (EN/FR)** — Astro i18n routing (`/` and `/fr/`); every visible
  string comes from typed dictionaries in `src/i18n/ui.ts`, no hardcoded
  copy in components
- **Content-driven projects** — case studies in `src/content/projects/*.md`
  via Astro's content layer (schema in `src/content.config.ts`); only
  `featured: true` entries, sorted by `order`, render on the home page
- **Design system** — plain CSS with design tokens
  (`src/styles/tokens.css`): sharp corners, 1px hairlines, editorial
  serif/sans pairing (Cormorant Garamond + Poppins, self-hosted via
  Fontsource, critical weights preloaded)
- **Optimized images** — `astro:assets` + Sharp; AVIF/WebP/JPEG variants at
  build time (`<Picture>`, eager only for the hero)
- **Zero-JS core** — all interactivity is small vanilla `<script>` blocks
  (menu/search dialogs, reveal observer, stat count-up, form); total
  shipped JS stays well under 10 KB gzipped, pages fully readable with JS
  disabled
- **SEO built in** — `@astrojs/sitemap` (i18n-aware), dynamic `robots.txt`
  generated at build time from the `SITE` env var, OG image, canonical URLs
- **Contact form** — POSTs JSON to `PUBLIC_FORM_ENDPOINT`
  (Web3Forms / Formspree-compatible); falls back to a pre-filled `mailto:`
  when unconfigured; honeypot field discards bot submissions
- **Styled 404** in both languages

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Astro 7 (SSG, `.astro` components only) |
| Language | Strict TypeScript (`astro check` clean) |
| Styling | Plain CSS, custom properties, no libraries |
| Fonts | Fontsource, self-hosted (no Google Fonts CDN) |
| Images | `astro:assets` + Sharp |
| i18n | Astro i18n routing + typed dictionaries |
| SEO | `@astrojs/sitemap`, dynamic `robots.txt` |

Node `>= 22.12.0` required (see `engines` in `package.json`).

## Quick start

```bash
npm install
npm run dev        # dev server → http://localhost:4321
npm run build      # placeholders → static build in dist/
npm run preview    # serve the production build locally
npm run check      # astro check — 0 errors / 0 warnings expected
```

## Project structure

```
src/
  assets/images/      # source photography (optimized at build time)
  components/
    decor/            # SVG decorations (floor plan, topo lines)
    layout/           # BaseLayout, Header, Footer, Logo, MobileMenu,
                      #   SearchDialog, LanguageSwitcher
    sections/         # Hero, FeaturedProjects, Studio, Stats,
                      #   Services, Contact
    ui/               # Button, Eyebrow, Icon, ProjectCard, Reveal, ArrowLink
  config/site.ts      # ★ rebrand the whole site from this one file
  content/projects/   # project case studies (Markdown)
  i18n/               # en/fr dictionaries + helpers
  pages/
    index.astro       # English home
    fr/index.astro    # French home
    404.astro
    robots.txt.ts     # dynamic — follows SITE env var
  styles/             # tokens.css (design tokens), global.css
code-viewer.plugin.mjs  # dev-only read-only source viewer (see below)
scripts/generate-placeholders.mjs
```

## Rebrand in one file

Everything brand-related lives in `src/config/site.ts`: studio name,
tagline, address, email, phone, socials, nav, site URL. Edit it and the
whole site updates. Visible copy lives in `src/i18n/ui.ts`
(`en` + `fr` dictionaries).

## Swap in real photos

`npm run build` never fails because a photo is missing: the `prebuild`
hook runs `npm run placeholders` (`scripts/generate-placeholders.mjs`,
uses Sharp), which creates warm-neutral gradient stand-ins for any
missing file and **never overwrites existing files**. To go live, drop
real photos into `src/assets/images/` with the exact same names:

| file | size |
|---|---|
| `hero-courtyard-house.jpg` | 2400×2000 |
| `project-desert-pavilion.jpg` | 1600×1100 |
| `project-ridge-house.jpg` | 1600×1100 |
| `project-harborview-loft.jpg` | 1600×1100 |
| `studio-interior.jpg` | 1800×1080 |
| `og-image.jpg` | 1200×630 |

## Contact form endpoint

The inquiry form POSTs JSON to `PUBLIC_FORM_ENDPOINT`
(Web3Forms / Formspree-compatible). Set it in `.env` (see `.env.example`)
or as a build env var:

```bash
PUBLIC_FORM_ENDPOINT=https://api.web3forms.com/submit npm run build
```

If the variable is missing, the form falls back to opening the visitor's
email app with a pre-filled `mailto:` message. A honeypot field silently
discards bot submissions.

## Projects content

`src/content/projects/*.md` — schema in `src/content.config.ts`:

```yaml
title: Desert Pavilion
category: residential        # residential | hospitality | commercial
location: { en: "Scottsdale, Arizona", fr: "Scottsdale, Arizona" }
image: ../../assets/images/project-desert-pavilion.jpg
order: 1
featured: true
```

## Environment variables

Copy `.env.example` to `.env`. Never commit real secrets.

| variable | purpose |
|---|---|
| `SITE` | Canonical site URL — canonical tags, sitemap, `robots.txt`, OG tags. Defaults to the placeholder in `src/config/site.ts`. |
| `PUBLIC_FORM_ENDPOINT` | JSON endpoint for the contact form (Web3Forms / Formspree-compatible). Empty = `mailto:` fallback. |

## Dev source viewer

During `npm run dev`, a read-only source viewer is available at
[`/__src`](http://localhost:4321/__src) — file tree, code panel, line
numbers, basic syntax highlighting, zero dependencies (lovable.dev-style
code reading). Implemented by `code-viewer.plugin.mjs`, a Vite plugin
registered in `astro.config.mjs`.

It is **dev-only by construction**: `configureServer` never runs under
`astro build`, so `/__src` cannot leak into `dist/` (verified after every
build). Intentionally read-only — no edit/write mode.

## Deploy

Static output — deploy `dist/` anywhere.

- **Vercel / Netlify / Cloudflare Pages:** build command `npm run build`,
  publish directory `dist`.
- **Site URL:** defaults to `https://northlineatelier.example`. Override at
  build time with the `SITE` env var
  (`SITE=https://northlineatelier.com npm run build`).

## Quality bars

- `astro check`: zero errors, zero warnings
- Lighthouse (mobile): Performance ≥ 95, Accessibility ≥ 95,
  Best Practices ≥ 95, SEO 100
- Responsive QA at 1440 / 1024 / 768 / 390 / 320 px
- Content readable with JavaScript disabled

## Out of scope

Dedicated pages are not built yet (hrefs kept real, 404 is styled
in-theme): `/projects`, `/projects/[slug]`, `/studio`, `/services/*`,
`/journal`, `/privacy`, `/terms`.

## License

All rights reserved — client project. The dev source-viewer plugin
(`code-viewer.plugin.mjs`) is a standalone reusable snippet: copy it
into any Astro project and register it in `astro.config.mjs` to get the
same `/__src` viewer.
