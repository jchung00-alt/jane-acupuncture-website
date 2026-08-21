# Logo assets

Brand mark for Jane Acupuncture. Nothing here is wired into the site yet —
`index.html` still uses its own inline SVG leaf mark in the header and footer.

## Files

| File | What it is |
|---|---|
| `dian-logo.png` | Full lockup as supplied: mark + "Jane Acupuncture" + tagline |
| `dian-logo-connected.png` | Same lockup, connected-circle variant |
| `dian-mark.png` | Mark only, no wordmark. Tight-trimmed, transparent |
| `dian-mark-connected.png` | Mark only, connected-circle variant |
| `dian-mark.svg` | Vector trace of the mark |
| `dian-mark-connected.svg` | Vector trace of the connected variant |

PNGs keep their alpha channel and are trimmed to the ink, with no padding —
add clearspace in layout rather than baking it into the file.

`dian-mark-connected.svg` is the variant currently used on the site — its `<g>`
is inlined as the `#i-mark` symbol at the top of `<body>` in `index.html`, and
referenced by `<use>` in the header and footer. To switch the site to the plain
mark, swap that symbol's contents for `dian-mark.svg`'s `<g>`.

The SVGs use `fill="currentColor"`, so they take the surrounding CSS `color` —
this is what keeps the mark legible at 36px, where the original pale gold
(`#D5BC9D`) washes out. The header renders it in sage, the footer in cream.
Drop one inline and it recolors for free:

```html
<span style="color: var(--color-secondary)">
  <!-- paste dian-mark.svg here -->
</span>
```

## Colors

- Mark: `#D5BC9D` — close to the site's existing `--color-secondary` (`#C4A77D`)
  but lighter. Pick one and make them agree before shipping.
- Wordmark: `#504848`

## Geometry, for building further variants

Measured from the 1050x600 source, in its pixel coordinates:

- Stem: x 521–527 (7px wide), centered on x 524
- Horizontal rule: y 265–271 (7px tall), x 424–624 (201px wide)
- Circle: outer bounds x 510–538, y 281–308; center (524, 294.5)
- Gap between rule and circle in the original: 9px (y 272–280)

The stem and circle share the same center line, which is why the connector in
the variant lands flush. Its alpha profile copies the stem's cross-section
(106 / 255 / 255 / 255 / 255 / 255 / 154 across the 7px) so the join is
invisible at any zoom.

## Regenerating the traces

```sh
magick dian-mark.png -resize 200% -alpha extract -threshold 45% -negate m.pbm
potrace m.pbm --svg --alphamax 1.0 --opttolerance 1.0 -o dian-mark.svg
```

Then replace potrace's `<g ... fill="#000000">` with `fill="currentColor"` and
add a `<title>`. Tracing the **alpha channel** matters — thresholding the
flattened image loses the pale gold against white and yields an empty trace.

`200%` / `opttolerance 1.0` was chosen by comparison: a 400% / 0.2 trace is
2.6x larger and indistinguishable from it even magnified 3x, and the mark
displays at 36px.

## Caveat on the vector files

The SVGs are **traced from the 1050x600 raster**, not exported from a design
source. They are faithful at any size the web needs, but a trace approximates
curves — it is not the original geometry, and the strokes are outlines rather
than editable strokes.

If the designer's vector source exists (`.ai`, `.svg`, `.fig`), use that
instead and regenerate these. For print, or for any use above roughly 1000px,
get the source rather than scaling these.
