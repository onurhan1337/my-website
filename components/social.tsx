import Link from "next/link";

import IconArrowRightUp from "./icons/arrow-right-up";
import IconTwitter from "./icons/twitter";
import IconGithub from "./icons/github";
import IconInstagram from "./icons/instagram";

import { SocialButtonProps } from "@/types";

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
      <SocialButton href="https://twitter.com/onurhan1337">
        <div className="flex flex-row items-center">
          <IconTwitter />
          <span className="ml-3">Twitter</span>
        </div>
      </SocialButton>
      <SocialButton href="https://github.com/onurhan1337">
        <div className="flex flex-row items-center">
          <IconGithub />
          <span className="ml-3">Github</span>
        </div>
      </SocialButton>
      <SocialButton href="https://instagram.com/onurhandtr">
        <div className="flex flex-row items-center">
          <IconInstagram />
          <span className="ml-3">Instagram</span>
        </div>
      </SocialButton>
    </div>
  );
}
