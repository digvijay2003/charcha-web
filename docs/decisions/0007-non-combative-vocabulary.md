# 0007 — No combative vocabulary anywhere

**Status:** Accepted
**Date:** 2026-08-29

## Context

Debate interfaces reach for fight language by default: "Destroy this argument",
"Win the debate", "Beat your opponent", "Attack". It tests well on engagement
because it is exciting. It also produces exactly the behaviour Charcha exists to
avoid.

## Decision

Banned, including in the debate room: *destroy, win, beat, opponent, attack,
crush, defeat*.

Used instead: "Share perspective", "Challenge perspective", "Join discussion",
"Argue for" / "Argue against", "Been there".

The mechanics agree with the copy. `SplitBar` shows how far the room's position
**moved** from its opening split; an `Argument` carries `moved`, not a score.
What gets celebrated is minds changed, not upvotes collected.

## Consequences

- Copy review is part of code review. This regresses easily, because combative
  phrasing is the genre default and reads as natural.
- Replies in Gupt-Charcha are "perspectives" — what happened to the writer, not
  advice for the poster — and support is "Been there", not an upvote.
- Some engagement is left on the table deliberately.
