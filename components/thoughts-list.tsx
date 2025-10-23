"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ThoughtCard } from "./thought-card";
import type { Thought } from "@/types/thought";

interface ThoughtsListProps {
  thoughts: (Thought & { renderedContent: React.ReactNode })[];
  currentPage: number;
}

export function ThoughtsList({ thoughts, currentPage }: ThoughtsListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 5 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 10,
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {thoughts.map((thought, index, array) => (
          <motion.div key={thought.slug} variants={item}>
            <ThoughtCard thought={thought} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
