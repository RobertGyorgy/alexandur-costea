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
          'Structură completă în 6 module',
          'Suport video',
          'Preproducție: concept, scenariu, plan de filmare',
          'Bazele imaginii: setări, iluminare, compoziție, mișcări de cameră',
          'Gândirea în montaj & editare',
          'Informații utile pentru orice program de editare',
          'Ușor de accesat oricând și de oriunde.',
          'Acces pe viață în Creators\' Club'
        ],
        description: 'ReelUp este programul care îți dezvoltă o bază solidă în materie de creare de conținut video. Construit ca un parcurs complet pentru începători, cursul te ajută să înțelegi esențialul: cum transformi o idee într-un material final, structurat și editat profesionist. Acest curs nu cere experiență anterioară, doar dorința de a învăța și un mindset creativ. Vei învăța bazele filmării și editării, noțiuni aplicabile atât în DaVinci Resolve, cât și în CapCut sau în orice program de editare, astfel încât să poți crea conținut eficient, curat și estetic. ReelUp este o investiție în fundația ta ca creator, nu doar în încă un tutorial.',
        extras: [],
        price: '290 euro inc. TVA',
        period: '',
        ctaLabel: 'Achiziționează acum',
        ctaAction: 'newsletter'
      },
      professional: {
        subtitle: 'Masterclass de la Idee la Reel',
        features: [
          '8 module live pe Discord timp de 2 luni',
          'Acces la modulele înregistrate pe viață',
          '10 locuri disponibile per ediție',
          'Producție video completă la standard de industrie',
          'Concept, scenariu, plan filmare, producție, editare',
          'Înveți cum gândește un regizor: vizual, logic, cu sens',
          'Tehnici avansate de imagine și montaj',
          'Editare în DaVinci Resolve cu workflow profesional',
          'Dezvolți skill-uri pe care le poți aplica în freelancing, branduri, campanii',
          'Acces pe viață la Creators\' Club'
        ],
        description: 'Masterclass-ul De la Idee la Reel este primul program complet din România pe care l-am creat pentru creatorii de conținut care se bucură de un succes real. Am structurat programul astfel încât să includă doar informațiile relevante și tehnicile pe care le folosesc în proiectele mele profesionale, organizate pas cu pas într-un proces clar, eficient și aplicat. Pe parcursul celor 8 module live, trecem împreună prin toate etapele unei producții video la standarde de industrie: de la concept și preproducție, la filmare și editare avansată. Începem cu generarea ideii, structurare, scenariu și organizarea filmării. Continuăm cu partea tehnică, setări pentru telefon și cameră, compoziție, iluminare și mișcare de cameră. În etapa finală lucrăm pe montaj non-liniar, efecte vizuale, ritm, sunet și colorizare, astfel încât să transformi orice idee într-un reel coerent, dinamic și creativ. Este creat pentru creatori cu minimă experiență sau pentru cei care vor să ducă skill-urile la nivel profesionist. Te ghidez pas cu pas până creezi propriul reel, bine executat. Tot ce ai nevoie ca să te înscrii este un telefon, un laptop cu DaVinci Resolve și dorința de a învăța.',
        extras: [],
        price: '950 euro inc. TVA',
        period: '',
        ctaLabel: 'Înscrie-te pe lista pentru următoarea ediție',
        ctaAction: 'newsletter'
      },
      enterprise: {
        subtitle: 'CREATORS\' FEED',
        features: [
          'Tips rapide & insight-uri din producție',
          'Inspirație vizuală și concepte noi',
          'Breakdown-uri și explicații tehnice pe exemple reale',
          'Challenge-uri creative & exerciții',
          'Toate postările și stories relevante într-un singur loc'
        ],
        description: 'Conținut educativ, inspirație și exemple reale din procesul meu creativ. Aici postez analize video, breakdown-uri, seria „Cine v-a filmat aici?", experimente vizuale și idei pe care le poți aplica imediat în propriile proiecte. Este punctul de intrare în comunitate dacă vrei să înveți organic, constant și să vezi cum gândesc în spatele camerelor, fără costuri și fără barieră de acces.',
        extras: [],
        price: 'Gratuit',
        period: '/Instagram',
        ctaLabel: 'Follow pe Instagram',
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
      className="relative w-full bg-gradient-to-b from-[#102837] via-[#0d1f2a] to-[#0a1620] text-white overflow-hidden py-20 md:py-32"
      aria-labelledby="pricing-heading"
    >
      {/* Background Word "Cursuri" with Parallax */}
             <motion.div
               className="hidden md:flex absolute inset-0 items-start justify-center pt-0 pointer-events-none select-none z-0"
               aria-hidden="true"
               style={{ y: isMounted && !isMobile ? textY : 0 }}
             >
               <span className="font-garnet text-[16vw] leading-none tracking-[-0.04em] text-[#FE5F01]/50" style={{ textShadow: '0 0 20px rgba(254, 95, 1, 0.4)' }}>
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
            
            // Different heights: Mobile (original values) vs Desktop (fixed 650px)
            const getCardHeight = (planId: string) => {
              if (planId === 'essential') {
                // ReelUp
                return 'h-[600px] md:h-[620px]';
              } else if (planId === 'professional') {
                // Masterclass
                return 'h-[750px] md:h-[620px]';
              } else if (planId === 'enterprise') {
                // Instagram
                return 'h-[550px] md:h-[620px]';
              }
              return 'h-[650px] md:h-[620px]';
            };
            
            // Mobile optimization
            const _mobileTransition = {
              duration: 0.3,
              delay: index * 0.05,
              ease: "easeOut"
            };
            
            const _desktopTransition = {
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
                  cardHeight={getCardHeight(plan.id)}
                  isMobile={isMobile}
                  icon={plan.icon}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}





