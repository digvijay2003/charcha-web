import NavLink from "@/components/layout/NavLink";
import { modeOrder, modes, type Mode } from "@/lib/modes";

/**
 * Each glyph encodes its room's mechanic rather than being a generic icon:
 * overlapping circles for shared ground, a split circle for two sides, a
 * scattered grid for anonymity.
 */
function ModeGlyph({ mode }: { mode: Mode }) {
  if (mode === "charcha") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <circle cx="9.5" cy="12" r="5.6" stroke="#6d3df5" strokeWidth="1.8" />
        <circle cx="14.5" cy="12" r="5.6" stroke="#9b5de5" strokeWidth="1.8" />
      </svg>
    );
  }

  if (mode === "vivaad") {
    return (
      <svg viewBox="0 0 24 24" className="size-6">
        <path d="M12 5.4 A6.6 6.6 0 0 0 12 18.6 Z" fill="#e85aad" />
        <path d="M12 5.4 A6.6 6.6 0 0 1 12 18.6 Z" fill="#35c99a" />
        <circle cx="12" cy="12" r="6.6" fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="1.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="#8992b8">
      <rect x="5" y="5" width="4" height="4" rx="1" />
      <rect x="15" y="5" width="4" height="4" rx="1" />
      <rect x="10" y="10" width="4" height="4" rx="1" />
      <rect x="5" y="15" width="4" height="4" rx="1" />
      <rect x="15" y="15" width="4" height="4" rx="1" opacity=".4" />
    </svg>
  );
}

export default function ModeRail() {
  return (
    <nav
      aria-label="Rooms"
      className="sticky top-0 hidden h-dvh w-[78px] shrink-0 flex-col items-center gap-1 border-r border-line bg-surface py-5 lg:flex"
    >
      <ul className="flex flex-col items-center gap-1">
        {modeOrder.map((key) => {
          const { href, deva, latin } = modes[key];
          return (
            <li key={key}>
              <NavLink
                href={href}
                className="group flex w-[62px] flex-col items-center gap-1.5 rounded-xl px-1 py-3 text-muted opacity-55 transition-all hover:opacity-100 aria-[current=page]:bg-soft-mode aria-[current=page]:opacity-100"
              >
                <ModeGlyph mode={key} />
                <span className="font-deva text-[11px] leading-tight font-semibold text-ink">
                  {deva}
                </span>
                <span className="sr-only">{latin}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
