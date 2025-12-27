"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Circle } from "lucide-react";

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
    <div className="my-8 bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#f6f6f6] px-6 py-4 border-b border-[#e5e5e5]">
        <h3 className="text-base font-semibold text-[#1a1a1a]">
          Request Flow
        </h3>
      </div>

      <div className="p-6">
        {/* Steps List */}
        <div className="space-y-4 mb-6">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <div
                key={index}
                onClick={() => setActiveStep(index)}
                className={`
                  relative flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all
                  ${
                    isActive
                      ? "bg-[#F38020]/5 border-[#F38020] shadow-sm"
                      : "bg-[#fafafa] border-[#e5e5e5] hover:border-[#F38020]/30"
                  }
                `}
              >
                {/* Step Number */}
                <div
                  className={`
                    flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-all
                    ${
                      isCompleted
                        ? "bg-[#F38020] border-[#F38020] text-white"
                        : isActive
                        ? "bg-[#F38020] border-[#F38020] text-white"
                        : "bg-white border-[#e5e5e5] text-[#999]"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4
                    className={`
                      font-semibold mb-1 transition-colors
                      ${isActive ? "text-[#F38020]" : "text-[#1a1a1a]"}
                    `}
                  >
                    {step.title}
                  </h4>
                  <p className="text-sm text-[#4a4a4a] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-0.5 h-4 bg-[#e5e5e5]">
                    <div
                      className={`
                        absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 rounded-full transition-all
                        ${isCompleted ? "bg-[#F38020]" : "bg-[#e5e5e5]"}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-[#fafafa] rounded-lg border border-[#e5e5e5] p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Circle className="w-4 h-4 text-[#F38020]" />
              <span className="text-xs font-semibold text-[#999] uppercase tracking-wide">
                {steps[activeStep].title}
              </span>
            </div>

            {steps[activeStep].code && (
              <div className="mb-3 bg-white rounded border border-[#e5e5e5] overflow-hidden">
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm text-[#1a1a1a] font-mono">
                    {steps[activeStep].code}
                  </code>
                </pre>
              </div>
            )}

            {steps[activeStep].details && (
              <p className="text-sm text-[#4a4a4a] leading-relaxed">
                {steps[activeStep].details}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#e5e5e5]">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="px-4 py-2 text-sm font-medium text-[#4a4a4a] bg-white border border-[#e5e5e5] rounded hover:bg-[#fafafa] hover:border-[#F38020] hover:text-[#F38020] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-[#e5e5e5] disabled:hover:text-[#4a4a4a]"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`
                  w-2 h-2 rounded-full transition-all
                  ${
                    index === activeStep
                      ? "bg-[#F38020] w-6"
                      : "bg-[#e5e5e5] hover:bg-[#F38020]/50"
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
            className="px-4 py-2 text-sm font-medium text-[#4a4a4a] bg-white border border-[#e5e5e5] rounded hover:bg-[#fafafa] hover:border-[#F38020] hover:text-[#F38020] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-[#e5e5e5] disabled:hover:text-[#4a4a4a]"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

