type Person = {
  cx: number;
  cy: number;
  tint: string;
  accent: string;
  dot: string;
  /** Curve from the centre node out to this person. */
  path: string;
};

const people: Person[] = [
  {
    cx: 58,
    cy: 112,
    tint: "var(--soft-purple)",
    accent: "var(--accent-purple)",
    dot: "#6d3df5",
    path: "M200,180 Q120,134 58,112",
  },
  {
    cx: 342,
    cy: 98,
    tint: "var(--soft-mint)",
    accent: "var(--accent-mint)",
    dot: "#35c99a",
    path: "M200,180 Q276,126 342,98",
  },
  {
    cx: 74,
    cy: 286,
    tint: "var(--soft-orange)",
    accent: "var(--accent-orange)",
    dot: "#ff9b54",
    path: "M200,180 Q130,246 74,286",
  },
  {
    cx: 330,
    cy: 274,
    tint: "var(--soft-pink)",
    accent: "var(--accent-pink)",
    dot: "#e85aad",
    path: "M200,180 Q272,238 330,274",
  },
];

/** Head-and-shoulders glyph, drawn in lucide's stroke style. */
function PersonGlyph({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  return (
    <g stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none">
      <circle cx={cx} cy={cy - 5} r="6.2" />
      <path d={`M${cx - 9.5},${cy + 12} a9.5,9.5 0 0 1 19,0`} />
    </g>
  );
}

export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 400 360"
      role="img"
      aria-label="Four people connected around a shared discussion, with ideas and messages floating above"
      className="h-auto w-full max-w-[400px]"
    >
      <defs>
        <linearGradient id="charcha-hero-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6d3df5" />
          <stop offset="55%" stopColor="#e85aad" />
          <stop offset="100%" stopColor="#ff9b54" />
        </linearGradient>
      </defs>

      {/* Soft ambient colour, kept low-contrast so it stays background. */}
      <g opacity="0.55">
        <circle cx="88" cy="78" r="64" fill="var(--soft-purple)" />
        <circle cx="322" cy="252" r="58" fill="var(--soft-pink)" />
        <circle cx="316" cy="66" r="42" fill="var(--soft-orange)" />
        <circle cx="72" cy="272" r="46" fill="var(--soft-mint)" />
      </g>

      {/* Connections between each person and the discussion. */}
      <g
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="1.6"
        strokeDasharray="4 6"
        strokeLinecap="round"
      >
        {people.map((person) => (
          <path key={`link-${person.cx}`} d={person.path} />
        ))}
      </g>

      {/* Centre: the Charcha mark as the shared ground. */}
      <rect
        x="156"
        y="136"
        width="88"
        height="88"
        rx="26"
        fill="var(--surface)"
        stroke="var(--line)"
        strokeWidth="1.5"
      />
      <g fill="none" stroke="url(#charcha-hero-grad)" strokeWidth="2.4">
        <circle cx="192" cy="180" r="15" />
        <circle cx="208" cy="180" r="15" opacity="0.7" />
      </g>
      <circle cx="200" cy="180" r="3" fill="url(#charcha-hero-grad)" />

      {/* People */}
      {people.map((person) => (
        <g key={`person-${person.cx}`}>
          <circle
            cx={person.cx}
            cy={person.cy}
            r="27"
            fill={person.tint}
            stroke="var(--surface)"
            strokeWidth="3"
          />
          <PersonGlyph cx={person.cx} cy={person.cy} color={person.accent} />
          <circle
            cx={person.cx + 19}
            cy={person.cy - 19}
            r="5.5"
            fill={person.dot}
            stroke="var(--surface)"
            strokeWidth="2"
          />
        </g>
      ))}

      {/* A message in progress */}
      <g>
        <rect
          x="150"
          y="34"
          width="66"
          height="42"
          rx="15"
          fill="var(--surface)"
          stroke="var(--line)"
          strokeWidth="1.5"
        />
        <path
          d="M170,74 L166,86 L182,75 Z"
          fill="var(--surface)"
          stroke="var(--line)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <g fill="var(--accent-purple)">
          <circle cx="169" cy="55" r="3.4" />
          <circle cx="183" cy="55" r="3.4" opacity="0.7" />
          <circle cx="197" cy="55" r="3.4" opacity="0.45" />
        </g>
      </g>

      {/* An idea */}
      <g>
        <circle
          cx="316"
          cy="42"
          r="23"
          fill="var(--surface)"
          stroke="var(--line)"
          strokeWidth="1.5"
        />
        <g
          stroke="var(--accent-orange)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M310,45 a7.5,7.5 0 1 1 12,0 c-1.4,1.8 -2,3 -2,4.6 h-8 c0-1.6 -0.6-2.8 -2-4.6 Z" />
          <path d="M312.5,53.5 h7" />
        </g>
      </g>
    </svg>
  );
}
