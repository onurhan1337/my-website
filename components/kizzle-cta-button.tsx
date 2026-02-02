"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Link from "next/link";

export const KIZZLE_URL = "https://kizzle.studio?utm_source=onurhan.dev&utm_medium=website&utm_campaign=portfolio";

interface KizzleCTAButtonProps {
  text?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export function KizzleCTAButton({
  text = "Get Started",
  href = KIZZLE_URL,
  className,
  onClick,
}: KizzleCTAButtonProps) {
  const buttonContent = (
    <>
      <Box />
      <span className="font-medium text-white tracking-tight text-[15px] leading-[22px] opacity-90">{text}</span>
    </>
  );

  const buttonClasses = cn(
    "relative rounded-[8px] flex items-center gap-2 pl-[61px] pr-5 tracking-tight cursor-pointer h-[52px] bg-[#0a0a0a] hover:scale-[1.02] active:scale-[0.98] transition-all border border-neutral-800 max-w-[200px] mx-auto sm:max-w-none sm:mx-0",
    className
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {buttonContent}
    </button>
  );
}

function Box() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 16);
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const lightningShape: [number, number][] = [
    [0, 3],
    [1, 2],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 2],
    [4, 1],
  ];

  const isLightning = (row: number, col: number) => {
    if (step < 2) return false;

    const strikeProgress = step - 2;

    if (strikeProgress < 5) {
      return lightningShape.some(
        ([r, c]) => r === row && c === col && r <= strikeProgress
      );
    } else if (strikeProgress < 10) {
      return lightningShape.some(([r, c]) => r === row && c === col);
    } else {
      return false;
    }
  };

  return (
    <div className="absolute inset-y-0 left-1.5 my-auto w-11 h-10 rounded-[4px] bg-[#FFFF3F] flex flex-col justify-center items-center gap-px transition-all duration-400 ease-out shadow-sm">
      {[0, 1, 2, 3, 4].map((row) => (
        <div key={row} className="flex gap-[2px]">
          {[0, 1, 2, 3, 4].map((col) => (
            <Bubble key={col} highlight={isLightning(row, col)} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Bubble({ highlight }: { highlight?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block size-[3px] bg-black/25",
        highlight && "bg-black animate-pulse"
      )}
    />
  );
}
