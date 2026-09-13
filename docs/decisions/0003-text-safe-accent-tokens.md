# 0003 — A second, text-safe accent palette

**Status:** Accepted
**Date:** 2026-08-29

## Context

The brand palette (`#6D3DF5`, `#9B5DE5`, `#E85AAD`, `#FF9B54`, `#35C99A`) is
tuned for gradients and decorative shapes. Used as small label text on its
matching soft tint it fails accessibility badly: `orange #FF9B54` on
`soft-orange #FFF4E8` measures **1.9:1** against a 4.5:1 WCAG AA minimum.
Darkening the palette itself would flatten the gradient, which is the brand.

## Decision

Keep two palettes with explicitly separate jobs:

- `brand`, `brand-2`, `pink`, `orange`, `mint` — **graphics only**: gradients,
  dots, bars.
- `accent-purple`, `accent-pink`, `accent-orange`, `accent-mint` — **text and
  icons**: darkened in light mode, lightened in dark mode, each verified against
  its soft tint.

`lib/accents.ts` encodes the pairing so a component picks an `Accent` name and
gets the correct classes for tile, text, chip and dot.

## Consequences

- The gradient keeps its intended vividness while text stays legible.
- Two similar-looking token families exist, which is a real trap: using `orange`
  for a label passes review by eye and fails contrast. `dot` is the only
  property in `accentStyles` that carries a vivid colour, and it is documented as
  decorative.
- Any new accent needs both variants and a contrast check before use.
