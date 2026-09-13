# 0010 — Account popover; activity nav in the right column

**Status:** Accepted
**Date:** 2026-09-10

## Context

Personal navigation (Notifications, Messages, Bookmarks, My Discussions,
Following, Explore) sat in a left sidebar, and the avatar navigated to a profile
page. Two problems: the left sidebar plus a right rail squeezed content into a
narrow centre strip with large empty margins, and clicking the avatar to check
one thing meant losing your place in the feed.

## Decision

- The left sidebar is gone. Personal navigation moved into `YouNav` at the top of
  the **right column**, above the discovery widgets, open by default.
- The avatar opens an in-place **popover** (`ProfileMenu`) — profile link,
  activity links, dark-mode toggle, settings, log out — closing on Escape and on
  outside pointerdown, returning focus to the button.
- The top bar is left-weighted: logo, room tabs, then search beside the tabs, so
  there is no dead middle. The avatar is pushed right with `ml-auto`.

## Consequences

- One chrome column instead of two; `<main>` releases its `max-w-3xl` cap at
  `xl` and uses the reclaimed width.
- The popover absorbed the old standalone theme toggle, so the top bar carries
  one fewer control.
- The right column renders **twice** — `<aside>` at `xl+`, inline inside `<main>`
  below it — so `idSuffix` must be passed to keep element ids unique.
- The popover is one of only four client components, and the one most likely to
  regress on keyboard accessibility. Escape, focus return and outside-click are
  requirements, not polish.
