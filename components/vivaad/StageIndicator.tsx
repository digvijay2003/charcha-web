import { stageLabels, stageOrder, type Stage } from "@/lib/vivaad-data";

/** Timed rounds are what make this a debate rather than a comment thread. */
export default function StageIndicator({ stage }: { stage: Stage }) {
  const currentIndex = stageOrder.indexOf(stage);

  return (
    <ol className="flex items-center gap-1.5">
      {stageOrder.map((s, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <li key={s} className="flex items-center gap-1.5">
            <span
              aria-current={isCurrent ? "step" : undefined}
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap ${
                isCurrent
                  ? "bg-soft-purple text-accent-purple"
                  : isDone
                    ? "text-muted"
                    : "text-muted/60"
              }`}
            >
              {stageLabels[s]}
              {isCurrent ? <span className="sr-only"> (current stage)</span> : null}
            </span>
            {index < stageOrder.length - 1 ? (
              <span aria-hidden className="text-muted/40">
                ›
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
