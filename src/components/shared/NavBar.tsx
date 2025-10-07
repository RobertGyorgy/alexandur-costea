'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { analytics } from '@/lib/analytics';
// import { useTheme } from '@/lib/theme';
import { usePageTransition } from '@/lib/page-transition';

interface NavBarProps {
  className?: string;
}

export function NavBar({ className }: NavBarProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDarkText, setIsDarkText] = useState(false);
  // Theme is always dark now
  // const { theme, toggleTheme } = useTheme();
  const _router = useRouter();
  const pathname = usePathname();
  const { startTransition } = usePageTransition();
  
  const isKeypadPage = pathname === '/keypad';

  // Section name mapping
  const sectionNames: Record<string, string> = {
    hero: 'ACASĂ',
    about: 'DESPRE',
    portfolio: 'PORTOFOLIU',
    pricing: 'CURSURI',
    testimonials: 'TESTIMONIALE',
    faq: 'FAQ',
    newsletter: 'NEWSLETTER'
  };
  
  // Handle scroll detection and navbar sizing
  useEffect(() => {
    // Light background sections (need dark text)
    const lightSections = ['about', 'testimonials', 'faq'];
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Set scrolling state to true
      setIsScrolling(true);

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Set timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150); // 150ms delay after scroll stops

      // Handle active section detection
      const sections = ['hero', 'about', 'portfolio', 'pricing', 'testimonials', 'faq', 'newsletter'];
      
      // Get navbar height for offset
      const navbarHeight = 100;
      const scrollPosition = window.scrollY + navbarHeight + 100;

      let currentSection = 'hero';

      // Check each section from bottom to top
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        
        if (element) {
          const offsetTop = element.offsetTop;
          
          // If we've scrolled past this section's start, it's the active one
          if (scrollPosition >= offsetTop) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);
      setIsDarkText(lightSections.includes(currentSection));
    };

    // Initial check
    handleScroll();
    
    // Use requestAnimationFrame for smoother updates
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', scrollListener, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const _handleNavClick = (href: string, label: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches 
            ? 'auto' 
            : 'smooth',
          block: 'start',
        });
        analytics.track({
          action: 'nav_click',
          category: 'navigation',
          label,
        });
      }
    }
  };

  return (
    <nav
      className={cn(
        'fixed left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500 w-full px-4 max-w-7xl',
        isScrolling ? 'top-2 scale-90' : 'top-4 scale-100',
        className
      )}
    >
      {/* Mobile Layout */}
      <div className="flex md:hidden items-center justify-center gap-2 w-full">
        {/* Center: Section Title */}
        <div className="flex-shrink-0">
          <div className={cn(
            "bg-bg-elev/90 backdrop-blur-lg border border-line rounded-full shadow-soft-lg flex items-center justify-center transition-all duration-300",
            isScrolling ? "w-[220px] py-3" : "w-[240px] py-4"
          )}>
            <button
              onClick={() => {
                if (isKeypadPage) {
                  startTransition('/');
                } else {
                  const heroElement = document.getElementById('hero');
                  if (heroElement) {
                    heroElement.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                }
              }}
              className={cn(
                "font-bold tracking-widest uppercase transition-all duration-300 focus-visible:outline-none w-full text-center",
                isScrolling ? "text-base" : "text-lg",
                isDarkText ? "text-[#003049] hover:text-[#D62828]" : "text-accent hover:text-fg"
              )}
              aria-label="Go to home"
            >
              {isKeypadPage ? (
                <svg className={cn("w-5 h-5 mx-auto", isDarkText ? "text-[#003049]" : "text-accent")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              ) : (
                sectionNames[activeSection] || 'ACASĂ'
              )}
            </button>
          </div>
        </div>

        {/* Right: Login Button */}
        <button
          className={cn(
            "rounded-full backdrop-blur-lg bg-bg-elev/90 border border-line flex items-center justify-center hover:bg-glass/80 transition-all duration-300 hover:border-accent shadow-soft-lg flex-shrink-0",
            isScrolling ? "w-14 h-14" : "w-16 h-16"
          )}
          onClick={() => {
            if (isKeypadPage) {
              startTransition('/');
            } else {
              startTransition('/keypad');
            }
          }}
          aria-label="Login"
        >
          <svg className={cn("w-6 h-6", isDarkText ? "text-[#003049]" : "text-accent")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center gap-2 justify-center">
        {/* Center: Section Title */}
        <div className={cn(
          "bg-bg-elev/90 backdrop-blur-lg border border-line rounded-full shadow-soft-lg flex items-center justify-center transition-all duration-300",
          isScrolling ? "w-[240px] py-4" : "w-[280px] py-6"
        )}>
          <button
            onClick={() => {
              if (isKeypadPage) {
                startTransition('/');
              } else {
                const heroElement = document.getElementById('hero');
                if (heroElement) {
                  heroElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }
              }
            }}
            className={cn(
              "font-bold tracking-widest uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg w-full text-center",
              isScrolling ? "text-lg" : "text-xl",
              isDarkText ? "text-[#003049] hover:text-[#D62828]" : "text-accent hover:text-fg"
            )}
            aria-label="Go to home"
          >
            {isKeypadPage ? (
              <svg className={cn("w-7 h-7 mx-auto", isDarkText ? "text-[#003049]" : "text-accent")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            ) : (
              sectionNames[activeSection] || 'ACASĂ'
            )}
          </button>
        </div>

        {/* Right: Login Button */}
        <button
          className={cn(
            "rounded-full backdrop-blur-lg bg-bg-elev/90 border border-line flex items-center justify-center hover:bg-glass/80 transition-all duration-300 hover:border-accent shadow-soft-lg",
            isScrolling ? "w-[60px] h-[60px]" : "w-[72px] h-[72px]"
          )}
          onClick={() => {
            if (isKeypadPage) {
              startTransition('/');
            } else {
              startTransition('/keypad');
            }
          }}
          aria-label="Login"
        >
          <svg className={cn("w-8 h-8", isDarkText ? "text-[#003049]" : "text-accent")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
