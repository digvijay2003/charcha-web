import type { Accent } from "@/lib/mock-data";

type AccentStyle = {
  /** Soft tinted square behind an icon. */
  tile: string;
  /** Theme-aware, contrast-checked accent for text, icons and ring arcs. */
  text: string;
  /** Soft background only. */
  soft: string;
  /** Tag / chip treatment. */
  chip: string;
  /** Vivid palette colour, for decorative dots and bars only. */
  dot: string;
};

export const accentStyles: Record<Accent, AccentStyle> = {
  purple: {
    tile: "bg-soft-purple text-accent-purple",
    text: "text-accent-purple",
    soft: "bg-soft-purple",
    chip: "bg-soft-purple text-accent-purple",
    dot: "bg-brand",
  },
  mint: {
    tile: "bg-soft-mint text-accent-mint",
    text: "text-accent-mint",
    soft: "bg-soft-mint",
    chip: "bg-soft-mint text-accent-mint",
    dot: "bg-mint",
  },
  orange: {
    tile: "bg-soft-orange text-accent-orange",
    text: "text-accent-orange",
    soft: "bg-soft-orange",
    chip: "bg-soft-orange text-accent-orange",
    dot: "bg-orange",
  },
  pink: {
    tile: "bg-soft-pink text-accent-pink",
    text: "text-accent-pink",
    soft: "bg-soft-pink",
    chip: "bg-soft-pink text-accent-pink",
    dot: "bg-pink",
  },
};
