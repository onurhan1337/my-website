"use client";

import type { SocialButtonProps } from "@/types";
import IconArrowRightUp from "./shared/icons/arrow-right-up";
import IconUpwork from "./shared/icons/upwork";
import IconGithub from "./shared/icons/github";
import IconX from "./shared/icons/x";
import { trackClick } from "@/lib/actions/track-click";
import type { ClickType } from "@/lib/click-tracking";

import Link from "next/link";

function handleTrackClick(clickType: ClickType) {
  trackClick(clickType).catch((error) => {
    console.error("Failed to track click:", error);
  });
}

function SocialButton({
  href,
  children,
  clickType,
}: SocialButtonProps & {
  clickType?: ClickType;
}) {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      passHref
      className="flex w-full border border-foreground/10 rounded-lg p-4 no-underline items-center hover:bg-foreground/2 hover:border-foreground/20 transition-all justify-between group"
      onClick={clickType ? () => handleTrackClick(clickType) : undefined}
    >
      {children}
      <div className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <IconArrowRightUp />
      </div>
    </Link>
  );
}

export default function Social() {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:gap-2">
      <SocialButton
        href="https://www.upwork.com/freelancers/~018ec24713c9a36406?mp_source=share"
        clickType="MAIN_PAGE:UPWORK"
      >
        <div className="flex flex-row items-center">
          <IconUpwork />
          <span className="ml-3 text-[15px] tracking-tight">Upwork</span>
        </div>
      </SocialButton>
      <SocialButton href="https://github.com/onurhan1337">
        <div className="flex flex-row items-center">
          <IconGithub />
          <span className="ml-3 text-[15px] tracking-tight">Github</span>
        </div>
      </SocialButton>
      <SocialButton href="https://x.com/onurhan1337">
        <div className="flex flex-row items-center">
          <IconX />
          <span className="ml-3 text-[15px] tracking-tight">X / Twitter</span>
        </div>
      </SocialButton>
    </div>
  );
}
