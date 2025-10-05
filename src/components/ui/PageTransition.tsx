'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  isTransitioning: boolean;
  onTransitionComplete?: () => void;
}

export function PageTransition({ isTransitioning, onTransitionComplete }: PageTransitionProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      setShow(true);
      // Call onTransitionComplete after all animations complete
      const timer = setTimeout(() => {
        onTransitionComplete?.();
      }, 2300); // Wait for all exit cards to finish (1.9s + 0.4s)
      
      return () => clearTimeout(timer);
    } else {
      setShow(false);
      return undefined;
    }
  }, [isTransitioning, onTransitionComplete]);

  // Define the entrance color layers
  const entranceLayers = [
    { color: '#FE7F2D', delay: 0, duration: 0.6 },      // Orange (accent)
    { color: '#006989', delay: 0.3, duration: 0.6 },    // Blue (accent-2)
    { color: '#233d4d', delay: 0.6, duration: 0.6 },    // Dark blue
    { color: '#FE7F2D', delay: 0.9, duration: 0.4 },    // Orange again (shorter)
  ];

  // Define the exit color layers (continue to the right with a small break)
  const exitLayers = [
    { color: '#006989', delay: 1.5, duration: 0.5 },    // Blue continues (0.2s break)
    { color: '#233d4d', delay: 1.7, duration: 0.5 },    // Dark continues
    { color: '#FE7F2D', delay: 1.9, duration: 0.4 },    // Orange final
  ];

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Entrance layers - slide in from left */}
          {entranceLayers.map((layer, index) => (
            <motion.div
              key={`entrance-${index}`}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{ 
                duration: layer.duration, 
                delay: layer.delay,
                ease: [0.43, 0.13, 0.23, 0.96] 
              }}
              className="fixed inset-0 rounded-3xl"
              style={{ 
                backgroundColor: layer.color,
                zIndex: 200 + index 
              }}
            />
          ))}

          {/* Exit layers - continue sliding to the right */}
          {exitLayers.map((layer, index) => (
            <motion.div
              key={`exit-${index}`}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{ 
                duration: layer.duration, 
                delay: layer.delay,
                ease: [0.43, 0.13, 0.23, 0.96] 
              }}
              className="fixed inset-0 rounded-3xl"
              style={{ 
                backgroundColor: layer.color,
                zIndex: 210 + index 
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );
}

