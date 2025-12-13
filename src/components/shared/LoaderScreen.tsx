'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// YouTube IFrame API types
interface YouTubePlayer {
  setPlaybackRate: (rate: number) => void;
}

interface YouTubePlayerEvent {
  target: YouTubePlayer;
}

interface YouTubeWindow extends Window {
  YT?: {
    Player: new (elementId: string | HTMLElement | null, config: {
      events?: {
        onReady?: (event: YouTubePlayerEvent) => void;
      };
    }) => YouTubePlayer;
  };
}

export function LoaderScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const apiCheckRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        setIsMobile(mobile);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
    return undefined;
  }, []);

  // Auto-dismiss loader (faster on mobile)
  useEffect(() => {
    // On mobile, dismiss faster (1.5s) to prevent blocking
    // On desktop, keep 3 seconds
    const delay = isMobile ? 1500 : 3000;
    
    // Primary timer
    timeoutRef.current = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    // Safety timer - force dismiss after 4 seconds to prevent blocking
    const safetyTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 4000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      clearTimeout(safetyTimer);
    };
  }, [isMobile]);

  // Prevent scrolling while loader is active
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      // Restore body styles
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isLoaded]);

  // Load YouTube IFrame API and set playback rate to 1.5x
  useEffect(() => {
    if (!isLoaded && iframeRef.current && typeof window !== 'undefined') {
      // Check if script already exists
      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      
      if (!existingScript) {
        // Load YouTube IFrame API
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        tag.defer = true;
        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
      }

      // Wait for API to load (with timeout)
      const ytWindow = window as YouTubeWindow;
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max (50 * 100ms)
      
      apiCheckRef.current = setInterval(() => {
        attempts++;
        
        // Stop checking after max attempts
        if (attempts >= maxAttempts) {
          if (apiCheckRef.current) {
            clearInterval(apiCheckRef.current);
            apiCheckRef.current = null;
          }
          return;
        }
        
        if (ytWindow.YT && ytWindow.YT.Player && iframeRef.current) {
          if (apiCheckRef.current) {
            clearInterval(apiCheckRef.current);
            apiCheckRef.current = null;
          }
          
          try {
            new ytWindow.YT.Player(iframeRef.current, {
              events: {
                onReady: (event: YouTubePlayerEvent) => {
                  try {
                    event.target.setPlaybackRate(1.5); // Set to 1.5x speed
                  } catch (err) {
                    console.warn('Could not set playback rate:', err);
                  }
                }
              }
            });
          } catch (err) {
            console.warn('Could not initialize YouTube player:', err);
          }
        }
      }, 100);

      return () => {
        if (apiCheckRef.current) {
          clearInterval(apiCheckRef.current);
          apiCheckRef.current = null;
        }
      };
    }
    return undefined;
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
                allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
                allowFullScreen={false}
                title="Loader background video"
                loading="eager"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
