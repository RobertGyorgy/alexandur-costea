'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Don't show blur on keypad page
  if (pathname === '/keypad') {
    return null;
  }

  if (!showBlur) return null;

  return (
    <div 
      className="fixed left-0 right-0 z-50 overflow-hidden pointer-events-none"
      style={{ 
        bottom: 0,
        height: 'var(--blur-height)',
        paddingBottom: 'var(--ios-bottom-ui)',
        transform: 'translateZ(0)'
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
        zIndex={50}
      />
    </div>
  );
}
