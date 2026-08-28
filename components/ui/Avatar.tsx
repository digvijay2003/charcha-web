const gradients = [
  "from-brand to-brand-2",
  "from-pink to-brand-2",
  "from-orange to-pink",
  "from-mint to-brand",
  "from-brand-2 to-pink",
  "from-brand to-mint",
];

const sizes = {
  xs: "size-6 text-[9px]",
  sm: "size-8 text-[10px]",
  md: "size-9 text-[11px]",
  lg: "size-10 text-xs",
} as const;

/** Deterministic so the server and client render the same colour. */
function hashName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Overlapping stacks only have room for one letter. */
function initials(name: string, count: number) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, count)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

type AvatarProps = {
  name: string;
  size?: keyof typeof sizes;
  /** Adds a ring so overlapping avatars stay separable. */
  ring?: boolean;
  className?: string;
  decorative?: boolean;
};

export default function Avatar({
  name,
  size = "md",
  ring = false,
  className = "",
  decorative = false,
}: AvatarProps) {
  const gradient = gradients[hashName(name) % gradients.length];
  const letters = initials(name, size === "xs" || size === "sm" ? 1 : 2);

  return (
    <span
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": name })}
      title={decorative ? undefined : name}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-linear-to-br font-semibold tracking-wide text-white select-none ${gradient} ${sizes[size]} ${ring ? "ring-2 ring-surface" : ""} ${className}`}
    >
      {letters}
    </span>
  );
}
