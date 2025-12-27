"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProcessStep {
  label: string;
  title: string;
  description: string;
  code?: string;
  meta?: Array<{ label: string; value: string }>;
}

export interface ProcessStepsProps {
  title?: string;
  steps: ProcessStep[];
}

export function ProcessSteps({ title, steps }: ProcessStepsProps) {
  const [activeStep, setActiveStep] = useState(0);

  if (!steps?.length) return null;

  return (
    <div className="my-8 border border-[#dcdcdc] bg-white">
      <div className="border-b border-[#dcdcdc] px-5 py-3">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-[#1c1c1c]">
          {title ?? "How the request flows"}
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full border-b border-[#dcdcdc] md:w-1/3 md:border-b-0 md:border-r">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            return (
              <button
                key={step.label}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "flex w-full items-center justify-between border-b border-[#e8e8e8] px-4 py-3 text-left text-[13px] font-semibold uppercase tracking-wide transition-colors last:border-b-0",
                  isActive
                    ? "bg-[#fff2e7] text-[#F38020]"
                    : "bg-white text-[#5c5c5c] hover:bg-[#f5f5f5]"
                )}
              >
                <span>
                  {(index + 1).toString().padStart(2, "0")} · {step.label}
                </span>
                <span
                  className={cn(
                    "h-4 w-1 bg-transparent transition-colors",
                    isActive && "bg-[#F38020]"
                  )}
                />
              </button>
            );
          })}
        </div>

        <div className="w-full px-5 py-5 md:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F38020]">
                {(activeStep + 1).toString().padStart(2, "0")} ·{" "}
                {steps[activeStep].label}
              </p>
              <h4 className="mt-2 text-xl font-semibold text-[#121212]">
                {steps[activeStep].title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#4a4a4a]">
                {steps[activeStep].description}
              </p>

              {steps[activeStep].meta && (
                <div className="mt-4 grid grid-cols-1 gap-px border border-[#dcdcdc] bg-[#dcdcdc] sm:grid-cols-3">
                  {steps[activeStep].meta?.map((metaItem) => (
                    <div
                      key={`${metaItem.label}-${metaItem.value}`}
                      className="bg-white p-2"
                    >
                      <p
                        className="text-[10px] font-semibold uppercase tracking-wider text-[#8a8a8a]"
                        style={{
                          margin: "0",
                        }}
                      >
                        {metaItem.label}
                      </p>
                      <p className="text-[11px] font-medium text-[#262626]">
                        {metaItem.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {steps[activeStep].code && (
                <div className="mt-4 border rounded-none border-[#dcdcdc] bg-[#f6f6f6]">
                  <pre
                    className="overflow-x-auto bg-transparent font-mono text-[10px] leading-relaxed"
                    style={{ borderRadius: "0" }}
                  >
                    <code className="text-[#5e5e5e] bg-transparent">
                      {steps[activeStep].code}
                    </code>
                  </pre>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
