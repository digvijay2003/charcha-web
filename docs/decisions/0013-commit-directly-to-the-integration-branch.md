# 0013 — Commit directly to the integration branch

**Status:** Accepted
**Date:** 2026-09-13
**Refines:** [0009](0009-branch-pipeline.md)

## Context

[0009](0009-branch-pipeline.md) set up `feature/* → development-digvijay →
staging → main` and the feature-branch step was assumed rather than chosen. In
practice it cost more than it returned:

- There is no second reviewer, so a pull request into `development-digvijay` is
  self-review. It degrades into rubber-stamping.
- Branch bookkeeping caused real bugs. `feature/mode-rail` was cut from a base
  that predated Gupt-Charcha, so the mode rail referenced a room that did not
  exist on that branch — caught only by stale generated route types.
- Two branches were opened for the brand mark and the docs, neither of which any
  human was going to review before they merged.

The protection was assumed to come from the branch. It does not. It comes from
`quality.yml`: `promote-to-staging.yml` gates its merge job on `needs: quality`,
so a commit that fails lint, typecheck or build never reaches `staging`
regardless of which branch it was pushed to.

## Decision

Commit directly to `development-digvijay` by default.

Use a `feature/*` branch only when it earns itself:

- the work needs several commits before it is coherent, and the intermediate
  states should stay off `staging`;
- it needs its own Vercel preview URL to be judged;
- it might be thrown away, where deleting a branch beats reverting commits.

Merge such branches with `--ff-only` after rebasing, so history stays linear and
single-commit branches leave no merge commit.

`staging → main` is unchanged: still a manual pull request, still the only place a
human must click merge.

## Consequences

- Fewer moving parts, and the class of mistake that produced the `mode-rail` bug
  is gone: there is no stale base to branch from.
- **`staging` is no longer only-finished-work.** Anything green lands there,
  including work in progress. `staging` is a preview environment, not a release
  candidate; `main` is the release gate.
- **CI proves a commit compiles, not that it looks right.** With no branch to
  hide in, manual visual verification at 320 / 390 / 1024 / 1280 / 1440px in both
  themes before committing is the real check, not a nicety.
- Reverting on a shared branch is now the way to undo a direction, so commits
  should stay individually revertible — one concern each.
- If a second developer joins, revisit this. Direct commits to a shared
  integration branch stop being reasonable the moment someone else's work can be
  broken by yours.
