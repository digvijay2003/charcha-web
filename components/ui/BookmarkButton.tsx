"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";

export default function BookmarkButton({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove "${title}" from bookmarks` : `Bookmark "${title}"`}
      onClick={() => setSaved((value) => !value)}
      className={`relative z-10 grid size-8 place-items-center rounded-full transition-colors ${
        saved
          ? "bg-soft-purple text-brand"
          : "text-muted hover:bg-soft-purple hover:text-brand"
      }`}
    >
      <Bookmark
        className="size-4"
        fill={saved ? "currentColor" : "none"}
        aria-hidden
      />
    </button>
  );
}
