import Link from "next/link";
import { Eye } from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import WidgetCard from "@/components/widgets/WidgetCard";
import { unseenPerspective } from "@/lib/mock-data";

/** Not "what's trending" — the view you are least likely to have already read. */
export default function UnseenPerspective({ idSuffix = "" }: { idSuffix?: string }) {
  const { discussionId, topic, stance, share, body, author } = unseenPerspective;

  return (
    <WidgetCard
      idSuffix={idSuffix}
      title="A perspective you haven't seen"
      icon={Eye}
      iconClass="text-mode"
    >
      <p className="text-[11px] font-medium text-muted">
        On <span className="text-ink">{topic}</span>
      </p>

      <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-soft-mode px-2.5 py-1 text-[11px] font-semibold text-mode">
        {stance} · held by {share}%
      </p>

      <blockquote className="mt-3 border-l-2 border-line pl-3 text-[13px] leading-relaxed text-ink/85">
        {body}
      </blockquote>

      <div className="mt-3 flex items-center gap-2">
        <Avatar name={author} size="xs" decorative />
        <span className="text-xs text-muted">{author}</span>
      </div>

      <Link
        href={`/discussions/${discussionId}`}
        className="mt-3 inline-block text-xs font-semibold text-mode hover:underline"
      >
        Read the full thread
      </Link>
    </WidgetCard>
  );
}
