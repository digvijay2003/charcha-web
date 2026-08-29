import { sideLabels } from "@/lib/vivaad-data";

type SplitBarProps = {
  /** Percentage currently on Paksh's side; Vipaksh gets the remainder. */
  paksh: number;
  /** Points gained by Paksh since opening. Negative means Vipaksh gained. */
  shift: number;
  size?: "sm" | "lg";
};

/**
 * A charcha has one number, so it gets a ring. A vivaad has two sides plus the
 * movement between them, which a ring cannot express — hence a split bar.
 */
export default function SplitBar({ paksh, shift, size = "sm" }: SplitBarProps) {
  const clamped = Math.max(0, Math.min(100, paksh));
  const vipaksh = 100 - clamped;
  const gainer = shift > 0 ? "paksh" : "vipaksh";

  return (
    <div className="w-full">
      <div
        className={`flex items-baseline justify-between gap-3 ${size === "lg" ? "text-sm" : "text-xs"}`}
      >
        <span className="font-semibold text-accent-pink">
          <span className="font-deva">{sideLabels.paksh.deva}</span>{" "}
          {sideLabels.paksh.latin} {clamped}%
        </span>
        <span className="font-semibold text-accent-mint">
          {vipaksh}% {sideLabels.vipaksh.latin}{" "}
          <span className="font-deva">{sideLabels.vipaksh.deva}</span>
        </span>
      </div>

      <div
        role="img"
        aria-label={`Paksh ${clamped} percent, Vipaksh ${vipaksh} percent`}
        className={`mt-2 flex gap-0.5 ${size === "lg" ? "h-3" : "h-2.5"}`}
      >
        <div
          className="rounded-l-full bg-pink transition-[width] duration-700 ease-out"
          style={{ width: `${clamped}%` }}
        />
        <div className="flex-1 rounded-r-full bg-mint" />
      </div>

      {/* The movement is the headline: persuasion, not popularity. */}
      <p className="mt-2 text-center text-[11px] font-medium text-muted">
        {shift === 0 ? (
          "No movement since opening"
        ) : (
          <>
            <span
              className={
                gainer === "paksh" ? "text-accent-pink" : "text-accent-mint"
              }
            >
              ▲ {Math.abs(shift)} pts to{" "}
              {gainer === "paksh"
                ? sideLabels.paksh.latin
                : sideLabels.vipaksh.latin}
            </span>{" "}
            since opening
          </>
        )}
      </p>
    </div>
  );
}
