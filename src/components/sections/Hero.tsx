'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { GlowButton } from '@/components/ui/GlowButton';
import { siteContent } from '@/lib/content';
import { analytics } from '@/lib/analytics';

export function Hero() {
  const content = siteContent.hero;
  const [bottomOffset, setBottomOffset] = useState('0px');
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  
  // Parallax effects
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const updatePosition = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const viewportHeight = window.visualViewport?.height || window.innerHeight;
        const windowHeight = window.innerHeight;
        const difference = windowHeight - viewportHeight;
        setBottomOffset(`${Math.max(0, difference)}px`);
      } else {
        setBottomOffset('0px');
      }
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);
    window.visualViewport?.addEventListener('resize', updatePosition);
    window.visualViewport?.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.visualViewport?.removeEventListener('resize', updatePosition);
      window.visualViewport?.removeEventListener('scroll', updatePosition);
    };
  }, []);

  const handleCTAClick = (href: string, label: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches 
            ? 'auto' 
            : 'smooth',
          block: 'start',
        });
      }
    }
    analytics.trackCTAClick(label, 'hero');
  };

  return (
    <Section
      id="hero"
      as="header"
      className="relative min-h-screen flex items-end justify-center overflow-hidden pb-32 md:pb-20"
      spacing="xl"
      ref={sectionRef}
    >
      {/* Background Video */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y: videoY, scale: videoScale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/video prezentare_landscape_web.mp4" type="video/mp4" />
        </video>
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/30 to-bg/40" />
      </motion.div>

      {/* CTA Buttons - Positioned lower with mobile browser bar compensation */}
      <motion.div 
        className="relative z-[60] px-4"
        style={{ marginBottom: bottomOffset, y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-row gap-3 md:gap-4 justify-center items-center"
        >
          <GlowButton
            variant="orange"
            onClick={() => handleCTAClick(content.ctaPrimary.href, content.ctaPrimary.label)}
          >
            {content.ctaPrimary.label}
          </GlowButton>
          
          <GlowButton
            variant="white"
            onClick={() => handleCTAClick(content.ctaSecondary.href, content.ctaSecondary.label)}
          >
            {content.ctaSecondary.label}
          </GlowButton>
        </motion.div>
      </motion.div>
    </Section>
  );
}

