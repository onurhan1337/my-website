"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ui/theme-toggle";

const NAV_ITEMS = {
  About: "/",
  Blog: "/blog",
  // TODO: Projects will be add
  Projects: "/projects",
};

export const Header = () => {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-col items-start justify-start w-full max-w-3xl px-4 py-8 mx-auto"
      aria-label="Main navigation"
    >
      <div className="flex flex-row items-start">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <span className="sr-only">Onurhan Demir</span>
        </Link>

        <div className="flex flex-col ml-4">
          <span className="text-medium inline-block font-medium">
            Onurhan Demir
          </span>
          <span className="opacity-60">frontend engineer</span>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center sm:justify-end w-full space-x-4 mt-8 sm:mt-4 mb-0 sm:mb-4">
        {Object.entries(NAV_ITEMS).map(([name, href]) => (
          <Link key={name} href={href}>
            <span
              className={cn(
                pathname === href ? "font-semibold" : "font-normal",
                "transition-all dark:hover:text-neutral-200 text-neutral-800 dark:text-neutral-400 hover:text-neutral-600 flex align-middle relative px-2"
              )}
            >
              {name}
            </span>
          </Link>
        ))}
        <ModeToggle />
      </div>
    </nav>
  );
};
