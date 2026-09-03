"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEP_INTERVAL = 6000;
const ANIMATION_DURATION = 2000;
const RUNNING_STATE_DURATION = 5000;

interface Goroutine {
  id: number;
  status: "ready" | "running" | "waiting";
  location: "global" | "p1" | "p2" | "running-p1" | "running-p2";
}

const stepDescriptions = {
  0: "Initial state: All goroutines in global queue",
  1: "Moving G1 and G2 to P1's local queue",
  2: "Moving G3 and G4 to P2's local queue",
  3: "P1 starts executing G1, P2 starts executing G3",
  4: "G1 and G3 complete execution and return to global queue",
  5: "P1 starts executing G2, P2 starts executing G4",
  6: "G2 and G4 complete execution and return to global queue",
} as const;

const createInitialGoroutines = (): Goroutine[] =>
  Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    status: "ready",
    location: "global",
  }));

const Processor = React.memo(
  ({
    pid,
    getGoroutinesByLocation,
  }: {
    pid: number;
    getGoroutinesByLocation: (location: Goroutine["location"]) => Goroutine[];
  }) => {
    const runningGoroutines = getGoroutinesByLocation(
      `running-p${pid}` as Goroutine["location"]
    );
    const localQueueGoroutines = getGoroutinesByLocation(
      `p${pid}` as Goroutine["location"]
    );

    return (
      <div className="mb-4 rounded-md border border-rule bg-paper p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-small font-medium text-ink">P{pid}</span>
            <span className="rounded bg-well px-2 py-0.5 font-mono text-caption text-ink-2">
              M{pid}
            </span>
          </div>
          <AnimatePresence initial={false}>
            {runningGoroutines.map((g) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="rounded bg-ink px-2.5 py-1 font-mono text-caption text-paper"
              >
                running G{g.id}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex min-h-12 items-center gap-2 overflow-x-auto rounded bg-well p-2">
          <AnimatePresence initial={false}>
            {localQueueGoroutines.map((g) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-rule bg-paper font-mono text-caption text-ink"
              >
                G{g.id}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

Processor.displayName = "Processor";

export const GoroutineScheduler = () => {
  const [goroutines, setGoroutines] = useState<Goroutine[]>(
    createInitialGoroutines
  );
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [currentDescription, setCurrentDescription] = useState(
    "Click Start to begin scheduling"
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stepTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initializeState = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    if (stepTimeoutRef.current) {
      clearTimeout(stepTimeoutRef.current);
    }
    setGoroutines(createInitialGoroutines());
    setStep(0);
    setCurrentDescription("Click Start to begin scheduling");
    setIsTransitioning(false);
    setIsRunning(false);
  }, []);

  const updateGoroutineState = useCallback(
    (currentStep: number) => {
      if (isTransitioning) return;

      setIsTransitioning(true);

      setGoroutines((prev) => {
        const updated = prev.map((g) => ({ ...g }));

        switch (currentStep) {
          case 1:
            return updated.map((g) => ({
              ...g,
              location: g.id === 1 || g.id === 2 ? "p1" : g.location,
              status: g.id === 1 || g.id === 2 ? "ready" : g.status,
            }));

          case 2:
            return updated.map((g) => ({
              ...g,
              location: g.id === 3 || g.id === 4 ? "p2" : g.location,
              status: g.id === 3 || g.id === 4 ? "ready" : g.status,
            }));

          case 3:
            return updated.map((g) => ({
              ...g,
              location:
                g.id === 1
                  ? "running-p1"
                  : g.id === 3
                  ? "running-p2"
                  : g.location,
              status: g.id === 1 || g.id === 3 ? "running" : g.status,
            }));

          case 4:
            return updated.map((g) => ({
              ...g,
              location: g.id === 1 || g.id === 3 ? "global" : g.location,
              status: g.id === 1 || g.id === 3 ? "ready" : g.status,
            }));

          case 5:
            return updated.map((g) => ({
              ...g,
              location:
                g.id === 2
                  ? "running-p1"
                  : g.id === 4
                  ? "running-p2"
                  : g.location,
              status: g.id === 2 || g.id === 4 ? "running" : g.status,
            }));

          case 6:
            return updated.map((g) => ({
              ...g,
              location: "global",
              status: "ready",
            }));

          default:
            return prev;
        }
      });

      animationTimeoutRef.current = setTimeout(
        () => {
          setIsTransitioning(false);
          // If we've reached the end of the cycle, stop the animation
          if (currentStep === 6) {
            setIsRunning(false);
            setCurrentDescription("Cycle completed. Click Start to run again.");
          }
        },
        currentStep === 3 || currentStep === 5
          ? RUNNING_STATE_DURATION
          : ANIMATION_DURATION
      );
    },
    [isTransitioning]
  );

  useEffect(() => {
    initializeState();
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (stepTimeoutRef.current) {
        clearTimeout(stepTimeoutRef.current);
      }
    };
  }, [initializeState]);

  useEffect(() => {
    if (!isRunning) return;

    const runStep = () => {
      if (isTransitioning) return;

      setStep((prevStep) => {
        const newStep = prevStep + 1;
        setCurrentDescription(
          stepDescriptions[newStep as keyof typeof stepDescriptions]
        );
        updateGoroutineState(newStep);
        return newStep;
      });

      stepTimeoutRef.current = setTimeout(
        runStep,
        step === 3 || step === 5 ? RUNNING_STATE_DURATION : STEP_INTERVAL
      );
    };

    runStep();

    return () => {
      if (stepTimeoutRef.current) {
        clearTimeout(stepTimeoutRef.current);
      }
    };
  }, [isRunning, step, updateGoroutineState, isTransitioning]);

  const toggleScheduling = useCallback(() => {
    if (isRunning) {
      initializeState();
    } else {
      setIsRunning(true);
      setStep(0);
      setCurrentDescription(stepDescriptions[1]);
    }
  }, [isRunning, initializeState]);

  const getGoroutinesByLocation = useCallback(
    (location: Goroutine["location"]) =>
      goroutines.filter((g) => g.location === location),
    [goroutines]
  );

  const globalGoroutines = useMemo(
    () => getGoroutinesByLocation("global"),
    [getGoroutinesByLocation]
  );

  return (
    <div
      className={`my-8 rounded-md bg-well p-6 ${
        isTransitioning ? "pointer-events-none" : ""
      }`}
    >
      <div className="mb-4">
        <h3 className="mb-2 text-body font-medium text-ink">
          Go scheduler visualization
        </h3>
        <p className="text-small text-ink-2">
          This demonstrates Go&apos;s M:N scheduler model where M (OS Threads)
          and N (Goroutines) are scheduled through P (Processors). Each P has a
          local run queue and can steal work from other Ps when idle.
        </p>
      </div>

      <div className="mb-4 rounded-md border border-rule bg-paper p-3">
        <p className="font-mono text-caption text-ink">{currentDescription}</p>
      </div>

      <div className="mb-4">
        <h4 className="mb-2 text-caption text-ink-2">Global run queue</h4>
        <div className="flex min-h-16 items-center gap-2 overflow-x-auto rounded-md border border-rule bg-paper p-3">
          <AnimatePresence initial={false}>
            {globalGoroutines.map((g) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-rule bg-well font-mono text-caption text-ink"
              >
                G{g.id}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {[1, 2].map((pid) => (
        <Processor
          key={pid}
          pid={pid}
          getGoroutinesByLocation={getGoroutinesByLocation}
        />
      ))}

      <button
        onClick={toggleScheduling}
        className={`mt-2 text-small transition-colors ${
          isRunning
            ? "text-ink-2 hover:text-ink"
            : "rounded bg-ink px-3 py-1.5 text-paper"
        }`}
      >
        {isRunning ? "Reset" : "Start"} scheduling
      </button>
    </div>
  );
};
