import WidgetStack from "@/components/widgets/WidgetStack";

export default function RightRail() {
  return (
    <aside
      aria-label="Community insights"
      className="rail-scroll sticky top-0 hidden h-dvh w-[288px] shrink-0 flex-col gap-4 overflow-y-auto border-l border-line px-4 py-5 xl:flex"
    >
      <WidgetStack />
    </aside>
  );
}
