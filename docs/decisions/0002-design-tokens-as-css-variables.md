# 0002 — Design tokens as CSS variables, not Tailwind config

**Status:** Accepted
**Date:** 2026-08-29

## Context

Three things need to restyle the same components: the light theme, the dark
theme, and three per-room palettes. Tailwind v4 has no JS config file; it is
configured in CSS with `@theme`. Defining colours directly in `@theme` bakes them
in, so a theme switch would mean generating parallel class sets.

## Decision

Two layers in `app/globals.css`:

1. Plain CSS variables on `:root`, re-pointed by `.dark` and `.mode-*`.
2. `@theme inline` mapping each one into a Tailwind utility **by reference**.

```css
:root      { --canvas: #f8f7fc; }
.dark      { --canvas: #0c0e1c; }
@theme inline { --color-canvas: var(--canvas); }
```

`inline` is load-bearing: without it Tailwind snapshots the value instead of
referencing the variable, and theming stops working.

## Consequences

- Dark mode and per-room theming cost zero extra classes. `bg-canvas` resolves
  through `var(--canvas)` at paint time.
- **Every token needs a `:root` value *and* an `@theme inline` entry.** A token
  defined only under `.dark` or `.mode-*`, or never mapped in, produces a utility
  that silently does nothing — `bg-mode` shipped white-on-white this way, and the
  cause was only visible in the built CSS.
- Components must never contain hex values. A new colour means a new token.
