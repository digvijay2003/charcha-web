# Charcha

A discussion platform for an Indian audience, built on one idea: different kinds
of conversation need different rules. Charcha splits them into three rooms
instead of running everything through one feed.

| Room | Route | Contract |
| --- | --- | --- |
| **Charcha** | `/` | Open discussion. No sides, no winner. |
| **Vaad-Vivaad** | `/vaad-vivaad` | Two sides, timed rounds, a closing bell. Scored on minds changed. |
| **Gupt-Charcha** | `/gupt-charcha` | A new handle every thread. No profiles, and threads expire. |

**This is a frontend only** — no backend, no database, no authentication. All
content is typed mock data in `lib/`. That is a decision, not a gap; see
[docs/product.md](docs/product.md#built-vs-not-built).

## Getting started

Requires Node 20.9+ (CI uses 22).

```bash
npm install
npm run dev     # http://localhost:3000
```

## Verifying a change

Run all four before opening a pull request — this is exactly what CI runs, so a
failure here is a failure there:

```bash
npm run lint
npx next typegen      # generates PageProps / LayoutProps into .next/types
npx tsc --noEmit
npm run build
```

Visual changes are checked at 320, 390, 1024, 1280 and 1440px in both themes.

## Documentation

| | |
| --- | --- |
| [docs/product.md](docs/product.md) | The three rooms, language rules, what is not built |
| [docs/architecture.md](docs/architecture.md) | Stack, rendering model, conventions, Next 16 gotchas |
| [docs/design-system.md](docs/design-system.md) | Tokens, colour, contrast rules, accessibility |
| [docs/pipeline.md](docs/pipeline.md) | Branches, CI, promotion, deployment |
| [docs/decisions/](docs/decisions/) | Why things are the way they are |

Read [docs/README.md](docs/README.md) for when to update which.

## Branches

```
development-digvijay → staging → main
   you commit here    (auto, if green)  (manual PR, production)
```

Commit straight to `development-digvijay`; the CI gate is what keeps broken
work off `staging`. Branch only when work needs several commits to become
coherent, or its own preview URL. Details in
[docs/pipeline.md](docs/pipeline.md#where-to-commit).

## A warning about Next.js

This repo pins **Next.js 16.3.3**, which renamed and re-shaped enough APIs that
published tutorials and older documentation are actively misleading. `params` is
a Promise; route prop types are generated globals; app icons come from filenames.
Read `node_modules/next/dist/docs/` before writing routing or metadata code.
