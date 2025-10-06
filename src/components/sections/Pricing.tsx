'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { siteContent } from '@/lib/content';
import { analytics } from '@/lib/analytics';
import type { PricingPlan } from '@/lib/content';

export function Pricing() {
  const content = siteContent.pricing;
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  // Parallax effect for desktop
  const cardY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    setIsMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCTAClick = (plan: PricingPlan) => {
    if (plan.ctaUrl.startsWith('#')) {
      const element = document.getElementById(plan.ctaUrl.slice(1));
      if (element) {
        element.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    }
    analytics.track({
      action: 'pricing_cta_click',
      category: 'conversion',
      label: plan.name,
      value: plan.priceMonthly,
    });
  };

  const toggleFlip = (planId: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
  };

  const shouldApplyParallax = isMounted && !isMobile;

  // Map plan IDs to colors
  const getCardColor = (planId: string) => {
    if (planId === 'essential') return '#FE7F2D'; // Orange
    if (planId === 'professional') return '#9333EA'; // Purple
    return '#00A8E8'; // Cyan
  };

  return (
    <Section
      id="pricing"
      spacing="xl"
      aria-labelledby="pricing-heading"
      ref={sectionRef}
    >
      <div className="flex flex-col items-center">
        {/* Cards Container */}
        <div className="flex flex-wrap justify-center gap-8 w-full perspective-[2000px]">
          {content.plans.map((plan, index) => {
            const isFlipped = flippedCards[plan.id] || false;
            const cardColor = getCardColor(plan.id);
            const isPremium = plan.id === 'professional';

            return (
              <motion.div
                key={plan.id}
                className="relative w-full md:w-[340px]"
                style={{ 
                  y: shouldApplyParallax ? cardY : 0,
                }}
                initial={{ opacity: 0, y: isMobile ? 0 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px', amount: 0.3 }}
                transition={{
                  duration: isMobile ? 0.3 : 0.6,
                  delay: isMobile ? 0 : index * 0.1,
                  ease: 'easeOut'
                }}
              >
                {/* 3D Flip Container */}
                <div 
                  className="relative w-full h-[580px]"
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of Card */}
                  <div 
                    className="absolute inset-0 rounded-3xl overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <div 
                      className="relative w-full h-full backdrop-blur-xl rounded-3xl overflow-hidden"
                      style={{
                        background: 'rgba(var(--bg-elev-rgb, 255, 255, 255), 0.05)',
                        border: isPremium ? `2px solid ${cardColor}` : '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: isPremium 
                          ? `0 10px 40px ${cardColor}40` 
                          : '0 10px 30px rgba(0, 0, 0, 0.2)',
                        transform: isPremium ? 'scale(1.05)' : 'scale(1)',
                      }}
                    >
                      {/* Popular Tag */}
                      {isPremium && (
                        <div 
                          className="absolute top-4 right-4 px-4 py-1 rounded-full text-xs font-bold"
                          style={{
                            background: cardColor,
                            color: '#fff',
                            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          Cel Mai Popular
                        </div>
                      )}

                      {/* Card Header */}
                      <div className="p-8 pb-6 text-center border-b border-line/20">
                        {/* Plan Name */}
                        <h3 
                          className="text-3xl font-bold mb-6"
                          style={{ 
                            fontFamily: 'var(--font-garnet)',
                            color: isPremium ? cardColor : 'var(--fg)'
                          }}
                        >
                          {plan.name}
                        </h3>

                        {/* Price */}
                        <div className="flex items-start justify-center mb-4">
                          <span 
                            className="text-2xl font-medium mt-2 mr-1"
                            style={{ color: cardColor }}
                          >
                            {plan.currency}
                          </span>
                          <span 
                            className="text-6xl font-bold leading-none"
                            style={{ color: isPremium ? cardColor : 'var(--fg)' }}
                          >
                            {plan.priceMonthly}
                          </span>
                          <span className="text-sm text-muted mt-3 ml-2">
                            /{plan.period}
                          </span>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="p-8">
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, idx) => (
                            <li 
                              key={idx}
                              className="flex items-start text-sm"
                            >
                              <span 
                                className="mr-3 font-bold text-lg"
                                style={{ color: cardColor }}
                              >
                                ✓
                              </span>
                              <span className="text-fg/90">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA Button */}
                        <button
                          onClick={() => handleCTAClick(plan)}
                          className="w-full py-3 rounded-full font-medium text-base transition-all duration-300 mb-4"
                          style={{
                            background: isPremium ? cardColor : 'transparent',
                            color: isPremium ? '#fff' : 'var(--fg)',
                            border: isPremium ? 'none' : '2px solid rgba(255, 255, 255, 0.3)',
                          }}
                          onMouseEnter={(e) => {
                            if (!isPremium) {
                              e.currentTarget.style.borderColor = cardColor;
                              e.currentTarget.style.background = `${cardColor}20`;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isPremium) {
                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                              e.currentTarget.style.background = 'transparent';
                            }
                          }}
                        >
                          {plan.cta}
                        </button>

                        {/* Flip Button */}
                        <button
                          onClick={() => toggleFlip(plan.id)}
                          className="w-full py-3 rounded-full font-medium text-sm transition-all duration-300 border border-line/30 hover:border-accent/50 text-muted hover:text-accent"
                        >
                          Vezi Detalii →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div 
                    className="absolute inset-0 rounded-3xl overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div 
                      className="relative w-full h-full backdrop-blur-xl rounded-3xl overflow-hidden p-8"
                      style={{
                        background: 'rgba(var(--bg-elev-rgb, 255, 255, 255), 0.05)',
                        border: isPremium ? `2px solid ${cardColor}` : '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: isPremium 
                          ? `0 10px 40px ${cardColor}40` 
                          : '0 10px 30px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {/* Back Header */}
                      <div className="text-center mb-6 pb-4 border-b border-line/20">
                        <h3 
                          className="text-2xl font-bold"
                          style={{ 
                            fontFamily: 'var(--font-garnet)',
                            color: isPremium ? cardColor : 'var(--fg)'
                          }}
                        >
                          {plan.name}
                        </h3>
                        <p className="text-sm text-muted mt-2">Detalii Complete</p>
                      </div>

                      {/* Details Content - Scrollable */}
                      <div className="overflow-y-auto max-h-[380px] pr-2 custom-scrollbar">
                        <p className="text-sm text-muted leading-relaxed mb-4">
                          {plan.description}
                        </p>
                        
                        {plan.details && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold text-fg uppercase tracking-wider">
                              Ce include:
                            </h4>
                            <ul className="space-y-2">
                              {plan.features.map((feature, idx) => (
                                <li key={idx} className="text-sm text-muted flex items-start">
                                  <span className="mr-2" style={{ color: cardColor }}>•</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Flip Back Button */}
                      <button
                        onClick={() => toggleFlip(plan.id)}
                        className="absolute bottom-8 left-8 right-8 py-3 rounded-full font-medium text-sm transition-all duration-300 border border-line/30 hover:border-accent/50 text-muted hover:text-accent"
                      >
                        ← Înapoi
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--accent);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--accent-2);
        }
      `}</style>
    </Section>
  );
}
