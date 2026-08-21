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

The SVGs use `fill="currentColor"`, so they take the surrounding CSS `color`.
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

## Caveat on the vector files

The SVGs are **traced from the 1050x600 raster**, not exported from a design
source. They are faithful at any size the web needs, but a trace approximates
curves — it is not the original geometry, and the strokes are outlines rather
than editable strokes.

If the designer's vector source exists (`.ai`, `.svg`, `.fig`), use that
instead and regenerate these. For print, or for any use above roughly 1000px,
get the source rather than scaling these.
