import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Portfolio } from '@/components/sections/Portfolio';
import { Pricing } from '@/components/sections/Pricing';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import NewsletterModern from '@/components/sections/NewsletterModern';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <Pricing />
      <Testimonials />
      <FAQ />
      <NewsletterModern />
    </>
  );
}

