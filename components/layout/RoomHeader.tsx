import Link from "next/link";
import { Plus } from "lucide-react";

import { modes, type Mode } from "@/lib/modes";

/** Names the room and states its one rule. Not a landing page. */
export default function RoomHeader({
  mode,
  stat,
}: {
  mode: Mode;
  stat?: string;
}) {
  const { latin, tagline, contract, ctaLabel } = modes[mode];

  return (
    <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-b border-line pb-6">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-[28px]">
          {latin}
          <span className="ml-2.5 font-semibold text-mode">{tagline}</span>
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          {contract}
        </p>
        {stat ? (
          <p className="mt-2 text-xs font-medium text-muted">{stat}</p>
        ) : null}
      </div>

      <Link
        href="/new"
        className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-mode px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:brightness-110"
      >
        <Plus className="size-4" aria-hidden />
        {ctaLabel}
      </Link>
    </header>
  );
}
