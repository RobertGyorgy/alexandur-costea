'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import LightRays from '@/components/ui/LightRays';

interface NewsletterModernProps {
  className?: string;
  disableBackground?: boolean;
}

const NewsletterModern: React.FC<NewsletterModernProps> = ({ className = '', disableBackground = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [shouldLoadBackground, setShouldLoadBackground] = useState(false);
  const isMobile = windowWidth < 768;
  
  // Load background when testimonials section is visible (earlier preload)
  useEffect(() => {
    const testimonialsSection = document.getElementById('testimonials');
    if (!testimonialsSection) {
      // Fallback: load after 2 seconds if section not found
      const timer = setTimeout(() => setShouldLoadBackground(true), 2000);
      return () => clearTimeout(timer);
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadBackground(true);
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    
    observer.observe(testimonialsSection);
    
    return () => observer.disconnect();
  }, []);
  
  // Scroll progress for split animation - simplified to prevent freezing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  // Responsive split distance based on screen size
  const splitDistance = isMobile ? 100 : 200; // Smaller distance for mobile
  
  // Text movement - FASTER split (shorter range)
  const stayX = useTransform(scrollYProgress, [0.3, 0.45], [0, -splitDistance]);
  const updatedX = useTransform(scrollYProgress, [0.3, 0.45], [0, splitDistance]);
  
  // Text opacity - quick fade during split
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.45], [1, 0]);
  
  // Form appears - simple fade in
  const formOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  
  // Form moves up
  const formY = useTransform(scrollYProgress, [0.4, 0.55], [50, 0]);

  // Handle window resize for responsive split distance
  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    updateWindowWidth();
    
    // Add resize listener
    window.addEventListener('resize', updateWindowWidth);
    
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  // Removed animation tracking to prevent warnings

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would typically send to your newsletter API
    console.log('Newsletter signup:', email);
    
    setEmail('');
    setIsSubmitting(false);
    
    // Show success message
    alert('Mulțumim pentru abonare! Verifică-ți email-ul pentru confirmare.');
  };

  return (
    <div 
      id="newsletter"
      ref={containerRef}
      className={`relative bg-bg ${className}`}
      style={{ minHeight: '100vh' }}
    >
      {/* Fallback gradient background for mobile */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-bg via-bg/95 to-bg opacity-100" />
      
      {/* LightRays Background - extends full height */}
      {!disableBackground && shouldLoadBackground && (
          <div className="absolute inset-0 z-0 w-full h-full" style={{ minHeight: '100vh' }}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#F77F00"
              raysSpeed={isMobile ? 2.0 : 1.5}
              lightSpread={isMobile ? 0.5 : 0.8}
              rayLength={isMobile ? 3.5 : 3.0}
              followMouse={!isMobile}
              mouseInfluence={isMobile ? 0 : 0.1}
              noiseAmount={0}
              distortion={isMobile ? 0.08 : 0.05}
              fadeDistance={isMobile ? 2.5 : 2.0}
              saturation={isMobile ? 1.3 : 1.0}
              className="opacity-100 md:opacity-50"
            />
          </div>
      )}

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col min-h-screen">
        {/* Combined text and form container */}
        <div className="flex items-center justify-center flex-1 relative pt-24 md:pt-24 overflow-hidden">
          {/* Split text animation - completely non-interactive */}
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-8 lg:gap-16 absolute z-0 pointer-events-none w-full overflow-hidden px-4 mt-8 sm:mt-0">
            {/* "Stay" - moves left and disappears */}
            <motion.h1
              className="font-garnet text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-fg uppercase leading-tight select-none"
              style={{ 
                x: stayX,
                opacity: textOpacity,
                willChange: 'transform, opacity',
                pointerEvents: 'none'
              }}
            >
              Stay
            </motion.h1>
            
            {/* "Updated" - moves right and disappears */}
            <motion.h1
              className="font-garnet text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-fg uppercase leading-tight select-none"
              style={{ 
                x: updatedX,
                opacity: textOpacity,
                willChange: 'transform, opacity',
                pointerEvents: 'none'
              }}
            >
              Updated
            </motion.h1>
          </div>

            {/* Email subscription form - perfectly centered and fully interactive */}
          <motion.div
            className="flex items-center justify-center z-50 relative pb-16 w-full px-4 mt-8 sm:mt-0"
            style={{
              opacity: formOpacity,
              y: formY,
              willChange: 'opacity, transform'
            }}
          >
            <form 
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-6 lg:gap-12 xl:gap-16 w-full max-w-4xl"
            >
              {/* "enter" text - left side with parallax */}
              <motion.div
                className="select-none pointer-events-none"
                style={{ 
                  opacity: 1
                }}
              >
                <span className="font-arimo text-2xl sm:text-2xl lg:text-3xl xl:text-4xl font-light text-fg tracking-wider">
                  introdu
                </span>
              </motion.div>

            {/* Email input - center with subtle parallax */}
              <motion.div
                className="relative w-full max-w-[320px] sm:max-w-sm"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="emailul"
                  className={`w-full bg-transparent border-b-2 text-fg text-lg sm:text-lg lg:text-xl xl:text-2xl text-center py-3 sm:py-3 px-6 sm:px-6 focus:outline-none transition-all duration-500 ease-out placeholder:text-muted ${
                    isFocused 
                      ? 'border-accent placeholder:text-muted/60' 
                      : 'border-line'
                  }`}
                  required
                  disabled={isSubmitting}
                />
              </motion.div>

              {/* "submit" text - right side with parallax */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="select-none cursor-pointer transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30 text-muted hover:text-fg"
                  style={{ 
                    opacity: 0.3
                  }}
                  whileHover={{ 
                    opacity: 1,
                    scale: 1.05,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  }}
                >
                <span className="font-arimo text-2xl sm:text-2xl lg:text-3xl xl:text-4xl font-light tracking-wider transition-colors duration-300 whitespace-nowrap">
                  {isSubmitting ? 'sending...' : 'trimite'}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer Content - Integrated into Newsletter Section */}
        <div className="relative z-10 py-8 pb-12">
          <div className="max-w-6xl mx-auto px-4">
            {/* Small centered separator line */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-px bg-line/20" />
            </div>

            <div className="flex flex-col items-center justify-center gap-5">
              {/* Copyright and Links - Centered */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                <p className="text-sm text-muted">
                  © 2025 Alex Costea. All rights reserved.
                </p>
              </div>

              {/* Images Below */}
              <div className="flex items-center gap-6">
                <Image
                  src="/1.png"
                  alt="Logo 1"
                  width={100}
                  height={50}
                  className="h-10 w-auto object-contain opacity-70"
                  unoptimized
                />
                <Image
                  src="/2.png"
                  alt="Logo 2"
                  width={100}
                  height={50}
                  className="h-10 w-auto object-contain opacity-70"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModern;
