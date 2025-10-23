'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
      <div className="p-4 bg-red-50 rounded-lg text-red-600">
        <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
        <p className="text-sm">Please try refreshing the page.</p>
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

// Extracted and memoized components for better performance
const MemoryGlow = memo(() => (
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-500/10 blur-xl" />
    <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-white/0 blur-sm" />
  </div>
));
MemoryGlow.displayName = 'MemoryGlow';

const GoroutineGlow = memo(({ color }: { color: string }) => (
  <div className="absolute inset-0 -z-10">
    <div className={`absolute inset-0 ${color} blur-xl opacity-10`} />
    <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-white/0 blur-sm" />
  </div>
));
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
        pathLength: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.3, ease: "easeInOut" }
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
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 }
};

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
      transition={{ duration: 0.2 }}
      className="w-full max-w-xl mx-auto bg-blue-50 p-3 rounded-xl border border-blue-100/50"
    >
      <p className="text-sm text-blue-700 font-medium">{step.description}</p>
      {step.expectedValue !== undefined && (
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.2, delay: 0.1 }}
          className="mt-2 flex items-center space-x-4 text-xs"
        >
          <span className="text-blue-600 font-medium">Expected: {step.expectedValue}</span>
          {step.actualValue !== undefined && step.actualValue !== step.expectedValue && (
            <span className="text-red-600 font-medium">Actual: {step.actualValue}</span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
});
StepDescription.displayName = 'StepDescription';

// Update GoroutineCard with fixed width and better reset handling
const GoroutineCard = memo(({ goroutine, index }: { goroutine: Goroutine; index: number }) => {
  const statusColor = useMemo(() => {
    switch (goroutine.status) {
      case 'reading':
        return 'bg-amber-500';
      case 'writing':
        return 'bg-emerald-500';
      default:
        return 'bg-neutral-500';
    }
  }, [goroutine.status]);

  const ringClasses = useMemo(() => {
    switch (goroutine.status) {
      case 'reading':
        return 'ring-2 ring-amber-200 ring-offset-2';
      case 'writing':
        return 'ring-2 ring-emerald-200 ring-offset-2';
      default:
        return '';
    }
  }, [goroutine.status]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`
        relative overflow-hidden p-3 rounded-xl backdrop-blur-sm w-full
        bg-white/80 border border-neutral-200
        ${ringClasses}
      `}
    >
      <motion.div
        layout
        transition={{ duration: 0.2 }}
      >
        <GoroutineGlow color={statusColor} />
        <div className="relative">
          <h3 className="text-sm font-semibold text-neutral-800 mb-2">Goroutine {index + 1}</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500">Operation:</span>
              <span className="text-xs font-semibold text-blue-600">
                {goroutine.operation === 'increment' ? '+1' : '-1'}
              </span>
            </div>
            <motion.div
              initial={false}
              animate={{ height: goroutine.status !== 'idle' ? 'auto' : 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {goroutine.status !== 'idle' && (
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between pt-2 border-t border-neutral-100"
                >
                  <span className="text-xs font-medium text-neutral-500">Value:</span>
                  <span className="text-xs font-semibold text-neutral-700">
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
  <motion.div layout className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
    <div className="flex space-x-3">
      <button
        onClick={onPrev}
        disabled={!canGoPrev || isRunning}
        className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white rounded-lg border border-neutral-300 hover:bg-neutral-50 hover:shadow-sm transition-all duration-200 disabled:opacity-50 disabled:hover:bg-white disabled:hover:shadow-none"
      >
        ← Previous
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext || isRunning}
        className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white rounded-lg border border-neutral-300 hover:bg-neutral-50 hover:shadow-sm transition-all duration-200 disabled:opacity-50 disabled:hover:bg-white disabled:hover:shadow-none"
      >
        Next →
      </button>
    </div>
    <button
      onClick={onSimulate}
      disabled={isRunning}
      className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:hover:shadow-none"
      aria-busy={isRunning}
      role="button"
      aria-label={isRunning ? 'Simulation in progress' : 'Start race condition simulation'}
    >
      {isRunning ? 'Simulating...' : 'Auto Play'}
    </button>
  </motion.div>
));

SimulationControls.displayName = 'SimulationControls';

// Add a new StepProgress component
const StepProgress = memo(({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div className="relative w-full max-w-xl mx-auto mb-4">
    <div className="flex justify-between mb-2">
      <span className="text-xs font-medium text-neutral-500">Progress</span>
      <span className="text-xs font-medium text-neutral-500">
        Step {currentStep + 1} of {totalSteps}
      </span>
    </div>
    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-blue-500"
        initial={{ width: 0 }}
        animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </div>
));
StepProgress.displayName = 'StepProgress';

// Add a new ConnectionLine component
const ConnectionLine = memo(({ active, type }: { active: boolean; type: 'read' | 'write' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: active ? 1 : 0.2 }}
    className={`absolute left-1/2 -translate-x-1/2 h-16 w-0.5 ${
      type === 'read'
        ? 'bg-amber-400'
        : 'bg-emerald-400'
    }`}
  >
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: active ? '100%' : '0%' }}
      className={`w-full ${
        type === 'read'
          ? 'bg-amber-400'
          : 'bg-emerald-400'
      }`}
      transition={{ duration: 0.3 }}
    />
  </motion.div>
));
ConnectionLine.displayName = 'ConnectionLine';

// Add a new ExplanationPanel component
const ExplanationPanel = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full max-w-xl mx-auto bg-neutral-50 rounded-xl border border-neutral-200/50 p-4 mb-6"
  >
    <h3 className="text-sm font-semibold text-neutral-700 mb-2">
      What is a Race Condition?
    </h3>
    <p className="text-xs text-neutral-600 leading-relaxed">
      A race condition occurs when multiple goroutines access shared memory simultaneously. 
      In this visualization:
    </p>
    <ul className="mt-2 space-y-1">
      <li className="text-xs text-neutral-600 flex items-center">
        <span className="w-2 h-2 rounded-full bg-amber-400 mr-2" />
        Yellow indicates a read operation
      </li>
      <li className="text-xs text-neutral-600 flex items-center">
        <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
        Green indicates a write operation
      </li>
    </ul>
  </motion.div>
));
ExplanationPanel.displayName = 'ExplanationPanel';

export const RaceConditionVisualizer = () => {
  const [sharedState, setSharedState] = useState(0);
  const [goroutines, setGoroutines] = useState<Goroutine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
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
      case 3:
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
        transition={{ duration: 0.3 }}
        className="my-8 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl overflow-hidden shadow-lg border border-neutral-200/50"
        role="region"
        aria-label="Race Condition Visualization"
      >
        <motion.div 
          layout 
          className="border-b border-neutral-200 bg-white/50 p-4"
        >
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400" role="presentation" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" role="presentation" />
              <div className="w-3 h-3 rounded-full bg-green-400" role="presentation" />
            </div>
            <div 
              className="text-sm font-medium text-neutral-500"
              role="heading"
              aria-level={1}
            >
              Race Condition Simulator
            </div>
          </div>
        </motion.div>

        <motion.div 
          layout 
          className="p-4 space-y-4"
          transition={{ duration: 0.3 }}
        >
          {/* Add Explanation Panel */}
          <ExplanationPanel />

          {/* Add Step Progress */}
          {isRunning && (
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
            transition={{ duration: 0.3 }}
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
                transition={{ duration: 0.2 }}
                className="relative w-full"
              >
                <motion.div
                  className="relative overflow-hidden p-4 rounded-2xl bg-white/90 border border-neutral-200 flex flex-col items-center"
                  layout
                >
                  <MemoryGlow />
                  <div className="relative w-full text-center">
                    <span className="block text-sm font-medium text-neutral-400 mb-2">Shared Memory</span>
                    <motion.div 
                      key={sharedState}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                        {sharedState}
                      </span>
                      {isRunning && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-2 text-xs font-medium text-neutral-400 px-2 py-0.5 rounded-full bg-neutral-50"
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
                transition={{ duration: 0.2 }}
                className="w-full max-w-xl mx-auto bg-white/50 rounded-xl border border-neutral-200/50 p-3"
              >
                <div className="text-xs font-medium text-neutral-600 mb-2 tracking-wider">
                  Value History:
                </div>
                <div className="space-y-2">
                  {history.map(({ value, description }, index) => (
                    <motion.div
                      key={`history-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                      role="listitem"
                    >
                      <div
                        className="w-6 h-6 rounded-lg bg-white shadow-sm border border-neutral-200/50 flex items-center justify-center text-xs font-medium text-neutral-600"
                        aria-label={`Value: ${value}`}
                      >
                        {value}
                      </div>
                      <div
                        className="text-xs text-neutral-600 tracking-wider"
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

