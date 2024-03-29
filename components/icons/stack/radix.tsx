import React from "react";
import type { ISVGProps } from "@/types";

export default function IconRadixUi({ size = 24, ...props }: ISVGProps) {
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
      <title>Radix UI</title>
      <path d="M11.52 24a7.68 7.68 0 0 1-7.68-7.68 7.68 7.68 0 0 1 7.68-7.68V24Zm0-24v7.68H3.84V0h7.68Zm4.8 7.68a3.84 3.84 0 1 1 0-7.68 3.84 3.84 0 0 1 0 7.68Z" />
    </svg>
  );
}
