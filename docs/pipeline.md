# Pipeline

Three long-lived branches, one automated hop, one manual hop
([ADR 0009](decisions/0009-branch-pipeline.md)).

```
feature/*  ──►  development-digvijay  ──►  staging  ──►  main
   local         integration          auto, if green   manual PR
   merge                                                (production)
```

| Branch | Role | How code arrives | Vercel |
| --- | --- | --- | --- |
| `feature/*` | One change | You create it | Preview |
| `development-digvijay` | Integration | You merge features in | Preview |
| `staging` | Verified | **Automatically**, by CI, when green | Preview |
| `main` | Production | **Manually**, by pull request | Production |

The asymmetry is the design. Getting to staging should be frictionless, because
nothing there is user-visible. Getting to production should require a human
clicking merge.

## Workflows

`.github/workflows/` holds three files, one of which is shared.

### `quality.yml` — the gate

A reusable workflow (`on: workflow_call`) so the same checks run everywhere and
only need editing once:

```
checkout → setup-node 22 (cache: npm) → restore .next/cache
  → npm ci → npm run lint → npx next typegen → npx tsc --noEmit → npm run build
```

Three details that each exist for a reason:

- **`next typegen` before `tsc`.** `PageProps` and `LayoutProps` are globals Next
  writes into `.next/types`. A clean CI checkout has no `.next`, so `tsc` fails
  with `TS2304: Cannot find name 'LayoutProps'` — a failure that cannot be
  reproduced locally unless you delete `.next` first. `typegen` generates them
  without a full build.
- **`tsc --noEmit` before `build`.** `next build` type-checks too, but this fails
  in seconds rather than minutes.
- **`npm ci`, not `npm install`.** Installs the lockfile exactly and fails if
  `package.json` has drifted from it.

### `ci.yml` — verification

Calls `quality.yml` on pull requests and pushes to `staging` and `main`.

`development-digvijay` is **not** listed, on purpose: `promote-to-staging.yml`
already runs the same gate on that branch, and listing it in both would burn two
identical runs on every commit.

### `promote-to-staging.yml` — the automated hop

On push to `development-digvijay`: run `quality.yml`, then a `promote` job with
`needs: quality`. The dependency *is* the safety property — a failing lint,
typecheck or build means the merge never happens, so anything on `staging` has
passed CI.

Details:

- `permissions: contents: write` — the default `GITHUB_TOKEN` is read-only.
- `fetch-depth: 0` — a shallow clone cannot merge branches.
- `concurrency` with `cancel-in-progress: false` — two quick pushes queue rather
  than race. Cancelling a promotion would silently drop a commit.
- It merges **`$GITHUB_SHA`**, not the branch tip. The exact commit that was
  tested is the commit that gets promoted, even if you push again mid-run.
- The merge result is checked **explicitly**:

  ```bash
  if ! git merge --no-ff "$GITHUB_SHA" -m "…"; then
    git merge --abort || true
    echo "::error::Conflict promoting to staging. Resolve it locally:"
    exit 1
  fi
  ```

  This is not decoration. An earlier version relied on `set -e`, which did not
  stop execution on the failed merge — the script fell through to `git push` and
  exited 0, reporting success for a promotion that never happened.

## Promoting to production

Manual, by design:

```bash
gh pr create --base main --head staging \
  --title "Release: <what is in it>" --body "…"
```

Merging it deploys to Vercel production.

## Two things that surprise people

**`GITHUB_TOKEN` does not trigger other workflows.** A push made by
`promote-to-staging.yml` will *not* start `ci.yml` on `staging` — GitHub blocks
that to prevent infinite loops. Fine here, since the commit was already tested
before promotion. But it does still fire webhooks, so **Vercel deploys
normally**; the absence of a CI run on `staging` after a promotion is expected,
not a broken pipeline.

**Vercel's split is by branch.** `main` is Production; every other branch gets a
Preview deployment with its own URL. There is nothing to configure per branch.

## Pushing from this machine

The SSH key here is passphrase-protected with no agent loaded, so plain
`git push` prompts. `gh` is authenticated, so push over HTTPS with its
credential helper, without changing git config:

```bash
git -c credential.helper='!gh auth git-credential' \
  push https://github.com/digvijay2003/charcha-web.git <branch>
```
