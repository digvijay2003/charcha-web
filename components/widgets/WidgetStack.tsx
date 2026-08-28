import ActiveNow from "@/components/widgets/ActiveNow";
import InsightsCard from "@/components/widgets/InsightsCard";
import PopularTopics from "@/components/widgets/PopularTopics";

/** The three community widgets, shared by the right rail and the inline block. */
export default function WidgetStack({ idSuffix = "" }: { idSuffix?: string }) {
  return (
    <>
      <InsightsCard idSuffix={idSuffix} />
      <PopularTopics idSuffix={idSuffix} />
      <ActiveNow idSuffix={idSuffix} />
    </>
  );
}
