# 0009 — Auto-promote to staging, manual to production

**Status:** Accepted
**Date:** 2026-08-29
**Refined by:** [0013](0013-commit-directly-to-the-integration-branch.md) —
the `feature/*` step is now optional; the rest stands.

## Context

A solo developer needs CI that catches mistakes without adding ceremony to every
commit. Requiring a pull request at every hop means reviewing your own PRs, which
degrades into rubber-stamping. Automating every hop means a bad commit reaches
production unattended.

## Decision

```
feature/* → development-digvijay → staging → main
                       (auto, if green)   (manual PR)
```

- `quality.yml` is a reusable workflow (`workflow_call`) so the gate is defined
  once: lint → `next typegen` → `tsc --noEmit` → build.
- `promote-to-staging.yml` runs on push to `development-digvijay`, with
  `needs: quality` on the merge job. The dependency *is* the safety property.
- `staging → main` is a manual pull request. Production requires a human.
- `ci.yml` covers `staging` and `main` only; listing `development-digvijay` too
  would double every run.

## Consequences

- Anything on `staging` has passed CI. That is enforced, not conventional.
- The promotion merges `$GITHUB_SHA`, not the branch tip, so the commit that was
  tested is the commit that ships.
- `concurrency` queues promotions rather than cancelling; a cancelled promotion
  would silently drop a commit.
- Merge failures are checked **explicitly** with `if ! git merge …`. Relying on
  `set -e` did not stop the script: it fell through to `git push` and exited 0,
  reporting success for a promotion that never happened.
- `GITHUB_TOKEN` pushes do not trigger other workflows, so no CI run appears on
  `staging` after a promotion. Expected. Webhooks still fire, so Vercel deploys.
- `next typegen` must precede `tsc`: `PageProps`/`LayoutProps` are generated
  globals that do not exist on a clean checkout. This failure is invisible
  locally unless `.next` is deleted first.
