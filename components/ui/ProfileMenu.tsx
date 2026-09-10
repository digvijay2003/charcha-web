"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Flame, LogOut, Moon, Settings, Sun, UserRound } from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import { currentUser, streakDays, utilityNav } from "@/lib/mock-data";

const row =
  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-canvas focus-visible:bg-canvas";

/**
 * Clicking your avatar opens a menu in place rather than navigating away.
 * Closes on Escape and on any click outside; Escape returns focus to the
 * avatar so keyboard users are not stranded.
 */
export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const unread = utilityNav.find((item) => item.badge)?.badge ?? 0;

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      window.localStorage.setItem("charcha-theme", isDark ? "dark" : "light");
    } catch {
      // Storage can be unavailable (private mode); the toggle still works.
    }
  }

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="relative block rounded-full"
      >
        <Avatar name={currentUser.name} size="md" decorative />
        {/* Unread dot on the avatar, so notifications are visible at every size. */}
        {unread ? (
          <span
            aria-hidden
            className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-mode ring-2 ring-canvas"
          />
        ) : null}
        <span className="sr-only">
          Account menu{unread ? `, ${unread} unread notifications` : ""}
        </span>
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Account"
          className="absolute top-full right-0 mt-2 w-64 rounded-xl border border-line bg-surface p-1.5 shadow-lift"
        >
          <div className="flex items-center gap-3 px-3 py-2.5">
            <Avatar name={currentUser.name} size="lg" decorative />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {currentUser.name}
              </p>
              <p className="truncate text-xs text-muted">{currentUser.handle}</p>
            </div>
          </div>
          <p className="mx-3 mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-soft-orange px-2.5 py-1 text-[11px] font-semibold text-accent-orange">
            <Flame className="size-3" aria-hidden />
            {streakDays}-day streak
          </p>

          <div role="separator" className="my-1.5 border-t border-line" />

          <Link role="menuitem" href="/profile" className={row} onClick={close}>
            <UserRound className="size-4 text-muted" aria-hidden />
            View profile
          </Link>
          {utilityNav.slice(0, 4).map(({ label, href, icon: Icon, badge }) => (
            <Link key={label} role="menuitem" href={href} className={row} onClick={close}>
              <Icon className="size-4 text-muted" aria-hidden />
              <span className="flex-1">{label}</span>
              {badge ? (
                <span className="rounded-full bg-mode px-1.5 text-[11px] font-semibold text-white">
                  {badge}
                </span>
              ) : null}
            </Link>
          ))}

          <div role="separator" className="my-1.5 border-t border-line" />

          <button type="button" role="menuitem" onClick={toggleTheme} className={row}>
            <Moon className="size-4 text-muted dark:hidden" aria-hidden />
            <Sun className="hidden size-4 text-muted dark:block" aria-hidden />
            <span className="dark:hidden">Dark mode</span>
            <span className="hidden dark:inline">Light mode</span>
          </button>
          <Link role="menuitem" href="/settings" className={row} onClick={close}>
            <Settings className="size-4 text-muted" aria-hidden />
            Settings
          </Link>
          <Link role="menuitem" href="/logout" className={row} onClick={close}>
            <LogOut className="size-4 text-muted" aria-hidden />
            Log out
          </Link>
        </div>
      ) : null}
    </div>
  );
}
