"use client";

import Claps from "@upstash/claps";

export default function ClapsButton({ key }: { key: string }) {
  return <Claps shareButton={false} key={key} />;
}
