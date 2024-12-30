'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const Arrow = ({ start, end, color, animate }: { 
  start: { x: number; y: number }; 
  end: { x: number; y: number };
  color: string;
  animate: boolean;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const d = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

  return (
    <motion.path
      ref={pathRef}
      d={d}
      stroke="black"
      strokeWidth="2"
      fill="none"
      initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
      animate={{ pathLength: 1, opacity: 1 }}
      exit={{ opacity: 0, pathLength: 0 }}
      transition={{ 
        pathLength: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.3, ease: "easeInOut" }
      }}
      markerEnd="url(#arrow-black)"
    />
  );
};

const STEP_DELAY = 4000; // 4 seconds per step for clarity

// Add a new component for the memory card glow effect
const MemoryGlow = () => (
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-xl" />
    <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-white/0 blur-sm" />
  </div>
);

// Add a new component for the goroutine card glow effect
const GoroutineGlow = ({ color }: { color: string }) => (
  <div className="absolute inset-0 -z-10">
    <div className={`absolute inset-0 ${color} blur-xl opacity-10`} />
    <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-white/0 blur-sm" />
  </div>
);

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

  // Initialize goroutines with idle state
  useEffect(() => {
    setGoroutines([
      { id: 'g1', value: 0, status: 'idle', operation: 'increment' },
      { id: 'g2', value: 0, status: 'idle', operation: 'decrement' }
    ]);
  }, []);

  const simulateRace = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setHistory([]);
    setActiveConnections({});
    
    // Update existing goroutines instead of creating new ones
    setGoroutines(prev => prev.map(g => ({ ...g, value: sharedState, status: 'idle' })));

    await new Promise(r => setTimeout(r, STEP_DELAY));

    // First goroutine reads
    setCurrentStep({
      description: "Step 1: Goroutine 1 reads the shared value (0)",
      expectedValue: sharedState,
    });
    setActiveConnections({ g1Read: true });
    setGoroutines(prev => prev.map(g => 
      g.id === 'g1' ? { ...g, status: 'reading', value: sharedState } : g
    ));
    setHistory(h => [...h, { 
      value: sharedState,
      description: "Initial value read by Goroutine 1"
    }]);
    await new Promise(r => setTimeout(r, STEP_DELAY));

    // Second goroutine reads
    setCurrentStep({
      description: "Step 2: Goroutine 2 also reads the same shared value (0)",
      expectedValue: sharedState,
    });
    setActiveConnections({ g2Read: true });
    setGoroutines(prev => prev.map(g => 
      g.id === 'g2' ? { ...g, status: 'reading', value: sharedState } : g
    ));
    await new Promise(r => setTimeout(r, STEP_DELAY));

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
    setSharedState(prev => {
      const newValue = prev + 1;
      setHistory(h => [...h, { 
        value: newValue,
        description: "Value after Goroutine 1 increments (0 → 1)"
      }]);
      return newValue;
    });
    await new Promise(r => setTimeout(r, STEP_DELAY));

    // Second goroutine writes
    setCurrentStep({
      description: "Step 4: Goroutine 2 decrements its original value (0 → -1) and overwrites the previous increment!",
      expectedValue: expectedAfterIncrement - 1,
      actualValue: sharedState - 1,
    });
    setActiveConnections({ g2Write: true });
    setGoroutines(prev => prev.map(g => 
      g.id === 'g2' ? { ...g, status: 'writing', value: g.value - 1 } : g
    ));
    setSharedState(prev => {
      const newValue = sharedState - 1;
      setHistory(h => [...h, { 
        value: newValue,
        description: "Final value after Goroutine 2 decrements its stale copy (0 → -1)"
      }]);
      return newValue;
    });
    await new Promise(r => setTimeout(r, STEP_DELAY));

    setCurrentStep({
      description: "Race condition complete! The final value is -1 instead of 0 because Goroutine 2 was working with a stale value.",
    });
    setActiveConnections({});
    await new Promise(r => setTimeout(r, STEP_DELAY));

    // Reset
    setGoroutines([]);
    setIsRunning(false);
  };

  return (
    <motion.div layout className="my-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden shadow-lg border border-slate-200/50">
      <motion.div layout className="border-b border-slate-200 bg-white/50 p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="text-sm font-medium text-slate-500">Race Condition Simulator</div>
        </div>
      </motion.div>

      <motion.div 
        layout 
        className="p-4 space-y-4"
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Step Description */}
        <AnimatePresence mode="wait">
          {currentStep && (
            <motion.div
              key={currentStep.description}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl border border-blue-100/50"
            >
              <p className="text-sm text-blue-700 font-medium">{currentStep.description}</p>
              {currentStep.expectedValue !== undefined && (
                <div className="mt-2 flex items-center space-x-4 text-xs">
                  <span className="text-blue-600 font-medium">Expected: {currentStep.expectedValue}</span>
                  {currentStep.actualValue !== undefined && currentStep.actualValue !== currentStep.expectedValue && (
                    <span className="text-red-600 font-medium">Actual: {currentStep.actualValue}</span>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Visualization Area */}
        <motion.div 
          layout
          className="relative w-full max-w-2xl mx-auto"
          style={{ minHeight: '300px' }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Shared Memory at Top */}
          <div className="flex justify-center mb-16">
            <motion.div
              key={`shared-${sharedState}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full"
            >
              <motion.div
                className="relative overflow-hidden p-4 rounded-2xl bg-white/90 border border-slate-200 flex flex-col items-center"
                layout
              >
                <MemoryGlow />
                <div className="relative w-full text-center">
                  <span className="block text-sm font-medium text-slate-400 mb-2">Shared Memory</span>
                  <motion.div 
                    key={sharedState}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {sharedState}
                    </span>
                    {isRunning && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-xs font-medium text-slate-400 px-2 py-0.5 rounded-full bg-slate-50"
                      >
                        0x1234
                      </motion.span>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Goroutines Side by Side with Connection Lines */}
          <div className="grid grid-cols-2 gap-6 relative">
            {/* Left Goroutine */}
            <div className="relative">
              {/* Connection Line */}
              <div 
                className="absolute left-1/2 -top-16 w-[2px] h-16 border-l-2 border-dashed border-slate-400 transform -translate-x-1/2 transition-opacity duration-300"
                style={{
                  opacity: activeConnections.g1Read || activeConnections.g1Write ? 0.8 : 0.3
                }}
              />
              <div className="absolute inset-x-0 -top-6 flex justify-center">
                {activeConnections.g1Read && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200"
                  >
                    Reading
                  </motion.div>
                )}
                {activeConnections.g1Write && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200"
                  >
                    Writing
                  </motion.div>
                )}
              </div>
              <motion.div
                layout
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`
                  relative overflow-hidden p-3 rounded-xl backdrop-blur-sm
                  bg-white/80 border border-slate-200
                  ${goroutines[0]?.status === 'reading' 
                    ? 'ring-2 ring-amber-200 ring-offset-2' 
                    : goroutines[0]?.status === 'writing'
                      ? 'ring-2 ring-emerald-200 ring-offset-2'
                      : ''}
                `}
              >
                <motion.div
                  layout
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <GoroutineGlow 
                    color={
                      goroutines[0]?.status === 'reading'
                        ? 'bg-amber-500'
                        : goroutines[0]?.status === 'writing'
                          ? 'bg-emerald-500'
                          : 'bg-slate-500'
                    }
                  />
                  <div className="relative">
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">Goroutine 1</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-500">Operation:</span>
                        <span className="text-xs font-semibold text-blue-600">+1</span>
                      </div>
                      <motion.div
                        initial={false}
                        animate={{ height: goroutines[0]?.status !== 'idle' ? 'auto' : 0 }}
                        className="overflow-hidden"
                      >
                        {goroutines[0]?.status !== 'idle' && (
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <span className="text-xs font-medium text-slate-500">Value:</span>
                            <span className="text-xs font-semibold text-slate-700">
                              {goroutines[0]?.value}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Goroutine */}
            <div className="relative">
              {/* Connection Line */}
              <div 
                className="absolute left-1/2 -top-16 w-[2px] h-16 border-l-2 border-dashed border-slate-400 transform -translate-x-1/2 transition-opacity duration-300"
                style={{
                  opacity: activeConnections.g2Read || activeConnections.g2Write ? 0.8 : 0.3
                }}
              />
              <div className="absolute inset-x-0 -top-6 flex justify-center">
                {activeConnections.g2Read && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200"
                  >
                    Reading
                  </motion.div>
                )}
                {activeConnections.g2Write && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200"
                  >
                    Writing
                  </motion.div>
                )}
              </div>
              <motion.div
                layout
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`
                  relative overflow-hidden p-3 rounded-xl backdrop-blur-sm
                  bg-white/80 border border-slate-200
                  ${goroutines[1]?.status === 'reading' 
                    ? 'ring-2 ring-amber-200 ring-offset-2' 
                    : goroutines[1]?.status === 'writing'
                      ? 'ring-2 ring-emerald-200 ring-offset-2'
                      : ''}
                `}
              >
                <motion.div
                  layout
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <GoroutineGlow 
                    color={
                      goroutines[1]?.status === 'reading'
                        ? 'bg-amber-500'
                        : goroutines[1]?.status === 'writing'
                          ? 'bg-emerald-500'
                          : 'bg-slate-500'
                    }
                  />
                  <div className="relative">
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">Goroutine 2</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-500">Operation:</span>
                        <span className="text-xs font-semibold text-red-600">-1</span>
                      </div>
                      <motion.div
                        initial={false}
                        animate={{ height: goroutines[1]?.status !== 'idle' ? 'auto' : 0 }}
                        className="overflow-hidden"
                      >
                        {goroutines[1]?.status !== 'idle' && (
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <span className="text-xs font-medium text-slate-500">Value:</span>
                            <span className="text-xs font-semibold text-slate-700">
                              {goroutines[1]?.value}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* History with Explanations - Smaller text and increased tracking */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full max-w-xl mx-auto bg-white/50 rounded-xl border border-slate-200/50 p-3"
          >
            <div className="text-xs font-medium text-slate-600 mb-2 tracking-wider">Value History:</div>
            <div className="space-y-2">
              {history.map(({ value, description }, index) => (
                <motion.div
                  key={`history-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 rounded-lg bg-white shadow-sm border border-slate-200/50 flex items-center justify-center text-xs font-medium text-slate-600">
                    {value}
                  </div>
                  <div className="text-xs text-slate-600 tracking-wider">{description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Single Button Control */}
        <motion.button
          onClick={simulateRace}
          disabled={isRunning}
          className={`
            w-full max-w-sm mx-auto px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 block
            ${isRunning
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg hover:shadow-blue-500/20'}
          `}
        >
          {isRunning ? 'Simulating...' : 'Simulate Race Condition'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

