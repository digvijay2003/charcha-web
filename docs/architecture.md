# Architecture

A frontend only. No backend, no database, no authentication, no API routes — by
decision, not omission ([ADR 0005](decisions/0005-mock-data-as-a-typed-module.md)).
Every number, name and thread on screen comes from a typed module in `lib/`.

## Stack

| Layer | Choice | Version |
| --- | --- | --- |
| Framework | Next.js, App Router | 16.3.3 |
| UI | React | 19.2.8 |
| Language | TypeScript, `strict` | 5.x |
| Styling | Tailwind CSS, CSS-first config | 4.x |
| Icons | lucide-react | 1.35 |
| Fonts | Geist + Geist Mono via `next/font/google` | — |
| Hosting | Vercel | — |

**This is not the Next.js most tutorials describe.** Next 16 renamed and
re-shaped enough APIs that guessing is unsafe. Before writing routing, metadata
or caching code, read the relevant file in `node_modules/next/dist/docs/`.
The three that bite hardest:

- `params` and `searchParams` are **Promises**. Await them.
  `const { id } = await props.params;`
- Route prop types are **globals** Next generates into `.next/types` —
  `PageProps<"/vaad-vivaad/[id]">`, `LayoutProps<"/">`. They do not exist on a
  clean checkout until `next typegen` runs, which is why CI runs it before
  `tsc` ([ADR 0009](decisions/0009-branch-pipeline.md)).
- App icons come from **filenames**, not `<link>` tags: `app/icon.png`,
  `app/apple-icon.png`. `favicon.ico` is root-only.

## Rendering model

Server Components are the default. **4 of 34 components are client components**,
and each earns it by needing browser state:

| Client component | Why |
| --- | --- |
| `components/layout/NavLink.tsx` | `usePathname()` to mark the active room |
| `components/ui/ProfileMenu.tsx` | Popover open state, Escape and outside-click |
| `components/ui/BookmarkButton.tsx` | Optimistic local toggle |
| `components/gupt/BeenThereButton.tsx` | Optimistic local toggle |

The pattern to copy: push `"use client"` to the **leaf** that needs it. `NavLink`
is the clearest example — the whole nav stays server-rendered, only the link
that must know the URL is a client component, and its active styling hangs off
`aria-current` so the CSS needs no JavaScript at all.

Dynamic routes are prerendered at build time via `generateStaticParams`, because
the data is static. `notFound()` handles unknown ids.

## Routes

| Route | File | Room |
| --- | --- | --- |
| `/` | `app/page.tsx` | Charcha |
| `/vaad-vivaad` | `app/vaad-vivaad/page.tsx` | Vaad-Vivaad |
| `/vaad-vivaad/[id]` | `app/vaad-vivaad/[id]/page.tsx` | Vaad-Vivaad |
| `/gupt-charcha` | `app/gupt-charcha/page.tsx` | Gupt-Charcha |
| `/gupt-charcha/[id]` | `app/gupt-charcha/[id]/page.tsx` | Gupt-Charcha |

## Layout composition

`app/layout.tsx` is deliberately thin: fonts, metadata, and a pre-paint theme
script ([ADR 0012](decisions/0012-class-based-dark-mode.md)). It knows nothing
about rooms.

`components/layout/AppShell.tsx` is where every page's structure lives. A page
is usually five lines:

```tsx
export default function Home() {
  return (
    <AppShell mode="charcha" stat="245 charchas started today…">
      <TrendingDiscussions />
    </AppShell>
  );
}
```

`AppShell` takes a `mode` and from it derives everything else:

```
<div class="mode-{mode}">            ← re-points CSS tokens for the whole room
  <Topbar />                          logo · room tabs · search · avatar
  <main>                              max-w-3xl, widens past xl
    <RoomHeader mode />               room name, contract line, CTA
    {children}                        the page's actual content
    <RailContent mode />              widgets, inlined below xl
    <BottomBanner />                  charcha only
  </main>
  <aside>                             sticky right column, xl and up
    <YouNav />                        notifications, messages, bookmarks…
    <RailContent mode />
  </aside>
  <MobileNav />                       bottom bar under lg
</div>
```

Two consequences worth knowing before you change it:

- The right column is rendered **twice** — once in `<aside>` for wide screens,
  once inline inside `<main>` for narrow ones, with `idSuffix` keeping element
  ids unique. Duplicate ids break `aria-labelledby`, so pass it.
- `mode === "gupt"` suppresses the widgets and the brand banner. Discovery rails
  and brand cheer are wrong over anonymous posts.

## Directory layout

```
app/
  layout.tsx           fonts, metadata, theme script
  globals.css          the entire design system (see design-system.md)
  page.tsx             Charcha
  vaad-vivaad/         debate room, list + [id]
  gupt-charcha/        anonymous room, list + [id]
components/
  layout/              AppShell, Topbar, RoomHeader, YouNav, RailContent,
                       MobileNav, NavLink
  home/                DiscussionCard, TrendingDiscussions, BottomBanner
  vivaad/              VivaadCard, ArgumentCard, SplitBar, StageIndicator
  gupt/                GuptCard, AnonHandle, BeenThereButton, PrivacyNotice,
                       SupportNote
  widgets/             WidgetCard + PopularTopics, ClosingSoon,
                       UnseenPerspective
  ui/                  Logo, Avatar, ProfileMenu, ProgressRing, BookmarkButton
lib/                   data and pure helpers — no JSX
```

`components/ui/` is generic and room-agnostic. `components/{home,vivaad,gupt}/`
are room-specific. If a component starts needing a `mode` prop to decide what to
render, it belongs in `layout/`.

## Data layer

`lib/` holds the shape of the product. When a backend arrives, these types are
the contract to implement — that is the point of keeping them separate.

| Module | Contents |
| --- | --- |
| `modes.ts` | The three rooms as data: `Mode`, `ModeDef`, `modes`, `modeOrder` |
| `mock-data.ts` | `Discussion`, `Topic`, `Accent`, `currentUser`, `utilityNav` |
| `vivaad-data.ts` | `Vivaad`, `Argument`, `Side`, `Stage`, `getVivaad`, `shift` |
| `gupt-data.ts` | `GuptPost`, `Perspective`, `GuptCategory`, `getGuptPost` |
| `accents.ts` | `Accent` → Tailwind class strings |
| `format.ts` | `formatCount` (1200 → `1.2K`) |

Rules that matter:

- **Nothing is hardcoded in JSX.** Lists map over `lib/` arrays. A card
  component renders one item and knows nothing about how many exist.
- **`modes.ts` is the single source of room identity.** Room names, taglines,
  hrefs and CTA labels all come from it; `Topbar` and `RoomHeader` map over
  `modeOrder`. Adding a fourth room should mean adding a route and an entry.
- **`lib/` is JSX-free**, with one exception: `gupt-data.ts` and `mock-data.ts`
  store lucide `LucideIcon` *references* (not elements) for category icons.

## Conventions

- Imports use the `@/` alias. Order: react/next, then third-party, then `@/`.
- One default-exported component per file, named for the file.
- `lucide-react@1.35` renamed several icons — `Home` is now `House`. Check
  `node_modules/lucide-react/dist/lucide-react.d.ts` before using a name; a
  wrong one fails the build.
- **Never build a Tailwind class name at runtime.** Tailwind v4 scans source as
  plain text, so `` `bg-${color}-500` `` produces no CSS. Map to complete class
  strings instead — `lib/accents.ts` exists for exactly this.
- Comments explain *why*. The code already says what.

## Verification

`npm run lint && npx next typegen && npx tsc --noEmit && npm run build` — the
same sequence CI runs. Type errors surface from `tsc` in seconds instead of
minutes from `next build`.

Visual changes are checked at **320, 390, 1024, 1280 and 1440px in both
themes** before being called done. Every layout bug found so far — truncated
labels, a three-line headline, stretched widgets — was found this way and would
not have shown up at one width.
