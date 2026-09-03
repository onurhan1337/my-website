'use client'

import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = { duration: 0.2, ease: 'easeOut' as const };

// Extracted components for better performance
const MessageDisplay = memo(({ message, isTimingOut }: { message: string | null; isTimingOut: boolean }) => {
  if (!message) return null;
  
  return (
    <motion.div
      key={message}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={EASE}
      className={`
        whitespace-nowrap text-caption
        ${isTimingOut ? 'text-ink' : 'text-ink-2'}
      `}
    >
      <span className="inline-flex items-center gap-2">
        {isTimingOut && <span aria-hidden="true">○</span>}
        {message}
      </span>
    </motion.div>
  );
});

MessageDisplay.displayName = 'MessageDisplay';

const HistoryItem = memo(({ item, index }: { item: { value: number }; index: number }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: -4, height: 0 }}
    animate={{ 
      opacity: 1, 
      x: 0, 
      height: 'auto',
      transition: {
        duration: 0.2,
        ease: 'easeOut',
        delay: index * 0.05
      }
    }}
    className="flex items-center gap-2 overflow-hidden"
  >
    <span className="text-caption text-ink" aria-hidden="true">●</span>
    <div className="flex items-center gap-1.5">
      <span className="text-small text-ink-2">Value</span>
      <span className="font-mono text-caption text-ink">{item.value}</span>
      <span className="text-small text-ink-2">transferred</span>
    </div>
  </motion.div>
));

HistoryItem.displayName = 'HistoryItem';

export const UnbufferedChannelDemo = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [value, setValue] = useState<number>(1);
  const [history, setHistory] = useState<Array<{action: string; value: number}>>([]);
  const [isTimingOut, setIsTimingOut] = useState(false);

  // Cleanup effect
  useEffect(() => {
    return () => {
      setMessage(null);
      setIsTimingOut(false);
    };
  }, []);

  // Handle receive timeout
  useEffect(() => {
    if (!isReceiving || isSending) return;

    setIsTimingOut(true);
    const timeoutId = setTimeout(() => {
      setIsReceiving(false);
      setIsBlocked(false);
      setIsTimingOut(false);
      setMessage(null);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [isReceiving, isSending]);

  const simulateSend = useCallback(() => {
    if (!isBlocked) {
      setIsBlocked(true);
      setIsSending(true);
      setValue(prev => prev + 1);
      setMessage(`Waiting to send value ${value}...`);
    }
  }, [isBlocked, value]);

  const simulateReceive = useCallback(() => {
    if (isSending) {
      const currentValue = value;
      setIsSending(false);
      setIsBlocked(false);
      setIsReceiving(true);
      setHistory(prev => [...prev, { action: 'transfer', value: currentValue }]);
      setMessage(`Value ${currentValue} transferred`);
      
      const timeoutId = setTimeout(() => {
        setIsReceiving(false);
        setMessage(null);
      }, 1500);

      return () => clearTimeout(timeoutId);
    } else {
      setIsBlocked(true);
      setIsReceiving(true);
      setIsTimingOut(true);
      setMessage('Waiting for sender (will timeout)');
    }
  }, [isSending, value]);

  // Memoized class names
  const senderClassName = `
    flex h-24 w-32 items-center justify-center rounded-md border bg-paper transition-colors
    ${isSending ? 'border-ink' : 'border-dashed border-rule'}
  `;

  const receiverClassName = `
    flex h-24 w-32 items-center justify-center rounded-md border bg-paper transition-colors
    ${isReceiving ? 'border-ink' : 'border-dashed border-rule'}
  `;

  const isSendDisabled = isBlocked;
  const isReceiveDisabled = isReceiving && !isSending;

  return (
    <div className="my-8 rounded-md bg-well p-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex w-full max-w-2xl items-center justify-between">
          {/* Sender */}
          <motion.div 
            animate={{ x: isSending ? 12 : 0 }}
            transition={EASE}
            className={senderClassName}
          >
            <div className="text-center">
              <p className={`text-small ${isSending ? 'text-ink' : 'text-ink-2'}`}>Sender</p>
              {isSending && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={EASE}
                  className="font-mono text-caption text-ink-2"
                >
                  value: {value}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Channel */}
          <div className="relative mx-8 flex-1">
            <div
              className={`absolute top-1/2 h-px w-full -translate-y-1/2 transition-colors ${
                isBlocked ? 'bg-ink' : 'bg-rule'
              }`}
            />
            {isBlocked && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={EASE}
                className="absolute left-1/2 top-full mt-2 -translate-x-1/2"
              >
                <div className="text-caption text-ink">blocked</div>
              </motion.div>
            )}
          </div>

          {/* Receiver */}
          <motion.div 
            animate={{ x: isReceiving && isSending ? -12 : 0 }}
            transition={EASE}
            className={receiverClassName}
          >
            <div className="text-center">
              <p className={`text-small ${isReceiving ? 'text-ink' : 'text-ink-2'}`}>Receiver</p>
              {isReceiving && isSending && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={EASE}
                  className="text-caption text-ink-2"
                >
                  receiving…
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Message */}
        <div className="flex h-8 items-center justify-center">
          <AnimatePresence mode="wait">
            <MessageDisplay message={message} isTimingOut={isTimingOut} />
          </AnimatePresence>
        </div>

        {/* Controls */}
        <motion.div 
          layout
          transition={EASE}
          className="flex gap-4"
        >
          <button
            onClick={simulateSend}
            disabled={isSendDisabled}
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
            onClick={simulateReceive}
            disabled={isReceiveDisabled}
            className={`
              rounded border px-3 py-1.5 text-small transition-colors
              ${isReceiveDisabled
                ? 'cursor-default border-rule bg-paper text-ink-3'
                : 'border-rule bg-paper text-ink-2 hover:text-ink'}
            `}
          >
            Receive value
          </button>
        </motion.div>

        {/* History */}
        <AnimatePresence>
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={EASE}
              className="w-full max-w-2xl rounded-md border border-rule bg-paper p-4"
            >
              <div className="mb-2 text-caption text-ink-2">History</div>
              <div className="space-y-2">
                {history.map((item, index) => (
                  <HistoryItem key={index} item={item} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
