'use client';

import React from 'react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="relative bg-bg py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Small centered separator line */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-px bg-line/20" />
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          {/* Copyright and Links - Centered */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <p className="text-sm text-muted">
              © 2025 Alex Costea. All rights reserved.
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
            <Image
              src="/1.png"
              alt="Logo 1"
              width={100}
              height={50}
              className="h-10 w-auto object-contain opacity-70"
            />
            <Image
              src="/2.png"
              alt="Logo 2"
              width={100}
              height={50}
              className="h-10 w-auto object-contain opacity-70"
            />
            </div>
        </div>
      </div>
    </footer>
  );
}
