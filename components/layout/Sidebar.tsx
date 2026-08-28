import Link from "next/link";
import { Lightbulb, Plus } from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import Logo from "@/components/ui/Logo";
import { currentUser, navItems, thoughtOfTheDay } from "@/lib/mock-data";

const ACTIVE_HREF = "/";

export default function Sidebar() {
  return (
    <aside className="rail-scroll sticky top-0 hidden h-dvh w-[260px] shrink-0 flex-col gap-6 overflow-y-auto border-r border-line bg-canvas px-4 py-5 lg:flex">
      <div className="px-2">
        <Logo />
      </div>

      <nav aria-label="Primary">
        <ul className="flex flex-col gap-0.5">
          {navItems.map(({ label, href, icon: Icon, badge }) => {
            const isActive = href === ACTIVE_HREF;
            return (
              <li key={label}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-soft-purple font-semibold text-brand"
                      : "font-medium text-muted hover:bg-surface hover:text-ink"
                  }`}
                >
                  <Icon
                    className={`size-[18px] shrink-0 ${isActive ? "text-brand" : "text-muted group-hover:text-ink"}`}
                    aria-hidden
                  />
                  <span className="flex-1 truncate">{label}</span>
                  {badge ? (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1.5 text-[11px] font-semibold text-white">
                      {badge}
                      <span className="sr-only"> unread</span>
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Link
        href="/new"
        className="charcha-gradient flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgb(109_61_245/0.7)] transition-all hover:-translate-y-0.5 hover:brightness-105"
      >
        <Plus className="size-4" aria-hidden />
        Start a Charcha
      </Link>

      <section
        aria-labelledby="thought-heading"
        className="rounded-2xl border border-line bg-linear-to-br from-soft-purple to-soft-pink p-4"
      >
        <h2
          id="thought-heading"
          className="flex items-center gap-2 text-[13px] font-semibold text-ink"
        >
          <Lightbulb className="size-4 text-accent-orange" aria-hidden />
          Thought for today
        </h2>
        <blockquote className="mt-2.5 text-[13px] leading-relaxed text-ink/80">
          &ldquo;{thoughtOfTheDay.quote}&rdquo;
          <footer className="mt-2 text-xs text-muted">
            &mdash; {thoughtOfTheDay.author}
          </footer>
        </blockquote>
      </section>

      <Link
        href="/profile"
        className="mt-auto flex items-center gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-line hover:bg-surface"
      >
        <Avatar name={currentUser.name} size="lg" decorative />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-ink">
            {currentUser.name}
          </span>
          <span className="block truncate text-xs text-muted">
            {currentUser.handle}
          </span>
        </span>
      </Link>
    </aside>
  );
}
