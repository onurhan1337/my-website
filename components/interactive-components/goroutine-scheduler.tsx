'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Goroutine {
  id: number;
  status: 'ready' | 'running' | 'waiting';
  location: 'global' | 'p1' | 'p2' | 'running-p1' | 'running-p2';
}

const stepDescriptions = {
  0: 'Initial state: All goroutines in global queue',
  1: 'Moving G1 and G2 to P1\'s local queue',
  2: 'Moving G3 and G4 to P2\'s local queue',
  3: 'P1 starts executing G1, P2 starts executing G3',
  4: 'G1 and G3 complete execution and return to global queue',
  5: 'P1 starts executing G2, P2 starts executing G4',
  6: 'G2 and G4 complete execution and return to global queue',
};

export const GoroutineScheduler = () => {
  const [goroutines, setGoroutines] = useState<Goroutine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [currentDescription, setCurrentDescription] = useState('');
  const [cycleCount, setCycleCount] = useState(0);

  const initializeState = useCallback(() => {
    const initialGoroutines: Goroutine[] = Array.from(
      { length: 4 },
      (_, i) => ({
        id: i + 1,
        status: 'ready',
        location: 'global'
      })
    );
    setGoroutines(initialGoroutines);
    setStep(0);
    setCycleCount(0);
    setCurrentDescription('Click Start to begin scheduling');
  }, []);

  const updateGoroutineState = useCallback((currentStep: number) => {
    setGoroutines(prev => {
      // Create a fresh copy of goroutines
      const updated = prev.map(g => ({...g}));

      switch(currentStep) {
        case 1: // Move to P1
          updated.forEach(g => {
            if (g.id === 1 || g.id === 2) {
              g.location = 'p1';
              g.status = 'ready';
            }
          });
          break;

        case 2: // Move to P2
          updated.forEach(g => {
            if (g.id === 3 || g.id === 4) {
              g.location = 'p2';
              g.status = 'ready';
            }
          });
          break;

        case 3: // Start execution in P1 and P2
          updated.forEach(g => {
            if (g.id === 1) {
              g.location = 'running-p1';
              g.status = 'running';
            }
            if (g.id === 3) {
              g.location = 'running-p2';
              g.status = 'running';
            }
            if (g.id === 2) {
              g.location = 'p1';
              g.status = 'ready';
            }
            if (g.id === 4) {
              g.location = 'p2';
              g.status = 'ready';
            }
          });
          break;

        case 4: // Return first pair to global queue
          updated.forEach(g => {
            if (g.id === 1 || g.id === 3) {
              g.location = 'global';
              g.status = 'ready';
            }
            if (g.id === 2) {
              g.location = 'p1';
              g.status = 'ready';
            }
            if (g.id === 4) {
              g.location = 'p2';
              g.status = 'ready';
            }
          });
          break;

        case 5: // Start executing second pair
          updated.forEach(g => {
            if (g.id === 2) {
              g.location = 'running-p1';
              g.status = 'running';
            }
            if (g.id === 4) {
              g.location = 'running-p2';
              g.status = 'running';
            }
          });
          break;

        case 6: // All return to global for next cycle
          updated.forEach(g => {
            g.location = 'global';
            g.status = 'ready';
          });
          break;

        case 0: // Initial state
          updated.forEach(g => {
            g.location = 'global';
            g.status = 'ready';
          });
          break;
      }

      return updated;
    });
  }, []);

  useEffect(() => {
    initializeState();
  }, [initializeState]);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setStep(prevStep => {
        const newStep = (prevStep + 1) % 7;
        if (newStep === 0) {
          setCycleCount(prev => prev + 1);
        }
        setCurrentDescription(stepDescriptions[newStep]);
        updateGoroutineState(newStep);
        return newStep;
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isRunning, updateGoroutineState]);

  const toggleScheduling = () => {
    if (isRunning) {
      setIsRunning(false);
      initializeState();
    } else {
      setIsRunning(true);
      setCurrentDescription(stepDescriptions[1]);
    }
  };

  const getGoroutinesByLocation = (location: Goroutine['location']) => 
    goroutines.filter(g => g.location === location);

  return (
    <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">Go Scheduler Visualization</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          This demonstrates Go&apos;s M:N scheduler model where M (OS Threads) and N (Goroutines) are scheduled through P (Processors).
          Each P has a local run queue and can steal work from other Ps when idle.
        </p>
      </div>

      {/* Current Step Description */}
      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">{currentDescription}</p>
      </div>

      {/* Global Run Queue */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2">Global Run Queue</h4>
        <div className="flex gap-2 p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg overflow-x-auto min-h-[4rem] items-center">
          <AnimatePresence mode="popLayout">
            {getGoroutinesByLocation('global').map(g => (
              <motion.div
                key={g.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.5,
                  layout: { duration: 0.3 }
                }}
                className="flex-shrink-0 w-8 h-8 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
              >
                G{g.id}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Processors */}
      {[1, 2].map(pid => (
        <div key={pid} className="mb-4 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">P{pid}</span>
              <span className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md">
                M{pid}
              </span>
            </div>
            <AnimatePresence mode="popLayout">
              {getGoroutinesByLocation(`running-p${pid}` as Goroutine['location']).map(g => (
                <motion.div
                  key={g.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ 
                    duration: 0.5,
                    layout: { duration: 0.3 }
                  }}
                  className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-md text-sm font-medium shadow-sm"
                >
                  Running G{g.id}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Local Run Queue */}
          <div className="flex gap-2 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg overflow-x-auto min-h-[3rem] items-center">
            <AnimatePresence mode="popLayout">
              {getGoroutinesByLocation(`p${pid}` as Goroutine['location']).map(g => (
                <motion.div
                  key={g.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ 
                    duration: 0.5,
                    layout: { duration: 0.3 }
                  }}
                  className="flex-shrink-0 w-8 h-8 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                >
                  G{g.id}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}

      <button
        onClick={toggleScheduling}
        className={`mt-6 px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
          isRunning
            ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'
        }`}
      >
        {isRunning ? 'Reset' : 'Start'} Scheduling
      </button>
    </div>
  );
};
