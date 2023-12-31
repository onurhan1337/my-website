"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ChevronDown, XIcon } from "lucide-react";

const HEADER_ITEMS: Record<string, string> = {
  "/": "home",
  "/about": "about",
  "/post": "post",
  "/snippet": "snippet",
  "/guestbook": "guestbook",
};

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const segment = useSelectedLayoutSegment();
  const path = segment ? `/${segment}` : "/";

  useEffect(() => {
    setIsNavOpen(false);
  }, [segment]);

  return (
    <header className="py-8 sm:py-5 bg-white dark:bg-[#111010]">
      {isNavOpen && (
        <span>
          <XIcon
            className="text-zinc-700 dark:text-zinc-400 opacity-50"
            onClick={() => setIsNavOpen(false)}
          />
        </span>
      )}
      <nav
        id="nav"
        className={cn(
          isNavOpen ? "flex items-baseline" : "hidden",
          "dark:bg-[#111010] font-mono text-xs grow flex-col gap-1 sm:flex sm:flex-row sm:justify-center"
        )}
      >
        {Object.entries(HEADER_ITEMS).map(([key, value]) => {
          const isActive = key === path;
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

      {!isNavOpen && (
        <button
          type="button"
          className="flex select-none items-center gap-1 sm:hidden"
          onClick={() => {
            setIsNavOpen(true);
          }}
        >
          <span className="text-zinc-700 dark:text-zinc-400">
            {HEADER_ITEMS[path]}
          </span>
          <ChevronDown className="text-zinc-700 dark:text-zinc-400" size={16} />
        </button>
      )}
    </header>
  );
};

export default Header;
