'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoaderScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // Load YouTube IFrame API and set playback rate to 2x
  useEffect(() => {
    if (!isLoaded && iframeRef.current) {
      // Load YouTube IFrame API
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Wait for API to load
      const checkYT = setInterval(() => {
        if ((window as any).YT && (window as any).YT.Player) {
          clearInterval(checkYT);
          const player = new (window as any).YT.Player(iframeRef.current, {
            events: {
              onReady: (event: any) => {
                event.target.setPlaybackRate(1.5); // Set to 1.5x speed
              }
            }
          });
        }
      }, 100);

      return () => clearInterval(checkYT);
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
          {/* Background Video - YouTube Embed */}
          <div className="absolute inset-0 overflow-hidden bg-black">
            <div className="absolute inset-0 w-full h-full">
              <iframe
                ref={iframeRef}
                src="https://www.youtube.com/embed/suOmT0gt7YI?autoplay=1&mute=1&loop=1&playlist=suOmT0gt7YI&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&showinfo=0&disablekb=1&fs=0&cc_load_policy=0&enablejsapi=1"
                className="absolute"
                style={{ 
                  width: '100vw',
                  height: '56.25vw',
                  minHeight: '100%',
                  minWidth: '177.77vh',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) scale(1.1)',
                  pointerEvents: 'none',
                  border: 'none',
                  zIndex: 0
                }}
                allow="autoplay; encrypted-media"
                allowFullScreen={false}
                title="Loader background video"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
