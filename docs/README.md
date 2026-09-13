# Charcha documentation

Four documents and a decision log. Everything here is versioned with the code,
so a document that contradicts the code is a bug in the document.

| Document | Answers |
| --- | --- |
| [product.md](product.md) | What Charcha is, the three rooms, what is deliberately not built yet |
| [architecture.md](architecture.md) | How the frontend is put together and the conventions to follow |
| [design-system.md](design-system.md) | Tokens, colour, contrast rules, component patterns, accessibility |
| [pipeline.md](pipeline.md) | Branches, CI, promotion to staging, deployment |
| [decisions/](decisions/) | Why things are the way they are, one file per decision |

## Keeping this current

The rule is narrow on purpose, so it actually gets followed:

1. **Changing behaviour that a document describes?** Update that document in the
   same commit. Not a follow-up commit, not a TODO.
2. **Making a choice a future maintainer could reasonably undo by accident?**
   Add an ADR in [decisions/](decisions/). Cheap to write, expensive to lose.
3. **Adding a route, a `lib/` data module, or a client component?** Update the
   file map and the client-component list in [architecture.md](architecture.md).
   Those two lists are the ones that rot fastest.

Anything smaller — a copy tweak, a spacing fix, a new card variant — needs no
documentation change. Docs that track every detail get abandoned.

## What does not belong here

- Setup instructions. They live in the root [README](../README.md).
- Anything Next.js documents itself. Link to `node_modules/next/dist/docs/`
  instead of paraphrasing it; this repo pins Next 16 and the published docs
  for older versions are actively misleading.
- Task and release tracking. That is git history and pull requests.
