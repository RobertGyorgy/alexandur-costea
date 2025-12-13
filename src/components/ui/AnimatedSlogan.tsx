'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const words = [
  'creator de conținut',
  'influencer',
  'filmmaker',
  'editor video',
  'începător',
  'pasionat de video',
  'antreprenor',
  'social media manager',
  'brand personal',
  'freelancer',
  'vlogger',
  'artist'
];

const staticText = 'Un program creativ pentru orice:';

export function AnimatedSlogan() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || shouldReduceMotion) return;
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 4000); // Mărit la 4 secunde pentru mai puține re-render-uri

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isMounted, shouldReduceMotion]);

  if (!isMounted) {
    return (
      <div className="relative z-[50] px-4 mb-8 md:mb-12 text-center">
        <div className="text-white">
          <p className="text-fib-2 md:text-fib-3 lg:text-fib-4 font-bold mb-2 md:mb-4 drop-shadow-lg">
            {staticText}
          </p>
          <div className="h-[1.2em] md:h-[1.5em] lg:h-[1.8em] flex items-center justify-center">
            <span className="inline-block text-fib-2 md:text-fib-3 lg:text-fib-4 font-bold text-[#FE5F01] drop-shadow-lg">
              {words[0]}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const currentWord = words[currentWordIndex];

  return (
    <div className="relative z-[50] px-4 mb-8 md:mb-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-white"
      >
        <p className="text-fib-2 md:text-fib-3 lg:text-fib-4 font-bold mb-2 md:mb-4 drop-shadow-lg">
          {staticText}
        </p>
        <div className="h-[1.2em] md:h-[1.5em] lg:h-[1.8em] flex items-center justify-center">
          <motion.span
            key={currentWordIndex}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="inline-block text-fib-2 md:text-fib-3 lg:text-fib-4 font-bold text-[#FE5F01] drop-shadow-lg"
          >
            {currentWord}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}

