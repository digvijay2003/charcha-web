import { Sparkles, TrendingUp } from "lucide-react";

import WidgetCard from "@/components/widgets/WidgetCard";
import { accentStyles } from "@/lib/accents";
import { insights } from "@/lib/mock-data";

export default function InsightsCard({ idSuffix = "" }: { idSuffix?: string }) {
  return (
    <WidgetCard idSuffix={idSuffix} title="Charcha Insights" icon={Sparkles}>
      <ul className="divide-y divide-line">
        {insights.map(({ value, label, delta, accent }) => {
          const styles = accentStyles[accent];
          const isTrend = delta.startsWith("+");

          return (
            <li key={label} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-2">
                <p className="text-2xl leading-none font-bold tracking-tight text-ink">
                  {value}
                </p>
                <span
                  className={`ml-auto inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${styles.chip}`}
                >
                  {isTrend ? (
                    <TrendingUp className="size-3" aria-hidden />
                  ) : null}
                  {delta}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-muted">{label}</p>
            </li>
          );
        })}
      </ul>
    </WidgetCard>
  );
}
