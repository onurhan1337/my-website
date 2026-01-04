"use client";

import { memo } from "react";
import Claps from "@upstash/claps";

const ClapsButton = memo(function ClapsButton({ key }: { key: string }) {
  return <Claps fixed="left" shareButton={false} key={key} />;
});

ClapsButton.displayName = "ClapsButton";

export default ClapsButton;
