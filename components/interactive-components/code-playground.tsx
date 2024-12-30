'use client'

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { highlight } from 'sugar-high';

const diffStyles = `
  .diff-highlight {
    background: rgba(147, 197, 253, 0.1);
    display: inline-block;
    width: 100%;
    position: relative;
  }
  .diff-highlight::before {
    content: '';
    position: absolute;
    left: -1rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgb(59, 130, 246);
  }
`;

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
  
  const highlightDiff = (currentCode: string, prevCode: string) => {
    if (!prevCode) return highlight(currentCode);
    
    const currentLines = currentCode.split('\n');
    const prevLines = prevCode.split('\n');
    
    return currentLines.map((line, i) => {
      if (i >= prevLines.length || line !== prevLines[i]) {
        return `<span class="diff-highlight">${highlight(line)}</span>`;
      }
      return highlight(line);
    }).join('\n');
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setPreviousCode(steps[currentStep].code);
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setPreviousCode(steps[currentStep].code);
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const playAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setPreviousCode('');
    setDirection(1);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          setPreviousCode(steps[prev].code);
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
      });
    }, 2500);
  };

  const variants = {
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
  };

  return (
    <LayoutGroup>
      <style dangerouslySetInnerHTML={{ __html: diffStyles }} />
      <motion.div layout className="my-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-200/50">
        <motion.div layout className="border-b border-gray-200 bg-white/50 p-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="text-sm font-medium text-gray-500">
              {steps[currentStep].title || `Step ${currentStep + 1}/${steps.length}`}
            </div>
          </div>
        </motion.div>

        <motion.div layout className="p-6">
          <div className="mb-4 relative h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-blue-500"
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
                className="bg-white rounded-lg shadow-sm overflow-hidden w-full"
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
                className="bg-blue-50 p-4 rounded-lg w-full"
              >
                <p className="text-sm text-blue-700">
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
                  className="bg-gray-100 p-4 rounded-lg w-full"
                >
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Current State:</h4>
                  <pre className="text-xs text-gray-600">
                    {JSON.stringify(steps[currentStep].state, null, 2)}
                  </pre>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>

          <motion.div layout className="flex justify-between items-center mt-6">
            <div className="flex space-x-3">
              <button
                onClick={goToPrevStep}
                disabled={currentStep === 0 || isPlaying}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 disabled:opacity-50 disabled:hover:bg-white disabled:hover:shadow-none"
              >
                ← Previous
              </button>
              <button
                onClick={goToNextStep}
                disabled={currentStep === steps.length - 1 || isPlaying}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 disabled:opacity-50 disabled:hover:bg-white disabled:hover:shadow-none"
              >
                Next →
              </button>
            </div>
            <button
              onClick={playAnimation}
              disabled={isPlaying}
              className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:hover:shadow-none"
            >
              {isPlaying ? 'Playing...' : 'Play Animation'}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
}; 