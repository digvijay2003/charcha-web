# Product

Charcha is a discussion platform for an Indian audience, built around one
observation: most social platforms reward the loudest position, so people argue
to win rather than to understand. Charcha separates the *kinds* of conversation
people actually want into three rooms with different rules, instead of running
everything through one feed with one set of incentives.

## The three rooms

Each is a top-level route with its own chrome, its own vocabulary, and a stated
contract shown in its header. They are not filters on a shared feed
([ADR 0004](decisions/0004-rooms-as-top-level-routes.md)).

### Charcha — "Share a thought." (`/`)

> Open discussion. No sides, no winner — understand why people think what they
> think.

The default room. Threaded discussions with topic tags, perspective counts and a
lightweight bookmark. Discovery lives in the right column: Popular Topics,
Closing Soon, and **Unseen Perspective** — a deliberate nudge toward a view you
have not read, which is the anti-echo-chamber mechanic and the thing that most
distinguishes this from a generic feed.

### Vaad-Vivaad — "Test an idea." (`/vaad-vivaad`)

> Two sides, timed rounds, a closing bell. Scored on minds changed, not upvotes.

A structured debate. A **motion**, two sides (`For` / `Against`), and four
stages: Opening → Rebuttals → Closing → Verdict. Arguments may explicitly
`rebut` another argument, and the detail page renders the two sides as mirrored
columns so neither reads as the default.

The scoring idea is the point. `SplitBar` shows the room's current split *and*
the shift from its opening split, so what is celebrated is **how far the room
moved**, not how many upvotes a side collected. An argument carries `moved`, not
a score.

### Gupt-Charcha — "Say what you can't say." (`/gupt-charcha`)

> A new handle every thread. No profiles, no followers, and threads expire.

For the things people cannot attach their name to — a job they want to leave,
money, family, relationships. Five categories. The privacy model is the feature,
so the room states it plainly rather than burying it
([ADR 0008](decisions/0008-thread-scoped-anonymous-identity.md)):

- **Handles are per thread**, not per person. The same user in two threads is two
  unrelated handles, so nothing can be stitched together across the platform.
- **Threads expire**, with the countdown visible.
- Replies are **perspectives** — what happened to the writer, not advice for the
  poster. Support is expressed with **"Been there"**, not an upvote.
- `PrivacyNotice` shows an actual before/after redaction diff, because telling
  someone their post is safe is less convincing than showing them.
- `SupportNote` surfaces Tele-MANAS (14416), India's free 24×7 mental health
  helpline, on heavy threads. A platform inviting people to post their worst
  week owes them an exit to real help.

The room drops brand purple for slate-grey and carries no discovery widgets.
Brand cheer over an anonymous confession reads as marketing.

## Language rules

These are product decisions, not style preferences, and both are easy to
regress.

**No Devanagari in the interface.** Room names are romanised — "Vaad-Vivaad",
"Gupt-Charcha" — which is how the words are actually typed and searched in
India. Hindi script would read as regional rather than national, and Charcha's
audience is multilingual ([ADR 0006](decisions/0006-romanised-names-no-devanagari.md)).

**No combative vocabulary**, even in the debate room. Never "Destroy this
argument", "Win", "Beat your opponent" or "Attack". Use "Share perspective",
"Challenge perspective", "Join discussion", "Argue for / against". The entire
premise is that changing your mind is a win; the copy cannot say otherwise
([ADR 0007](decisions/0007-non-combative-vocabulary.md)).

## Built vs. not built

**Built:** all five routes, both themes, full responsive behaviour, the account
popover, the right-column activity nav, the brand mark and app icons, and the
CI/CD pipeline.

**Deliberately not built**, and not accidentally missing:

| Not built | Consequence today |
| --- | --- |
| Authentication | `currentUser` is a constant in `lib/mock-data.ts` |
| Database / backend / API routes | All content is static data in `lib/` |
| Recommendation system | "Unseen Perspective" is a hand-picked entry |
| Notifications backend | The badge count is the literal number `3` |
| AI, agents, vector search | Not present anywhere |
| Composers | CTAs and "Argue for/against" link to routes that do not exist |
| Search | The input is real; nothing is wired behind it |

The types in `lib/` are the contract a backend would implement. Keeping them
honest is what makes this prototype worth something beyond screenshots.

## Where it goes next

In rough order of what unblocks the most:

1. **PWA manifest.** The icons already exist; a manifest makes it installable
   with a home-screen icon. India is mobile-first, and this is most of what
   "an app" means to a user, for an afternoon of work.
2. **Accounts and a backend.** The smallest change that turns a demo into a
   product, and a prerequisite for everything below.
3. **Composers** for all three rooms, so the CTAs lead somewhere.
4. **A mobile app** via Expo/React Native, sharing `lib/` types in a monorepo —
   after the backend exists, or the same UI gets built twice against mock data.
5. **An SVG brand mark** with a simplified 16px variant, before launch.
