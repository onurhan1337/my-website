"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./shared/container";
import { ModeToggle } from "./ui/theme-toggle";

const NAV_ITEMS = {
  about: "/",
  blog: "/blog",
  work: "/work",
};

export const Header = () => {
  const pathname = usePathname();

  return (
    <header>
      <Container size="large">
        <nav
          className="flex flex-col fade items-center md:items-start justify-start py-8 tracking-tight w-full sm:pr-0 md:pr-6 lg:pr-0"
          aria-label="Main navigation"
        >
          <div className="flex flex-row items-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
                priority={true}
              />
              <span className="sr-only">Onurhan Demir</span>
            </Link>

            <div className="flex flex-col ml-4">
              <span className="text-medium inline-block font-medium">
                Onurhan Demir
              </span>
              <span className="opacity-60">frontend engineer</span>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between sm:justify-end w-full mt-8 sm:mt-4 mb-0 sm:mb-4 tracking-tight">
            <div className="inline-flex items-center">
              {Object.entries(NAV_ITEMS).map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className={cn(
                    pathname === href ? "font-semibold" : "font-normal",
                    "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
                  )}
                >
                  {name}
                </Link>
              ))}
            </div>
            <ModeToggle />
          </div>
        </nav>
      </Container>
    </header>
  );
};
