'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NeoPricingCard } from './NeoPricingCard';
import { siteContent } from '@/lib/content';
import { analytics } from '@/lib/analytics';
import type { PricingPlan } from '@/lib/content';

export function PricingSection() {
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
  
  // Parallax for "Cursuri" text - moves DOWN as you scroll DOWN (with your scroll)
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);

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

  const handleCTAClick = (plan: PricingPlan, cardData: { ctaAction?: string; instagramUrl?: string }) => {
    // Handle newsletter action
    if (cardData.ctaAction === 'newsletter') {
      const element = document.getElementById('newsletter');
      if (element) {
        element.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start',
        });
      }
      analytics.track({
        action: 'pricing_newsletter_click',
        category: 'conversion',
        label: plan.id,
      });
      return;
    }
    
    // Handle Instagram action
    if (cardData.ctaAction === 'instagram' && cardData.instagramUrl) {
      window.open(cardData.instagramUrl, '_blank');
      analytics.track({
        action: 'pricing_instagram_click',
        category: 'conversion',
        label: plan.id,
      });
      return;
    }
    
    // Default behavior
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

  // Map plan data to NeoPricingCard format
  const getCardData = (plan: PricingPlan) => {
    const cardContent: Record<string, {
      subtitle: string;
      features: string[];
      description: string;
      extras: string[];
      price: string;
      period: string;
      ctaLabel: string;
      ctaAction: string;
      instagramUrl?: string;
    }> = {
      essential: {
        subtitle: 'ReelUp',
        features: [
          'Idei fresh',
          'Cadre simple dar wow',
          'Creare de reel-uri captivante',
          'Tehnici de story telling'
        ],
        description: 'Vrei să faci reel-uri care atrag atenția? Cu doar un telefon și un laptop, vei învăța pas cu pas: cum să găsești idei fresh ori de câte ori scoți telefonul din buzunar, cum să filmezi cadre simple dar wow, cum să le transformi în reel-uri care adună like-uri și share-uri. Nu ai nevoie de experiență. Înveți în ritmul tău, de oriunde. Și ai acces pe viață în Clubul Creatorilor de Conținut.',
        extras: [
          'Nu ai nevoie de echipament scump',
          'Înveți în ritmul tău',
          'Acces pe viață la materiale',
          'Comunitate privată de creatori',
          'Feedback personalizat'
        ],
        price: '297 RON',
        period: '4 săptămâni',
        ctaLabel: 'Abonează-te la newsletter',
        ctaAction: 'newsletter'
      },
      professional: {
        subtitle: 'Masterclass',
        features: [
          'Concept',
          'Setări',
          'Filmare',
          'Editare DaVinci',
          'Tranziții & Efecte',
          'Colorizare & Sound'
        ],
        description: 'Prima ediție a Masterclass-ului "De la Idee la Reel" a fost mai mult decât un curs - a fost o experiență intensă, cu oameni curioși, implicați și plini de energie. Am trecut prin toți pașii unui reel reușit: Alegerea temei și crearea conceptului, Setări corecte pentru telefon sau cameră, Filmare creativă: compoziție, lumină, mișcare, Editare pas cu pas în DaVinci Resolve, Tranziții și efecte pentru reel-uri catchy, Colorizare și sound design pentru un look & sound profesionist. A fost doar începutul. Urmează o nouă ediție și mai tare.',
        extras: [
          'Sesiuni live interactive',
          'Materiale bonus și templates',
          'Acces la comunitatea privată',
          'Feedback personalizat pe proiectele tale',
          'Certificat de absolvire',
          'Acces pe viață la actualizări'
        ],
        price: '897 RON',
        period: '8 săptămâni',
        ctaLabel: 'Abonează-te la newsletter',
        ctaAction: 'newsletter'
      },
      enterprise: {
        subtitle: 'Newbie',
        features: [
          'Tips',
          'Inspirație',
          'Challenge-uri',
          'Stories'
        ],
        description: 'Resurse gratuite, idei și exerciții practice direct pe Instagram. Începe ușor și crește constant cu provocări și inspirație săptămânală.',
        extras: [
          'Conținut gratuit zilnic',
          'Challenge-uri creative săptămânale',
          'Sfaturi rapide de filmare',
          'Inspirație și trend-uri actuale',
          'Comunitate activă pe Instagram',
          'Acces la toate postările și stories'
        ],
        price: 'Gratuit',
        period: 'Instagram',
        ctaLabel: 'Follow',
        ctaAction: 'instagram',
        instagramUrl: 'https://www.instagram.com/alexandrucostea.ro/'
      }
    };

    return cardContent[plan.id] || cardContent.essential;
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#003049] via-[#002540] to-[#002035] text-white overflow-hidden py-20 md:py-32"
      aria-labelledby="pricing-heading"
    >
      {/* Background Word "Cursuri" with Parallax */}
             <motion.div
               className="hidden md:flex absolute inset-0 items-start justify-center pt-0 pointer-events-none select-none z-0"
               aria-hidden="true"
               style={{ y: isMounted && !isMobile ? textY : 0 }}
             >
               <span className="font-garnet text-[16vw] leading-none tracking-[-0.04em] text-[#FCBF49]/50" style={{ textShadow: '0 0 20px rgba(252, 191, 73, 0.4)' }}>
                 Cursuri
               </span>
             </motion.div>

      {/* Container */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10 mt-12 md:mt-16">
        {/* Cards Grid */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {content.plans.map((plan, index) => {
            const cardData = getCardData(plan);
            const shouldApplyParallax = isMounted && !isMobile;
            
            // Mobile optimization
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
                initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                viewport={{ once: true, amount: isMobile ? 0.1 : 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                  scale: { duration: 0.6, ease: "easeOut" },
                  rotateX: { duration: 0.7, ease: "easeOut" }
                }}
                style={{ 
                  y: shouldApplyParallax ? cardY : 0,
                  perspective: '1200px'
                }}
              >
                <NeoPricingCard
                  title={plan.title}
                  subtitle={cardData.subtitle}
                  price={cardData.price}
                  period={cardData.period}
                  features={cardData.features}
                  ctaLabel={cardData.ctaLabel}
                  onCTAClick={() => handleCTAClick(plan, cardData)}
                  isPopular={plan.id === 'professional'}
                  showInstagramIcon={cardData.ctaAction === 'instagram'}
                  description={cardData.description}
                  extras={cardData.extras}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}





