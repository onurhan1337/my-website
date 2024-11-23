"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

interface ExpandableCodeProps {
  children: React.ReactNode;
  maxHeight?: number;
  className?: string;
}

export function ExpandableCode({
  children,
  maxHeight = 400,
  className,
}: ExpandableCodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setShouldShowButton(contentRef.current.scrollHeight > maxHeight);
    }
  }, [maxHeight]);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div className={cn("bg-zinc-50 dark:bg-neutral-950 rounded-lg", className)}>
      <div
        ref={contentRef}
        className={cn(
          "relative transition-all duration-300 ease-in-out",
          !isExpanded && "max-h-[400px]"
        )}
        style={{
          overflow: isExpanded ? "visible" : "hidden",
        }}
      >
        {children}
        {!isExpanded && shouldShowButton && (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-50 dark:from-neutral-950 to-transparent" />
        )}
      </div>

      {shouldShowButton && (
        <div className="flex justify-center mt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleExpand}
            className={cn(
              "text-xs gap-1 h-7 text-neutral-400",
              "hover:text-neutral-500 hover:bg-transparent dark:hover:text-neutral-500 dark:hover:bg-neutral-950",
              "transition-all duration-200"
            )}
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                Show More <ChevronDown className="h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
