# 0012 — Class-based dark mode with a pre-paint script

**Status:** Accepted
**Date:** 2026-08-29

## Context

Charcha's identity is its light theme, so `prefers-color-scheme` alone is wrong —
a user on a dark OS would never see the intended design, and could not choose.
But a user-chosen theme read from `localStorage` in React lands *after* first
paint, producing a white flash on every navigation.

## Decision

- `@custom-variant dark (&:where(.dark, .dark *))` — dark mode is a class on
  `<html>`, not a media query. Light is the default.
- A tiny blocking script in `app/layout.tsx` `<head>` reads
  `localStorage["charcha-theme"]` and adds `.dark` **before first paint**.
- `<html suppressHydrationWarning>`, since that script legitimately makes the
  server and client `class` attribute differ.
- The toggle lives in `ProfileMenu` and writes the same key.
- `:where()` keeps the variant at zero specificity so it never outranks the
  utility it modifies.

## Consequences

- No flash of the wrong theme, and the user's choice wins over the OS.
- One synchronous inline script in `<head>` — deliberate, and the only correct
  place for it.
- The toggle's icon is pure CSS (`dark:hidden` / `hidden dark:block`) with no
  state. An earlier `useState` version tripped ESLint's
  `react-hooks/set-state-in-effect`; deriving from the class is simpler and has
  no hydration risk.
- Every token needs a `.dark` value. A missing one inherits light and usually
  fails contrast ([0002](0002-design-tokens-as-css-variables.md)).
