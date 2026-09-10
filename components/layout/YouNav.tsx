import NavLink from "@/components/layout/NavLink";
import { utilityNav } from "@/lib/mock-data";

/** Your own activity, grouped at the top of the right column. */
export default function YouNav() {
  return (
    <nav
      aria-label="Your activity"
      className="rounded-2xl border border-line bg-surface p-2 shadow-card"
    >
      <ul className="flex flex-col gap-0.5">
        {utilityNav.map(({ label, href, icon: Icon, badge }) => (
          <li key={label}>
            <NavLink
              href={href}
              className="group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-muted transition-colors hover:bg-canvas hover:text-ink aria-[current=page]:bg-soft-mode aria-[current=page]:font-semibold aria-[current=page]:text-mode"
            >
              <Icon
                className="size-4 shrink-0 text-muted group-hover:text-ink group-aria-[current=page]:text-mode"
                aria-hidden
              />
              <span className="flex-1 truncate">{label}</span>
              {badge ? (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-mode px-1.5 text-[11px] font-semibold text-white">
                  {badge}
                  <span className="sr-only"> unread</span>
                </span>
              ) : null}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
