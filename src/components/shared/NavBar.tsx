'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { analytics } from '@/lib/analytics';
import { useTheme } from '@/lib/theme';
import { usePageTransition } from '@/lib/page-transition';

interface NavBarProps {
  className?: string;
}

export function NavBar({ className }: NavBarProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  const { theme, toggleTheme } = useTheme();
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
        {/* Left: Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={cn(
            "rounded-full backdrop-blur-lg bg-bg-elev/90 border border-line flex items-center justify-center hover:bg-glass/80 transition-all duration-300 hover:border-accent shadow-soft-lg flex-shrink-0",
            isScrolling ? "w-14 h-14" : "w-16 h-16"
          )}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5 text-fg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-fg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

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
                "font-bold text-accent tracking-widest uppercase transition-all duration-300 hover:text-fg focus-visible:text-fg focus-visible:outline-none w-full text-center",
                isScrolling ? "text-base" : "text-lg"
              )}
              aria-label="Go to home"
            >
              {isKeypadPage ? (
                <svg className="w-5 h-5 text-accent mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <svg className="w-6 h-6 text-fg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center gap-2 justify-center">
        {/* Left: Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={cn(
            "rounded-full backdrop-blur-lg bg-bg-elev/90 border border-line flex items-center justify-center hover:bg-glass/80 transition-all duration-300 hover:border-accent shadow-soft-lg",
            isScrolling ? "w-[60px] h-[60px]" : "w-[72px] h-[72px]"
          )}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className="w-6 h-6 text-fg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-fg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

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
              "font-bold text-accent tracking-widest uppercase transition-all duration-300 hover:text-fg focus-visible:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg w-full text-center",
              isScrolling ? "text-lg" : "text-xl"
            )}
            aria-label="Go to home"
          >
            {isKeypadPage ? (
              <svg className="w-7 h-7 text-accent mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <svg className="w-8 h-8 text-fg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

