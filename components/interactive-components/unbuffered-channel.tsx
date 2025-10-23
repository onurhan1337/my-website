'use client'

import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Extracted components for better performance
const MessageDisplay = memo(({ message, isTimingOut }: { message: string | null; isTimingOut: boolean }) => {
  if (!message) return null;
  
  return (
    <motion.div
      key={message}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={`
        text-sm px-3 py-1.5 rounded-lg border whitespace-nowrap
        ${isTimingOut
          ? 'text-amber-600 bg-amber-50/50 border-amber-200/50'
          : 'text-neutral-600 bg-neutral-50 border-neutral-200/50'}
      `}
    >
      <span className="inline-flex items-center gap-2">
        {isTimingOut && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="inline-block w-3 h-3 border-2 border-amber-300 border-t-amber-500 rounded-full"
          />
        )}
        {message}
      </span>
    </motion.div>
  );
});

MessageDisplay.displayName = 'MessageDisplay';

const HistoryItem = memo(({ item, index }: { item: { value: number }; index: number }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: -10, height: 0 }}
    animate={{ 
      opacity: 1, 
      x: 0, 
      height: 'auto',
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
        delay: index * 0.1
      }
    }}
    className="flex items-center space-x-2 overflow-hidden"
  >
    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-200">
      <span className="text-xs text-emerald-600">✓</span>
    </div>
    <div className="flex items-center space-x-1.5">
      <span className="text-sm text-neutral-600">Value</span>
      <span className="text-sm font-medium text-emerald-600">{item.value}</span>
      <span className="text-sm text-neutral-600">transferred</span>
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
    w-32 h-32 rounded-xl flex items-center justify-center border-dashed
    ${isSending
      ? 'bg-amber-50 border-2 border-amber-200'
      : 'bg-neutral-50 border border-neutral-200'}
  `;

  const receiverClassName = `
    w-32 h-32 rounded-xl flex items-center justify-center border-dashed
    ${isReceiving
      ? 'bg-emerald-50 border-2 border-emerald-200'
      : 'bg-neutral-50 border border-neutral-200'}
  `;

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
      <div className="flex flex-col items-center space-y-8">
        <div className="flex items-center justify-between w-full max-w-2xl">
          {/* Sender */}
          <motion.div 
            animate={{ x: isSending ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className={senderClassName}
          >
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-600 mb-1">Sender</p>
              {isSending && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-amber-600"
                >
                  value: {value}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Channel */}
          <div className="flex-1 mx-8 relative">
            <motion.div 
              className="h-0.5 bg-neutral-200 w-full absolute top-1/2 -translate-y-1/2"
              animate={{
                scaleX: isBlocked ? [1, 1.02, 1] : 1,
                backgroundColor: isBlocked ? "#FCD34D" : "#E5E5E5"
              }}
              transition={{
                duration: 2,
                repeat: isBlocked ? Infinity : 0,
                ease: [0.4, 0, 0.6, 1]
              }}
            />
            {isBlocked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2"
              >
                <div className="px-2 py-1 bg-amber-50 rounded-md text-xs font-medium text-amber-600 border border-amber-200">
                  blocked
                </div>
              </motion.div>
            )}
          </div>

          {/* Receiver */}
          <motion.div 
            animate={{ x: isReceiving && isSending ? -20 : 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className={receiverClassName}
          >
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-600 mb-1">Receiver</p>
              {isReceiving && isSending && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-emerald-600"
                >
                  receiving...
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Message */}
        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <MessageDisplay message={message} isTimingOut={isTimingOut} />
          </AnimatePresence>
        </div>

        {/* Controls */}
        <motion.div 
          layout
          transition={{
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="flex space-x-4"
        >
          <button
            onClick={simulateSend}
            disabled={isBlocked}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${isBlocked
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : 'bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100'}
            `}
          >
            Send Value
          </button>
          <button
            onClick={simulateReceive}
            disabled={isReceiving && !isSending}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${isReceiving && !isSending
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'}
            `}
          >
            Receive Value
          </button>
        </motion.div>

        {/* History */}
        <AnimatePresence>
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl bg-neutral-50/50 rounded-lg p-3 border border-neutral-200/50"
            >
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