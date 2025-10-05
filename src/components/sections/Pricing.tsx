'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { siteContent } from '@/lib/content';
import { analytics } from '@/lib/analytics';
import type { PricingPlan } from '@/lib/content';
import './PricingCard.css';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';

export function Pricing() {
  const content = siteContent.pricing;
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  // Individual card parallax
  const card1Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [100, -100]);

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
    >
      <BackgroundEffects variant="dots" color="#FE7F2D" opacity={0.12} animated={false} />
      {/* Pricing Cards - 3 Vertical Cards Side by Side */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-7xl mx-auto">
        {content.plans.map((plan, index) => {
          const cardYValues = [card1Y, card2Y, card3Y];
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex-1"
              style={{ y: isMobile ? 0 : cardYValues[index] }}
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
  const bgColor = plan.id === 'essential' ? '#FE7F2D' : plan.id === 'professional' ? '#006989' : '#FE7F2D';
  
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
      description: 'Prima ediție a Masterclass-ului „De la Idee la Reel" a fost mai mult decât un curs – a fost o experiență intensă, cu oameni curioși, implicați și plini de energie. Am trecut prin toți pașii unui reel reușit: Alegerea temei și crearea conceptului, Setări corecte pentru telefon sau cameră, Filmare creativă: compoziție, lumină, mișcare, Editare pas cu pas în DaVinci Resolve, Tranziții și efecte pentru reel-uri catchy, Colorizare și sound design pentru un look & sound profesionist. A fost doar începutul. Urmează o nouă ediție și mai tare.',
      steps: [
        { title: 'Concept', description: 'Dezvoltarea ideilor și planning-ul producției' },
        { title: 'Setări', description: '' },
        { title: 'Filmare', description: '' },
        { title: 'Editare DaVinci', description: '' },
        { title: 'Tranziții & Efecte', description: '' },
        { title: 'Colorizare & Sound', description: '' }
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
      price: 'Gratuit',
      duration: 'resurse pe Instagram',
      cta: 'Urmărește-mă pe Instagram',
      instagramUrl: 'https://www.instagram.com/alexandrucostea.ro/'
    }
  };

  const content = cardContent[plan.id as keyof typeof cardContent] || cardContent.essential;
  
  // Map plan IDs to color classes
  const colorClass = 
    plan.id === 'essential' ? 'pricing-card-orange' :
    plan.id === 'professional' ? 'pricing-card-purple' :
    'pricing-card-cyan';
  
  return (
    <div className={`pricing-card-wrapper ${colorClass} group relative w-full h-[520px] rounded-[20px] flex items-center justify-center transition-all duration-[600ms] ease-out md:hover:scale-105 md:hover:-translate-y-[10px] p-[3px]`}>
      {/* Animated Glow Border */}
      <span className="pricing-card-glow"></span>
      
      {/* Card Inner Content */}
      <div className="pricing-card-inner w-full h-full bg-bg-elev rounded-[17px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] md:hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-shadow duration-500 ease-out">
        {/* Content */}
        <div className="relative z-10 p-5 h-full flex flex-col gap-3">
        {/* Large Colored Card with Title and Bullets */}
        <div 
          className="w-full h-[200px] rounded-xl relative overflow-hidden transition-all duration-500 p-4 flex flex-col justify-between"
          style={{ 
            background: `linear-gradient(45deg, ${bgColor}, ${bgColor}E6)`
          }}
        >
          <div className="absolute inset-0 opacity-50"
               style={{
                 background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 30%), repeating-linear-gradient(45deg, ${bgColor}1A 0px, ${bgColor}1A 2px, transparent 2px, transparent 4px)`
               }} />
          
          {/* Top Section - Title & Subtitle */}
          <div className="relative z-10 flex flex-col gap-1">
            <h3 className="text-white text-2xl font-bold drop-shadow-lg">
              {content.title}
            </h3>
            <p className="text-white/90 text-[0.75em] font-medium drop-shadow">
              {content.subtitle}
            </p>
          </div>

          {/* Bottom Section - Bullet Pills */}
          <div className="relative z-10 flex flex-wrap gap-1.5">
            {'bullets' in content && content.bullets && content.bullets.slice(0, 5).map((bullet: string, idx: number) => (
              <div 
                key={idx}
                className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full px-2.5 py-1 shadow-soft flex items-center justify-center"
              >
                <span className="text-white text-[0.6em] font-medium whitespace-nowrap text-center">
                  {bullet}
                </span>
              </div>
            ))}
            {'steps' in content && content.steps && content.steps.slice(0, 6).map((step: { title: string; description: string }, idx: number) => (
              <div 
                key={idx}
                className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full px-2.5 py-1 shadow-soft flex items-center justify-center"
              >
                <span className="text-white text-[0.6em] font-medium whitespace-nowrap text-center">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent pr-1">
          <p className="text-muted text-[0.7em] m-0 leading-relaxed transition-all duration-300 md:group-hover:text-fg/80">
            {content.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-line">
          <div className="flex flex-col">
            <div className="text-fg font-bold text-[1.1em] transition-all duration-300 md:group-hover:text-accent md:group-hover:translate-x-[2px]">
              {content.price}
            </div>
            <div className="text-muted text-[0.65em]">
              {content.duration}
            </div>
          </div>
          
          {/* Instagram Follow Button for Newbie Card */}
          {plan.id === 'enterprise' && 'instagramUrl' in content ? (
            <a
              href={content.instagramUrl as string}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-accent rounded-full text-white text-[0.75em] font-semibold cursor-pointer transition-all duration-300 md:hover:scale-105 md:hover:shadow-[0_0_0_4px_rgba(254,127,45,0.2)] flex items-center gap-2"
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow
            </a>
          ) : (
            <button
              onClick={onCTAClick}
              className="px-4 py-2 bg-accent rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300 md:group-hover:scale-105 md:group-hover:shadow-[0_0_0_4px_rgba(254,127,45,0.2)]"
            >
              <span className="text-[0.7em] font-semibold whitespace-nowrap">
                subscribe la newsletter
              </span>
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
