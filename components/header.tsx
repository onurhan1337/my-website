"use client";

import { memo, useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./shared/container";
import { AvailabilityBadge } from "./availability-badge";
import { AvailabilityDialog } from "./availability-dialog";
import { appConfig } from "@/lib/config";

const NAV_ITEMS = {
  about: "/",
  blog: "/blog",
  thoughts: "/thoughts",
  work: "/work",
  projects: "/projects",
} as const;

export const Header = memo(function Header() {
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navLinks = useMemo(
    () =>
      Object.entries(NAV_ITEMS).map(([name, href]) => (
        <Link
          key={name}
          href={href}
          className={cn(
            pathname === href ? "opacity-100" : "opacity-50",
            "transition-opacity hover:opacity-100 py-1 px-2 first:pl-0 text-[15px]"
          )}
        >
          {name}
        </Link>
      )),
    [pathname]
  );

  return (
    <header>
      <Container size="large">
        <nav
          className="flex flex-col fade items-center md:items-start justify-start py-12 tracking-tight w-full"
          aria-label="Main navigation"
        >
          <div className="flex flex-row items-start gap-3">
              <Image src="/images/onurhan_demir.png" className="size-[74px] rounded-lg border border-foreground/10 bg-foreground/4 object-cover shadow-sm" alt="Onurhan Demir" width={100} height={100} />
            <div className="flex flex-col items-start">
              <div className="flex flex-col items-start pb-2">
                <span className="text-base font-medium">Onurhan Demir</span>
                <span className="text-sm opacity-50 tracking-tight leading-tight">developer advocate · frontend</span>
              </div>
              {appConfig.availability.enabled && (
                <AvailabilityBadge onClick={() => setIsDialogOpen(true)} />
              )}
            </div>
          </div>
          {appConfig.availability.enabled && (
            <AvailabilityDialog
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            />
          )}

          <div className="flex flex-row items-center justify-center sm:justify-start w-full mt-12 sm:mt-6 tracking-tight">
            <div className="inline-flex items-center gap-1">{navLinks}</div>
          </div>
        </nav>
      </Container>
    </header>
  );
});
