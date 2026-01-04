"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import type { AvailabilityBadgeProps } from "@/types";

export const AvailabilityBadge = memo(function AvailabilityBadge({
  className,
  onClick,
}: AvailabilityBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium tracking-tight",
        "border border-foreground/10 hover:border-foreground/20",
        "hover:bg-foreground/2",
        "transition-all",
        className
      )}
      aria-label="Available for work - Click for details"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-foreground opacity-40 animate-ping"></span>
        <span className="absolute inline-flex h-full w-full rounded-full bg-foreground opacity-30 animate-pulse"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-foreground opacity-70"></span>
      </span>
      <span className="opacity-75">Available for work</span>
    </button>
  );
});
