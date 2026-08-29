import Link from "next/link";
import { Clock, MessagesSquare, Users } from "lucide-react";

import SplitBar from "@/components/vivaad/SplitBar";
import Avatar from "@/components/ui/Avatar";
import BookmarkButton from "@/components/ui/BookmarkButton";
import { formatCount } from "@/lib/format";
import { shift, stageLabels, type Vivaad } from "@/lib/vivaad-data";

/**
 * Deliberately symmetric, where DiscussionCard is asymmetric: the layout
 * itself should say "two sides, equal footing".
 */
export default function VivaadCard({ vivaad }: { vivaad: Vivaad }) {
  const {
    id,
    motion,
    context,
    tags,
    stage,
    round,
    totalRounds,
    closesIn,
    currentSplit,
    participants,
    argumentCount,
    voices,
  } = vivaad;

  return (
    <article className="group relative rounded-2xl border border-line bg-surface p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-5">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold text-muted">
        <span className="font-deva text-accent-purple">वाद-विवाद</span>
        <span aria-hidden>·</span>
        <span>
          Round {round} of {totalRounds}
        </span>
        <span aria-hidden>·</span>
        <span className="text-accent-purple">{stageLabels[stage]}</span>
        <span className="ml-auto inline-flex items-center gap-1 whitespace-nowrap">
          <Clock className="size-3.5" aria-hidden />
          {closesIn}
        </span>
      </div>

      <h3 className="mt-3 text-base leading-snug font-semibold text-balance text-ink sm:text-[17px]">
        <Link
          href={`/vaad-vivaad/${id}`}
          className="after:absolute after:inset-0 after:rounded-2xl"
        >
          {motion}
        </Link>
      </h3>

      <p className="mt-1.5 text-sm leading-relaxed text-muted">{context}</p>

      <ul className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag}>
            <span className="inline-block rounded-full border border-line bg-canvas px-2.5 py-1 text-xs font-medium text-muted">
              {tag}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <SplitBar paksh={currentSplit} shift={shift(vivaad)} />
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-line pt-3.5">
        <div className="flex -space-x-1.5" aria-hidden>
          {voices.map((name) => (
            <Avatar key={name} name={name} size="xs" ring decorative />
          ))}
        </div>

        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <Users className="size-3.5" aria-hidden />
            <span className="font-semibold text-ink">
              {formatCount(participants)}
            </span>{" "}
            arguing
          </span>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <MessagesSquare className="size-3.5" aria-hidden />
            {argumentCount}
            <span className="sr-only"> arguments</span>
          </span>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <BookmarkButton title={motion} />
        </div>
      </div>

    </article>
  );
}
