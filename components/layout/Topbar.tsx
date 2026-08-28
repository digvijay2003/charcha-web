import Link from "next/link";
import { Flame, Search } from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import { LogoMark } from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { currentUser, streakDays } from "@/lib/mock-data";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="lg:hidden" aria-label="Charcha home">
          <LogoMark className="size-9" />
        </Link>

        <div role="search" className="relative min-w-0 flex-1 sm:max-w-md">
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
            placeholder="Search for discussions, topics or people..."
            className="w-full rounded-xl border border-line bg-surface py-2.5 pr-4 pl-10 text-sm text-ink transition-colors outline-none placeholder:text-muted focus:border-brand/60 focus:ring-4 focus:ring-brand/10"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full bg-soft-orange px-3 py-1.5 text-xs font-semibold text-accent-orange sm:inline-flex">
            <Flame className="size-3.5" aria-hidden />
            {streakDays} Day Streak
          </span>
          <ThemeToggle />
          <Link href="/profile" aria-label={`Your profile, ${currentUser.name}`}>
            <Avatar name={currentUser.name} size="md" decorative />
          </Link>
        </div>
      </div>
    </header>
  );
}
