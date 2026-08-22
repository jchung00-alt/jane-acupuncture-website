# Jane Acupuncture Website

## Project Overview

Static single-page website for Jane Acupuncture, a traditional Korean medicine practice in Garden Grove, CA. No build system, no dependencies — plain HTML, CSS, and JavaScript.

## Stack

- **HTML5** — `index.html` (single page, ~580 lines)
- **CSS3** — `styles.css` (design tokens, BEM-style classes, fluid typography, responsive breakpoints)
- **Vanilla JS** — `script.js` (mobile nav, scroll effects, IntersectionObserver animations)
- **Fonts** — Google Fonts: Cormorant Garamond 500 + italic 400 (serif headings), Inter variable 400..600 (sans body). Only these weights are requested; every serif rule uses 500 or italic 400, so adding a weight to CSS means adding it to the font URL too.
- **Images** — all local WebP with srcset; no external image CDN. Photos are Unsplash free-license (commercial use permitted, no attribution required)

## Open Work

See `NEXT-STEPS.md` for outstanding items from the 2026-08-19 audit — what is
blocked on the clinic's input, what is ready to build, and constraints to know
before editing (font weights, scroll handling, contrast tokens, deploy caching).

## File Structure

```
index.html              Main page
styles.css              All styles
script.js               All interactivity
.gitignore              Ignores .wrangler/ local cache and .DS_Store
NEXT-STEPS.md           Open items from the site audit
jane-portrait.webp      Jane Chung portrait, 1200x1500 (28KB)
jane-portrait-800.webp  Same portrait at 800w for srcset (16KB)
robots.txt                    Crawler directives + sitemap pointer
sitemap.xml                   Single-URL sitemap
og-image.jpg                  1200x630 social preview (64KB)
hero-acupuncture-600.webp     Hero photo, 600w (8.7KB)
hero-acupuncture-1000.webp    Same at 1000w (17KB)
hero-acupuncture-1500.webp    Same at 1500w (29KB)
about-korean-herbs-500.webp   About-section ingredients photo, 500w (65KB)
about-korean-herbs-800.webp   Same at 800w (139KB)
about-korean-herbs-1100.webp  Same at 1100w (220KB)
```

## Key Details

- **Phone**: (714) 293-5544
- **Address**: 13341 Garden Grove Boulevard Suite B, Garden Grove, CA 92843
- **Hours**: Mon, Tue, Thu, Fri 9AM–5PM; Wed, Sat, Sun Closed
- **Practitioner**: Jane Chung, MSOM, L.Ac

## Color System

Gold and ivory. The important constraint: **light gold cannot carry text.**
At its darkest usable value it reaches only 2.7:1 on ivory, so it decorates
and never informs. Three tiers:

| Token | Value | Role |
|---|---|---|
| `--color-gold` / `--color-secondary` | `#C4A77D` | Ornament, button fills, gradients |
| `--color-gold-mid` / `--color-star` | `#A8843F` | Logo mark, stars — 3.34:1, clears the graphics floor |
| `--color-primary` | `#87692B` | Anything read: text, icons, borders — 4.93:1 ivory / 4.61:1 sand |
| `--color-primary-dark` | `#6F5624` | Hover, focus rings — 6.64:1 |

Text on a gold fill uses `--color-ink` (`#2A2620`, 6.57:1), never white.
White is only legible on `--color-primary` or darker.

The deep tiers read bronze rather than gold — that is the cost of 4.5:1. If a
gold looks too olive, the fix is to move it to an ornamental role, not to
lighten it in place.

## CSS Architecture

Design tokens are CSS custom properties in `:root` (colors, typography, spacing, shadows, transitions). Naming follows BEM: `.block__element--modifier`. Fluid typography uses `clamp()`. Breakpoints: 1024px, 900px, 700px, 600px.

## JS Behavior

- Mobile nav slides in from right, closes on link click / Escape / outside click
- `IntersectionObserver` drives scroll-reveal (`.reveal` → `.reveal.visible`) and staggered service cards
- Active nav link tracking via scroll position
- Parallax on `.hero__bg` (respects `prefers-reduced-motion`)
- Image fade-in via `.loaded` class (applied on `load` or if already `complete`)

## What to Avoid

- Do not add a build step or npm dependencies — keep it zero-dependency
- Do not inject styles via JS — put all CSS in `styles.css`
- Keep scroll work inside the single `requestAnimationFrame` pass in `script.js`; do not add new scroll listeners or read layout (`offsetTop`, `offsetHeight`) during scroll
- Decorative SVGs need `aria-hidden="true" focusable="false"`; repeated icons go in the `<symbol>` sprite at the top of `<body>`
- When bulk-editing tags, exclude the favicon: its `href` holds an inline SVG, so a regex over `<svg ...>` will inject double-quoted attributes inside a double-quoted attribute and silently truncate it
- The Google Maps embed uses an address query (`maps?q=...&output=embed`) so Google geocodes it; do not paste hand-edited `pb=` coordinate strings
- Do not add large binary assets. Encode new photos as WebP (`cwebp -q 60`–`80`, lower for texture-heavy images), size them to their display width at 2x, and serve them via `srcset`
- Do not commit `.wrangler/` — it is local Cloudflare cache containing account metadata

## Deployment

Static files — can be deployed to any static host (Netlify, GitHub Pages, Vercel, etc.). No server-side logic required.
