"use client";

import Claps from "@upstash/claps";

interface ClapsButtonProps {
  url: string;
}

export default function ClapsButton({ url }: ClapsButtonProps) {
  return <Claps replyUrl={url} />;
}
