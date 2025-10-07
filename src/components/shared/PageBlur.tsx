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
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (isMobile) {
        if (isSafari) {
          // Safari-specific: Use 100vh to stay fixed at bottom of full viewport
          // This ensures blur stays at bottom even when search bar collapses
          document.documentElement.style.setProperty('--mobile-vh', '100vh');
        } else if (window.visualViewport) {
          // Chrome and other browsers with visualViewport support
          const vh = window.visualViewport.height;
          document.documentElement.style.setProperty('--mobile-vh', `${vh}px`);
        } else {
          // Fallback for browsers without visualViewport
          document.documentElement.style.setProperty('--mobile-vh', `${window.innerHeight}px`);
        }
      } else {
        document.documentElement.style.setProperty('--mobile-vh', '100vh');
      }
    };

    const handleScroll = () => {
      // Update viewport height on scroll too (for mobile browser bar)
      updateViewportHeight();
      
      // Safari-specific: Force update on scroll to handle dynamic viewport
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (isSafari && window.innerWidth < 768) {
        // Use requestAnimationFrame for smoother updates in Safari
        requestAnimationFrame(() => {
          updateViewportHeight();
        });
      }
      
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

    // Safari-specific: Add orientation change listener
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    if (isSafari) {
      window.addEventListener('orientationchange', () => {
        // Delay to allow Safari to update its viewport
        setTimeout(updateViewportHeight, 100);
      });
    }
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewportHeight);
      window.visualViewport.addEventListener('scroll', updateViewportHeight);
    }

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('scroll', handleScroll);
      
      if (isSafari) {
        window.removeEventListener('orientationchange', updateViewportHeight);
      }
      
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

  // Check if Safari for z-index adjustment
  const isSafari = typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const blurZIndex = isSafari && isMobile ? -1 : 40;

  return (
    <div 
      className="mobile-blur-container"
      style={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: blurZIndex,
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
        zIndex={blurZIndex}
      />
    </div>
  );
}
