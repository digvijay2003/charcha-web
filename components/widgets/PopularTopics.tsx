import Link from "next/link";
import { Tag } from "lucide-react";

import WidgetCard from "@/components/widgets/WidgetCard";
import { accentStyles } from "@/lib/accents";
import { topics } from "@/lib/mock-data";

export default function PopularTopics({ idSuffix = "" }: { idSuffix?: string }) {
  return (
    <WidgetCard
      idSuffix={idSuffix}
      title="Popular Topics"
      icon={Tag}
      action={
        <Link
          href="/explore"
          className="text-xs font-semibold text-accent-purple hover:text-brand"
        >
          View all
        </Link>
      }
    >
      <ul className="flex flex-col gap-0.5">
        {topics.map(({ name, count, icon: Icon, accent }) => {
          const styles = accentStyles[accent];

          return (
            <li key={name}>
              <Link
                href={`/topics/${name.toLowerCase()}`}
                className="flex items-center gap-2.5 rounded-lg px-1.5 py-2 transition-colors hover:bg-canvas"
              >
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-lg ${styles.tile}`}
                  aria-hidden
                >
                  <Icon className="size-3.5" />
                </span>
                <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">
                  {name}
                </span>
                <span className="shrink-0 text-xs font-semibold text-muted">
                  {count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </WidgetCard>
  );
}
