'use client'

import type React from 'react';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memo } from 'react';

// Modern Error Boundary using hooks
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Error in Race Condition Visualizer:', event.error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="my-8 rounded-md bg-well p-6">
        <h3 className="text-body font-medium text-ink mb-2">Something went wrong</h3>
        <p className="text-small text-ink-2">Please try refreshing the page.</p>
      </div>
    );
  }

  return children;
};

ErrorBoundary.displayName = 'ErrorBoundary';

interface Goroutine {
  id: string;
  value: number;
  status: 'reading' | 'writing' | 'idle';
  operation: 'increment' | 'decrement';
}

interface Step {
  description: string;
  expectedValue?: number;
  actualValue?: number;
}

// Decorative glows removed for the flat style; components kept for structure
const MemoryGlow = memo(() => null);
MemoryGlow.displayName = 'MemoryGlow';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GoroutineGlow = memo(({ color: _color }: { color: string }) => null);
GoroutineGlow.displayName = 'GoroutineGlow';

const Arrow = memo(({ start, end, color, animate }: {
  start: { x: number; y: number };
  end: { x: number; y: number };
  color: string;
  animate: boolean;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const d = useMemo(() => `M ${start.x} ${start.y} L ${end.x} ${end.y}`, [start.x, start.y, end.x, end.y]);

  return (
    <motion.path
      ref={pathRef}
      d={d}
      stroke={color}
      strokeWidth="2"
      fill="none"
      initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
      animate={{ pathLength: 1, opacity: 1 }}
      exit={{ opacity: 0, pathLength: 0 }}
      transition={{
        pathLength: { duration: 0.5, ease: "easeOut" },
        opacity: { duration: 0.3, ease: "easeOut" }
      }}
      markerEnd={`url(#arrow-${color})`}
    />
  );
});
Arrow.displayName = 'Arrow';

// Reduce the step delay from 4s to 2s for better UX
const STEP_DELAY = 2000;

// Animation variants for better orchestration
const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const scaleIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const EASE = { duration: 0.2, ease: "easeOut" as const };

// Update StepDescription component with optimized animations
const StepDescription = memo(({ step }: { step: Step | null }) => {
  if (!step) return null;

  return (
    <motion.div
      key={step.description}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -10 }}
      transition={EASE}
      className="w-full max-w-xl mx-auto rounded border border-rule bg-paper p-3"
    >
      <p className="text-small text-ink">{step.description}</p>
      {step.expectedValue !== undefined && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ ...EASE, delay: 0.1 }}
          className="mt-2 flex items-center gap-4 font-mono text-caption"
        >
          <span className="text-ink-2">Expected: {step.expectedValue}</span>
          {step.actualValue !== undefined && step.actualValue !== step.expectedValue && (
            <span className="text-ink font-medium">Actual: {step.actualValue} (mismatch)</span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
});
StepDescription.displayName = 'StepDescription';

// Update GoroutineCard with fixed width and better reset handling
const GoroutineCard = memo(({ goroutine, index }: { goroutine: Goroutine; index: number }) => {
  const statusLabel = useMemo(() => {
    switch (goroutine.status) {
      case 'reading':
        return '○ reading';
      case 'writing':
        return '● writing';
      default:
        return 'idle';
    }
  }, [goroutine.status]);

  const statusClasses = useMemo(() => {
    switch (goroutine.status) {
      case 'reading':
        return 'text-ink-2';
      case 'writing':
        return 'text-ink font-medium';
      default:
        return 'text-ink-3';
    }
  }, [goroutine.status]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={EASE}
      className="relative w-full rounded border border-rule bg-paper p-3"
    >
      <motion.div
        layout
        transition={EASE}
      >
        <GoroutineGlow color={statusClasses} />
        <div className="relative">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-small font-medium text-ink">Goroutine {index + 1}</h3>
            <span className={`text-caption ${statusClasses}`}>{statusLabel}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-caption text-ink-2">Operation</span>
              <span className="font-mono text-caption text-ink">
                {goroutine.operation === 'increment' ? '+1' : '-1'}
              </span>
            </div>
            <motion.div
              initial={false}
              animate={{ height: goroutine.status !== 'idle' ? 'auto' : 0 }}
              transition={EASE}
              className="overflow-hidden"
            >
              {goroutine.status !== 'idle' && (
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={EASE}
                  className="flex items-center justify-between border-t border-rule pt-2"
                >
                  <span className="text-caption text-ink-2">Value</span>
                  <span className="font-mono text-caption text-ink">
                    {goroutine.value}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});
GoroutineCard.displayName = 'GoroutineCard';

// Update SimulationControls to include prev/next buttons
const SimulationControls = memo(({
  isRunning,
  onSimulate,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext
}: {
  isRunning: boolean;
  onSimulate: () => void;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}) => (
  <motion.div layout className="flex flex-col sm:flex-row gap-4 justify-between items-center">
    <div className="flex gap-4">
      <button
        onClick={onPrev}
        disabled={!canGoPrev || isRunning}
        className="text-small text-ink-2 hover:text-ink transition-colors disabled:text-ink-3 disabled:cursor-default disabled:hover:text-ink-3"
      >
        ← Previous
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext || isRunning}
        className="text-small text-ink-2 hover:text-ink transition-colors disabled:text-ink-3 disabled:cursor-default disabled:hover:text-ink-3"
      >
        Next →
      </button>
    </div>
    <button
      onClick={onSimulate}
      disabled={isRunning}
      className="text-small rounded bg-ink px-3 py-1.5 text-paper transition-colors disabled:bg-well disabled:text-ink-3 disabled:cursor-default"
      aria-busy={isRunning}
      role="button"
      aria-label={isRunning ? 'Simulation in progress' : 'Start race condition simulation'}
    >
      {isRunning ? 'Simulating…' : 'Auto play'}
    </button>
  </motion.div>
));

SimulationControls.displayName = 'SimulationControls';

// Add a new StepProgress component
const StepProgress = memo(({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div className="relative w-full max-w-xl mx-auto mb-4">
    <div className="flex justify-between mb-2">
      <span className="text-caption text-ink-2">Progress</span>
      <span className="text-caption text-ink-2">
        Step {currentStep + 1} of {totalSteps}
      </span>
    </div>
    <div className="h-1 bg-rule rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-ink"
        initial={{ width: 0 }}
        animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  </div>
));
StepProgress.displayName = 'StepProgress';

// Add a new ConnectionLine component
// Read is drawn as a thin line, write as a heavier one (shape, not color)
const ConnectionLine = memo(({ active, type }: { active: boolean; type: 'read' | 'write' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: active ? 1 : 0.2 }}
    transition={EASE}
    className={`absolute left-1/2 -translate-x-1/2 h-16 ${
      type === 'read'
        ? 'w-px bg-rule'
        : 'w-0.5 bg-rule'
    }`}
  >
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: active ? '100%' : '0%' }}
      className={`w-full ${
        type === 'read'
          ? 'bg-ink-2'
          : 'bg-ink'
      }`}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  </motion.div>
));
ConnectionLine.displayName = 'ConnectionLine';

// Add a new ExplanationPanel component
const ExplanationPanel = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={EASE}
    className="w-full max-w-xl mx-auto mb-6"
  >
    <h3 className="text-small font-medium text-ink mb-2">
      What is a race condition?
    </h3>
    <p className="text-caption text-ink-2">
      A race condition occurs when multiple goroutines access shared memory simultaneously.
      In this visualization:
    </p>
    <ul className="mt-2 space-y-1">
      <li className="text-caption text-ink-2 flex items-center">
        <span className="mr-2 text-ink-2" aria-hidden="true">○</span>
        Outline marks a read operation
      </li>
      <li className="text-caption text-ink-2 flex items-center">
        <span className="mr-2 text-ink" aria-hidden="true">●</span>
        Filled marks a write operation
      </li>
    </ul>
  </motion.div>
));
ExplanationPanel.displayName = 'ExplanationPanel';

export const RaceConditionVisualizer = () => {
  const [sharedState, setSharedState] = useState(0);
  const [goroutines, setGoroutines] = useState<Goroutine[]>([]);
  const [history, setHistory] = useState<{ value: number; description: string }[]>([]);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [activeConnections, setActiveConnections] = useState<{
    g1Read?: boolean;
    g2Read?: boolean;
    g1Write?: boolean;
    g2Write?: boolean;
  }>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const totalSteps = 5; // Total number of steps in the simulation

  // Initialize goroutines with idle state
  const initializeGoroutines = useCallback(() => {
    setGoroutines([
      { id: 'g1', value: 0, status: 'idle', operation: 'increment' },
      { id: 'g2', value: 0, status: 'idle', operation: 'decrement' }
    ]);
    setSharedState(0);
    setHistory([]);
    setCurrentStep(null);
    setActiveConnections({});
  }, []);

  // Function to apply a specific step
  const applyStep = useCallback((stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        // Initial state
        initializeGoroutines();
        setCurrentStep(null);
        setActiveConnections({});
        setHistory([]);
        break;
      case 1:
        // First goroutine reads
        setCurrentStep({
          description: "Step 1: Goroutine 1 reads the shared value (0)",
          expectedValue: sharedState,
        });
        setActiveConnections({ g1Read: true });
        setGoroutines(prev => prev.map(g =>
          g.id === 'g1' ? { ...g, status: 'reading', value: sharedState } : g
        ));
        setHistory([{
          value: sharedState,
          description: "Initial value read by Goroutine 1"
        }]);
        break;
      case 2:
        // Second goroutine reads
        setCurrentStep({
          description: "Step 2: Goroutine 2 also reads the same shared value (0)",
          expectedValue: sharedState,
        });
        setActiveConnections({ g2Read: true });
        setGoroutines(prev => prev.map(g =>
          g.id === 'g2' ? { ...g, status: 'reading', value: sharedState } : g
        ));
        setHistory([{
          value: sharedState,
          description: "Initial value read by Goroutine 1"
        }]);
        break;
      case 3: {
        // First goroutine writes
        const expectedAfterIncrement = sharedState + 1;
        setCurrentStep({
          description: "Step 3: Goroutine 1 increments its copy (0 → 1) and writes back",
          expectedValue: expectedAfterIncrement,
          actualValue: expectedAfterIncrement,
        });
        setActiveConnections({ g1Write: true });
        setGoroutines(prev => prev.map(g =>
          g.id === 'g1' ? { ...g, status: 'writing', value: g.value + 1 } : g
        ));
        setHistory([
          {
            value: sharedState,
            description: "Initial value read by Goroutine 1"
          },
          {
            value: expectedAfterIncrement,
            description: "Value after Goroutine 1 increments (0 → 1)"
          }
        ]);
        break;
      }
      case 4:
        // Second goroutine writes
        setCurrentStep({
          description: "Step 4: Goroutine 2 decrements its original value (0 → -1) and overwrites the previous increment!",
          expectedValue: sharedState + 1 - 1,
          actualValue: sharedState - 1,
        });
        setActiveConnections({ g2Write: true });
        setGoroutines(prev => prev.map(g =>
          g.id === 'g2' ? { ...g, status: 'writing', value: g.value - 1 } : g
        ));
        setHistory([
          {
            value: sharedState,
            description: "Initial value read by Goroutine 1"
          },
          {
            value: sharedState + 1,
            description: "Value after Goroutine 1 increments (0 → 1)"
          },
          {
            value: sharedState - 1,
            description: "Final value after Goroutine 2 decrements its stale copy (0 → -1)"
          }
        ]);
        break;
      case 5:
        // Final state
        setCurrentStep({
          description: "Race condition complete! The final value is -1 instead of 0 because Goroutine 2 was working with a stale value.",
        });
        setActiveConnections({});
        setGoroutines(prev => prev.map(g => ({ ...g, status: 'idle' })));
        break;
      default:
        break;
    }
    setStepIndex(stepIndex);
  }, [sharedState, initializeGoroutines]);

  // Handle manual navigation
  const goToPrevStep = useCallback(() => {
    if (stepIndex > 0) {
      // Reset connections and current step before applying new step
      setActiveConnections({});
      setCurrentStep(null);
      applyStep(stepIndex - 1);
    }
  }, [stepIndex, applyStep]);

  const goToNextStep = useCallback(() => {
    if (stepIndex < totalSteps) {
      // Reset connections and current step before applying new step
      setActiveConnections({});
      setCurrentStep(null);
      applyStep(stepIndex + 1);
    }
  }, [stepIndex, totalSteps, applyStep]);

  // Modified simulateRace for auto-play
  const simulateRace = useCallback(async () => {
    if (autoPlaying) return;

    setAutoPlaying(true);
    // Reset all state before starting animation
    setStepIndex(0);
    setHistory([]);
    setCurrentStep(null);
    setActiveConnections({});
    setGoroutines([
      { id: 'g1', value: 0, status: 'idle', operation: 'increment' },
      { id: 'g2', value: 0, status: 'idle', operation: 'decrement' }
    ]);
    setSharedState(0);

    // Wait a tick for state to reset
    await new Promise(r => setTimeout(r, 0));

    for (let i = 1; i <= totalSteps; i++) {
      await new Promise(r => setTimeout(r, STEP_DELAY));
      applyStep(i);
    }

    setAutoPlaying(false);
  }, [autoPlaying, totalSteps, applyStep]);

  useEffect(() => {
    initializeGoroutines();
  }, [initializeGoroutines]);

  return (
    <ErrorBoundary>
      <motion.div
        layout
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="my-8 rounded-md bg-well p-6"
        role="region"
        aria-label="Race Condition Visualization"
      >
        <motion.div
          layout
          className="text-caption text-ink-2 mb-4"
          role="heading"
          aria-level={1}
        >
          Race condition simulator
        </motion.div>

        <motion.div
          layout
          className="space-y-4"
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Add Explanation Panel */}
          <ExplanationPanel />

          {/* Add Step Progress */}
          {autoPlaying && (
            <StepProgress currentStep={stepIndex} totalSteps={totalSteps} />
          )}

          {/* Step Description */}
          <div role="status" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <StepDescription step={currentStep} />
            </AnimatePresence>
          </div>

          {/* Main Visualization Area */}
          <motion.div
            layout
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-2xl mx-auto"
            style={{ minHeight: '300px' }}
          >
            {/* Shared Memory at Top */}
            <div className="flex justify-center mb-16">
              {/* Add Connection Lines */}
              <div className="absolute inset-x-0 bottom-0 h-16">
                <ConnectionLine
                  active={!!(activeConnections.g1Read || activeConnections.g2Read)}
                  type="read"
                />
                <ConnectionLine
                  active={!!(activeConnections.g1Write || activeConnections.g2Write)}
                  type="write"
                />
              </div>

              <motion.div
                key={`shared-${sharedState}`}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                transition={EASE}
                className="relative w-full"
              >
                <motion.div
                  className="relative rounded border border-rule bg-paper p-4 flex flex-col items-center"
                  layout
                >
                  <MemoryGlow />
                  <div className="relative w-full text-center">
                    <span className="block text-caption text-ink-2 mb-2">Shared memory</span>
                    <motion.div
                      key={sharedState}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={EASE}
                      className="flex flex-col items-center"
                    >
                      <span className="font-mono text-body font-medium text-ink">
                        {sharedState}
                      </span>
                      {autoPlaying && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={EASE}
                          className="mt-2 font-mono text-caption text-ink-3"
                        >
                          0x1234
                        </motion.span>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Goroutines Grid */}
            <div className="grid grid-cols-2 gap-6 relative min-h-[200px]">
              <AnimatePresence mode="wait">
                {goroutines.map((goroutine, index) => (
                  <div key={goroutine.id} className="w-full">
                    <GoroutineCard goroutine={goroutine} index={index} />
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* History with Explanations */}
          <AnimatePresence>
            {history.length > 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 10 }}
                transition={EASE}
                className="w-full max-w-xl mx-auto rounded border border-rule bg-paper p-3"
              >
                <div className="text-caption text-ink-2 mb-2">
                  Value history
                </div>
                <div className="space-y-2">
                  {history.map(({ value, description }, index) => (
                    <motion.div
                      key={`history-${index}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...EASE, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                      role="listitem"
                    >
                      <div
                        className="w-6 h-6 rounded border border-rule bg-paper flex items-center justify-center font-mono text-caption text-ink"
                        aria-label={`Value: ${value}`}
                      >
                        {value}
                      </div>
                      <div
                        className="text-caption text-ink-2"
                        aria-label={description}
                      >
                        {description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Control Button */}
          <SimulationControls
            isRunning={autoPlaying}
            onSimulate={simulateRace}
            onPrev={goToPrevStep}
            onNext={goToNextStep}
            canGoPrev={stepIndex > 0}
            canGoNext={stepIndex < totalSteps}
          />
        </motion.div>
      </motion.div>
    </ErrorBoundary>
  );
};
