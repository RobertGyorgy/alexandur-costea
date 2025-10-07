'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import GradualBlur from '@/components/ui/GradualBlur';

export function PageBlur() {
  const [showBlur, setShowBlur] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const updateViewportHeight = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && window.visualViewport) {
        // Set CSS custom property for mobile viewport height
        const vh = window.visualViewport.height;
        document.documentElement.style.setProperty('--mobile-vh', `${vh}px`);
      } else {
        document.documentElement.style.setProperty('--mobile-vh', '100vh');
      }
    };

    const handleScroll = () => {
      // Update viewport height on scroll too (for mobile browser bar)
      updateViewportHeight();
      
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

    updateViewportHeight();
    handleScroll(); // Initial check

    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewportHeight);
      window.visualViewport.addEventListener('scroll', updateViewportHeight);
    }

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('scroll', handleScroll);
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewportHeight);
        window.visualViewport.removeEventListener('scroll', updateViewportHeight);
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
      className="mobile-blur-container"
      style={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        pointerEvents: 'none',
        transition: 'height 0.2s ease-out'
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
