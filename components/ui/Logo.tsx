import Image from "next/image";
import Link from "next/link";

/**
 * The brand mark: a C built from two overlapping speech bubbles. The indigo
 * end of its gradient is near-invisible on the dark canvas, so it sits on a
 * light tile there - unboxed in light mode, where it needs nothing.
 */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="inline-grid shrink-0 place-items-center rounded-lg dark:bg-[#f4f3fa] dark:p-[3px]"
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/charcha-mark.png"
        alt=""
        width={size}
        height={size}
        priority
        className="h-full w-full"
      />
    </span>
  );
}

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 rounded-lg"
      aria-label="Charcha home"
    >
      <LogoMark />
      <span className="text-[15px] font-bold tracking-[0.16em] text-ink">
        CHARCHA
      </span>
    </Link>
  );
}
