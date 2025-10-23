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
      <div className="mb-4 border border-neutral-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-700">
              P{pid}
            </span>
            <span className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-md">
              M{pid}
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {runningGoroutines.map((g) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{
                  duration: 1.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-md text-sm font-medium shadow-sm border border-emerald-200"
              >
                Running G{g.id}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex gap-2 p-2 bg-neutral-50 rounded-lg overflow-x-auto min-h-[3rem] items-center">
          <AnimatePresence mode="wait" initial={false}>
            {localQueueGoroutines.map((g) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{
                  duration: 1.5,
                  type: "spring",
                  stiffness: 50,
                  damping: 12,
                  mass: 1.5,
                }}
                className="flex-shrink-0 w-8 h-8 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
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
      className={`p-6 bg-white rounded-2xl shadow-sm border border-neutral-200 ${
        isTransitioning ? "pointer-events-none" : ""
      }`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-2">
          Go Scheduler Visualization
        </h3>
        <p className="text-sm text-neutral-600">
          This demonstrates Go&apos;s M:N scheduler model where M (OS Threads)
          and N (Goroutines) are scheduled through P (Processors). Each P has a
          local run queue and can steal work from other Ps when idle.
        </p>
      </div>

      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700 font-medium">
          {currentDescription}
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-neutral-700 mb-2">
          Global Run Queue
        </h4>
        <div className="flex gap-2 p-3 bg-neutral-50 rounded-lg overflow-x-auto min-h-[4rem] items-center">
          <AnimatePresence mode="wait" initial={false}>
            {globalGoroutines.map((g) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{
                  duration: 1.5,
                  type: "spring",
                  stiffness: 50,
                  damping: 12,
                  mass: 1.5,
                }}
                className="flex-shrink-0 w-8 h-8 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
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
        className={`mt-6 px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
          isRunning
            ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
        }`}
      >
        {isRunning ? "Reset" : "Start"} Scheduling
      </button>
    </div>
  );
};
