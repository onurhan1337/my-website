'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: number;
  duration: number;
  progress: number;
  status: 'waiting' | 'running' | 'completed';
}

export const TaskSimulator = ({ tasks = 'sequential' }: { tasks: 'sequential' | 'concurrent' }) => {
  const [mode, setMode] = useState(tasks);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [taskList, setTaskList] = useState<Task[]>([
    { id: 1, duration: 3000, progress: 0, status: 'waiting' },
    { id: 2, duration: 2000, progress: 0, status: 'waiting' },
    { id: 3, duration: 4000, progress: 0, status: 'waiting' },
  ]);

  const resetTasks = () => {
    setTaskList(tasks => tasks.map(task => ({
      ...task,
      progress: 0,
      status: 'waiting'
    })));
    setIsRunning(false);
    setStartTime(null);
  };

  const startSimulation = () => {
    resetTasks();
    setStartTime(Date.now());
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning || !startTime) return;

    let animationFrameId: number;

    const updateTasks = () => {
      setTaskList(prevTasks => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;

        return prevTasks.map(task => {
          if (mode === 'sequential') {
            const previousTasksCompleted = prevTasks
              .filter(t => t.id < task.id)
              .every(t => t.status === 'completed');

            if (!previousTasksCompleted) {
              return task;
            }
          }

          if (task.status === 'completed') {
            return task;
          }

          const newProgress = Math.min(100, (elapsedTime / task.duration) * 100);
          
          return {
            ...task,
            progress: newProgress,
            status: newProgress >= 100 ? 'completed' : 'running'
          };
        });
      });

      animationFrameId = requestAnimationFrame(updateTasks);
    };

    animationFrameId = requestAnimationFrame(updateTasks);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRunning, startTime, mode]);

  useEffect(() => {
    resetTasks();
  }, [mode]);

  const allTasksCompleted = taskList.every(task => task.status === 'completed');
  if (allTasksCompleted && isRunning) {
    setIsRunning(false);
  }

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'waiting':
        return 'bg-gray-200';
      case 'running':
        return 'bg-blue-400';
      case 'completed':
        return 'bg-emerald-400';
      default:
        return 'bg-gray-200';
    }
  };

  const getExplanation = () => {
    if (mode === 'sequential') {
      return (
        <p className="text-sm text-gray-600 mb-6">
          In Go, when tasks run <strong>sequentially</strong>, each goroutine waits for the previous one to complete before starting. 
          This is similar to using a <code className="px-1 py-0.5 bg-gray-100 rounded text-sm">sync.WaitGroup</code> or chaining goroutines with channels.
        </p>
      );
    }
    return (
      <p className="text-sm text-gray-600 mb-6">
        In Go's <strong>concurrent</strong> execution, multiple goroutines run independently and simultaneously. 
        This is like launching goroutines with <code className="px-1 py-0.5 bg-gray-100 rounded text-sm">go func()</code> without synchronization.
      </p>
    );
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="inline-flex p-1 bg-gray-50 rounded-xl">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
              mode === 'sequential'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setMode('sequential')}
          >
            Sequential
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
              mode === 'concurrent'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setMode('concurrent')}
          >
            Concurrent
          </button>
        </div>
        <button
          onClick={() => {
            if (isRunning) {
              resetTasks();
            } else {
              startSimulation();
            }
          }}
          className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
            isRunning
              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          {isRunning ? 'Reset' : 'Start'}
        </button>
      </div>

      {getExplanation()}

      <div className="space-y-5">
        <AnimatePresence>
          {taskList.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="group relative bg-gray-50 hover:bg-gray-50/80 rounded-xl p-4 transition-colors duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                  <span className="font-medium text-gray-700">Task {task.id}</span>
                </div>
                <span className={`text-sm ${
                  task.status === 'completed' 
                    ? 'text-emerald-600' 
                    : task.status === 'running' 
                      ? 'text-blue-600'
                      : 'text-gray-400'
                }`}>
                  {task.status === 'waiting' && 'Waiting'}
                  {task.status === 'running' && 'Running'}
                  {task.status === 'completed' && 'Completed'}
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full transition-colors duration-300 ${
                    task.status === 'completed'
                      ? 'bg-emerald-400'
                      : 'bg-blue-400'
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
