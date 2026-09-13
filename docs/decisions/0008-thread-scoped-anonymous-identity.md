# 0008 — Thread-scoped anonymous identity

**Status:** Accepted
**Date:** 2026-09-08

## Context

Gupt-Charcha is for things people cannot attach their name to. Ordinary
"anonymous" modes give each user one persistent pseudonym, which is
pseudonymity, not anonymity: posts across threads can be correlated, and a
handful of correlated posts about one employer, one city and one family is
effectively an identity.

## Decision

Identity is scoped to a **single thread**. Handles are seeded per thread, never
per user, so the same person in two threads is two unrelated handles and nothing
can be stitched together across the platform. On top of that:

- Threads **expire**, with the countdown visible as part of why posting feels
  safe.
- No profiles, no followers, no karma in this room.
- `PrivacyNotice` shows an actual before/after redaction diff rather than
  claiming safety in prose.
- Support is **"Been there"**; replies are **perspectives**, not advice.
- `SupportNote` surfaces Tele-MANAS (14416), India's free 24×7 mental health
  helpline, on heavy threads.
- The room drops brand purple for slate-grey and carries no discovery widgets.

## Consequences

- The backend must **not** store a stable user↔handle mapping. Seeding is
  per-thread; anything else silently undoes this decision while the UI keeps
  claiming otherwise.
- Moderation is harder by construction — no cross-thread reputation to lean on.
  Rate limiting and per-thread signals have to carry that weight.
- Expiry must be real deletion, not a hidden flag.
- The privacy claims in the UI are promises. Any change here is a change to what
  users were told.
