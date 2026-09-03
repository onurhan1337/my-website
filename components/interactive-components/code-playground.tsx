"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { highlight } from "sugar-high";
import { cn } from "@/lib/utils";
import type { CodePlaygroundProps } from "@/types";

const STEP_TRANSITION = {
  x: { duration: 0.2, ease: "easeOut" as const },
  opacity: { duration: 0.15 },
  layout: { duration: 0.2, ease: "easeOut" as const },
};

export const CodePlayground = ({
  steps,
  language = "go",
}: CodePlaygroundProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState(0);
  const [previousCode, setPreviousCode] = useState("");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const highlightDiff = useCallback((currentCode: string, prevCode: string) => {
    if (!prevCode) return highlight(currentCode);

    const currentLines = currentCode.split("\n");
    const prevLines = prevCode.split("\n");

    return currentLines
      .map((line, i) => {
        if (i >= prevLines.length || line !== prevLines[i]) {
          return `<span class="${cn(
            "inline-block w-full relative bg-well",
            'before:content-[""] before:absolute before:-left-4 before:top-0 before:bottom-0 before:w-px before:bg-ink'
          )}">${highlight(line)}</span>`;
        }
        return highlight(line);
      })
      .join("\n");
  }, []);

  const variants = useMemo(
    () => ({
      enter: (direction: number) => ({
        x: direction > 0 ? 12 : -12,
        opacity: 0,
      }),
      center: {
        x: 0,
        opacity: 1,
      },
      exit: (direction: number) => ({
        x: direction > 0 ? -12 : 12,
        opacity: 0,
      }),
    }),
    []
  );

  const playAnimation = useCallback(() => {
    setIsPlaying(true);
    setCurrentStep(0);
    setPreviousCode("");
    setDirection(1);

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          setPreviousCode(steps[prev].code);
          return prev + 1;
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setIsPlaying(false);
          return prev;
        }
      });
    }, 2500);
  }, [steps]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const goToNextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setPreviousCode(steps[currentStep].code);
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
    }
  }, [currentStep, steps]);

  const goToPrevStep = useCallback(() => {
    if (currentStep > 0) {
      setPreviousCode(steps[currentStep].code);
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, steps]);

  // Add error boundary
  if (!steps || steps.length === 0) {
    return (
      <div className="my-8 rounded-md bg-well p-6">
        <p className="text-small text-ink-2">
          No steps provided to the CodePlayground component.
        </p>
      </div>
    );
  }

  return (
    <LayoutGroup>
      <motion.div
        layout
        role="region"
        aria-label="Code Playground"
        className="my-8 rounded-md bg-well p-6"
      >
        <motion.div
          layout
          className="mb-4 flex items-center justify-between gap-4"
        >
          <div className="text-caption text-ink-2" role="status">
            {steps[currentStep].title ||
              `Step ${currentStep + 1}/${steps.length}`}
          </div>
          <div className="font-mono text-caption text-ink-3">
            {currentStep + 1} / {steps.length}
          </div>
        </motion.div>

        <div
          className="relative mb-6 h-px w-full bg-rule"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={((currentStep + 1) / steps.length) * 100}
        >
          <motion.div
            className="absolute left-0 top-0 h-full bg-ink"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </div>

        <motion.div layout className="space-y-4">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              layout
              key={`code-${currentStep}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={STEP_TRANSITION}
              className="w-full overflow-hidden rounded-md border border-rule bg-paper"
            >
              <pre className="overflow-x-auto p-4 font-mono text-caption text-ink">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightDiff(
                      steps[currentStep].code,
                      previousCode
                    ),
                  }}
                />
              </pre>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              layout
              key={`explanation-${currentStep}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={STEP_TRANSITION}
              className="w-full"
              role="region"
              aria-label="Step Explanation"
            >
              <p className="text-small text-ink-2">
                {steps[currentStep].explanation}
              </p>
            </motion.div>
          </AnimatePresence>

          {steps[currentStep].state && (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                layout
                key={`state-${currentStep}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={STEP_TRANSITION}
                className="w-full rounded-md border border-rule bg-paper p-4"
                role="region"
                aria-label="Current State"
              >
                <h4 className="mb-2 text-caption text-ink-2">Current state</h4>
                <pre className="overflow-x-auto font-mono text-caption text-ink">
                  {JSON.stringify(steps[currentStep].state, null, 2)}
                </pre>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>

        <motion.div
          layout
          className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <div className="flex gap-4">
            <button
              onClick={goToPrevStep}
              disabled={currentStep === 0 || isPlaying}
              className="text-small text-ink-2 transition-colors hover:text-ink disabled:cursor-default disabled:text-ink-3 disabled:hover:text-ink-3"
              aria-label="Previous Step"
            >
              ← Previous
            </button>
            <button
              onClick={goToNextStep}
              disabled={currentStep === steps.length - 1 || isPlaying}
              className="text-small text-ink-2 transition-colors hover:text-ink disabled:cursor-default disabled:text-ink-3 disabled:hover:text-ink-3"
              aria-label="Next Step"
            >
              Next →
            </button>
          </div>
          <button
            onClick={playAnimation}
            disabled={isPlaying}
            className="rounded bg-ink px-3 py-1.5 text-small text-paper transition-colors disabled:cursor-default disabled:bg-well disabled:text-ink-3"
            aria-label={isPlaying ? "Animation Playing" : "Play Animation"}
          >
            {isPlaying ? "Playing…" : "Play animation"}
          </button>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
};
