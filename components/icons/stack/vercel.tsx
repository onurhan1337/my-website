import React from "react";
import type { ISVGProps } from "@/types";

export default function IconVercel({ size = 24, ...props }: ISVGProps) {
  return (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      {...props}
      className="fill-slate-800 dark:fill-slate-200"
    >
      <title>Vercel</title>
      <path d="M24 22.525H0l12-21.05 12 21.05z" />
    </svg>
  );
}
