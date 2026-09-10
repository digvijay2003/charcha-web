import Link from "next/link";
import { Search } from "lucide-react";

import NavLink from "@/components/layout/NavLink";
import Avatar from "@/components/ui/Avatar";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { currentUser, utilityNav } from "@/lib/mock-data";
import { modeOrder, modes } from "@/lib/modes";

/**
 * The three rooms are the primary navigation, so they live here at the top
 * where every visit starts — not in a side column competing with Bookmarks.
 */
export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1560px] items-center gap-4 px-4 sm:px-6 lg:gap-8 lg:px-8">
        <div className="py-3">
          <Logo />
        </div>

        <nav aria-label="Rooms" className="hidden items-stretch self-stretch lg:flex">
          {modeOrder.map((key) => {
            const { href, latin } = modes[key];
            return (
              <NavLink
                key={key}
                href={href}
                className="-mb-px flex items-center border-b-2 border-transparent px-4 text-sm font-medium text-muted transition-colors hover:text-ink aria-[current=page]:border-mode aria-[current=page]:font-semibold aria-[current=page]:text-ink"
              >
                {latin}
              </NavLink>
            );
          })}
        </nav>

        <div role="search" className="relative ml-auto min-w-0 flex-1 py-3 sm:max-w-xs">
          <label htmlFor="charcha-search" className="sr-only">
            Search Charcha
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            id="charcha-search"
            type="search"
            placeholder="Search"
            className="w-full rounded-lg border border-line bg-surface py-2 pr-3 pl-10 text-sm text-ink transition-colors outline-none placeholder:text-muted focus:border-mode/60 focus:ring-4 focus:ring-mode/10"
          />
        </div>

        <div className="flex items-center gap-1 py-3">
          {utilityNav.map(({ label, href, icon: Icon, badge }) => (
            <Link
              key={label}
              href={href}
              aria-label={badge ? `${label}, ${badge} unread` : label}
              className="relative hidden size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink sm:grid"
            >
              <Icon className="size-[18px]" aria-hidden />
              {badge ? (
                <span
                  aria-hidden
                  className="absolute top-1 right-1 grid h-4 min-w-4 place-items-center rounded-full bg-mode px-1 text-[9px] font-bold text-white"
                >
                  {badge}
                </span>
              ) : null}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/profile"
            aria-label={`Your profile, ${currentUser.name}`}
            className="ml-1"
          >
            <Avatar name={currentUser.name} size="md" decorative />
          </Link>
        </div>
      </div>
    </header>
  );
}
