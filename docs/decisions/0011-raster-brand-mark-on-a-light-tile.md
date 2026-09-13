# 0011 — Ship the raster mark, plated on a light tile

**Status:** Accepted
**Date:** 2026-09-13

## Context

The supplied brand mark — a C formed from two overlapping speech bubbles on the
brand gradient — arrived as a 2182×1952 PNG. It had three problems:

1. A light grey `(244,244,244)` background **baked in**, fully opaque, over 59%
   of the canvas.
2. Its darkest colour `(27,39,87)` measures **1.3:1** against the dark canvas
   `#0C0E1C`. Half the mark disappears on a dark tab bar.
3. It is a raster with soft edges and a decorative sparkle fused into the frame
   stroke. At 16px it is an unreadable blob.

## Decision

Ship it, with compensations, and keep the vector redraw as known debt.

- Background keyed out per-pixel with edge un-blending
  (`fg = (P − (1−a)·B) / a`) so no grey halo remains, plus an alpha noise floor
  (`A[A < 40/255] = 0`) that cut alpha>0 coverage from 100% to 41%.
- Three derived assets from an untouched source:
  `public/brand/charcha-mark.png` (1024px transparent master), `app/icon.png`
  (512px on white), `app/apple-icon.png` (180px opaque). Default `favicon.ico`
  deleted; Next wires icons from those filenames.
- The header plates the mark on a light tile **in dark mode only**; the app
  icons are always on white.
- The sparkle **stays**. Four removal approaches were attempted — box clear,
  saturation flood-fill, erode-then-select, harmonic inpainting — and each
  damaged the artwork (clipped frame, hard-edged hole, vertical streaking). All
  were reverted.

## Consequences

- Correct in both themes today, at the cost of a plate that would be unnecessary
  with a proper mark.
- **Known debt:** an SVG redraw plus a simplified 16px variant (thicker strokes,
  one tail, no sparkle) is required before launch. Raster surgery cannot fix the
  sparkle or the small-size legibility; only the vector source can.
- The gradient starts at a deeper indigo than `brand #6D3DF5`, so the mark and
  the app tokens are not yet the same colour family.
- `app/apple-icon.png` is already half of a PWA manifest.
