import Link from "next/link";
import { Plus } from "lucide-react";

import NavLink from "@/components/layout/NavLink";
import { mobileNavItems } from "@/lib/mock-data";

export default function MobileNav() {
  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 backdrop-blur-md lg:hidden"
    >
      <ul className="flex items-center justify-around gap-1 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {mobileNavItems.slice(0, 2).map((item) => (
          <MobileNavItem key={item.label} {...item} />
        ))}

        <li>
          <Link
            href="/new"
            aria-label="Start a Charcha"
            className="charcha-gradient grid size-11 place-items-center rounded-2xl text-white shadow-[0_8px_18px_-8px_rgb(109_61_245/0.8)]"
          >
            <Plus className="size-5" aria-hidden />
          </Link>
        </li>

        {mobileNavItems.slice(2).map((item) => (
          <MobileNavItem key={item.label} {...item} />
        ))}
      </ul>
    </nav>
  );
}

function MobileNavItem({
  label,
  href,
  icon: Icon,
  badge,
}: (typeof mobileNavItems)[number]) {
  return (
    <li>
      <NavLink
        href={href}
        className="flex w-16 flex-col items-center gap-1 rounded-lg py-1 text-[10px] font-medium text-muted transition-colors aria-[current=page]:text-brand"
      >
        <span className="relative">
          <Icon className="size-5" aria-hidden />
          {badge ? (
            <span className="absolute -top-1 -right-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">
              {badge}
              <span className="sr-only"> unread</span>
            </span>
          ) : null}
        </span>
        {label}
      </NavLink>
    </li>
  );
}
