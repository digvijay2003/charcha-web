# 0001 — App Router, Server Components by default

**Status:** Accepted
**Date:** 2026-08-29

## Context

Next.js 16 with the App Router. Every component is a Server Component unless it
opts out with `"use client"`. The path of least resistance is to mark whole
subtrees as client components the moment one leaf needs a hook, which quietly
ships the entire tree as JavaScript.

## Decision

Server by default. `"use client"` goes on the **smallest leaf** that genuinely
needs browser state, never on a parent for convenience. Where possible, state is
expressed as an ARIA attribute so the styling needs no JavaScript at all.

`components/layout/NavLink.tsx` is the reference implementation: the entire nav
stays server-rendered, only the link that must read `usePathname()` is a client
component, and its appearance is driven by `aria-current="page"` in CSS.

## Consequences

- 4 of 34 components are client components. Adding a fifth should require
  justifying it.
- Data-fetching code, when it exists, stays on the server by default — no
  accidental client-side waterfalls.
- Hooks cannot be reached for casually. That friction is the feature.
- Anything derived from content must be **deterministic** — no `Math.random()`
  or `Date.now()` in render, or server and client markup disagree.
