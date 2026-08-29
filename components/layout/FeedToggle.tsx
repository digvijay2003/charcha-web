import Link from "next/link";

const modes = [
  { key: "charcha", href: "/", deva: "चर्चा", latin: "Charcha" },
  { key: "vivaad", href: "/vaad-vivaad", deva: "वाद-विवाद", latin: "Vaad-Vivaad" },
] as const;

/**
 * Vaad-Vivaad is a peer of Charcha, not a sub-feature, so it gets a mode
 * switch rather than being buried as another sidebar row.
 */
export default function FeedToggle({
  active,
}: {
  active: (typeof modes)[number]["key"];
}) {
  return (
    <nav
      aria-label="Feed mode"
      className="inline-flex gap-1 rounded-xl border border-line bg-surface p-1"
    >
      {modes.map(({ key, href, deva, latin }) => {
        const isActive = key === active;

        return (
          <Link
            key={key}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              isActive
                ? "bg-soft-purple font-semibold text-accent-purple"
                : "font-medium text-muted hover:text-ink"
            }`}
          >
            <span className="font-deva">{deva}</span>{" "}
            <span className="hidden sm:inline">{latin}</span>
          </Link>
        );
      })}
    </nav>
  );
}
