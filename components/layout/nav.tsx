"use client";

import useMediaQuery from "@/lib/hooks/use-media-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Text } from "../ui/text";
import { ModeToggle, ModeToggleWithLabel } from "../ui/theme-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = {
  "/": {
    name: "home",
  },
  "/about": {
    name: "about",
  },
  "/blog": {
    name: "blog",
  },
};

export function Navbar() {
  const { isMobile } = useMediaQuery();

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </aside>
  );
}

const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <div className="lg:sticky lg:top-20">
      <nav
        className="flex flex-row items-center justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
        id="nav"
      >
        <Link href={"/"}>
          <Image src="/logo.svg" alt="logo" width={30} height={30} />
        </Link>

        <div className="flex flex-row items-center gap-4">
          <div className="inline-flex items-center">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link key={path} href={path}>
                  <span
                    className={cn(
                      pathname === path ? "font-semibold" : "font-normal",
                      "transition-all dark:hover:text-neutral-200 text-neutral-800 dark:text-neutral-400 hover:text-neutral-600 flex align-middle relative px-2"
                    )}
                  >
                    {name}
                  </span>
                </Link>
              );
            })}
          </div>
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
};

const MobileNav = () => {
  return (
    <div className="flex flex-row items-center justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative">
      <Link href={"/"}>
        <Image src="/logo.svg" alt="logo" width={30} height={30} />
      </Link>

      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <Link
                href={"/"}
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Image src="/logo.svg" alt="logo" width={30} height={30} />
                <span className="sr-only">Onurhan Demir</span>
              </Link>
            </SheetTitle>
          </SheetHeader>

          <div>
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link key={path} href={path}>
                  <Text as="p" styleVariant="muted">
                    {name}
                  </Text>
                </Link>
              );
            })}

            <ModeToggleWithLabel />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
