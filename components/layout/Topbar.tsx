import { Search } from "lucide-react";

import NavLink from "@/components/layout/NavLink";
import Logo from "@/components/ui/Logo";
import ProfileMenu from "@/components/ui/ProfileMenu";
import { modeOrder, modes } from "@/lib/modes";

/**
 * Logo, the three rooms, search, avatar. Search sits with the tabs so the bar
 * is left-weighted and has no empty middle; everything personal is behind the
 * avatar or in the right column.
 */
export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1560px] items-center gap-4 px-4 sm:px-6 lg:gap-6 lg:px-8">
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

        <div role="search" className="relative min-w-0 flex-1 py-3 lg:ml-2 lg:max-w-md">
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

        <div className="ml-auto py-3">
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
