/**
 * A thread-scoped identity. The pattern is derived from the handle, which is
 * seeded per thread — so the same person carries a different mark in every
 * thread and nothing links across the platform. Deterministic so SSR matches.
 */
function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export default function AnonHandle({
  handle,
  size = "sm",
}: {
  handle: string;
  size?: "sm" | "md";
}) {
  const bits = hash(handle);
  // Mirrored 3x3 so the mark reads as a deliberate shape, not noise.
  const cells = Array.from({ length: 9 }, (_, i) => {
    const column = i % 3;
    const source = column === 2 ? i - 2 : i;
    return ((bits >> source) & 1) === 1;
  });

  const box = size === "md" ? "size-9" : "size-7";

  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className={`grid shrink-0 grid-cols-3 gap-px rounded-lg bg-soft-gupt p-1.5 ${box}`}
      >
        {cells.map((on, i) => (
          <span
            key={i}
            className={`rounded-[1px] ${on ? "bg-gupt" : "bg-transparent"}`}
          />
        ))}
      </span>
      <span className="font-mono text-xs font-medium text-muted">
        Gupt&nbsp;#{handle}
      </span>
    </span>
  );
}
