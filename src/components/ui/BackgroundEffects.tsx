'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  variant?: 'grid' | 'dots' | 'gradient' | 'lines' | 'radial';
  color?: string;
  opacity?: number;
  animated?: boolean;
}

export function BackgroundEffects({ 
  variant = 'gradient', 
  color = '#ff4500',
  opacity = 0.15,
  animated = true 
}: BackgroundEffectsProps) {
  
  if (variant === 'grid') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`grid-${color.replace('#', '')}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={color}
                strokeWidth="0.5"
                opacity={opacity}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${color.replace('#', '')})`} />
        </svg>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`dots-${color.replace('#', '')}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={color} opacity={opacity} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dots-${color.replace('#', '')})`} />
        </svg>
      </div>
    );
  }

  if (variant === 'lines') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {animated ? (
          <>
            <motion.div
              className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent"
              animate={{ 
                scaleX: [0, 1, 1, 0],
                opacity: [0, 0.5, 0.5, 0] 
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent"
              animate={{ 
                scaleX: [0, 1, 1, 0],
                opacity: [0, 0.5, 0.5, 0] 
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2,
                delay: 2,
                ease: "easeInOut"
              }}
            />
          </>
        ) : (
          <>
            <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
            <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          </>
        )}
      </div>
    );
  }

  if (variant === 'radial') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {animated ? (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
              style={{
                background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
                filter: 'blur(60px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [opacity, opacity * 1.5, opacity],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
              style={{
                background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
                filter: 'blur(80px)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [opacity, opacity * 1.5, opacity],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </>
        ) : (
          <>
            <div
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
              style={{
                background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
              style={{
                background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
                filter: 'blur(80px)',
              }}
            />
          </>
        )}
      </div>
    );
  }

  // Default: gradient
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at top, ${color}15 0%, transparent 50%),
                       radial-gradient(ellipse at bottom, ${color}15 0%, transparent 50%)`,
        }}
      />
    </div>
  );
}

