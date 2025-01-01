"use client";

import Claps from "@upstash/claps";

export default function ClapsButton({ key }: { key: string }) {
  return <Claps fixed="left" shareButton={false} key={key} />;
}
