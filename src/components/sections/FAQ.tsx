'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
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
      className="relative bg-[#F77F00] py-24 md:py-28 lg:py-32"
      aria-labelledby="faq-heading"
    >
      <BackgroundEffects variant="gradient" color="#D62828" opacity={0.1} animated={false} />
      
      {/* Two Column Layout */}
      <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 lg:gap-24 max-w-7xl mx-auto px-4 md:px-6 items-start">
        {/* Left Column: Sticky Vertical Title (Desktop Only) */}
        <div className="hidden md:flex sticky top-8 gap-6 self-start">
          <h2 
            className="font-garnet text-[11vw] lg:text-[8.5vw] font-bold text-[#003049] leading-none whitespace-nowrap"
            style={{ 
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)'
            }}
          >
            ÎNTREBĂRI
          </h2>
          <h2 
            className="font-garnet text-[11vw] lg:text-[8.5vw] font-bold text-[#003049] leading-none whitespace-nowrap"
            style={{ 
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)'
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
        className="w-full py-6 px-0 text-left flex items-center justify-between hover:bg-transparent transition-colors duration-200 group"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className="text-[#003049] font-medium text-lg pr-4 group-hover:text-[#D62828] transition-colors duration-200">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0"
        >
          <div className={cn(
            'w-4 h-4 relative transition-colors duration-200',
            isOpen ? 'text-[#D62828]' : 'text-[#003049]/60 group-hover:text-[#D62828]'
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
            <div className="pt-2 pb-8">
              <p className="text-[#003049]/80 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated divider line - centered between questions */}
      {!isLast && (
        <div className="w-full my-6 md:my-8">
          <div className="relative h-[3px] w-full bg-[#D62828]/40 rounded-full overflow-hidden">
            {/* Animated foreground line */}
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="h-full bg-[#D62828] rounded-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}


