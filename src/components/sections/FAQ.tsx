'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { siteContent } from '@/lib/content';
import { analytics } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import type { FAQItem } from '@/lib/content';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';

export function FAQ() {
  const content = siteContent.faq;
  const [openItem, setOpenItem] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleItem = (id: string) => {
    // Toggle: if clicking the same item, close it; otherwise open the new one
    setOpenItem(openItem === id ? null : id);
    
    analytics.track({
      action: 'faq_toggle',
      category: 'engagement',
      label: id,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative bg-[#FE5F01] py-24 md:py-28 lg:py-32"
      aria-labelledby="faq-heading"
    >
      <BackgroundEffects variant="gradient" color="#102837" opacity={0.1} animated={false} />
      
      {/* Two Column Layout */}
      <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 lg:gap-24 max-w-7xl mx-auto px-4 md:px-6 items-start">
        {/* Left Column: Sticky Vertical Title (Desktop Only) */}
        <div className="hidden md:flex sticky top-8 gap-6 self-start">
          <h2 
            className="font-garnet text-[11vw] lg:text-[8.5vw] font-bold text-white leading-none whitespace-nowrap"
            style={{ 
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              wordWrap: 'break-word',
              wordBreak: 'keep-all'
            }}
          >
            ÎNTREBĂRI
          </h2>
          <h2 
            className="font-garnet text-[11vw] lg:text-[8.5vw] font-bold text-white leading-none whitespace-nowrap"
            style={{ 
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              wordWrap: 'break-word',
              wordBreak: 'keep-all'
            }}
          >
            FRECVENTE
          </h2>
        </div>
        
        {/* Right Column: FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="w-full max-w-3xl"
        >
          {content.items.map((item, index) => (
            <motion.div key={item.id} variants={itemVariants}>
              <FAQItem
                item={item}
                isOpen={openItem === item.id}
                onToggle={() => toggleItem(item.id)}
                isLast={index === content.items.length - 1}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}

function FAQItem({ item, isOpen, onToggle, isLast }: FAQItemProps) {
  return (
    <div className="relative w-full">
      <Button
        variant="ghost"
        className="w-full py-4 px-0 text-left flex items-center justify-between hover:bg-transparent transition-colors duration-200 group"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className="text-white font-semibold text-fib-2 pr-4 group-hover:text-[#102837] transition-colors duration-200" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', wordWrap: 'break-word', wordBreak: 'keep-all' }}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0"
        >
          <div className={cn(
            'w-4 h-4 relative transition-colors duration-200',
            isOpen ? 'text-[#102837]' : 'text-white/80 group-hover:text-[#102837]'
          )}>
            {/* Plus sign using two divs */}
            <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-current -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 w-[1.5px] h-full bg-current -translate-x-1/2" />
          </div>
        </motion.div>
      </Button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6">
              <p className="text-white/90 leading-relaxed font-medium" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.15)', wordWrap: 'break-word', wordBreak: 'keep-all' }}>
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated divider line - centered between questions */}
      {!isLast && (
        <div className="w-full my-4 md:my-6">
          <div className="relative h-[3px] w-full bg-white/30 rounded-full overflow-hidden">
            {/* Animated foreground line */}
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}


