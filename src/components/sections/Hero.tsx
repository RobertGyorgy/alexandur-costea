'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { WordCycler } from '@/components/ui/WordCycler';
import { siteContent } from '@/lib/content';

// YouTube IFrame API types
interface YouTubePlayer {
  setPlaybackQuality: (quality: string) => void;
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

export function Hero() {
  const content = siteContent.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load YouTube IFrame API and force 1080p quality
  useEffect(() => {
    if (iframeRef.current) {
      // Load YouTube IFrame API
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Wait for API to load
      const ytWindow = window as YouTubeWindow;
      const checkYT = setInterval(() => {
        if (ytWindow.YT && ytWindow.YT.Player && iframeRef.current) {
          clearInterval(checkYT);
          new ytWindow.YT.Player(iframeRef.current, {
            events: {
              onReady: (event: YouTubePlayerEvent) => {
                event.target.setPlaybackQuality('hd1080'); // Force 1080p quality
              }
            }
          });
        }
      }, 100);

      return () => clearInterval(checkYT);
    }
    return undefined;
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  
  // Parallax effects - optimized with clamp
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 200], { clamp: true });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2], { clamp: true });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100], { clamp: true });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0], { clamp: true });

  return (
    <Section
      id="hero"
      as="header"
      className="relative min-h-screen flex items-end justify-center overflow-hidden pb-8 md:pb-12"
      spacing="xl"
      ref={sectionRef}
    >
      {/* Background Video - YouTube Embed */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden" 
        style={{ 
          y: videoY, 
          scale: videoScale,
          willChange: 'transform'
        }}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
          <iframe
            ref={iframeRef}
            src="https://www.youtube.com/embed/suOmT0gt7YI?autoplay=1&mute=1&loop=1&playlist=suOmT0gt7YI&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&showinfo=0&disablekb=1&fs=0&cc_load_policy=0&enablejsapi=1&vq=hd1080"
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
              willChange: 'transform',
              pointerEvents: 'none',
              border: 'none',
              zIndex: 0,
              // Crop to hide YouTube UI elements at edges
              clipPath: 'inset(0)'
            }}
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            title="Hero background video"
          />
        </div>
        {/* Complete overlay to hide all YouTube UI elements */}
        <div 
          className="absolute inset-0"
          style={{ 
            zIndex: 1,
            pointerEvents: 'none',
            background: 'transparent'
          }}
        />
      </motion.div>

      {/* Animated Slogan - Temporarily disabled for performance testing */}
      {/* <AnimatedSlogan /> */}

      {/* Hero Content - Only Subheading */}
      <motion.div 
        className="relative z-[60] px-4 sm:px-6 max-w-6xl mx-auto text-center"
        style={{ 
          y: contentY, 
          opacity: contentOpacity, 
          transform: isMobile ? 'translateY(20px)' : 'translateY(80px)' 
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-garnet text-white text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-3xl leading-[1.2] sm:leading-[1.3] md:leading-relaxed"
        >
          <span className="block w-full mb-2 md:mb-3">
            {content.subheading}
          </span>
          <WordCycler 
            words={content.roles} 
            className="w-full"
            interval={3500}
          />
        </motion.div>
      </motion.div>
    </Section>
  );
}

