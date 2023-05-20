"use client";

import Claps from "@upstash/claps";

interface ClapsButtonProps {
  url: string | undefined;
}

export default function ClapsButton({ url }: ClapsButtonProps) {
  return <Claps replyUrl={url} />;
}
