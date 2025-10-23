"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

interface TableOfContentsProps {
  headings: { title: string; id: string }[];
}

const TableOfContents = ({ headings }: TableOfContentsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      ref={containerRef}
      className="w-full max-w-3xl mx-auto mt-8 mb-12"
      layout
      layoutRoot
    >
      <motion.div layout className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-px bg-foreground/10" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
        >
          <span className="text-sm font-medium">On this page</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
        <div className="flex-1 h-px bg-foreground/10" />
      </motion.div>

      <motion.div
        layout
        className="relative overflow-hidden"
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          marginBottom: isOpen ? "1rem" : 0,
        }}
        transition={{
          height: { duration: 0.3, ease: "easeInOut" },
          opacity: { duration: 0.2 },
          marginBottom: { duration: 0.3 },
        }}
      >
        <nav className="flex flex-col space-y-2 px-4">
          {headings.map((heading, i) => (
            <motion.a
              key={heading.id}
              initial={false}
              animate={{
                opacity: isOpen ? 1 : 0,
                x: isOpen ? 0 : -4,
              }}
              transition={{
                duration: 0.2,
                delay: isOpen ? i * 0.05 : 0,
              }}
              href={`#${heading.id}`}
              className="text-sm opacity-50 hover:opacity-100 transition-opacity py-1 hover:underline underline-offset-4"
              onClick={(e) => handleClick(e, heading.id)}
            >
              {heading.title}
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </motion.div>
  );
};

export default TableOfContents;
