import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Portfolio } from '@/components/sections/Portfolio';
import { PricingSection } from '@/components/pricing/PricingSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import NewsletterModern from '@/components/sections/NewsletterModern';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <PricingSection />
      <Testimonials />
      <FAQ />
      <NewsletterModern />
    </>
  );
}

