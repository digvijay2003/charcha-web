import ClosingSoon from "@/components/widgets/ClosingSoon";
import PopularTopics from "@/components/widgets/PopularTopics";
import UnseenPerspective from "@/components/widgets/UnseenPerspective";
import type { Mode } from "@/lib/modes";

/**
 * Rail content is per-room. Gupt-Charcha gets none at all — a room built on
 * not being watched should not carry a sidebar of metrics.
 */
export default function RailContent({
  mode,
  idSuffix = "",
}: {
  mode: Mode;
  idSuffix?: string;
}) {
  if (mode === "gupt") return null;

  return (
    <>
      {mode === "charcha" ? (
        <UnseenPerspective idSuffix={idSuffix} />
      ) : (
        <ClosingSoon idSuffix={idSuffix} />
      )}
      <PopularTopics idSuffix={idSuffix} />
    </>
  );
}
