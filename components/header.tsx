"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";
import SupportButton from "./post/support";

const HEADER_ITEMS = {
  "/": "home",
  "/about": "about",
  "/post": "post",
};

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex flex-col sm:flex-row mb-5 md:mb-10 items-center">
      <span className="text-md md:text-lg whitespace-nowrap font-bold">
        <Link href="/">
          <span className="font-serif cursor-default pr-2">Onurhan Demir</span>
        </Link>
      </span>

      <nav
        id="nav"
        className={
          "font-mono text-xs grow justify-end items-center flex gap-1 md:gap-3"
        }
      >
        {Object.entries(HEADER_ITEMS).map(([key, value]) => {
          const isActive = key === pathname;
          return (
            <Button variant={"link"} key={key} asChild>
              <Link href={key}>
                {isActive ? (
                  <span className="font-semibold">{value}</span>
                ) : (
                  value
                )}
              </Link>
            </Button>
          );
        })}
      </nav>

      <div className="flex flex-row ml-0 sm:ml-4 space-x-2 items-center justify-center sm:justify-end w-28">
        <ThemeToggle />
        <SupportButton />
      </div>
    </header>
  );
};

export default Header;
