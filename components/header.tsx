"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname() ?? "/";
  const home = pathname === "/" || pathname === "/index.html";
  if (home) return null;

  return (
    <header className="mb-20 text-small sm:mb-24">
      <Link href="/" className="link">
        Onurhan Demir
      </Link>
    </header>
  );
}
