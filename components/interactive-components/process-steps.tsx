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
    <div className="my-8 rounded-md border border-rule bg-paper p-6">
      <p className="mb-4 text-caption text-ink-2">
        {title ?? "How the request flows"}
      </p>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full border-b border-rule pb-4 md:w-1/3 md:border-b-0 md:border-r md:pb-0 md:pr-6">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            return (
              <button
                key={step.label}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "flex w-full items-center justify-between rounded px-3 py-2 text-left text-small transition-colors",
                  isActive
                    ? "bg-ink text-paper"
                    : "text-ink-2 hover:text-ink"
                )}
              >
                <span>
                  {(index + 1).toString().padStart(2, "0")} · {step.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-full md:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <p className="text-caption text-ink-2">
                {(activeStep + 1).toString().padStart(2, "0")} ·{" "}
                {steps[activeStep].label}
              </p>
              <h4 className="mt-2 text-body font-medium text-ink">
                {steps[activeStep].title}
              </h4>
              <p className="mt-2 text-small text-ink-2">
                {steps[activeStep].description}
              </p>

              {steps[activeStep].meta && (
                <div className="mt-4 grid grid-cols-1 gap-px rounded border border-rule bg-rule sm:grid-cols-3">
                  {steps[activeStep].meta?.map((metaItem) => (
                    <div
                      key={`${metaItem.label}-${metaItem.value}`}
                      className="bg-paper p-2"
                    >
                      <p
                        className="text-caption text-ink-3"
                        style={{
                          margin: "0",
                        }}
                      >
                        {metaItem.label}
                      </p>
                      <p className="font-mono text-caption text-ink">
                        {metaItem.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {steps[activeStep].code && (
                <div className="mt-4 rounded-md bg-well">
                  <pre
                    className="overflow-x-auto bg-transparent p-4 font-mono text-caption"
                    style={{ borderRadius: "0" }}
                  >
                    <code className="bg-transparent text-ink">
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
