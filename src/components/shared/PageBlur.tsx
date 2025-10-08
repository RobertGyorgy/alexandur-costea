'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import GradualBlur from '@/components/ui/GradualBlur';

export function PageBlur() {
  const [showBlur, setShowBlur] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const newsletterSection = document.getElementById('newsletter');
      if (!newsletterSection) {
        setShowBlur(true);
        return;
      }

      const rect = newsletterSection.getBoundingClientRect();
      const windowHeight = window.visualViewport?.height || window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate how much of the newsletter section is visible
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(windowHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      
      // More robust visibility calculation for mobile
      const visibilityRatio = sectionHeight > 0 ? visibleHeight / sectionHeight : 0;

      // Hide blur when more than 50% of newsletter section is visible
      if (visibilityRatio > 0.5) {
        setShowBlur(false);
      } else {
        setShowBlur(true);
      }
    };


    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Don't show blur on keypad page
  if (pathname === '/keypad') {
    return null;
  }

  return (
    <AnimatePresence>
      {showBlur && (
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed left-0 right-0 bottom-0 z-10 overflow-hidden pointer-events-none translate-z-0"
          style={{ 
            height: 'calc(var(--blur-height) + var(--ios-bottom-ui))',
            transform: 'translateZ(0)'
          }}
        >
          <div
            className="absolute left-0 right-0 rounded-[20px] bg-[rgba(20,20,20,0.28)] backdrop-blur-[20px]"
            style={{
              bottom: 'var(--ios-bottom-ui)',
              height: 'var(--blur-height)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
