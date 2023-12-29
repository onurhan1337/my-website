"use client";

import React, { useState, useRef, useCallback } from "react";
import { Portal } from "@radix-ui/react-portal";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LOGOS, LOGO_WIDTH } from "@/lib/constants";
import { useAnimationFrame } from "@/lib/hooks/useAnimationFrame";

const TechStackSlider = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [translateX, setTranslateX] = useState<number>(0);

  const animate = useCallback(() => {
    if (sliderRef.current) {
      setTranslateX((prevTranslateX) =>
        prevTranslateX - 1 <= -LOGO_WIDTH
          ? prevTranslateX + LOGO_WIDTH
          : prevTranslateX - 1
      );
    }
  }, []);

  useAnimationFrame(animate);

  return (
    <div
      className="relative m-auto w-full overflow-hidden bg-white dark:bg-[#111010] before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] after:content-[''] dark:before:bg-[linear-gradient(to_right,#111010_0%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(to_right,#111010_0%,rgba(0,0,0,0)_100%)]
    "
    >
      <div
        ref={sliderRef}
        style={{ transform: `translateX(${translateX}px)` }}
        className={cn("flex w-[calc(250px*10)] animate-infinite-slider")}
      >
        {LOGOS.map((logo, index) => (
          <div
            className={"slide flex w-[125px] items-center justify-center"}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
            key={index}
          >
            <TooltipProvider>
              <Tooltip key={index} delayDuration={300}>
                <TooltipTrigger>{logo.icon}</TooltipTrigger>
                {hoveredItem === index && logo.name && (
                  <Portal>
                    <TooltipContent>
                      <p>{logo.name}</p>
                    </TooltipContent>
                  </Portal>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
        {LOGOS.map((logo, index) => (
          <div
            className={"slide flex w-[125px] items-center justify-center"}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
            key={index}
          >
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={300}>
                <TooltipTrigger>{logo.icon}</TooltipTrigger>
                {hoveredItem === index && logo.name && (
                  <Portal>
                    <TooltipContent>
                      <p>{logo.name}</p>
                    </TooltipContent>
                  </Portal>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackSlider;
