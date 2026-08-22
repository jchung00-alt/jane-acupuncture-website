# Open Items

Follow-ups from the site audit of 2026-08-19. Everything not listed here was
fixed and deployed in commit `690a51c`.

Full audit report (reflects the pre-fix state):
https://claude.ai/code/artifact/3c185117-5cd4-4d88-8c7f-91764f2702ac

---

## Blocked — need Jane's input

These cannot be written without facts only the clinic has. Nothing is
half-built; each is untouched.

Items 1 and 2 are resolved; kept here so the numbering in older notes holds.

### ~~1. Insurance information~~ — DONE 2026-08-21
Added as an `#insurance` block inside the Services section, after "Conditions
We Treat". Also added `paymentAccepted` to the structured data and an
Insurance link to the footer.

### ~~2. Move billing tags out of the conditions list~~ — DONE 2026-08-21
`Worker's Comp` and `Personal Injury` moved from "Conditions We Treat" into
the insurance block, where they answer a question rather than pose one.

### 3. "Your first visit" content
Nothing says how long a session runs, what it costs, how many visits a
course takes, or whether needles hurt. One of the site's own testimonials
opens with "I was a little nervous" — the page has evidence this question
goes unanswered. Also earns long-tail search traffic the current copy can't.

Need: session length, price, what to wear, what the needles feel like.

### 4. aggregateRating in structured data
The three real Google reviews are now marked up as `review` entries.
`aggregateRating` was deliberately left out because it needs the **real**
Google review count and average — inventing those risks a Google manual
penalty. Pull the true numbers from the Google Business Profile, then add.

---

## Ready to build — just needs a decision

### 5. Appointment request form  (recommended)
Booking is phone-only. The CTAs now say "Call to Book" so they are honest,
but the constraint remains: the clinic answers 9–5 on four weekdays, which
is exactly when a working patient cannot make a private call. Someone
deciding at 9pm Sunday has no way to act.

A short form — name, phone, preferred day, one free-text line — emailed to
the clinic would capture that intent. Booking still happens by phone; the
lead just stops evaporating.

Note: git history shows a Formsubmit.co form existed and was removed. If
spam was the reason, a honeypot field usually settles it. Worth asking
before rebuilding.

### 6. Breakpoint consolidation
The project documents four breakpoints (1024, 900, 700, 600). The stylesheet
actually has 16 media queries across ten widths — the strays being 580, 500,
460, 450, 400 and 300, which are one-off component patches rather than
layout tiers.

Deliberately not done: purely visual, so it needs someone watching the page
at each width while it changes. This is why a tweak in one section can
surprise you in another.

---

## Optional, low value

- **About photo weight** — 142KB at 800w, 220KB at 1100w; the heaviest asset
  by 6x. Inherent to the subject (loose grain and burlap are worst-case for
  WebP). Already lazy-loaded below the fold with a 65KB mobile variant.
  q50 or an AVIF variant behind `<picture>` would help if you want it back.
- **Map click-to-load** — the Google embed sets Google cookies for every
  visitor whether or not they look at it. A static image that swaps to the
  live embed on click removes that.
- **Korean-language version** — the clinic practises Korean medicine in
  Garden Grove, inside one of the largest Korean-American communities in the
  country, and the site is English-only. Raised as an observation, not a
  recommendation — depends on the actual patient mix.
- **Purge `janeappherotitle.png` from git history** — the file is deleted but
  still in history as the largest blob (2MB), so `.git` is ~11MB. Needs a
  second `git filter-repo` pass plus a force-push, which breaks every
  existing clone. Not urgent.

---

## Things to know before editing

- **Fonts are pinned to exactly what's used.** The font URL requests only
  Cormorant Garamond 500 + italic 400 and Inter variable 400..600. Every
  serif rule uses weight 500 or italic 400 — verified. **Adding a font weight
  in CSS means adding it to the font URL too**, or the browser will
  synthesize it. This trimming took the font payload from 323KB to 93KB.
- **Scroll work belongs in the single `requestAnimationFrame` pass** in
  `script.js`. Do not add scroll listeners or read layout (`offsetTop`,
  `offsetHeight`) during scroll.
- **Contrast tokens.** `--color-primary` (#5B7B6D) fails AA for small text at
  4.40:1. Use `--color-primary-dark` (#4A6A5C, 5.65:1) for text. Stars use
  `--color-star` (#A8843F) to clear 3:1 for graphics.
- **Map embed** uses an address query (`maps?q=...&output=embed`) so Google
  geocodes it. Do not paste hand-edited `pb=` coordinate strings — the
  previous one was centred 3.7km from the clinic.
- **Deploy and caching.** Push to `main` auto-deploys to Cloudflare Pages;
  it takes a couple of minutes and static files can land before `index.html`
  switches over. HTML is `max-age=0` so page changes show immediately, but
  images and CSS carry a 4-hour cache under unchanged filenames — hard-reload
  (Cmd+Shift+R) after asset edits or you will think the deploy failed.
- **Verification gap.** No browser was available during the audit or the
  fixes. Everything was verified by syntax checks, contrast math, HTML
  well-formedness parsing and live asset requests — never by looking at the
  rendered page. Worth an eyeball pass at desktop, tablet and phone widths,
  especially the map pin and the new cupping icon.
