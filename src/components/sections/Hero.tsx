'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { siteContent } from '@/lib/content';

export function Hero() {
  const content = siteContent.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-garnet text-white text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-3xl leading-tight md:leading-relaxed"
        >
          {(() => {
            const text = content.subheading;
            const orangeWords = ['transformăm', 'în storytelling autentic', 'viral', 'Reels', 'retelele sociale'];
            const boldWords = ['ideile', 'impact viral'];
            const allWords = [...orangeWords, ...boldWords];
            const regex = new RegExp(`(${allWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
            
            // Split at "storytelling autentic," for line break
            const breakPoint = text.indexOf('storytelling autentic,');
            const firstPart = text.substring(0, breakPoint + 'storytelling autentic,'.length);
            const secondPart = text.substring(breakPoint + 'storytelling autentic,'.length);
            
            const formatText = (textPart: string) => {
              const parts = textPart.split(regex);
              return parts.map((part, index) => {
                const isOrange = orangeWords.some(word => part.toLowerCase().includes(word.toLowerCase()));
                const isBold = boldWords.some(word => part.toLowerCase() === word.toLowerCase());
                
                if (isOrange) {
                  return <span key={index} className="text-[#FE5F01] font-black">{part}</span>;
                } else if (isBold) {
                  return <span key={index} className="font-black">{part}</span>;
                }
                return <React.Fragment key={index}>{part}</React.Fragment>;
              });
            };
            
            return (
              <>
                <span className="block sm:inline-block">
                  {formatText(firstPart)}
                </span>
                <br className="block sm:hidden md:inline" />
                <span className="block sm:inline-block sm:ml-1">
                  {formatText(secondPart)}
                </span>
              </>
            );
          })()}
        </motion.p>
      </motion.div>
    </Section>
  );
}

