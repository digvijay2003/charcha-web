import Link from "next/link";
import { Bell, Plus } from "lucide-react";

import NavLink from "@/components/layout/NavLink";
import { modeOrder, modes } from "@/lib/modes";

const item =
  "flex w-[68px] flex-col items-center gap-1 rounded-lg py-1 text-[10px] font-medium text-muted transition-colors aria-[current=page]:text-mode";
const label =
  "flex h-7 items-center text-center text-[12px] leading-tight font-semibold";

/** The three rooms are primary on mobile too. */
export default function MobileNav() {
  const [charcha, vivaad, gupt] = modeOrder.map((k) => modes[k]);

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 backdrop-blur-md lg:hidden"
    >
      <ul className="flex items-center justify-around gap-1 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {[charcha, vivaad].map((m) => (
          <li key={m.key}>
            <NavLink href={m.href} className={item}>
              <span className={label}>{m.latin}</span>
            </NavLink>
          </li>
        ))}

        <li>
          <Link
            href="/new"
            aria-label="Start something"
            className="grid size-11 place-items-center rounded-2xl bg-mode text-white shadow-lg"
          >
            <Plus className="size-5" aria-hidden />
          </Link>
        </li>

        <li>
          <NavLink href={gupt.href} className={item}>
            <span className={label}>{gupt.latin}</span>
          </NavLink>
        </li>

        <li>
          <NavLink href="/notifications" className={item}>
            <span className="relative">
              <Bell className="size-5" aria-hidden />
              <span className="absolute -top-1 -right-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-mode px-1 text-[9px] font-bold text-white">
                3<span className="sr-only"> unread</span>
              </span>
            </span>
            Alerts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
