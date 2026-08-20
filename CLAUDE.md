# Jane Acupuncture Website

## Project Overview

Static single-page website for Jane Acupuncture, a traditional Korean medicine practice in Garden Grove, CA. No build system, no dependencies — plain HTML, CSS, and JavaScript.

## Stack

- **HTML5** — `index.html` (single page, ~580 lines)
- **CSS3** — `styles.css` (design tokens, BEM-style classes, fluid typography, responsive breakpoints)
- **Vanilla JS** — `script.js` (mobile nav, scroll effects, IntersectionObserver animations)
- **Fonts** — Google Fonts: Cormorant Garamond (serif headings), Inter (sans body)
- **Images** — all local WebP with srcset; no external image CDN. Photos are Unsplash free-license (commercial use permitted, no attribution required)

## File Structure

```
index.html              Main page
styles.css              All styles
script.js               All interactivity
.gitignore              Ignores .wrangler/ local cache and .DS_Store
jane-portrait.webp      Jane Chung portrait, 1200x1500 (28KB)
jane-portrait-800.webp  Same portrait at 800w for srcset (16KB)
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
- The Google Maps embed uses approximate coordinates; update with real embed URL if needed
- Do not add large binary assets. Encode new photos as WebP (`cwebp -q 60`–`80`, lower for texture-heavy images), size them to their display width at 2x, and serve them via `srcset`
- Do not commit `.wrangler/` — it is local Cloudflare cache containing account metadata

## Deployment

Static files — can be deployed to any static host (Netlify, GitHub Pages, Vercel, etc.). No server-side logic required.
