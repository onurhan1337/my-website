import Link from "next/link";

import IconArrowRightUp from "./icons/arrow-right-up";
import IconYoutube from "./icons/youtube";
import IconGithub from "./icons/github";

import { SocialButtonProps } from "@/types";
import IconCv from "./icons/cv";

function SocialButton({ href, children }: SocialButtonProps) {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      passHref
      className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
    >
      {children}
      <IconArrowRightUp />
    </Link>
  );
}

export default function Social() {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:gap-2">
      <SocialButton href="https://youtube.com/@onurhandev">
        <div className="flex flex-row items-center">
          <IconYoutube />
          <span className="ml-3">Youtube</span>
        </div>
      </SocialButton>
      <SocialButton href="https://github.com/onurhan1337">
        <div className="flex flex-row items-center">
          <IconGithub />
          <span className="ml-3">Github</span>
        </div>
      </SocialButton>
      <SocialButton href="https://read.cv/onurhan">
        <div className="flex flex-row items-center">
          <IconCv />
          <span className="ml-3">Read.cv</span>
        </div>
      </SocialButton>
    </div>
  );
}
