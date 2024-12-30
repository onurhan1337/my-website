'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Value {
  id: number;
  content: number;
}

type BlockedState = {
  sender: boolean;
  receiver: boolean;
};

export const ChannelSimulator = ({ bufferSize = 1 }: { bufferSize: number }) => {
  const [buffer, setBuffer] = useState<Value[]>([]);
  const [nextId, setNextId] = useState(1);
  const [blocked, setBlocked] = useState<BlockedState>({ sender: false, receiver: false });
  const [message, setMessage] = useState<string | null>(null);
  const [messageTimeoutId, setMessageTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Cleanup message timeout on unmount
  useEffect(() => {
    return () => {
      if (messageTimeoutId) {
        clearTimeout(messageTimeoutId);
      }
    };
  }, [messageTimeoutId]);

  // Reset blocked state when buffer changes
  useEffect(() => {
    if (buffer.length === 0) {
      setBlocked(prev => ({
        ...prev,
        sender: false,
        receiver: true
      }));
    } else if (buffer.length >= bufferSize) {
      setBlocked(prev => ({
        ...prev,
        sender: true,
        receiver: false
      }));
    } else {
      setBlocked({
        sender: false,
        receiver: false
      });
    }
  }, [buffer.length, bufferSize]);

  const showMessage = (text: string, duration: number = 2000) => {
    if (messageTimeoutId) {
      clearTimeout(messageTimeoutId);
    }
    setMessage(text);
    if (!blocked.sender && !blocked.receiver) {
      const timeoutId = setTimeout(() => setMessage(null), duration);
      setMessageTimeoutId(timeoutId);
    }
  };

  const sendData = () => {
    if (blocked.sender || buffer.length >= bufferSize) return;

    const newValue = { id: nextId, content: nextId };
    setBuffer([...buffer, newValue]);
    setNextId(nextId + 1);
    showMessage(`Sent value: ${nextId}`);

    // For buffer size 1, immediately block sender after sending
    if (bufferSize === 1) {
      setBlocked(prev => ({
        ...prev,
        sender: true,
        receiver: false
      }));
    }
  };

  const receiveData = () => {
    if (blocked.receiver || buffer.length === 0) return;

    const [received, ...remaining] = buffer;
    setBuffer(remaining);
    showMessage(`Received value: ${received.content}`);

    // For buffer size 1, immediately block receiver after receiving
    if (bufferSize === 1) {
      setBlocked(prev => ({
        sender: false,
        receiver: true
      }));
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
      <div className="flex flex-col items-center space-y-6">
        {/* Channel Visualization */}
        <div className="relative w-full max-w-md">
          {/* Buffer Size Indicator */}
          <div className="absolute -top-6 right-0 text-sm text-neutral-500">
            Buffer Size: {bufferSize}
          </div>

          {/* Channel Container */}
          <div className="relative h-24 bg-neutral-50 rounded-xl border-2 border-neutral-200 overflow-hidden">
            {/* Buffer Slots */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 p-4">
              {Array.from({ length: bufferSize }).map((_, index) => {
                const value = buffer[index];
                return (
                  <motion.div
                    key={index}
                    className={`
                      w-16 h-16 rounded-lg flex items-center justify-center
                      ${value ? 'bg-blue-50 border-2 border-blue-200' : 'bg-neutral-100 border border-neutral-200'}
                    `}
                    initial={false}
                    animate={{
                      scale: value ? 1 : 0.95,
                      opacity: value ? 1 : 0.5,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {value && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="text-lg font-medium text-blue-600"
                      >
                        {value.content}
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Blocked State Overlay */}
            <AnimatePresence>
              {(blocked.sender || blocked.receiver) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-amber-50/50 flex items-center justify-center"
                >
                  <span className="px-3 py-1.5 bg-amber-100 rounded-full text-sm font-medium text-amber-600 border border-amber-200">
                    {blocked.sender ? 'Sender Blocked' : 'Receiver Blocked'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Message Display */}
        <div className="h-8">
          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-neutral-600 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200"
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={sendData}
            disabled={blocked.sender || buffer.length >= bufferSize}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${blocked.sender || buffer.length >= bufferSize
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'}
            `}
          >
            Send Value
          </button>
          <button
            onClick={receiveData}
            disabled={blocked.receiver || buffer.length === 0}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${blocked.receiver || buffer.length === 0
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'}
            `}
          >
            Receive Value
          </button>
        </div>
      </div>
    </div>
  );
};
