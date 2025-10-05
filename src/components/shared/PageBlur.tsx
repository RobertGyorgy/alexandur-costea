'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import GradualBlur from '@/components/ui/GradualBlur';

export function PageBlur() {
  const [showBlur, setShowBlur] = useState(true);
  const [viewportHeight, setViewportHeight] = useState('100vh');
  const pathname = usePathname();

  useEffect(() => {
    const updatePosition = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && window.visualViewport) {
        // Use the actual visible viewport height
        const height = window.visualViewport.height;
        setViewportHeight(`${height}px`);
      } else {
        setViewportHeight('100vh');
      }
    };

    const handleScroll = () => {
      // Update position on scroll too (for mobile browser bar)
      updatePosition();
      
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
      const visibilityRatio = visibleHeight / Math.min(sectionHeight, windowHeight);

      // Hide blur when more than 50% of newsletter section is visible
      if (visibilityRatio > 0.5) {
        setShowBlur(false);
      } else {
        setShowBlur(true);
      }
    };

    updatePosition();
    handleScroll(); // Initial check

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updatePosition);
      window.visualViewport.addEventListener('scroll', updatePosition);
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', handleScroll);
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updatePosition);
        window.visualViewport.removeEventListener('scroll', updatePosition);
      }
    };
  }, []);

  // Don't show blur on keypad page
  if (pathname === '/keypad') {
    return null;
  }

  if (!showBlur) return null;

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: viewportHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        zIndex: 40,
        pointerEvents: 'none',
        transition: 'height 0.15s ease-out'
      }}
    >
      <GradualBlur
        target="parent"
        position="bottom"
        height="8rem"
        strength={2}
        divCount={6}
        curve="bezier"
        exponential={false}
        opacity={1}
        animated={false}
        zIndex={40}
      />
    </div>
  );
}
