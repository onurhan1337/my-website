import { SocialButtonProps } from "@/types";
import IconArrowRightUp from "./shared/icons/arrow-right-up";
import IconYoutube from "./shared/icons/youtube";
import IconGithub from "./shared/icons/github";
import IconCv from "./shared/icons/cv";

import Link from "next/link";

function SocialButton({ href, children }: SocialButtonProps) {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      passHref
      className="flex w-full border border-foreground/10 rounded-lg p-4 no-underline items-center hover:bg-foreground/[0.02] hover:border-foreground/20 transition-all justify-between group"
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
      <SocialButton href="https://youtube.com/@onurhandev">
        <div className="flex flex-row items-center">
          <IconYoutube />
          <span className="ml-3 text-[15px] tracking-tight">Youtube</span>
        </div>
      </SocialButton>
      <SocialButton href="https://github.com/onurhan1337">
        <div className="flex flex-row items-center">
          <IconGithub />
          <span className="ml-3 text-[15px] tracking-tight">Github</span>
        </div>
      </SocialButton>
      <SocialButton href="https://read.cv/onurhan">
        <div className="flex flex-row items-center">
          <IconCv />
          <span className="ml-3 text-[15px] tracking-tight">Read.cv</span>
        </div>
      </SocialButton>
    </div>
  );
}
