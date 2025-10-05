'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import GradualBlur from '@/components/ui/GradualBlur';

export function PageBlur() {
  const [showBlur, setShowBlur] = useState(true);
  const [bottomOffset, setBottomOffset] = useState('0px');
  const pathname = usePathname();

  useEffect(() => {
    const updateBlurPosition = () => {
      if (typeof window === 'undefined') return;

      // Get the current visual viewport height (changes when search bar opens/closes)
      const visualHeight = window.visualViewport?.height || window.innerHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate the difference (this represents the search bar height)
      const searchBarHeight = windowHeight - visualHeight;
      
      // If search bar is open (significant height difference), keep blur higher
      // If search bar is closed/minimized (small difference), move blur to bottom
      if (searchBarHeight > 50) {
        // Search bar is open - move blur higher (above the search bar)
        setBottomOffset(`${searchBarHeight}px`);
      } else {
        // Search bar is closed - move blur to absolute bottom
        setBottomOffset('0px');
      }
    };

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
      const visibilityRatio = visibleHeight / Math.min(sectionHeight, windowHeight);

      // Hide blur when more than 50% of newsletter section is visible
      if (visibilityRatio > 0.5) {
        setShowBlur(false);
      } else {
        setShowBlur(true);
      }

      // Also update blur position on scroll
      updateBlurPosition();
    };

    // Initial check
    updateBlurPosition();
    handleScroll();

    // Listen for viewport changes (most important for search bar detection)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateBlurPosition);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateBlurPosition);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateBlurPosition);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateBlurPosition);
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
        bottom: bottomOffset,
        left: 0,
        right: 0,
        zIndex: 40,
        pointerEvents: 'none',
        transition: 'bottom 0.2s ease-out',
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
