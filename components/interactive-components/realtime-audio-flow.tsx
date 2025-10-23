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

  const getStepStyle = (index) => {
    const isActive = currentStep === index;
    const isCompleted = completedSteps.has(index);

    if (isCompleted)
      return "bg-neutral-900 border-neutral-900 text-white";
    if (isActive)
      return "bg-white border-neutral-900 text-neutral-900 shadow-lg scale-110";
    return "bg-white border-neutral-200 text-neutral-300";
  };

  const getLatencyStatus = () => {
    if (totalLatency < 200)
      return {
        color: "bg-emerald-500",
        text: "Human-like",
        desc: "Excellent! Feels human",
      };
    if (totalLatency < 500)
      return {
        color: "bg-yellow-500",
        text: "Acceptable",
        desc: "Good, but noticeable",
      };
    return {
      color: "bg-red-500",
      text: "Robotic",
      desc: "Too slow - feels robotic",
    };
  };

  const status = getLatencyStatus();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-neutral-900 mb-2">
            Realtime Audio Processing
          </h1>
          <p className="text-sm text-neutral-500 font-mono">
            Speech → STT → LLM → TTS → Output
          </p>
        </div>

        <button
          onClick={toggleSimulation}
          className="flex items-center gap-2 px-6 py-2 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors duration-200 font-mono text-sm"
        >
          {isRunning ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {isRunning ? "RESET" : "START"}
        </button>
      </div>

      <div className="relative h-40">
        <div className="absolute top-12 left-0 right-0 flex items-center justify-between px-8">
          {STEPS.slice(0, -1).map((_, i) => (
            <div key={i} className="flex-1 flex justify-center">
              <div className="w-full max-w-32 h-px bg-neutral-200 overflow-hidden">
                <div
                  className={`h-full bg-neutral-900 transition-all duration-500 ${
                    completedSteps.has(i) ? "w-full" : "w-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start justify-between relative z-10 pt-4">
          {STEPS.map((step, i) => {
            const isActive = currentStep === i;
            const isCompleted = completedSteps.has(i);
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`relative w-16 h-16 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${getStepStyle(
                    i
                  )}`}
                >
                  <Icon className="w-6 h-6" />

                  {isActive && (
                    <div className="absolute inset-0 border-2 border-neutral-900 rounded-full opacity-20 animate-ping" />
                  )}
                </div>

                <div className="mt-4 text-center">
                  <div
                    className={`font-mono text-sm tracking-wider ${
                      isActive || isCompleted
                        ? "text-neutral-900"
                        : "text-neutral-400"
                    }`}
                  >
                    {step.name}
                  </div>

                  {isActive && (
                    <div className="text-xs text-neutral-500 mt-1 font-mono animate-in fade-in slide-in-from-bottom-1 duration-300">
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
        <div className="mt-8 p-4 bg-neutral-50 border border-neutral-200 rounded-lg shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-neutral-800 mb-1">
                Total Latency: {totalLatency}ms
              </h4>
              <p className="text-xs text-neutral-600">
                {status.desc}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${status.color}`} />
              <span className="text-xs font-medium text-neutral-600">
                {status.text}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 border-l-2 border-neutral-900 pl-6">
        <p className="text-sm text-neutral-600 leading-relaxed">
          <span className="font-mono text-neutral-900">
            KEY INSIGHT:
          </span>
          <br />
          Each step must stream data forward as soon as it&apos;s available.
          <br />
          Waiting for complete results kills the realtime experience.
        </p>
      </div>
    </div>
  );
}
