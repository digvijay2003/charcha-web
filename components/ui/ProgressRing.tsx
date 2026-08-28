const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type ProgressRingProps = {
  /** 0–100. */
  value: number;
  /** Tailwind text-* class; the arc is drawn with currentColor. */
  colorClass: string;
  label?: string;
};

export default function ProgressRing({
  value,
  colorClass,
  label = "Agree",
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const offset = CIRCUMFERENCE * (1 - clamped / 100);

  return (
    <div
      role="img"
      aria-label={`${clamped}% of participants agree`}
      className={`flex shrink-0 flex-col items-center gap-1 ${colorClass}`}
    >
      <div className="relative size-12">
        <svg viewBox="0 0 48 48" className="size-12 -rotate-90">
          <circle
            cx="24"
            cy="24"
            r={RADIUS}
            fill="none"
            strokeWidth="4"
            className="stroke-line"
          />
          <circle
            cx="24"
            cy="24"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-xs font-bold text-ink">
          {clamped}%
        </span>
      </div>
      <span className="text-[10px] font-medium tracking-wide text-muted">
        {label}
      </span>
    </div>
  );
}
