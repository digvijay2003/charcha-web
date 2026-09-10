import NavLink from "@/components/layout/NavLink";
import { feedTabs } from "@/lib/mock-data";

/** Views of the same feed, so they sit directly above it. */
export default function FeedTabs() {
  return (
    <nav aria-label="Feed" className="flex flex-wrap gap-1">
      {feedTabs.map(({ label, href }) => (
        <NavLink
          key={label}
          href={href}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:text-ink aria-[current=page]:bg-soft-mode aria-[current=page]:font-semibold aria-[current=page]:text-mode"
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
