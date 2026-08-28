import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type WidgetCardProps = {
  title: string;
  icon: LucideIcon;
  iconClass?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Keeps heading ids unique when the widgets render twice (rail + inline). */
  idSuffix?: string;
};

/** Shared shell for the right-rail widgets. */
export default function WidgetCard({
  title,
  icon: Icon,
  iconClass = "text-accent-purple",
  action,
  children,
  className = "",
  idSuffix = "",
}: WidgetCardProps) {
  const headingId = `widget-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}${idSuffix}`;

  return (
    <section
      aria-labelledby={headingId}
      className={`rounded-2xl border border-line bg-surface p-4 shadow-card ${className}`}
    >
      <div className="flex items-center gap-2">
        <Icon className={`size-4 shrink-0 ${iconClass}`} aria-hidden />
        <h2
          id={headingId}
          className="text-[13px] font-bold tracking-tight text-ink"
        >
          {title}
        </h2>
        {action ? <div className="ml-auto shrink-0">{action}</div> : null}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}
