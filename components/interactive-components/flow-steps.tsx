"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export interface FlowStep {
  title: string;
  description: string;
  code?: string;
  details?: string;
}

export interface FlowStepsProps {
  steps: FlowStep[];
}

export function FlowSteps({ steps }: FlowStepsProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="my-8 rounded-md border border-rule bg-paper p-6">
      {/* Header */}
      <div className="mb-4 text-caption text-ink-2">Request flow</div>

      {/* Steps List */}
      <div className="mb-6 space-y-2">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;

          return (
            <div
              key={index}
              onClick={() => setActiveStep(index)}
              className={`
                relative flex cursor-pointer items-start gap-4 rounded border p-4 transition-colors
                ${
                  isActive
                    ? "border-ink bg-paper"
                    : "border-rule bg-well hover:border-ink-3"
                }
              `}
            >
              {/* Step Number */}
              <div
                className={`
                  flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-small font-medium transition-colors
                  ${
                    isCompleted || isActive
                      ? "bg-ink text-paper"
                      : "border border-rule bg-paper text-ink-3"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h4
                  className={`
                    mb-1 text-small font-medium transition-colors
                    ${isActive ? "text-ink" : "text-ink-2"}
                  `}
                >
                  {step.title}
                </h4>
                <p className="text-small text-ink-2">{step.description}</p>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 translate-y-full bg-rule">
                  <div
                    className={`
                      absolute left-1/2 top-full h-1.5 w-1.5 -translate-x-1/2 rounded-full transition-colors
                      ${isCompleted ? "bg-ink" : "bg-rule"}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Step Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-md bg-well p-4"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="text-ink">●</span>
            <span className="text-caption text-ink-2">
              {steps[activeStep].title}
            </span>
          </div>

          {steps[activeStep].code && (
            <div className="mb-3 overflow-hidden rounded-md border border-rule bg-paper">
              <pre className="overflow-x-auto p-4">
                <code className="font-mono text-caption text-ink">
                  {steps[activeStep].code}
                </code>
              </pre>
            </div>
          )}

          {steps[activeStep].details && (
            <p className="text-small text-ink-2">{steps[activeStep].details}</p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="text-small text-ink-2 transition-colors hover:text-ink disabled:cursor-default disabled:text-ink-3 disabled:hover:text-ink-3"
        >
          ← Previous
        </button>

        <div className="flex items-center gap-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`
                h-2 rounded-full transition-all
                ${
                  index === activeStep
                    ? "w-6 bg-ink"
                    : "w-2 bg-rule hover:bg-ink-3"
                }
              `}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() =>
            setActiveStep(Math.min(steps.length - 1, activeStep + 1))
          }
          disabled={activeStep === steps.length - 1}
          className="text-small text-ink-2 transition-colors hover:text-ink disabled:cursor-default disabled:text-ink-3 disabled:hover:text-ink-3"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
