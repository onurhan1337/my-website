"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Mic,
  FileText,
  Brain,
  Volume2,
  Headphones,
  Play,
  Pause,
} from "lucide-react";

const STEPS = [
  { id: "speech", name: "Speech", icon: Mic, duration: 1000 },
  { id: "stt", name: "STT", icon: FileText, duration: 800 },
  { id: "llm", name: "LLM", icon: Brain, duration: 1200 },
  { id: "tts", name: "TTS", icon: Volume2, duration: 600 },
  { id: "output", name: "Output", icon: Headphones, duration: 400 },
];

export function RealtimeAudioFlow() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [totalLatency, setTotalLatency] = useState(0);

  const resetState = () => {
    setCurrentStep(-1);
    setCompletedSteps(new Set());
    setTotalLatency(0);
  };

  const toggleSimulation = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      resetState();
    } else {
      setIsRunning(true);
      resetState();
    }
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];
    let delay = 0;

    STEPS.forEach((step, i) => {
      timeouts.push(
        setTimeout(() => {
          setCurrentStep(i);
          setTotalLatency((prev) => prev + step.duration);
        }, delay)
      );

      timeouts.push(
        setTimeout(() => {
          setCompletedSteps((prev) => {
            const newSet = new Set(prev);
            newSet.add(i);
            return newSet;
          });

          if (i === STEPS.length - 1) {
            setTimeout(() => {
              setIsRunning(false);
              setCurrentStep(-1);
            }, 500);
          }
        }, delay + step.duration)
      );

      delay += step.duration + 200;
    });

    return () => timeouts.forEach(clearTimeout);
  }, [isRunning]);

  const getStepStyle = (index: number) => {
    const isActive = currentStep === index;
    const isCompleted = completedSteps.has(index);

    if (isCompleted) return "bg-ink border-ink text-paper";
    if (isActive) return "bg-paper border-ink text-ink";
    return "bg-paper border-rule text-ink-3";
  };

  const getLatencyStatus = () => {
    if (totalLatency < 200)
      return {
        mark: "●",
        text: "Human-like",
        desc: "Excellent! Feels human",
      };
    if (totalLatency < 500)
      return {
        mark: "◐",
        text: "Acceptable",
        desc: "Good, but noticeable",
      };
    return {
      mark: "○",
      text: "Robotic",
      desc: "Too slow - feels robotic",
    };
  };

  const status = getLatencyStatus();

  return (
    <div className="my-8 rounded-md border border-rule bg-paper p-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h3 className="mb-1 text-body font-medium text-ink">
            Realtime audio processing
          </h3>
          <p className="font-mono text-caption text-ink-2">
            Speech → STT → LLM → TTS → Output
          </p>
        </div>

        <button
          onClick={toggleSimulation}
          className={`flex items-center gap-2 text-small transition-colors ${
            isRunning
              ? "text-ink-2 hover:text-ink"
              : "rounded bg-ink px-3 py-1.5 text-paper"
          }`}
        >
          {isRunning ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          {isRunning ? "Reset" : "Start"}
        </button>
      </div>

      <div className="relative h-40">
        <div className="absolute left-0 right-0 top-12 flex items-center justify-between px-8">
          {STEPS.slice(0, -1).map((_, i) => (
            <div key={i} className="flex flex-1 justify-center">
              <div className="h-px w-full max-w-32 overflow-hidden bg-rule">
                <div
                  className={`h-full bg-ink transition-all duration-500 ${
                    completedSteps.has(i) ? "w-full" : "w-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 flex items-start justify-between pt-4">
          {STEPS.map((step, i) => {
            const isActive = currentStep === i;
            const isCompleted = completedSteps.has(i);
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-1 flex-col items-center">
                <div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-full border transition-colors duration-300 ${getStepStyle(
                    i
                  )}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="mt-4 text-center">
                  <div
                    className={`font-mono text-caption ${
                      isActive || isCompleted ? "text-ink" : "text-ink-3"
                    }`}
                  >
                    {step.name}
                  </div>

                  {isActive && (
                    <div className="mt-1 font-mono text-caption text-ink-2">
                      {step.duration}ms
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isRunning && (
        <div className="mt-8 rounded-md bg-well p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="mb-1 text-small font-medium text-ink">
                Total latency: {totalLatency}ms
              </h4>
              <p className="text-caption text-ink-2">{status.desc}</p>
            </div>
            <div className="flex items-center gap-2 font-mono text-caption text-ink-2">
              <span>{status.mark}</span>
              <span>{status.text}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 border-l border-ink pl-4">
        <p className="text-small text-ink-2">
          <span className="font-mono text-caption text-ink">Key insight:</span>
          <br />
          Each step must stream data forward as soon as it&apos;s available.
          <br />
          Waiting for complete results kills the realtime experience.
        </p>
      </div>
    </div>
  );
}
