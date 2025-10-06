'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: 'chars' | 'words' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const parts = useMemo(() => {
    if (!text) return [] as { t: string; isSpace: boolean }[];
    if (splitType === 'chars') {
      return Array.from(text).map((ch) => ({ t: ch === ' ' ? '\u00A0' : ch, isSpace: ch === ' ' }));
    }
    // default: words (preserve spaces)
    const tokens: { t: string; isSpace: boolean }[] = [];
    const re = /(\s+)/g;
    const raw = text.split(re);
    for (const tok of raw) {
      if (!tok) continue;
      if (re.test(tok)) tokens.push({ t: tok, isSpace: true });
      else tokens.push({ t: tok, isSpace: false });
    }
    return tokens;
  }, [text, splitType]);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const docFonts = (document as Document & { fonts?: { status?: string; ready?: Promise<void> } }).fonts;
    if (docFonts?.status === 'loaded') {
      setFontsLoaded(true);
    } else if (docFonts?.ready) {
      docFonts.ready.then(() => setFontsLoaded(true));
    } else {
      // Fallback if Font Loading API not available
      setFontsLoaded(true);
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!ref.current || !text || !fontsLoaded) return;

    const el = ref.current as HTMLElement;
    const targets = Array.from(el.querySelectorAll('[data-split-item]')) as HTMLElement[];

    // Mobile optimization: simplified animations
    if (isMobile) {
      // On mobile, use simpler animations with reduced complexity
      gsap.fromTo(
        targets,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.02, // Reduced stagger for faster loading
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
            fastScrollEnd: true
          },
          onComplete: () => onLetterAnimationComplete?.()
        }
      );
    } else {
      // Desktop: full animations
      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign = marginValue === 0 ? '' : marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4
          },
          willChange: 'transform, opacity',
          force3D: true,
          onComplete: () => onLetterAnimationComplete?.()
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
      gsap.killTweensOf(targets);
    };
  }, [text, parts, delay, duration, ease, from, to, threshold, rootMargin, fontsLoaded, onLetterAnimationComplete, isMobile]);

  const style: React.CSSProperties = {
    textAlign,
    overflow: 'visible',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    willChange: 'transform, opacity',
    paddingTop: '0.15em',
    paddingBottom: '0.15em',
  };
  const classes = `split-parent ${className}`;

  const renderItems = () =>
    parts.map((p, i) => (
      <span
        key={i}
        data-split-item
        style={{ display: p.isSpace ? 'inline' as const : 'inline-block' }}
      >
        {p.t}
      </span>
    ));

  if (tag === 'h1') return (<h1 ref={ref as React.RefObject<HTMLHeadingElement>} style={style} className={classes}>{renderItems()}</h1>);
  if (tag === 'h2') return (<h2 ref={ref as React.RefObject<HTMLHeadingElement>} style={style} className={classes}>{renderItems()}</h2>);
  if (tag === 'h3') return (<h3 ref={ref as React.RefObject<HTMLHeadingElement>} style={style} className={classes}>{renderItems()}</h3>);
  if (tag === 'h4') return (<h4 ref={ref as React.RefObject<HTMLHeadingElement>} style={style} className={classes}>{renderItems()}</h4>);
  if (tag === 'h5') return (<h5 ref={ref as React.RefObject<HTMLHeadingElement>} style={style} className={classes}>{renderItems()}</h5>);
  if (tag === 'h6') return (<h6 ref={ref as React.RefObject<HTMLHeadingElement>} style={style} className={classes}>{renderItems()}</h6>);
  if (tag === 'span') return (<span ref={ref as React.RefObject<HTMLSpanElement>} style={style} className={classes}>{renderItems()}</span>);
  return (<p ref={ref as React.RefObject<HTMLParagraphElement>} style={style} className={classes}>{renderItems()}</p>);
};

export default SplitText;

