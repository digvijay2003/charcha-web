@AGENTS.md

# Project documentation

`docs/` is the source of truth for architecture, design and decisions. Read
[docs/README.md](docs/README.md) first; it says which document covers what.

Three rules when making changes here:

1. **Changing behaviour a document describes? Update that document in the same
   commit.** Not a follow-up commit, not a TODO.
2. **Made a choice a future maintainer could undo by accident? Add an ADR** in
   `docs/decisions/`, numbered, following the existing format.
3. **Added a route, a `lib/` data module, or a client component? Update the file
   map and client-component list** in `docs/architecture.md` — the two lists that
   rot fastest.

Smaller changes — copy tweaks, spacing, a new card variant — need no doc change.

Before writing code, check the constraints already documented rather than
rediscovering them: `docs/design-system.md` for the two-palette contrast rule and
the token-layering failure mode, `docs/product.md` for the language rules (no
Devanagari, no combative vocabulary), `docs/pipeline.md` for CI.
