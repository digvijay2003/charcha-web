import { Quote, Sparkles } from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import { sideLabels, type Argument } from "@/lib/vivaad-data";

const sideStyles = {
  paksh: {
    rail: "border-l-pink",
    chip: "bg-soft-pink text-accent-pink",
    text: "text-accent-pink",
  },
  vipaksh: {
    rail: "border-l-mint",
    chip: "bg-soft-mint text-accent-mint",
    text: "text-accent-mint",
  },
} as const;

export default function ArgumentCard({
  argument,
  rebutted,
}: {
  argument: Argument;
  /** The opposing argument this one answers, if any. */
  rebutted?: Argument;
}) {
  const { side, author, body, moved } = argument;
  const styles = sideStyles[side];

  return (
    <article
      className={`rounded-2xl border border-line border-l-4 bg-surface p-4 shadow-card ${styles.rail}`}
    >
      <div className="flex items-center gap-2.5">
        <Avatar name={author} size="sm" decorative />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{author}</p>
          <p className={`text-[11px] font-semibold ${styles.text}`}>
            <span className="font-deva">{sideLabels[side].deva}</span>{" "}
            {sideLabels[side].latin}
          </p>
        </div>
      </div>

      {/* Rebuttal linkage is what turns parallel monologues into a debate. */}
      {rebutted ? (
        <blockquote className="mt-3 rounded-xl border border-line bg-canvas px-3 py-2">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-muted">
            <Quote className="size-3" aria-hidden />
            Replying to {rebutted.author}
          </p>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
            {rebutted.body}
          </p>
        </blockquote>
      ) : null}

      <p className="mt-3 text-sm leading-relaxed text-ink/90">{body}</p>

      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-canvas px-2.5 py-1 text-[11px] font-semibold text-muted">
        <Sparkles className="size-3 text-accent-purple" aria-hidden />
        {moved} said this moved them
      </p>
    </article>
  );
}
