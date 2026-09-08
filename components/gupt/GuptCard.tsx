import Link from "next/link";
import { Clock, MessagesSquare } from "lucide-react";

import AnonHandle from "@/components/gupt/AnonHandle";
import BeenThereButton from "@/components/gupt/BeenThereButton";
import { guptCategories, type GuptPost } from "@/lib/gupt-data";

export default function GuptCard({ post }: { post: GuptPost }) {
  const {
    id,
    handle,
    category,
    title,
    body,
    beenThere,
    perspectiveCount,
    postedAgo,
    expiresIn,
  } = post;
  const { label, icon: Icon } = guptCategories[category];

  return (
    <article className="group relative rounded-2xl border border-line bg-surface p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <AnonHandle handle={handle} />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-soft-gupt px-2.5 py-1 text-[11px] font-semibold text-gupt">
          <Icon className="size-3" aria-hidden />
          {label}
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-muted">
          <Clock className="size-3" aria-hidden />
          {expiresIn}
        </span>
      </div>

      <h3 className="mt-3 text-base leading-snug font-semibold text-balance text-ink">
        <Link
          href={`/gupt-charcha/${id}`}
          className="after:absolute after:inset-0 after:rounded-2xl"
        >
          {title}
        </Link>
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-line pt-3.5">
        <BeenThereButton count={beenThere} compact />
        <span className="inline-flex items-center gap-1.5 text-xs text-muted">
          <MessagesSquare className="size-3.5" aria-hidden />
          {perspectiveCount} shared what happened to them
        </span>
        <span className="ml-auto text-[11px] text-muted">{postedAgo}</span>
      </div>
    </article>
  );
}
