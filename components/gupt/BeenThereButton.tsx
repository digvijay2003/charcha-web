"use client";

import { useState } from "react";
import { Footprints } from "lucide-react";

/**
 * Replaces the like. Saying "I have been there too" costs nothing to the
 * person saying it and is the single most useful signal to the person posting.
 */
export default function BeenThereButton({
  count,
  compact = false,
}: {
  count: number;
  compact?: boolean;
}) {
  const [marked, setMarked] = useState(false);
  const total = count + (marked ? 1 : 0);

  return (
    <button
      type="button"
      aria-pressed={marked}
      onClick={() => setMarked((v) => !v)}
      className={`relative z-10 inline-flex items-center gap-2 rounded-full border font-medium transition-colors ${
        compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
      } ${
        marked
          ? "border-transparent bg-soft-gupt text-gupt"
          : "border-line text-muted hover:border-line-strong hover:text-ink"
      }`}
    >
      <Footprints className="size-4 shrink-0" aria-hidden />
      <span className="tabular-nums">{total}</span>
      <span>{marked ? "you have been here" : "have been here"}</span>
    </button>
  );
}
