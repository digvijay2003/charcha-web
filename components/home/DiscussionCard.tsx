import Link from "next/link";
import { MessageCircle } from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import BookmarkButton from "@/components/ui/BookmarkButton";
import ProgressRing from "@/components/ui/ProgressRing";
import { accentStyles } from "@/lib/accents";
import type { Discussion } from "@/lib/mock-data";

export default function DiscussionCard({
  discussion,
}: {
  discussion: Discussion;
}) {
  const {
    id,
    title,
    description,
    tags,
    participants,
    comments,
    agreePercentage,
    accent,
    icon: Icon,
    voices,
  } = discussion;
  const styles = accentStyles[accent];

  return (
    <article className="group relative rounded-2xl border border-line bg-surface p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-5">
      <div className="flex items-start gap-3 sm:gap-4">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-xl ${styles.tile}`}
          aria-hidden
        >
          <Icon className="size-5" />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] leading-snug font-semibold text-ink sm:text-base">
            <Link
              href={`/discussions/${id}`}
              className="after:absolute after:inset-0 after:rounded-2xl"
            >
              {title}
            </Link>
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {description}
          </p>

          <ul className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <li key={tag}>
                <span
                  className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                    index === 0
                      ? styles.chip
                      : "border border-line bg-canvas text-muted"
                  }`}
                >
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ProgressRing value={agreePercentage} colorClass={styles.text} />
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-line pt-3.5">
        <div className="flex -space-x-1.5" aria-hidden>
          {voices.map((name) => (
            <Avatar key={name} name={name} size="xs" ring decorative />
          ))}
        </div>
        <p className="min-w-0 truncate text-xs text-muted">
          <span className="font-semibold text-ink">{participants}</span> people
          debating
        </p>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium text-muted">
            <MessageCircle className="size-4" aria-hidden />
            {comments}
            <span className="sr-only">comments</span>
          </span>
          <BookmarkButton title={title} />
        </div>
      </div>
    </article>
  );
}
