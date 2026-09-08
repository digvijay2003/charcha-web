import { LifeBuoy } from "lucide-react";

/**
 * A space for people writing about despair needs a visible, calm route to real
 * help — present by default rather than triggered by keyword detection, which
 * would both miss cases and feel like surveillance when it fires.
 */
export default function SupportNote() {
  return (
    <aside className="flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3">
      <LifeBuoy className="mt-0.5 size-4 shrink-0 text-gupt" aria-hidden />
      <p className="text-xs leading-relaxed text-muted">
        If you are going through a difficult time, talking to someone trained
        helps.{" "}
        <span className="font-semibold text-ink">Tele-MANAS: 14416</span> is a
        free, 24×7 mental health helpline in India.{" "}
        <span className="text-muted">
          Charcha is a community, not a substitute for professional support.
        </span>
      </p>
    </aside>
  );
}
