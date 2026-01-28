import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-bg py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Small centered separator line */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-px bg-line/20" />
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <Button 
            className="rounded-full border-none bg-white/5 backdrop-blur-md text-fg hover:bg-[#FE5F01] hover:text-white transition-all duration-300 mb-4 px-8 py-6 text-base" 
            asChild
          >
            <a href="https://calendly.com/" target="_blank" rel="noopener noreferrer">
              Programează o întâlnire
            </a>
          </Button>

          {/* Copyright and Links - Centered */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <p className="text-sm text-muted">
              © {year} Alex Costea. All rights reserved.
            </p>
            <a
              href="#"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              Privacy Policy
            </a>
              </div>

          {/* Images Below */}
          <div className="flex items-center gap-6">
            <a
              href="https://anpc.ro/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity"
            >
            <Image
              src="/1.png"
              alt="Logo 1"
              width={100}
              height={50}
              className="h-10 w-auto object-contain opacity-70"
            />
            </a>
            <a
              href="https://reclamatiisal.anpc.ro/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity"
            >
            <Image
              src="/2.png"
              alt="Logo 2"
              width={100}
              height={50}
              className="h-10 w-auto object-contain opacity-70"
            />
            </a>
            </div>
        </div>
      </div>
    </footer>
  );
}
