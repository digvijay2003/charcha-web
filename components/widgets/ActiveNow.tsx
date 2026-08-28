import { Zap } from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import { activeNow } from "@/lib/mock-data";

import WidgetCard from "@/components/widgets/WidgetCard";

export default function ActiveNow({ idSuffix = "" }: { idSuffix?: string }) {
  return (
    <WidgetCard idSuffix={idSuffix} title="Active Now" icon={Zap} iconClass="text-accent-mint">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2.5">
          {activeNow.people.map((name) => (
            <Avatar key={name} name={name} size="sm" ring decorative />
          ))}
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-soft-purple text-[10px] font-bold text-accent-purple ring-2 ring-surface">
            {activeNow.overflow}
          </span>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
        <span className="size-1.5 shrink-0 rounded-full bg-mint" aria-hidden />
        People are debating right now
      </p>
    </WidgetCard>
  );
}
