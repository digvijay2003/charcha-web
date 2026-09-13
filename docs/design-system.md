# Design system

The whole system is `app/globals.css`. There is no `tailwind.config.js` —
Tailwind v4 is configured in CSS, and the file is short enough to read top to
bottom before changing anything.

## The one idea worth understanding

Colours are declared **twice**, in two layers, and the indirection is the reason
dark mode and per-room theming cost almost nothing:

```css
:root      { --canvas: #f8f7fc; --ink: #11152f; --mode: #6d3df5; }
.dark      { --canvas: #0c0e1c; --ink: #eef0f8; --mode: #b39aff; }
.mode-gupt { --canvas: #f4f4f8; --mode: #4c5578; }

@theme inline {
  --color-canvas: var(--canvas);   /* → bg-canvas, text-canvas, … */
  --color-ink:    var(--ink);
  --color-mode:   var(--mode);
}
```

Layer 1 is plain CSS variables that any ancestor class can re-point. Layer 2
maps them into Tailwind utilities **by reference** (`inline` is what makes it a
reference rather than a snapshot). So `bg-canvas` resolves through
`var(--canvas)` at paint time, and adding `.dark` or `.mode-gupt` to an ancestor
changes what it means without generating a single extra class.

**The failure mode:** a token defined only in `.dark` or only in `.mode-*`, or
one never added to `@theme inline`. Either produces a utility that silently does
nothing — `bg-mode` once rendered white-on-white this way. Every token needs a
`:root` value *and* an `@theme inline` entry.

## Palette

Brand colours, fixed in both themes, used for **graphics only**:

| Token | Value | Use |
| --- | --- | --- |
| `brand` | `#6D3DF5` | Primary purple |
| `brand-2` | `#9B5DE5` | Gradient midpoint |
| `pink` | `#E85AAD` | Gradient, decorative dots |
| `orange` | `#FF9B54` | Gradient end, decorative dots |
| `mint` | `#35C99A` | Decorative dots, bars |

Text-safe accents, **theme-aware**, used for all labels and icons:

| Token | Light | Dark |
| --- | --- | --- |
| `accent-purple` | `#6D3DF5` | `#B39AFF` |
| `accent-pink` | `#C6317F` | `#F78AC6` |
| `accent-orange` | `#A0500F` | `#FFB47C` |
| `accent-mint` | `#0B7A5B` | `#55DDB0` |

**Why two sets.** The brand palette is tuned for gradients and fails badly as
small text: `orange #FF9B54` on `soft-orange #FFF4E8` measures **1.9:1**, far
under the 4.5:1 WCAG AA minimum. The `accent-*` values are darkened siblings
that clear AA on their matching soft tint
([ADR 0003](decisions/0003-text-safe-accent-tokens.md)).

Surfaces: `canvas` (page), `surface` (cards), `surface-2` (nested), `ink`,
`muted`, `line`, `line-strong`. Soft tints: `soft-purple`, `soft-pink`,
`soft-orange`, `soft-mint`, `soft-gupt`.

Never write a hex value in a component. If you need a colour that does not
exist, add a token.

## Per-room theming

`AppShell` puts `mode-charcha`, `mode-vivaad` or `mode-gupt` on its root, and
each shifts the room's **temperature**, not just its accent:

| Room | Canvas (light) | `--mode` | Feel |
| --- | --- | --- | --- |
| Charcha | `#F8F7FC` | `#6D3DF5` | Warm lavender, open |
| Vaad-Vivaad | `#F5F6FB` | `#6D3DF5` | Cooler, more structured |
| Gupt-Charcha | `#F4F4F8` | `#4C5578` | Dim, low chroma, no brand colour |

Components use `bg-mode`, `text-mode`, `border-mode` and `bg-soft-mode` to pick
up the active room automatically — a card written once looks native in all
three. Gupt-Charcha dropping to slate-grey is deliberate: brand purple over an
anonymous confession reads as marketing
([ADR 0008](decisions/0008-thread-scoped-anonymous-identity.md)).

## Type and shape

- **Type:** Geist Sans; Geist Mono only for anonymous handles. Headings
  `font-bold tracking-tight` with `text-balance` — it stops the ragged
  two-word last line on card titles. Body `text-sm leading-relaxed text-muted`.
- **Radii:** `rounded-lg` controls, `rounded-xl` inner blocks, `rounded-2xl`
  cards, `rounded-full` pills and avatars.
- **Elevation:** two shadows only, `shadow-card` at rest and `shadow-lift` on
  hover. Both are two-layer (a tight contact shadow plus a wide soft one) and
  get heavier in dark mode, where a light shadow is invisible.
- **Gradient:** exactly one, `.charcha-gradient` at 100°, plus
  `.charcha-gradient-text` for headline words. Reused everywhere so it reads as
  identity. A second gradient would dilute it.
- **Spacing:** `gap-8` between page sections, `gap-4` between cards, `p-5`
  card padding rising to `p-6` at `sm`.

## Layout

| Breakpoint | What changes |
| --- | --- |
| `< lg` | `MobileNav` bottom bar; room tabs hidden; `pb-28` clears the bar |
| `lg` | Room tabs appear in the top bar; bottom bar gone |
| `< xl` | Right column hidden, widgets inline in a 2-up grid |
| `xl` | Sticky 300px right column; `<main>` releases its `max-w-3xl` cap |
| — | Page caps at `max-w-[1560px]` |

The sticky offsets (`top-[61px]`, `max-h-[calc(100dvh-61px)]`) are the top bar's
measured height. Change the bar's padding and these need updating with it.

## Patterns

- **Stretched link.** Cards use one absolutely-positioned overlay link covering
  the card instead of wrapping everything. Keeps one tab stop and one clean
  accessible name, and leaves nested buttons (bookmark, been-there) clickable.
- **State via ARIA, styled in CSS.** Active nav sets `aria-current="page"` and
  the styling hangs off `aria-[current=page]:` / `group-aria-[current=page]:`.
  Correct semantics and correct visuals from one source.
- **Optimistic local state.** Bookmark and been-there update instantly with no
  server. Honest for a prototype; both are the seams a real API plugs into.
- **Deterministic derivation.** Anything derived from content — identicon
  colours, bar positions — is a pure function of the data, never `Math.random()`
  or `Date.now()`. Server and client must render identically.

## Accessibility

Non-negotiable, and cheaper to keep than to retrofit:

- Text meets **4.5:1**, large text and UI edges **3:1**. Check before shipping a
  colour, not after.
- `:focus-visible` gets a 2px brand outline with offset, globally. Never remove
  it; if it looks wrong, fix the shape.
- Decorative icons are `aria-hidden`. Icon-only buttons get an `sr-only` label.
  Every landmark is labelled (`aria-label` on `<aside>`, `<nav>`, `role=search`).
- `prefers-reduced-motion: reduce` collapses all animation to 0.01ms globally.
- Heading order is never skipped for visual reasons; size is a class, not an
  `<h4>`.

## Brand mark

`public/brand/charcha-mark.png` — a C formed from two overlapping speech
bubbles, on the brand gradient. Two constraints it imposes
([ADR 0011](decisions/0011-raster-brand-mark-on-a-light-tile.md)):

1. Its darkest colour measures **1.3:1** against the dark canvas, so it is
   plated on a light tile in dark mode and on white in the app icons.
2. It is a raster and does not survive 16px. Replace it with an SVG, plus a
   simplified small-size variant, before launch.
