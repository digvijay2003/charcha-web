import type { ReactNode } from "react";

import BottomBanner from "@/components/home/BottomBanner";
import MobileNav from "@/components/layout/MobileNav";
import RailContent from "@/components/layout/RailContent";
import RoomHeader from "@/components/layout/RoomHeader";
import Topbar from "@/components/layout/Topbar";
import type { Mode } from "@/lib/modes";

export default function AppShell({
  mode,
  children,
  stat,
  /** Detail pages render their own heading instead of the room header. */
  showRoomHeader = true,
}: {
  mode: Mode;
  children: ReactNode;
  stat?: string;
  showRoomHeader?: boolean;
}) {
  const hasRail = mode !== "gupt";

  return (
    <div className={`mode-${mode} min-h-dvh bg-canvas`}>
      <Topbar />

      <div className="mx-auto flex w-full max-w-[1560px] items-start">
        <main className="min-w-0 flex-1 px-4 pt-8 pb-28 sm:px-6 lg:px-8 lg:pb-14">
          <div className="mx-auto flex max-w-3xl flex-col gap-8 xl:max-w-none">
            {showRoomHeader ? <RoomHeader mode={mode} stat={stat} /> : null}

            {children}

            {hasRail ? (
              <div className="grid items-start gap-4 sm:grid-cols-2 xl:hidden">
                <RailContent mode={mode} idSuffix="-inline" />
              </div>
            ) : null}

            {/* The brand line belongs in the open room, not over anonymous posts. */}
            {mode === "charcha" ? <BottomBanner /> : null}
          </div>
        </main>

        {hasRail ? (
          <aside
            aria-label="Room highlights"
            className="rail-scroll sticky top-[61px] hidden max-h-[calc(100dvh-61px)] w-[300px] shrink-0 flex-col gap-4 overflow-y-auto py-8 pr-8 xl:flex"
          >
            <RailContent mode={mode} />
          </aside>
        ) : null}
      </div>

      <MobileNav />
    </div>
  );
}
