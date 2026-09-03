'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: number;
  duration: number;
  progress: number;
  status: 'waiting' | 'running' | 'completed';
  startTime?: number;
  endTime?: number;
}

type TaskMode = 'sequential' | 'concurrent';

const INITIAL_TASKS: Task[] = [
  { id: 1, duration: 3000, progress: 0, status: 'waiting' },
  { id: 2, duration: 2000, progress: 0, status: 'waiting' },
  { id: 3, duration: 4000, progress: 0, status: 'waiting' },
];

export const TaskSimulator = ({ tasks = 'sequential' }: { tasks: TaskMode }) => {
  const [mode, setMode] = useState<TaskMode>(tasks);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [taskList, setTaskList] = useState<Task[]>(INITIAL_TASKS);

  const resetTasks = useCallback(() => {
    setTaskList(tasks => tasks.map(task => ({
      ...task,
      progress: 0,
      status: 'waiting' as const,
      startTime: undefined,
      endTime: undefined
    })));
    setIsRunning(false);
    setStartTime(null);
  }, []);

  const startSimulation = useCallback(() => {
    resetTasks();
    setStartTime(Date.now());
    setIsRunning(true);
  }, [resetTasks]);

  useEffect(() => {
    if (!isRunning || !startTime) return;

    let animationFrameId: number;
    let isMounted = true;

    const updateTasks = () => {
      if (!isMounted) return;

      setTaskList(prevTasks => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        let allCompleted = true;

        const updatedTasks = prevTasks.map(task => {
          if (mode === 'sequential') {
            const previousTasksDuration = prevTasks
              .filter(t => t.id < task.id)
              .reduce((sum, t) => sum + t.duration, 0);

            const previousTasksCompleted = prevTasks
              .filter(t => t.id < task.id)
              .every(t => t.status === 'completed');

            if (!previousTasksCompleted) {
              allCompleted = false;
              return {
                ...task,
                progress: 0,
                status: 'waiting' as const,
                startTime: startTime + previousTasksDuration,
                endTime: startTime + previousTasksDuration + task.duration
              };
            }

            const taskStartTime = startTime + previousTasksDuration;
            const taskElapsedTime = Math.max(0, currentTime - taskStartTime);
            const newProgress = Math.min(100, (taskElapsedTime / task.duration) * 100);
            const newStatus = newProgress >= 100 
              ? 'completed' as const 
              : 'running' as const;

            if (newStatus !== 'completed') {
              allCompleted = false;
            }

            return {
              ...task,
              progress: newProgress,
              status: newStatus,
              startTime: taskStartTime,
              endTime: taskStartTime + task.duration
            };
          }

          // Concurrent mode
          const newProgress = Math.min(100, (elapsedTime / task.duration) * 100);
          const newStatus = newProgress >= 100 
            ? 'completed' as const 
            : 'running' as const;

          if (newStatus !== 'completed') {
            allCompleted = false;
          }

          return {
            ...task,
            progress: newProgress,
            status: newStatus,
            startTime: startTime,
            endTime: startTime + task.duration
          };
        });

        if (allCompleted) {
          if (isMounted) {
            setTimeout(() => {
              setIsRunning(false);
            }, 500); // Add a small delay before stopping
          }
        }

        return updatedTasks;
      });

      animationFrameId = requestAnimationFrame(updateTasks);
    };

    animationFrameId = requestAnimationFrame(updateTasks);

    return () => {
      isMounted = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRunning, startTime, mode]);

  useEffect(() => {
    resetTasks();
  }, [mode, resetTasks]);

  const getStatusColor = useCallback((status: Task['status']) => {
    switch (status) {
      case 'waiting':
        return 'bg-rule';
      case 'running':
        return 'bg-ink-2';
      case 'completed':
        return 'bg-ink';
      default:
        return 'bg-rule';
    }
  }, []);

  const explanation = useMemo(() => {
    if (mode === 'sequential') {
      return (
        <p className="mb-6 text-small text-ink-2">
          In Go, when tasks run <span className="font-medium text-ink">sequentially</span>, each goroutine waits for the previous one to complete before starting. 
          This is similar to using a <code className="rounded bg-well px-1 py-0.5 font-mono text-caption text-ink">sync.WaitGroup</code> or chaining goroutines with channels.
        </p>
      );
    }
    return (
      <p className="mb-6 text-small text-ink-2">
        In Go&apos;s <span className="font-medium text-ink">concurrent</span> execution, multiple goroutines run independently and simultaneously.
        This is like launching goroutines with <code className="rounded bg-well px-1 py-0.5 font-mono text-caption text-ink">go func()</code> without synchronization.
      </p>
    );
  }, [mode]);

  const handleModeChange = useCallback((newMode: TaskMode) => {
    setMode(newMode);
  }, []);

  const handleActionButton = useCallback(() => {
    if (isRunning) {
      resetTasks();
    } else {
      startSimulation();
    }
  }, [isRunning, resetTasks, startSimulation]);

  const buttonClassName = useMemo(() => `text-small transition-colors ${
    isRunning
      ? 'text-ink-2 hover:text-ink'
      : 'rounded bg-ink px-3 py-1.5 text-paper'
  }`, [isRunning]);

  const getTaskColor = (task: Task) => {
    if (task.status === 'completed' && task.progress === 100) {
      return 'bg-ink';
    }
    return task.status === 'running' ? 'bg-ink-2' : 'bg-rule';
  };

  const TimeAxis = () => {
    const totalDuration = Math.max(...taskList.map(task => 
      mode === 'sequential' 
        ? task.duration + (task.startTime ?? 0) - (startTime ?? 0)
        : task.duration
    ));
    
    const timeMarkers = Array.from({ length: 6 }).map((_, i) => {
      const seconds = ((i * totalDuration) / 5000).toFixed(1);
      return {
        position: i * 20,
        time: parseFloat(seconds)
      };
    });

    return (
      <div className="relative mb-6 h-12">
        {/* Base timeline */}
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 transform bg-rule" />
        
        {/* Time markers */}
        {timeMarkers.map(({ position, time }, i) => (
          <div
            key={`marker-${i}`}
            className="absolute top-1/2 h-2 w-px -translate-y-1/2 transform bg-ink-3"
            style={{ left: `${position}%` }}
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 transform font-mono text-caption text-ink-3">
              {time}s
            </span>
          </div>
        ))}

        {/* Unified progress bar */}
        <div className="absolute inset-y-0 left-0 right-0 top-1/2 -translate-y-1/2 transform">
          <div className="relative h-2">
            {/* Background track */}
            <div className="absolute inset-0 overflow-hidden rounded-full bg-rule">
              {taskList.map((task) => {
                const taskLeft = mode === 'sequential'
                  ? ((task.startTime ?? 0) - (startTime ?? 0)) / totalDuration * 100
                  : 0;
                const taskWidth = task.duration / totalDuration * 100;

                return (
                  <div
                    key={`track-${task.id}`}
                    className={`absolute h-full border-r border-paper last:border-r-0 ${getTaskColor({ ...task, status: 'waiting' })}`}
                    style={{
                      left: `${taskLeft}%`,
                      width: `${taskWidth}%`
                    }}
                  />
                );
              })}
            </div>

            {/* Progress overlay */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              {taskList.map((task) => {
                const taskLeft = mode === 'sequential'
                  ? ((task.startTime ?? 0) - (startTime ?? 0)) / totalDuration * 100
                  : 0;
                const taskWidth = task.duration / totalDuration * 100;

                return (
                  <motion.div
                    key={`progress-${task.id}`}
                    className={`absolute h-full border-r border-paper last:border-r-0 ${getTaskColor(task)}`}
                    style={{
                      left: `${taskLeft}%`,
                      width: `${taskWidth}%`
                    }}
                    initial={false}
                    animate={{ 
                      clipPath: `inset(0 ${task.status !== 'waiting' ? 100 - task.progress : 100}% 0 0)`
                    }}
                    transition={{ 
                      duration: 0.1,
                      ease: 'linear'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TaskItem = ({ task }: { task: Task }) => (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded border border-rule bg-paper p-4"
      style={{
        zIndex: task.status === 'running' ? 2 : 1
      }}
      layout
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-2 w-2 rounded-full ${getStatusColor(task.status)}`} />
          <span className="text-small font-medium text-ink">Task {task.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-mono text-caption ${
            task.status === 'waiting' ? 'text-ink-3' : 'text-ink-2'
          }`}>
            {task.status === 'completed' ? '●' : task.status === 'running' ? '◐' : '○'} {task.status}
          </span>
        </div>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-rule">
        <motion.div
          className={`h-full transition-colors duration-300 ${getTaskColor(task)}`}
          initial={false}
          animate={{ 
            width: `${task.progress}%`
          }}
          transition={{ 
            duration: 0.1,
            ease: 'linear'
          }}
        />
      </div>
    </motion.div>
  );

  return (
    <div className="my-8 rounded-md bg-well p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex gap-1">
          {(['sequential', 'concurrent'] as const).map((modeOption) => (
            <button
              key={modeOption}
              className={`rounded px-3 py-1.5 text-small transition-colors ${
                mode === modeOption
                  ? 'bg-ink text-paper'
                  : 'text-ink-2 hover:text-ink'
              }`}
              onClick={() => handleModeChange(modeOption)}
            >
              {modeOption.charAt(0).toUpperCase() + modeOption.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={handleActionButton}
          className={buttonClassName}
        >
          {isRunning ? 'Reset' : 'Start'}
        </button>
      </div>

      {explanation}

      <TimeAxis />

      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {taskList.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
