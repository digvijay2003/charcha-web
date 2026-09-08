import Link from "next/link";
import { Timer } from "lucide-react";

import WidgetCard from "@/components/widgets/WidgetCard";
import { vivaads } from "@/lib/vivaad-data";

/** Time pressure is the point of a debate; surface it instead of vanity counts. */
export default function ClosingSoon({ idSuffix = "" }: { idSuffix?: string }) {
  const soon = vivaads.filter((v) => v.stage !== "verdict").slice(0, 3);

  return (
    <WidgetCard
      idSuffix={idSuffix}
      title="Closing soon"
      icon={Timer}
      iconClass="text-mode"
    >
      <ul className="flex flex-col gap-3">
        {soon.map((v) => (
          <li key={v.id}>
            <Link href={`/vaad-vivaad/${v.id}`} className="group block">
              <p className="text-[13px] leading-snug font-medium text-ink group-hover:text-mode">
                {v.motion}
              </p>
              <div className="mt-1.5 flex h-1.5 gap-0.5" aria-hidden>
                <div className="rounded-l-full bg-pink" style={{ width: `${v.currentSplit}%` }} />
                <div className="flex-1 rounded-r-full bg-mint" />
              </div>
              <p className="mt-1.5 text-[11px] font-medium text-muted">
                {v.closesIn} · {v.argumentCount} arguments
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
