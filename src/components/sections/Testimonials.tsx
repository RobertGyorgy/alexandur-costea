'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { siteContent } from '@/lib/content';
import { analytics } from '@/lib/analytics';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';

export function Testimonials() {
  const content = siteContent.testimonials;
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  // Multiple parallax layers for depth
  const containerY = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, -150]);
  const containerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const containerRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);
  
  // Individual card parallax (staggered)
  const card1Y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const card1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9]);
  const card1Rotate = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  
  const card2Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const card2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.1, 0.95]);
  
  const card3Y = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const card3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.03, 0.88]);
  const card3Rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width:767px)').matches;

  const centerCard = useCallback((index: number) => {
    const mobile = isMobile();
    const track = mobile ? mobileTrackRef.current : trackRef.current;
    const wrap = wrapRef.current;
    
    if (!track || !wrap) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    
    const axis = mobile ? 'top' : 'left';
    const size = mobile ? 'clientHeight' : 'clientWidth';
    const start = mobile ? card.offsetTop : card.offsetLeft;
    
    wrap.scrollTo({
      [axis]: start - (wrap[size] / 2 - card[size] / 2),
      behavior: 'smooth'
    });
  }, []);

  const activate = (index: number, shouldScroll: boolean) => {
    if (index === current) return;
    setCurrent(index);
    if (shouldScroll) centerCard(index);
    
    analytics.track({
      action: 'testimonial_navigate',
      category: 'engagement',
      label: `index_${index}`,
    });
  };

  useEffect(() => {
    centerCard(0);
  }, [centerCard]);

  useEffect(() => {
    const handleResize = () => centerCard(current);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [current, centerCard]);

  return (
    <Section
      id="testimonials"
      spacing="xl"
      aria-labelledby="testimonials-heading"
      className="testimonials-slider"
      ref={sectionRef}
    >
      <BackgroundEffects variant="lines" color="#ff4500" opacity={0.15} animated />
      {/* Slider with Gray Background Container - Dolly Zoom Effect (Desktop Only) */}
      <motion.div 
        className="max-w-[1400px] mx-auto overflow-hidden px-5" 
        style={{ 
          y: typeof window !== 'undefined' && window.innerWidth >= 768 ? containerY : 0, 
          scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? containerScale : 1,
          rotateZ: typeof window !== 'undefined' && window.innerWidth >= 768 ? containerRotate : 0,
        }}
      >
        {/* Gray Background Container */}
        <div className="bg-gray-800/20 dark:bg-gray-200/15 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
          <div
            ref={wrapRef}
            className="overflow-x-auto md:overflow-x-visible scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
          {/* Desktop: Horizontal Layout */}
          <div
            ref={trackRef}
            className="hidden md:flex gap-5 items-center justify-center"
            style={{ scrollBehavior: 'smooth', scrollSnapType: 'x mandatory' }}
          >
            {content.items.map((testimonial, index) => {
              const isActive = index === current;
              // Cycle through colors
              const getCardBg = (idx: number) => {
                const colors = ['bg-accent', 'bg-white', 'bg-gray-800', 'bg-white', 'bg-accent'];
                return colors[idx % colors.length];
              };

              const getTextColor = (idx: number) => {
                if (idx % 5 === 1 || idx % 5 === 3) return 'text-[#0B0F19]';
                if (idx % 5 === 2) return 'text-white';
                return 'text-white';
              };

              const getButtonStyle = (idx: number) => {
                if (idx % 5 === 1 || idx % 5 === 3) return 'bg-accent text-white hover:bg-accent/90';
                return 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30';
              };

              // Get transforms for each card (Desktop Only)
              const cardTransforms = [
                { y: card1Y, scale: card1Scale, rotateZ: card1Rotate },
                { y: card2Y, scale: card2Scale, rotateZ: 0 },
                { y: card3Y, scale: card3Scale, rotateZ: card3Rotate },
              ];
              const transform = cardTransforms[index % 3];
              const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;

              return (
                <motion.article
                  key={testimonial.id}
                  className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-[550ms] ease-out ${getCardBg(index)} ${
                    isActive
                      ? 'flex-[0_0_26rem]'
                      : 'flex-[0_0_10rem]'
                  } h-[34rem]`}
                  onClick={() => activate(index, true)}
                  onMouseEnter={() => activate(index, true)}
                  style={{
                    y: isMobileDevice ? 0 : transform.y,
                    scale: isMobileDevice ? 1 : transform.scale,
                    rotateZ: isMobileDevice ? 0 : transform.rotateZ,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
                    {!isActive && (
                      <h3 className={`${getTextColor(index)} font-bold text-2xl [writing-mode:vertical-rl] rotate-180 tracking-wider`}>
                        {testimonial.name.split(' ')[0].toUpperCase()}
                      </h3>
                    )}

                    {isActive && (
                      <div className="flex flex-col justify-center h-full px-6">
                        <h3 className={`${getTextColor(index)} font-bold text-3xl mb-4`}>
                          {testimonial.name.toUpperCase()}
                        </h3>
                        <p className={`${getTextColor(index)} opacity-90 text-base leading-relaxed mb-4 max-w-sm`}>
                          {testimonial.quote}
                        </p>
                        <p className={`${getTextColor(index)} opacity-70 text-sm mb-4`}>
                          {testimonial.role}
                          {testimonial.company && ` • ${testimonial.company}`}
                        </p>
                        <button 
                          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all self-start ${getButtonStyle(index)}`}
                        >
                          Details
                        </button>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Mobile: Vertical Layout */}
          <div
            ref={mobileTrackRef}
            className="flex md:hidden flex-col gap-3 items-center justify-center pb-10"
            style={{ scrollBehavior: 'smooth', scrollSnapType: 'y mandatory' }}
          >
            {content.items.map((testimonial, index) => {
              const isActive = index === current;
              const getCardBg = (idx: number) => {
                const colors = ['bg-accent', 'bg-white', 'bg-gray-800', 'bg-white', 'bg-accent'];
                return colors[idx % colors.length];
              };

              const getTextColor = (idx: number) => {
                if (idx % 5 === 1 || idx % 5 === 3) return 'text-[#0B0F19]';
                if (idx % 5 === 2) return 'text-white';
                return 'text-white';
              };

              const getButtonStyle = (idx: number) => {
                if (idx % 5 === 1 || idx % 5 === 3) return 'bg-accent text-white hover:bg-accent/90';
                return 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30';
              };

              return (
                <article
                  key={`mobile-${testimonial.id}`}
                  className={`relative rounded-3xl overflow-hidden cursor-pointer ${getCardBg(index)} w-full transition-all duration-700 ease-in-out flex items-center justify-center`}
                  style={{
                    maxHeight: isActive ? '60rem' : '5rem',
                    minHeight: '5rem'
                  }}
                  onClick={() => activate(index, true)}
                >
                  <div className={`flex flex-col justify-center items-center w-full ${isActive ? 'py-8 px-4 h-full' : 'px-4'}`}>
                    {!isActive && (
                      <h3 className={`${getTextColor(index)} font-bold text-xl text-center`}>
                        {testimonial.name.split(' ')[0].toUpperCase()}
                      </h3>
                    )}

                    {isActive && (
                      <div className="flex flex-col justify-center p-6 w-full">
                        <h3 className={`${getTextColor(index)} font-bold text-2xl mb-4`}>
                          {testimonial.name.toUpperCase()}
                        </h3>
                        <p className={`${getTextColor(index)} opacity-90 text-sm leading-relaxed mb-4`}>
                          {testimonial.quote}
                        </p>
                        <p className={`${getTextColor(index)} opacity-70 text-xs mb-4`}>
                          {testimonial.role}
                          {testimonial.company && ` • ${testimonial.company}`}
                        </p>
                        <button 
                          className={`px-5 py-2 rounded-full text-xs font-semibold transition-all w-full ${getButtonStyle(index)}`}
                        >
                          Details
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          </div>
        </div>
      </motion.div>

    </Section>
  );
}
