# Decision log

One file per decision that a future maintainer could reasonably undo by
accident. Not a log of everything we did — a log of things whose *reasons* are
not visible in the code.

`NNNN-short-title.md`, numbered in order, never renumbered. Each has:

- **Status** — Accepted, Superseded by NNNN, or Reversed
- **Date**
- **Context** — what forced a choice
- **Decision** — what we chose
- **Consequences** — what this costs, and what now breaks if ignored

A decision is never edited to say something different. If it changes, write a
new one and mark the old one superseded — the point is the trail.

| # | Decision | Status |
| --- | --- | --- |
| [0001](0001-app-router-with-server-components-by-default.md) | App Router, Server Components by default | Accepted |
| [0002](0002-design-tokens-as-css-variables.md) | Design tokens as CSS variables, not Tailwind config | Accepted |
| [0003](0003-text-safe-accent-tokens.md) | A second, text-safe accent palette | Accepted |
| [0004](0004-rooms-as-top-level-routes.md) | The three rooms are routes, not filters | Accepted |
| [0005](0005-mock-data-as-a-typed-module.md) | Mock data as typed modules in `lib/` | Accepted |
| [0006](0006-romanised-names-no-devanagari.md) | Romanised room names, no Devanagari | Accepted |
| [0007](0007-non-combative-vocabulary.md) | No combative vocabulary anywhere | Accepted |
| [0008](0008-thread-scoped-anonymous-identity.md) | Thread-scoped anonymous identity | Accepted |
| [0009](0009-branch-pipeline.md) | Auto-promote to staging, manual to production | Accepted |
| [0010](0010-account-popover-and-right-column-nav.md) | Account popover; activity nav in the right column | Accepted |
| [0011](0011-raster-brand-mark-on-a-light-tile.md) | Ship the raster mark, plated on a light tile | Accepted |
| [0012](0012-class-based-dark-mode.md) | Class-based dark mode with a pre-paint script | Accepted |
