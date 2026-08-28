import Link from "next/link";

/**
 * Abstract mark: two overlapping circles — two perspectives, with shared
 * ground where they meet.
 */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`charcha-gradient grid shrink-0 place-items-center rounded-xl shadow-sm ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-[62%]">
        <circle cx="9.4" cy="12" r="5.4" stroke="white" strokeWidth="1.7" />
        <circle
          cx="14.6"
          cy="12"
          r="5.4"
          stroke="white"
          strokeWidth="1.7"
          strokeOpacity="0.75"
        />
        <circle cx="12" cy="12" r="1.5" fill="white" />
      </svg>
    </span>
  );
}

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 rounded-lg"
      aria-label="Charcha home"
    >
      <LogoMark />
      <span className="text-[15px] font-bold tracking-[0.16em] text-ink">
        CHARCHA
      </span>
    </Link>
  );
}
