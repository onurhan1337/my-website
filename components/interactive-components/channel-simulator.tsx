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

const EASE = { duration: 0.2, ease: 'easeOut' as const };

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
          flex h-16 w-16 items-center justify-center rounded
          ${value
            ? 'bg-ink text-paper'
            : 'border border-dashed border-rule bg-paper text-ink-3'}
        `}
        initial={false}
        animate={{ opacity: 1 }}
        transition={EASE}
      >
        {value && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={EASE}
            className="font-mono text-small font-medium"
          >
            {value.content}
          </motion.span>
        )}
      </motion.div>
    );
  }, [buffer]);

  const isSendDisabled = blocked.sender || buffer.length >= bufferSize;
  const isReceiveDisabled = blocked.receiver || buffer.length === 0;

  return (
    <div className="my-8 rounded-md bg-well p-6">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="text-caption text-ink-2">Buffer size: {bufferSize}</span>
            <AnimatePresence>
              {(blocked.sender || blocked.receiver) && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={EASE}
                  className="text-caption text-ink"
                >
                  ● {blocked.sender ? 'sender blocked' : 'receiver blocked'}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="relative h-24 overflow-hidden rounded-md border border-rule bg-paper">
            <div className="absolute inset-0 flex items-center justify-center gap-4 p-4">
              {Array.from({ length: bufferSize }).map((_, index) => renderBufferSlot(index))}
            </div>
          </div>
        </div>

        <div className="relative my-4 flex h-8 w-full items-center justify-center">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {message && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-caption text-ink-2"
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
            disabled={isSendDisabled}
            aria-label="Send Value"
            className={`
              rounded px-3 py-1.5 text-small transition-colors
              ${isSendDisabled
                ? 'cursor-default bg-paper text-ink-3'
                : 'bg-ink text-paper'}
            `}
          >
            Send value
          </button>
          <button
            onClick={receiveData}
            disabled={isReceiveDisabled}
            aria-label="Receive Value"
            className={`
              rounded border px-3 py-1.5 text-small transition-colors
              ${isReceiveDisabled
                ? 'cursor-default border-rule bg-paper text-ink-3'
                : 'border-rule bg-paper text-ink-2 hover:text-ink'}
            `}
          >
            Receive value
          </button>
        </div>
      </div>
    </div>
  );
});

ChannelSimulator.displayName = 'ChannelSimulator';
