"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Only the active check needs the client; styling is driven off `aria-current`
 * with `aria-[current=page]:` variants, so icons stay server-rendered and the
 * active state is exposed to assistive tech rather than being colour-only.
 */
export default function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={className}
    >
      {children}
    </Link>
  );
}
