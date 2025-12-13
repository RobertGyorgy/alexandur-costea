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
  const [isSafari, setIsSafari] = useState(false);

  // Detect mobile device and Safari
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkDevice = () => {
        const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        setIsMobile(mobile);
        
        // Detect Safari (iOS or desktop)
        const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || 
                      /iPad|iPhone|iPod/.test(navigator.userAgent);
        setIsSafari(safari);
      };
      checkDevice();
      window.addEventListener('resize', checkDevice);
      return () => window.removeEventListener('resize', checkDevice);
    }
    return undefined;
  }, []);

  // Auto-dismiss loader (faster on mobile and Safari)
  useEffect(() => {
    // On Safari or mobile, dismiss faster to prevent blocking
    let delay = 3000;
    if (isSafari) {
      delay = isMobile ? 1000 : 2000; // Very fast on Safari mobile, faster on Safari desktop
    } else if (isMobile) {
      delay = 1500;
    }
    
    // Primary timer
    timeoutRef.current = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    // Safety timer - force dismiss after 3 seconds to prevent blocking (especially on Safari)
    const safetyTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      clearTimeout(safetyTimer);
    };
  }, [isMobile, isSafari]);

  // Prevent scrolling while loader is active (Safari-specific fix)
  useEffect(() => {
    if (!isLoaded) {
      if (isSafari) {
        // Safari-specific: use html overflow instead of body position fixed
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.position = 'relative';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'relative';
        document.body.style.width = '100%';
        document.body.style.height = '100vh';
      } else {
        // Standard approach for other browsers
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
      }
    } else {
      // Restore styles
      if (isSafari) {
        document.documentElement.style.overflow = '';
        document.documentElement.style.position = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
      } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
      }
    }
    
    return () => {
      // Cleanup on unmount
      if (isSafari) {
        document.documentElement.style.overflow = '';
        document.documentElement.style.position = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
      } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
      }
    };
  }, [isLoaded, isSafari]);

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
                  zIndex: 0,
                  WebkitTransform: 'translate(-50%, -50%) scale(1.1)', // Safari prefix
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
