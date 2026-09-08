import Link from "next/link";
import { Plus } from "lucide-react";

import { modes, type Mode } from "@/lib/modes";

/**
 * Replaces the marketing hero. A returning user needs to know which room they
 * are in and what its rules are — not a landing page, every visit.
 */
export default function RoomHeader({
  mode,
  stat,
}: {
  mode: Mode;
  stat?: string;
}) {
  const { deva, latin, tagline, contract, ctaLabel } = modes[mode];

  return (
    <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-b border-line pb-5">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <h1 className="font-deva text-2xl font-bold tracking-tight text-ink sm:text-[28px]">
            {deva}
          </h1>
          <span className="text-base font-semibold text-muted sm:text-lg">
            {latin}
          </span>
          <span className="text-base font-semibold text-mode sm:text-lg">
            {tagline}
          </span>
        </div>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          {contract}
        </p>
        {stat ? (
          <p className="mt-2 text-xs font-medium text-muted">{stat}</p>
        ) : null}
      </div>

      <Link
        href="/new"
        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-mode px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:brightness-110"
      >
        <Plus className="size-4" aria-hidden />
        {ctaLabel}
      </Link>
    </header>
  );
}
