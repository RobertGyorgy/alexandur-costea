'use client';

import React, { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorColor, setCursorColor] = useState('#F77F00');
  const [isMobile, setIsMobile] = useState(false);
  const animationFrameRef = useRef<number>();

  // Mobile detection effect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Custom cursor effect (desktop only)
  useEffect(() => {
    // Don't initialize custom cursor on mobile
    if (isMobile) {
      return;
    }

    // Hide default cursor (desktop only)
    document.body.style.cursor = 'none';

    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPosition({ x: mouseX, y: mouseY });
      
      if (!isVisible) {
        setIsVisible(true);
        outerX = mouseX;
        outerY = mouseY;
        setOuterPosition({ x: mouseX, y: mouseY });
      }
      
      // Detect section background color
      const element = document.elementFromPoint(mouseX, mouseY);
      if (element) {
        const section = element.closest('section, [id^="faq"], [id^="about"], [id^="testimonials"]');
        if (section) {
          const sectionId = section.id;
          
          // Set cursor color based on section
          if (sectionId === 'about' || sectionId === 'testimonials' || sectionId === 'faq') {
            setCursorColor('#003049'); // Dark blue for light backgrounds
          } else {
            setCursorColor('#F77F00'); // Orange for dark backgrounds
          }
        }
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(false);
      }
    };

    // Smooth follow animation for outer circle
    const animateOuterCircle = () => {
      // Lerp (linear interpolation) for smooth follow
      const speed = 0.15; // Lower = more delay
      outerX += (mouseX - outerX) * speed;
      outerY += (mouseY - outerY) * speed;
      
      setOuterPosition({ x: outerX, y: outerY });
      
      animationFrameRef.current = requestAnimationFrame(animateOuterCircle);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter, true);
    document.addEventListener('mouseout', handleMouseLeave, true);
    
    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animateOuterCircle);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter, true);
      document.removeEventListener('mouseout', handleMouseLeave, true);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, isMobile]);

  if (!isVisible || isMobile) return null;

  return (
    <>
      {/* Outer Circle - Follows with delay */}
      <div
        className="custom-cursor-outer"
        style={{
          left: `${outerPosition.x}px`,
          top: `${outerPosition.y}px`,
          width: isHovering ? '50px' : '40px',
          height: isHovering ? '50px' : '40px',
          transform: 'translate(-50%, -50%)',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          borderRadius: '50%',
          border: `2px solid ${cursorColor}`,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease',
          opacity: isHovering ? 0 : 0.6,
          mixBlendMode: 'difference',
        }}
      />

      {/* Inner Dot - Follows cursor instantly */}
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovering ? '40px' : '8px',
          height: isHovering ? '40px' : '8px',
          transform: 'translate(-50%, -50%)',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 10000,
          borderRadius: '50%',
          backgroundColor: cursorColor,
          transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}

