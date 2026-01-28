'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WordCyclerProps {
  words: string[];
  className?: string;
  interval?: number;
}

export function WordCycler({ words, className, interval = 3000 }: WordCyclerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  const currentPhrase = words[index];
  const phraseWords = currentPhrase.split(' ');

  return (
    <div className={cn("relative flex justify-center items-center min-h-[1.5em]", className)}>
      <AnimatePresence mode="wait">
        <motion.div
            key={index} // Key by index to trigger re-render of the whole phrase container
            className="flex flex-wrap justify-center gap-[0.25em]"
        >
          {phraseWords.map((word, wordIndex) => (
            <motion.span
              key={`${index}-${wordIndex}-${word}`}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
              transition={{ 
                duration: 0.5, 
                ease: "easeOut",
                delay: wordIndex * 0.1 // Stagger effect
              }}
              className="inline-block text-[#FE5F01] font-black"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
