'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Value {
  id: number;
  content: number;
}

type BlockedState = {
  sender: boolean;
  receiver: boolean;
};

const MESSAGE_DURATION = 2000;

export const ChannelSimulator = React.memo(({ bufferSize = 1 }: { bufferSize: number }) => {
  const [buffer, setBuffer] = useState<Value[]>([]);
  const [nextId, setNextId] = useState(1);
  const [blocked, setBlocked] = useState<BlockedState>({ sender: false, receiver: false });
  const [message, setMessage] = useState<string | null>(null);
  const messageTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Cleanup message timeout on unmount
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  // Reset blocked state when buffer changes
  useEffect(() => {
    setBlocked({
      sender: buffer.length >= bufferSize,
      receiver: buffer.length === 0
    });
  }, [buffer.length, bufferSize]);

  const showMessage = useCallback((text: string) => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    setMessage(text);
    
    if (!blocked.sender && !blocked.receiver) {
      messageTimeoutRef.current = setTimeout(() => {
        setMessage(null);
        messageTimeoutRef.current = null;
      }, MESSAGE_DURATION);
    }
  }, [blocked.sender, blocked.receiver]);

  const sendData = useCallback(() => {
    if (blocked.sender || buffer.length >= bufferSize) return;

    setBuffer(prev => [...prev, { id: nextId, content: nextId }]);
    setNextId(prev => prev + 1);
    showMessage(`Sent value: ${nextId}`);
  }, [blocked.sender, buffer.length, bufferSize, nextId, showMessage]);

  const receiveData = useCallback(() => {
    if (blocked.receiver || buffer.length === 0) return;

    setBuffer(prev => {
      const [, ...remaining] = prev;
      return remaining;
    });
    showMessage(`Received value: ${buffer[0].content}`);
  }, [blocked.receiver, buffer, showMessage]);

  const renderBufferSlot = useCallback((index: number) => {
    const value = buffer[index];
    return (
      <motion.div
        key={index}
        className={`
          w-16 h-16 rounded-lg flex items-center justify-center
          ${value 
            ? 'bg-blue-50 border-2 border-blue-200'
            : 'bg-neutral-100 border border-neutral-200'}
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
  }, [buffer]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-md mt-8 mb-6">
          <div className="absolute -top-8 right-0 text-sm text-neutral-500">
            Buffer Size: {bufferSize}
          </div>

          <div className="relative h-24 bg-neutral-50 rounded-xl border-2 border-neutral-200 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center gap-4 p-4">
              {Array.from({ length: bufferSize }).map((_, index) => renderBufferSlot(index))}
            </div>

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

        <div className="h-12 w-full relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              {message && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-sm text-neutral-600 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200"
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={sendData}
            disabled={blocked.sender || buffer.length >= bufferSize}
            aria-label="Send Value"
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
            aria-label="Receive Value"
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
});

ChannelSimulator.displayName = 'ChannelSimulator';
