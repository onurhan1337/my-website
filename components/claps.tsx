"use client";

import { memo } from "react";
import Claps from "@upstash/claps";

const ClapsButton = memo(function ClapsButton({
  postKey,
}: {
  postKey: string;
}) {
  return <Claps fixed="left" shareButton={false} key={postKey} />;
});

ClapsButton.displayName = "ClapsButton";

export default ClapsButton;
