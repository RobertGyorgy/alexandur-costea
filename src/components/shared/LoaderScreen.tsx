'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoaderScreen() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-dismiss loader after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Prevent scrolling while loader is active
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'relative';
      document.body.style.width = 'auto';
      document.body.style.height = 'auto';
    }
  }, [isLoaded]);

  return (
    <AnimatePresence mode="wait">
      {!isLoaded && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}
        >
          {/* Background Video */}
          <div className="absolute inset-0 overflow-hidden bg-black">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              webkit-playsinline="true"
              x5-playsinline="true"
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onLoadedMetadata={(e) => {
                const video = e.currentTarget;
                video.playbackRate = 2.0; // Play at 2x speed
              }}
              onError={(e) => {
                console.log('Video failed to load:', e);
              }}
            >
              <source src="/LOOP_3_web.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
