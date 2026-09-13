# 0004 — The three rooms are routes, not filters

**Status:** Accepted
**Date:** 2026-09-08

## Context

Charcha, Vaad-Vivaad and Gupt-Charcha first appeared as a sidebar filter over a
single feed. The result looked like every other social app: the three modes were
a tag, the UI was identical in each, and the product's actual idea — that
different conversations need different rules — was invisible. The feedback was
blunt: it looked copy-pasted.

## Decision

Each room is a top-level route with its own chrome:

- `/`, `/vaad-vivaad`, `/gupt-charcha`, promoted to tabs in the top bar.
- `lib/modes.ts` is the single source of room identity — name, tagline,
  contract line, CTA label, href.
- `AppShell` takes a `mode` and sets `mode-{mode}`, shifting the canvas
  temperature and accent for the whole room ([0002](0002-design-tokens-as-css-variables.md)).
- Each room states its contract in its header, so the rules are visible rather
  than implied.
- `mode` also controls what is *absent*: Gupt-Charcha has no discovery widgets
  and no brand banner.

## Consequences

- The three rooms are the product's structure. Sidebar filters were removed.
- Adding a room means adding a route plus a `modes.ts` entry — components that
  read `--mode` adapt automatically.
- Components needing a `mode` prop to decide what to render belong in
  `components/layout/`, not `components/ui/`.
- Cross-room feeds are now a deliberate feature to design, not a default.
