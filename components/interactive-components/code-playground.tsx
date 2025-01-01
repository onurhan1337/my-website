'use client'

import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { highlight } from 'sugar-high';
import { cn } from '@/lib/utils';

interface CodeStep {
  code: string;
  explanation: string;
  state?: { [key: string]: any };
  title?: string;
}

interface CodePlaygroundProps {
  steps: CodeStep[];
  language?: string;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({ 
  steps,
  language = 'go'
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState(0);
  const [previousCode, setPreviousCode] = useState('');
  
  const intervalRef = useRef<NodeJS.Timeout>();

  const highlightDiff = useCallback((currentCode: string, prevCode: string) => {
    if (!prevCode) return highlight(currentCode);
    
    const currentLines = currentCode.split('\n');
    const prevLines = prevCode.split('\n');
    
    return currentLines.map((line, i) => {
      if (i >= prevLines.length || line !== prevLines[i]) {
        return `<span class="${cn(
          'inline-block w-full relative bg-blue-500/10',
          'before:content-[""] before:absolute before:-left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-500',
          'dark:bg-blue-500/10'
        )}">${highlight(line)}</span>`;
      }
      return highlight(line);
    }).join('\n');
  }, []);

  const variants = useMemo(() => ({
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -20 : 20,
      opacity: 0
    })
  }), []);

  const playAnimation = useCallback(() => {
    setIsPlaying(true);
    setCurrentStep(0);
    setPreviousCode('');
    setDirection(1);
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentStep(prev => {
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
  }, [steps.length]);

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
  }, [currentStep, steps.length]);

  const goToPrevStep = useCallback(() => {
    if (currentStep > 0) {
      setPreviousCode(steps[currentStep].code);
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  // Add error boundary
  if (!steps || steps.length === 0) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
        <p className="text-red-600 dark:text-red-400">No steps provided to the CodePlayground component.</p>
      </div>
    );
  }

  return (
    <LayoutGroup>
      <motion.div 
        layout 
        role="region"
        aria-label="Code Playground"
        className="my-8 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-900 rounded-xl overflow-hidden shadow-lg border border-neutral-200/50 dark:border-neutral-800"
      >
        <motion.div layout className="border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 p-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2" aria-hidden="true">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400" role="status">
              {steps[currentStep].title || `Step ${currentStep + 1}/${steps.length}`}
            </div>
          </div>
        </motion.div>

        <motion.div layout className="p-6">
          <div 
            className="mb-4 relative h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={((currentStep + 1) / steps.length) * 100}
          >
            <motion.div
              className="absolute left-0 top-0 h-full bg-blue-500 dark:bg-blue-400"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
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
                transition={{
                  x: { type: "spring", stiffness: 500, damping: 30 },
                  opacity: { duration: 0.15 },
                  layout: { duration: 0.3 }
                }}
                className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm overflow-hidden w-full"
              >
                <pre className="p-4 overflow-x-auto">
                  <code
                    dangerouslySetInnerHTML={{
                      __html: highlightDiff(steps[currentStep].code, previousCode)
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
                transition={{
                  x: { type: "spring", stiffness: 500, damping: 30 },
                  opacity: { duration: 0.15 },
                  layout: { duration: 0.3 }
                }}
                className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg w-full"
                role="region"
                aria-label="Step Explanation"
              >
                <p className="text-sm text-blue-700 dark:text-blue-400">
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
                  transition={{
                    x: { type: "spring", stiffness: 500, damping: 30 },
                    opacity: { duration: 0.15 },
                    layout: { duration: 0.3 }
                  }}
                  className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg w-full"
                  role="region"
                  aria-label="Current State"
                >
                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">Current State:</h4>
                  <pre className="text-xs text-neutral-600 dark:text-neutral-400">
                    {JSON.stringify(steps[currentStep].state, null, 2)}
                  </pre>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>

          <motion.div layout className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center mt-6">
            <div className="flex space-x-3">
              <button
                onClick={goToPrevStep}
                disabled={currentStep === 0 || isPlaying}
                className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:shadow-sm transition-all duration-200 disabled:opacity-50 disabled:hover:bg-white dark:disabled:hover:bg-neutral-800 disabled:hover:shadow-none"
                aria-label="Previous Step"
              >
                ← Previous
              </button>
              <button
                onClick={goToNextStep}
                disabled={currentStep === steps.length - 1 || isPlaying}
                className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:shadow-sm transition-all duration-200 disabled:opacity-50 disabled:hover:bg-white dark:disabled:hover:bg-neutral-800 disabled:hover:shadow-none"
                aria-label="Next Step"
              >
                Next →
              </button>
            </div>
            <button
              onClick={playAnimation}
              disabled={isPlaying}
              className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-lg hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:hover:shadow-none"
              aria-label={isPlaying ? 'Animation Playing' : 'Play Animation'}
            >
              {isPlaying ? 'Playing...' : 'Play Animation'}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
}; 