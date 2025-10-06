'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { siteContent } from '@/lib/content';
import { analytics } from '@/lib/analytics';
import type { PricingPlan } from '@/lib/content';
import './PricingCard.css';

export function Pricing() {
  const content = siteContent.pricing;
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  // Same parallax effect for all cards (Desktop Only)
  const cardY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    setIsMounted(true);
    
    // Detect mobile device
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
      label: plan.id,
    });
  };

  return (
    <Section
      id="pricing"
      spacing="xl"
      aria-labelledby="pricing-heading"
      ref={sectionRef}
      className="bg-[#003049]"
    >
      {/* Pricing Cards - 3 Vertical Cards Side by Side */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-7xl mx-auto">
        {content.plans.map((plan, index) => {
          const shouldApplyParallax = isMounted && !isMobile;
          
          // Mobile optimization: simplified animations
          const mobileTransition = {
            duration: 0.3,
            delay: index * 0.05,
            ease: "easeOut"
          };
          
          const desktopTransition = {
            duration: 0.6,
            delay: index * 0.1,
            ease: "easeOut"
          };
          
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: isMobile ? 0.1 : 0.3 }}
              transition={isMobile ? mobileTransition : desktopTransition}
              className="flex-1"
              style={{ y: shouldApplyParallax ? cardY : 0 }}
            >
              <PricingCard
                plan={plan}
                onCTAClick={() => handleCTAClick(plan)}
              />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

interface PricingCardProps {
  plan: PricingPlan;
  onCTAClick: () => void;
}

function PricingCard({ plan, onCTAClick }: PricingCardProps) {
  const bgColor = plan.id === 'essential' ? '#FE7F2D' : plan.id === 'professional' ? '#9333EA' : '#00A8E8';
  const [isMobile, setIsMobile] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Custom content based on plan ID
  const cardContent = {
    essential: {
      title: 'ReelUp',
      subtitle: 'Pentru începători',
      description: 'Vrei să faci reel-uri care atrag atenția? Cu doar un telefon și un laptop, vei învăța pas cu pas: cum să găsești idei fresh ori de câte ori scoți telefonul din buzunar, cum să filmezi cadre simple dar wow, cum să le transformi în reel-uri care adună like-uri și share-uri. Nu ai nevoie de experiență. Înveți în ritmul tău, de oriunde. Și ai acces pe viață în Clubul Creatorilor de Conținut.',
      bullets: [
        'Idei fresh',
        'Cadre simple dar wow',
        'Creare de reel-uri captivante',
        'Tehnici de story telling'
      ],
      extras: [
        'Nu ai nevoie de echipament scump',
        'Înveți în ritmul tău',
        'Acces pe viață la materiale',
        'Comunitate privată de creatori',
        'Feedback personalizat'
      ],
      price: '297 RON',
      duration: '4 săptămâni',
      modules: 8,
      cta: 'Lasă-mi emailul și te anunț când deschidem înscrierile'
    },
    professional: {
      title: 'Masterclass',
      subtitle: 'De la Idee la Reel (pentru avansați)',
      description: 'Prima ediție a Masterclass-ului "De la Idee la Reel" a fost mai mult decât un curs - a fost o experiență intensă, cu oameni curioși, implicați și plini de energie. Am trecut prin toți pașii unui reel reușit: Alegerea temei și crearea conceptului, Setări corecte pentru telefon sau cameră, Filmare creativă: compoziție, lumină, mișcare, Editare pas cu pas în DaVinci Resolve, Tranziții și efecte pentru reel-uri catchy, Colorizare și sound design pentru un look & sound profesionist. A fost doar începutul. Urmează o nouă ediție și mai tare.',
      steps: [
        { title: 'Concept', description: 'Dezvoltarea ideilor și planning-ul producției' },
        { title: 'Setări', description: '' },
        { title: 'Filmare', description: '' },
        { title: 'Editare DaVinci', description: '' },
        { title: 'Tranziții & Efecte', description: '' },
        { title: 'Colorizare & Sound', description: '' }
      ],
      extras: [
        'Sesiuni live interactive',
        'Materiale bonus și templates',
        'Acces la comunitatea privată',
        'Feedback personalizat pe proiectele tale',
        'Certificat de absolvire',
        'Acces pe viață la actualizări'
      ],
      price: '897 RON',
      duration: '8 săptămâni',
      modules: 16,
      cta: 'Lasă-mi emailul și te anunț când deschidem înscrierile'
    },
    enterprise: {
      title: 'Newbie',
      subtitle: 'Pentru începători (GRATUIT)',
      description: 'Resurse gratuite, idei și exerciții practice direct pe Instagram. Începe ușor și crește constant cu provocări și inspirație săptămânală.',
      bullets: [
        'Tips',
        'Inspirație',
        'Challenge-uri',
        'Stories'
      ],
      extras: [
        'Conținut gratuit zilnic',
        'Challenge-uri creative săptămânale',
        'Sfaturi rapide de filmare',
        'Inspirație și trend-uri actuale',
        'Comunitate activă pe Instagram',
        'Acces la toate postările și stories'
      ],
      price: 'Gratuit',
      duration: 'resurse pe Instagram',
      cta: 'Urmărește-mă pe Instagram',
      instagramUrl: 'https://www.instagram.com/alexandrucostea.ro/'
    }
  };

  const content = cardContent[plan.id as keyof typeof cardContent] || cardContent.essential;
  
  // Map plan IDs to color classes
  let _colorClass = 'pricing-card-orange';
  if (plan.id === 'professional') {
    _colorClass = 'pricing-card-purple';
  } else if (plan.id === 'enterprise') {
    _colorClass = 'pricing-card-cyan';
  }
  
  return (
    <div 
      className="group relative w-full h-[520px] flex items-center justify-center transition-all duration-[600ms] ease-out md:hover:scale-105 md:hover:-translate-y-[10px]" 
      style={{ perspective: '1000px' }}
    >
      <div 
        className="relative w-full h-full transition-all duration-700"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* FRONT SIDE */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-[32px] transition-all duration-500 ease-out ${
            isMobile 
              ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]' 
              : 'shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] md:hover:shadow-[0_40px_100px_-25px_rgba(0,0,0,0.6)]'
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            background: `linear-gradient(135deg, ${bgColor}F5, ${bgColor}DD)`,
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Liquid Gradient Overlay */}
          <div className="absolute inset-0 opacity-40"
               style={{
                 background: `
                   radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0%, transparent 50%),
                   radial-gradient(circle at 80% 80%, rgba(0,0,0,0.15) 0%, transparent 50%),
                   linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)
                 `
               }} />

          {/* Front Content */}
          <div className="relative z-10 h-full flex flex-col p-3 gap-3">
            {/* LAYER 1: Top Section - Title, Price, Bullets (Deeper Shade) */}
            <div 
              className="w-full flex-1 flex flex-col p-6 rounded-2xl"
              style={{
                backgroundColor: `rgba(0, 0, 0, 0.25)`,
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Header - Title, Subtitle, Price */}
              <div className="flex flex-col gap-2 mb-6">
                <h3 className="text-white text-4xl font-bold drop-shadow-lg">
                  {content.title}
                </h3>
                <p className="text-white/90 text-sm font-medium drop-shadow">
                  {content.subtitle}
                </p>
                <div className="text-white text-2xl font-bold drop-shadow mt-1">
                  {content.price}
                </div>
                <div className="text-white/80 text-xs">
                  {content.duration}
                </div>
              </div>

              {/* Bullets - Centered */}
              <div className="flex-1 flex justify-center items-center">
                <div className={`w-full ${plan.id === 'professional' ? 'grid grid-cols-2 gap-x-4 gap-y-2' : 'flex flex-col gap-2.5'}`}>
                  {'bullets' in content && content.bullets && content.bullets.map((bullet: string, idx: number) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2.5"
                    >
                      <div className="w-2 h-2 rounded-full bg-white/90 flex-shrink-0"></div>
                      <span className="text-white text-sm font-medium">
                        {bullet}
                      </span>
                    </div>
                  ))}
                  {'steps' in content && content.steps && content.steps.map((step: { title: string; description: string }, idx: number) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2.5"
                    >
                      <div className="w-2 h-2 rounded-full bg-white/90 flex-shrink-0"></div>
                      <span className="text-white text-sm font-medium">
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* LAYER 2: Bottom Section - Flip Button and CTA (Lighter Shade) */}
            <div 
              className="w-full flex flex-col gap-3 p-6 rounded-2xl"
              style={{
                backgroundColor: `rgba(0, 0, 0, 0.15)`,
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Flip Button */}
              <button
                onClick={() => setIsFlipped(true)}
                className="w-full py-3 px-4 bg-white/20 hover:bg-white/30 border-2 border-white/40 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn backdrop-blur-sm"
              >
                <span className="text-white font-bold text-sm">Vezi detalii</span>
                <svg 
                  className="w-5 h-5 text-white transition-transform duration-300 group-hover/btn:rotate-180" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              {/* CTA Button */}
              {plan.id === 'enterprise' && 'instagramUrl' in content ? (
                <a
                  href={content.instagramUrl as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-white rounded-full text-[#233d4d] text-sm font-bold cursor-pointer transition-all duration-300 md:hover:scale-105 md:hover:shadow-[0_0_0_4px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
                >
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Follow
                </a>
              ) : (
                <button
                  onClick={onCTAClick}
                  className="px-4 py-3 bg-white rounded-full text-[#233d4d] text-sm font-bold cursor-pointer transition-all duration-300 md:hover:scale-105 md:hover:shadow-[0_0_0_4px_rgba(255,255,255,0.3)] flex items-center justify-center"
                >
                  Subscribe la newsletter
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* BACK SIDE */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-[32px] overflow-hidden transition-all duration-500 ease-out ${
            isMobile 
              ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]' 
              : 'shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] md:hover:shadow-[0_40px_100px_-25px_rgba(0,0,0,0.6)]'
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${bgColor}F5, ${bgColor}DD)`,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Back Content */}
          <div className="relative z-10 p-5 h-full flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h4 className="text-fg font-bold text-xl">{content.title}</h4>
              <button
                onClick={() => setIsFlipped(false)}
                className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent/20 border border-accent flex items-center justify-center transition-all duration-300 group/back"
              >
                <svg 
                  className="w-5 h-5 text-accent transition-transform duration-300 group-hover/back:rotate-180" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Description - Scrollable */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted/50 scrollbar-track-transparent pr-2">
              <p className="text-muted text-sm leading-relaxed">
                {content.description}
              </p>
              
              {/* Extra Info if available */}
              {'extras' in content && content.extras && (
                <div className="mt-4">
                  <h5 className="text-fg font-semibold text-sm uppercase tracking-wider mb-3">Ce includem:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2.5">
                    {content.extras.map((extra: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-muted text-xs leading-tight">{extra}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Info */}
            <div className="pt-3 border-t border-line flex justify-between items-center">
              <div>
                <div className="text-fg font-bold text-lg">{content.price}</div>
                <div className="text-muted text-xs">{content.duration}</div>
              </div>
              <button
                onClick={() => setIsFlipped(false)}
                className="px-4 py-2 bg-accent hover:bg-accent/90 rounded-full text-white text-sm font-semibold transition-all duration-300"
              >
                Înapoi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
