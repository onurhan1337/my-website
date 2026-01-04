"use client";

import { memo } from "react";
import Claps from "@upstash/claps";

const ClapsButton = memo(function ClapsButton({
  blogSlug,
}: {
  blogSlug: string;
}) {
  return (
    <Claps
      key={blogSlug}
      fixed="left"
      shareButton={false}
      apiPath="/api/claps"
    />
  );
});

ClapsButton.displayName = "ClapsButton";

export default ClapsButton;
