'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'orange' | 'white';
  className?: string;
}

export function GlowButton({ 
  children, 
  onClick, 
  variant = 'orange',
  className 
}: GlowButtonProps) {
  const isOrange = variant === 'orange';
  
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative px-8 md:px-12 py-3 md:py-4 text-sm md:text-base font-bold rounded-2xl outline-none transition-all duration-300 overflow-hidden",
        "min-w-[140px] md:min-w-[180px]",
        "backdrop-blur-xl",
        isOrange ? "glow-button-orange" : "glow-button-white",
        className
      )}
      style={{
        border: isOrange 
          ? '2px solid rgb(254, 95, 1)' 
          : '2px solid rgb(229, 228, 226)',
        color: isOrange 
          ? 'rgb(255, 255, 255)' 
          : 'rgb(16, 40, 55)',
        backgroundColor: isOrange 
          ? 'rgb(254, 95, 1)' 
          : 'rgb(229, 228, 226)',
        boxShadow: isOrange
          ? `0 0 0.3em 0.1em rgba(254, 95, 1, 0.3)`
          : `0 0 0.3em 0.1em rgba(229, 228, 226, 0.3)`,
        textShadow: 'none',
      }}
    >
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

