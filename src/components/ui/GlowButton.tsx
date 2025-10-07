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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-8 md:px-12 py-3 md:py-4 text-sm md:text-base font-bold rounded-2xl outline-none transition-all duration-300 overflow-hidden",
        "min-w-[140px] md:min-w-[180px]",
        "backdrop-blur-xl",
        className
      )}
      style={{
        border: isOrange 
          ? '0.25em solid rgb(254, 95, 1)' 
          : '0.25em solid rgb(229, 228, 226)',
        color: isOrange 
          ? 'rgb(254, 95, 1)' 
          : 'rgb(229, 228, 226)',
        backgroundColor: isOrange 
          ? 'rgba(16, 40, 55, 0.3)' 
          : 'rgba(229, 228, 226, 0.15)',
        // Reduced glow for default state
        boxShadow: isOrange
          ? `0 0 0.5em 0.15em rgb(254, 95, 1),
             0 0 1.5em 0.4em rgba(254, 95, 1, 0.4),
             inset 0 0 0.5em 0.15em rgb(254, 95, 1)`
          : `0 0 0.5em 0.15em rgb(229, 228, 226),
             0 0 1.5em 0.4em rgba(229, 228, 226, 0.4),
             inset 0 0 0.5em 0.15em rgb(229, 228, 226)`,
        textShadow: isOrange
          ? '0 0 0.3em rgb(254, 95, 1)'
          : '0 0 0.3em rgb(229, 228, 226)',
      }}
    >
      {/* Glass shimmer effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)',
        }}
      />
      
      {/* Subtle noise texture for glass effect */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
      
      {/* Glow reflection underneath - reduced opacity */}
      <div
        className="pointer-events-none absolute top-full left-0 h-full w-full opacity-40 transition-opacity duration-300"
        style={{
          backgroundColor: isOrange 
            ? 'rgba(254, 95, 1, 0.781)' 
            : 'rgba(229, 228, 226, 0.781)',
          filter: 'blur(2em)',
          transform: 'perspective(1.5em) rotateX(35deg) scale(1, 0.6)',
        }}
      />
      
      {/* Hover state styles */}
      <style jsx>{`
        button:hover {
          background-color: ${isOrange ? 'rgba(254, 95, 1, 0.8)' : 'rgba(229, 228, 226, 0.8)'};
          color: ${isOrange ? 'rgb(16, 40, 55)' : 'rgb(16, 40, 55)'};
          /* Full glow on hover */
          box-shadow: ${isOrange
            ? `0 0 1em 0.25em rgb(254, 95, 1),
               0 0 4em 2em rgba(254, 95, 1, 0.781),
               inset 0 0 0.75em 0.25em rgb(254, 95, 1)`
            : `0 0 1em 0.25em rgb(229, 228, 226),
               0 0 4em 2em rgba(229, 228, 226, 0.781),
               inset 0 0 0.75em 0.25em rgb(229, 228, 226)`
          };
          text-shadow: ${isOrange ? '0 0 0.5em rgb(254, 95, 1)' : '0 0 0.5em rgb(229, 228, 226)'};
        }
        
        button:hover + div {
          opacity: 0.7;
        }
        
        button:active {
          box-shadow: ${isOrange
            ? `0 0 0.6em 0.25em rgb(254, 95, 1),
               0 0 2.5em 2em rgba(254, 95, 1, 0.781),
               inset 0 0 0.5em 0.25em rgb(254, 95, 1)`
            : `0 0 0.6em 0.25em rgb(229, 228, 226),
               0 0 2.5em 2em rgba(229, 228, 226, 0.781),
               inset 0 0 0.5em 0.25em rgb(229, 228, 226)`
          };
        }
      `}</style>
    </motion.button>
  );
}