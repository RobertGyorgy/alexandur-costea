'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import SplitText from '@/components/ui/SplitText';
import { siteContent } from '@/lib/content';
import Image from 'next/image';

export function About() {
  const content = siteContent.about;
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  // Dolly zoom effect for image only
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, -150]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.85]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Section
      id="about"
      spacing="xl"
      aria-labelledby="about-heading"
      ref={sectionRef}
      className="bg-[#233d4d]"
    >
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Content Column */}
        <div className="space-y-8">
          {/* Title with SplitText - Chars */}
          <div className="-mt-8 pt-2">
            {/* Split title by lines */}
            <div className="mb-6 overflow-visible">
              {content.title.split('\n').map((line, idx) => (
                <SplitText
                  key={`title-line-${idx}`}
                  text={line}
                  tag="h2"
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-fg text-left block leading-[1.3]"
                  delay={20}
                  duration={0.3}
                  ease="power2.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 20 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.2}
                  rootMargin="-30px"
                  textAlign="left"
                />
              ))}
            </div>
            
            {/* Description with SplitText - Words */}
            <SplitText
              text={content.description}
              tag="p"
              className="text-lg md:text-xl text-muted leading-[1.8] text-left"
              delay={15}
              duration={0.25}
              ease="power2.out"
              splitType="words"
              from={{ opacity: 0, y: 15 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.2}
              rootMargin="-30px"
              textAlign="left"
            />
          </div>

          {/* Content Paragraphs with SplitText */}
          <div className="prose prose-lg max-w-none space-y-6">
            {content.content.split('\n\n').map((paragraph, index) => (
              <SplitText
                key={index}
                text={paragraph}
                tag="p"
                className="text-lg text-muted leading-[1.8] text-left"
                delay={10}
                duration={0.2}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 10 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-30px"
                textAlign="left"
              />
            ))}
          </div>
        </div>

        {/* Image Column - With Dolly Zoom (Desktop Only) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex justify-center lg:justify-end"
          style={{
            y: isMounted && !isMobile ? imageY : 0,
            scale: isMounted && !isMobile ? imageScale : 1,
            rotateZ: isMounted && !isMobile ? imageRotate : 0,
          }}
        >
          <motion.div 
            className="relative rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(254,127,45,0.3)] max-w-sm w-full"
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.4 }
            }}
          >
            <Image
              src="/img1.jpeg"
              alt="Alexandru Costea"
              width={400}
              height={600}
              className="w-full h-auto object-cover"
              unoptimized
              quality={100}
            />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
