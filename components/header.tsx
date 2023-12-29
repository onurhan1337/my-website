"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const HEADER_ITEMS = {
  "/": "home",
  "/about": "about",
  "/post": "post",
  "/snippet": "snippet",
  "/guestbook": "guestbook",
};

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex flex-col py-8 sm:py-5 items-center bg-white dark:bg-[#111010]">
      <nav
        id="nav"
        className={
          "dark:bg-[#111010] font-mono text-xs grow justify-end items-center flex gap-1"
        }
      >
        {Object.entries(HEADER_ITEMS).map(([key, value]) => {
          const isActive = key === pathname;
          return (
            <Button variant={"link"} className="py-1 px-2" key={key} asChild>
              <Link
                href={key}
                className={cn(
                  isActive
                    ? "font-semibold underline text-zinc-700 dark:text-zinc-100"
                    : "text-zinc-700 dark:text-zinc-300"
                )}
              >
                {value}
              </Link>
            </Button>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
