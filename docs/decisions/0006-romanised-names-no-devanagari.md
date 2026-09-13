# 0006 — Romanised room names, no Devanagari

**Status:** Accepted
**Date:** 2026-09-10

## Context

The room names are Hindi words. An early version rendered them in Devanagari
alongside the romanisation (चर्चा / Charcha) on the theory that it signalled
authenticity to an Indian audience.

## Decision

No Devanagari anywhere in the interface. Room names are romanised only:
"Charcha", "Vaad-Vivaad", "Gupt-Charcha". Every label, stage name and side name
is English — `sideLabels` is `{ paksh: "For", vipaksh: "Against" }`, with the
Hindi terms surviving only as internal type keys.

## Context for the choice

- India is multilingual. Hindi script reads as *regional* to a large part of the
  country, not national — the opposite of the intended signal.
- Romanised Hindi is how these words are actually typed and searched in India.
- Two scripts for one label doubles the width of every tab and chip, and the
  duplication carried no information.
- Mixed-script strings are a genuine layout and accessibility hazard —
  line-breaking, font fallback, and screen readers announcing a language the
  document does not declare.

## Consequences

- Internal keys stay Hindi (`paksh`, `vipaksh`, `gupt`) and are never displayed.
  If one leaks into the UI it is a bug.
- Real localisation, if it ever happens, is a proper i18n layer with a language
  switch — not bilingual labels.
