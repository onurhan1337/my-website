"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";

const headerItems = {
  "/": {
    name: "home",
  },
  "/about": {
    name: "about",
  },
  "/post": {
    name: "post",
  },
};

const MainNav = () => {
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
        {Object.entries(headerItems).map(([path, { name }]) => {
          const isActive = path === pathname;
          return (
            <Button variant={"link"} key={path} asChild>
              <Link href={path}>
                {path === pathname ? (
                  <span className="font-semibold">{name}</span>
                ) : (
                  name
                )}
              </Link>
            </Button>
          );
        })}
      </nav>
    </header>
  );
};

export default MainNav;
