'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: number;
  duration: number;
  progress: number;
  status: 'waiting' | 'running' | 'completed';
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
      status: 'waiting' as const
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
            const previousTasksCompleted = prevTasks
              .filter(t => t.id < task.id)
              .every(t => t.status === 'completed');

            if (!previousTasksCompleted) {
              allCompleted = false;
              return task;
            }
          }

          if (task.status === 'completed') {
            return task;
          }

          const newProgress = Math.min(100, (elapsedTime / task.duration) * 100);
          const newStatus = (newProgress >= 100 ? 'completed' : 'running') as Task['status'];
          
          if (newStatus !== 'completed') {
            allCompleted = false;
          }

          return {
            ...task,
            progress: newProgress,
            status: newStatus
          };
        });

        if (allCompleted && isMounted) {
          setIsRunning(false);
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
        return 'bg-neutral-200 dark:bg-neutral-700';
      case 'running':
        return 'bg-blue-400 dark:bg-blue-500';
      case 'completed':
        return 'bg-emerald-400 dark:bg-emerald-500';
      default:
        return 'bg-neutral-200 dark:bg-neutral-700';
    }
  }, []);

  const explanation = useMemo(() => {
    if (mode === 'sequential') {
      return (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
          In Go, when tasks run <strong>sequentially</strong>, each goroutine waits for the previous one to complete before starting. 
          This is similar to using a <code className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm">sync.WaitGroup</code> or chaining goroutines with channels.
        </p>
      );
    }
    return (
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        In Go&apos;s <strong>concurrent</strong> execution, multiple goroutines run independently and simultaneously. 
        This is like launching goroutines with <code className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm">go func()</code> without synchronization.
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
      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
      : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'
  }`, [isRunning]);

  return (
    <div className="p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="inline-flex p-1 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
          {(['sequential', 'concurrent'] as const).map((modeOption) => (
            <button
              key={modeOption}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                mode === modeOption
                  ? 'bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
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

      <div className="space-y-5">
        <AnimatePresence mode="wait">
          {taskList.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="group relative bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-50/80 dark:hover:bg-neutral-800/80 rounded-xl p-4 transition-colors duration-300"
              layout
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                  <span className="font-medium text-neutral-700 dark:text-neutral-200">Task {task.id}</span>
                </div>
                <span className={`text-sm ${
                  task.status === 'completed' 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : task.status === 'running' 
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-neutral-400 dark:text-neutral-500'
                }`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </div>
              <div className="h-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full transition-colors duration-300 ${
                    task.status === 'completed'
                      ? 'bg-emerald-400 dark:bg-emerald-500'
                      : 'bg-blue-400 dark:bg-blue-500'
                  }`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${task.progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
