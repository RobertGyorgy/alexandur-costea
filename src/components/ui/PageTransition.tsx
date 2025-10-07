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
      }, 1700); // Wait for all exit cards to finish
      
      return () => clearTimeout(timer);
    } else {
      setShow(false);
      return undefined;
    }
  }, [isTransitioning, onTransitionComplete]);

  // Define the entrance color layers (slower timing)
  const entranceLayers = [
    { color: '#FE7F2D', delay: 0, duration: 0.6 },      // Orange (accent)
    { color: '#003049', delay: 0.25, duration: 0.6 },   // Dark blue
    { color: '#D62828', delay: 0.5, duration: 0.6 },    // Red
    { color: '#FCBF49', delay: 0.75, duration: 0.6 },   // Yellow
  ];

  // Define the exit color layers (continue to the right with a small break)
  const exitLayers = [
    { color: '#FCBF49', delay: 1.2, duration: 0.5 },    // Yellow continues
  ];

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Entrance layers - slide in from left */}
          {entranceLayers.map((layer, index) => (
            <motion.div
              key={`entrance-${index}`}
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                duration: layer.duration, 
                delay: layer.delay,
                ease: [0.76, 0, 0.24, 1] // Smoother easeInOutQuart
              }}
              className="fixed inset-0"
              style={{ 
                backgroundColor: layer.color,
                zIndex: 200 + index 
              }}
            />
          ))}

          {/* Text Layer - ALEXANDRU COSTEA */}
          <motion.div
            key="text-layer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ 
              duration: 0.6, 
              delay: 1.0,
              ease: [0.76, 0, 0.24, 1]
            }}
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 220 }}
          >
            <h1 
              className="font-garnet text-[8vw] md:text-[6vw] font-bold tracking-tight text-[#EAE2B7]"
              style={{
                textShadow: '0 0 40px rgba(234, 226, 183, 0.3)',
              }}
            >
              ALEXANDRU COSTEA
            </h1>
          </motion.div>

          {/* Exit layers - continue sliding to the right */}
          {exitLayers.map((layer, index) => (
            <motion.div
              key={`exit-${index}`}
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                duration: layer.duration, 
                delay: layer.delay,
                ease: [0.76, 0, 0.24, 1] // Smoother easeInOutQuart
              }}
              className="fixed inset-0"
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





