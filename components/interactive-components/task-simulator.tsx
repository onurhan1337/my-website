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
        return 'bg-neutral-200';
      case 'running':
        return 'bg-blue-400';
      case 'completed':
        return 'bg-emerald-400';
      default:
        return 'bg-neutral-200';
    }
  }, []);

  const explanation = useMemo(() => {
    if (mode === 'sequential') {
      return (
        <p className="text-sm text-neutral-600 mb-6">
          In Go, when tasks run <strong>sequentially</strong>, each goroutine waits for the previous one to complete before starting. 
          This is similar to using a <code className="px-1 py-0.5 bg-neutral-100 rounded text-sm">sync.WaitGroup</code> or chaining goroutines with channels.
        </p>
      );
    }
    return (
      <p className="text-sm text-neutral-600 mb-6">
        In Go&apos;s <strong>concurrent</strong> execution, multiple goroutines run independently and simultaneously.
        This is like launching goroutines with <code className="px-1 py-0.5 bg-neutral-100 rounded text-sm">go func()</code> without synchronization.
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

  const buttonClassName = useMemo(() => `px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
    isRunning
      ? 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
  }`, [isRunning]);

  const getTaskColor = (task: Task) => {
    const baseColors = {
      1: {
        base: 'bg-blue-400 border-blue-500',
        light: 'bg-blue-200 border-blue-300'
      },
      2: {
        base: 'bg-purple-400 border-purple-500',
        light: 'bg-purple-200 border-purple-300'
      },
      3: {
        base: 'bg-orange-400 border-orange-500',
        light: 'bg-orange-200 border-orange-300'
      }
    }[task.id] ?? {
      base: 'bg-neutral-400 border-neutral-500',
      light: 'bg-neutral-200 border-neutral-300'
    };

    if (task.status === 'completed' && task.progress === 100) {
      return 'bg-emerald-400 border-emerald-500';
    }
    return task.status === 'running' ? baseColors.base : baseColors.light;
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
      <div className="h-12 relative mb-6">
        {/* Base timeline */}
        <div className="absolute left-0 right-0 h-0.5 bg-neutral-200 top-1/2 transform -translate-y-1/2" />
        
        {/* Time markers */}
        {timeMarkers.map(({ position, time }, i) => (
          <div
            key={`marker-${i}`}
            className="absolute h-2 w-0.5 bg-neutral-300 top-1/2 transform -translate-y-1/2"
            style={{ left: `${position}%` }}
          >
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-neutral-500">
              {time}s
            </span>
          </div>
        ))}

        {/* Unified progress bar */}
        <div className="absolute inset-y-0 left-0 right-0 top-1/2 transform -translate-y-1/2">
          <div className="relative h-2">
            {/* Background track */}
            <div className="absolute inset-0 rounded-full border overflow-hidden">
              {taskList.map((task) => {
                const taskLeft = mode === 'sequential'
                  ? ((task.startTime ?? 0) - (startTime ?? 0)) / totalDuration * 100
                  : 0;
                const taskWidth = task.duration / totalDuration * 100;

                return (
                  <div
                    key={`track-${task.id}`}
                    className={`absolute h-full border-r last:border-r-0 ${getTaskColor({ ...task, status: 'waiting' })}`}
                    style={{
                      left: `${taskLeft}%`,
                      width: `${taskWidth}%`
                    }}
                  />
                );
              })}
            </div>

            {/* Progress overlay */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {taskList.map((task) => {
                const taskLeft = mode === 'sequential'
                  ? ((task.startTime ?? 0) - (startTime ?? 0)) / totalDuration * 100
                  : 0;
                const taskWidth = task.duration / totalDuration * 100;

                return (
                  <motion.div
                    key={`progress-${task.id}`}
                    className={`absolute h-full border-r last:border-r-0 ${getTaskColor(task)}`}
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
      className="group relative bg-neutral-50 hover:bg-neutral-50/80 rounded-xl p-4 transition-colors duration-300"
      style={{
        zIndex: task.status === 'running' ? 2 : 1
      }}
      layout
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${getTaskColor(task)}`} />
          <span className="font-medium text-neutral-700">Task {task.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${
            task.status === 'completed'
              ? 'text-emerald-600'
              : task.status === 'running'
                ? 'text-blue-600'
                : 'text-neutral-400'
          }`}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="relative h-1.5 bg-neutral-100 rounded-full overflow-hidden">
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
        {task.status === 'completed' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 0.6,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-neutral-100">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="inline-flex p-1 bg-neutral-50 rounded-xl">
          {(['sequential', 'concurrent'] as const).map((modeOption) => (
            <button
              key={modeOption}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                mode === modeOption
                  ? 'bg-white text-neutral-800 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
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

      <div className="space-y-5">
        <AnimatePresence mode="wait">
          {taskList.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
