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
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  const centerCard = useCallback((index: number) => {
    const mobile = isMobile;
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
  }, [isMobile]);

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
    setIsMounted(true);
    
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      className="testimonials-slider bg-[#E5E4E2]"
      ref={sectionRef}
    >
      <BackgroundEffects variant="lines" color="#FE5F01" opacity={0.15} animated />
      {/* Slider with Gray Background Container - Dolly Zoom Effect (Desktop Only) */}
      <motion.div 
        className="max-w-[1400px] mx-auto overflow-hidden px-2 md:px-5" 
        style={{ 
          y: isMounted && !isMobile ? containerY : 0, 
          scale: isMounted && !isMobile ? containerScale : 1,
          rotateZ: isMounted && !isMobile ? containerRotate : 0,
        }}
      >
        {/* Gray Background Container */}
        <div className="bg-gray-800/20 dark:bg-gray-200/15 rounded-3xl p-3 md:p-8 backdrop-blur-sm">
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
                const colors = ['bg-[#FE5F01]', 'bg-[#102837]', 'bg-[#ff7a2e]', 'bg-[#102837]', 'bg-[#FE5F01]'];
                return colors[idx % colors.length];
              };

              const getTextColor = (idx: number) => {
                if (idx % 5 === 0 || idx % 5 === 4) return 'text-[#EAE2B7]'; // Red cards
                if (idx % 5 === 2) return 'text-[#EAE2B7]'; // Orange card
                return 'text-[#EAE2B7]'; // Blue cards
              };


              // Get transforms for each card (Desktop Only)
              const cardTransforms = [
                { y: card1Y, scale: card1Scale, rotateZ: card1Rotate },
                { y: card2Y, scale: card2Scale, rotateZ: 0 },
                { y: card3Y, scale: card3Scale, rotateZ: card3Rotate },
              ];
              const transform = cardTransforms[index % 3];
              const shouldApplyParallax = isMounted && !isMobile;

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
                    y: shouldApplyParallax ? transform.y : 0,
                    scale: shouldApplyParallax ? transform.scale : 1,
                    rotateZ: shouldApplyParallax ? transform.rotateZ : 0,
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
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Mobile: Landscape Layout with Navigation */}
          <div className="md:hidden">
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mb-6">
              <motion.button
                onClick={() => {
                  const prevIndex = current === 0 ? content.items.length - 1 : current - 1;
                  activate(prevIndex, false);
                }}
                className="w-12 h-12 rounded-full bg-[#102837]/20 backdrop-blur-sm border border-[#102837]/30 flex items-center justify-center hover:bg-[#102837]/30 transition-all duration-300"
                aria-label="Previous testimonial"
                whileHover={{ 
                  scale: 1.1,
                  rotate: -5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.svg 
                  className="w-6 h-6 text-[#102837]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </motion.svg>
              </motion.button>
              
              <div className="flex gap-2">
                {content.items.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => activate(index, false)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === current ? 'bg-[#102837]' : 'bg-[#102837]/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    whileHover={{ 
                      scale: 1.5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ 
                      scale: 0.8,
                      transition: { duration: 0.1 }
                    }}
                    animate={{
                      scale: index === current ? 1.5 : 1,
                      backgroundColor: index === current ? '#102837' : 'rgba(16, 40, 55, 0.3)'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.1,
                      ease: [0.76, 0, 0.24, 1]
                    }}
                  />
                ))}
              </div>
              
              <motion.button
                onClick={() => {
                  const nextIndex = current === content.items.length - 1 ? 0 : current + 1;
                  activate(nextIndex, false);
                }}
                className="w-12 h-12 rounded-full bg-[#102837]/20 backdrop-blur-sm border border-[#102837]/30 flex items-center justify-center hover:bg-[#102837]/30 transition-all duration-300"
                aria-label="Next testimonial"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.svg 
                  className="w-6 h-6 text-[#102837]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
            </div>

            {/* Single Card Display */}
            <div className="relative h-[40rem]">
              {content.items.map((testimonial, index) => {
                const isActive = index === current;
                const getCardBg = (idx: number) => {
                  const colors = ['bg-[#FE5F01]', 'bg-[#102837]', 'bg-[#ff7a2e]', 'bg-[#102837]', 'bg-[#FE5F01]'];
                  return colors[idx % colors.length];
                };

                const getTextColor = (idx: number) => {
                  if (idx % 5 === 0 || idx % 5 === 4) return 'text-[#EAE2B7]'; // Red cards
                  if (idx % 5 === 2) return 'text-[#EAE2B7]'; // Orange card
                  return 'text-[#EAE2B7]'; // Blue cards
                };

                return (
                  <motion.article
                    key={`mobile-${testimonial.id}`}
                    initial={{ opacity: 0, x: 100, scale: 0.8, rotateY: 15 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : 100,
                      scale: isActive ? 1 : 0.8,
                      rotateY: isActive ? 0 : 15
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: -100, 
                      scale: 0.8, 
                      rotateY: -15 
                    }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.76, 0, 0.24, 1],
                      scale: { duration: 0.5 },
                      rotateY: { duration: 0.7 }
                    }}
                    className={`absolute inset-0 rounded-3xl overflow-hidden ${getCardBg(index)} w-full h-full flex items-center justify-center`}
                    style={{ 
                      display: isActive ? 'flex' : 'none',
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <motion.div 
                      className="flex flex-col justify-center p-6 w-full h-full"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: isActive ? 0 : 20,
                        opacity: isActive ? 1 : 0
                      }}
                      transition={{ 
                        duration: 0.4, 
                        delay: isActive ? 0.2 : 0,
                        ease: [0.76, 0, 0.24, 1]
                      }}
                    >
                      <motion.h3 
                        className={`${getTextColor(index)} font-bold text-3xl mb-6 text-center`}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ 
                          scale: isActive ? 1 : 0.9,
                          opacity: isActive ? 1 : 0
                        }}
                        transition={{ 
                          duration: 0.3, 
                          delay: isActive ? 0.3 : 0,
                          ease: [0.76, 0, 0.24, 1]
                        }}
                      >
                        {testimonial.name.toUpperCase()}
                      </motion.h3>
                      <motion.p 
                        className={`${getTextColor(index)} opacity-90 text-lg leading-relaxed mb-6 text-center`}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ 
                          y: isActive ? 0 : 10,
                          opacity: isActive ? 0.9 : 0
                        }}
                        transition={{ 
                          duration: 0.4, 
                          delay: isActive ? 0.4 : 0,
                          ease: [0.76, 0, 0.24, 1]
                        }}
                      >
                        {testimonial.quote}
                      </motion.p>
                      <motion.p 
                        className={`${getTextColor(index)} opacity-70 text-base text-center`}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ 
                          y: isActive ? 0 : 10,
                          opacity: isActive ? 0.7 : 0
                        }}
                        transition={{ 
                          duration: 0.4, 
                          delay: isActive ? 0.5 : 0,
                          ease: [0.76, 0, 0.24, 1]
                        }}
                      >
                        {testimonial.role}
                        {testimonial.company && ` • ${testimonial.company}`}
                      </motion.p>
                    </motion.div>
                  </motion.article>
                );
              })}
            </div>
          </div>
          </div>
        </div>
      </motion.div>

    </Section>
  );
}

