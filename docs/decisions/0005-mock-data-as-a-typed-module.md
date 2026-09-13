# 0005 — Mock data as typed modules in `lib/`

**Status:** Accepted
**Date:** 2026-08-29

## Context

This is a frontend prototype: no auth, no database, no API. The tempting
shortcut is to write content directly into JSX — four hardcoded cards look
identical to four mapped ones in a screenshot, and are faster to produce.

## Decision

All content lives in typed modules under `lib/`, and components map over them.
Nothing is hardcoded in JSX. `lib/` contains no JSX itself, with one narrow
exception: lucide `LucideIcon` *references* stored as category metadata.

## Consequences

- Card components render **one** item and know nothing about how many exist, so
  list length, empty states and pagination are data problems, not UI rewrites.
- The types (`Discussion`, `Vivaad`, `Argument`, `GuptPost`, `Perspective`) are
  the **contract a backend must implement**. That is most of the prototype's
  lasting value.
- Swapping mock data for real fetches means changing the modules, not the
  components.
- The types must stay honest. A field that exists only to make the mock look
  good is a lie the backend will inherit.
