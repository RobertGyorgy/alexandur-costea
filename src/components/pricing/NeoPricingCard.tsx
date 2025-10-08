'use client';

import React, { useState } from 'react';
import { CheckIcon } from './CheckIcon';

interface NeoPricingCardProps {
  title: string;
  subtitle?: string;
  price: string;
  period?: string;
  features: string[];
  ctaLabel: string;
  onCTAClick: () => void;
  isPopular?: boolean;
  showInstagramIcon?: boolean;
  description?: string;
  extras?: string[];
}

export function NeoPricingCard({
  title,
  subtitle,
  price,
  period,
  features,
  ctaLabel,
  onCTAClick,
  isPopular: _isPopular = false,
  showInstagramIcon = false,
  description,
  extras
}: NeoPricingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <div 
      className="relative w-full h-[600px] group" 
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative w-full h-full transition-all duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped 
            ? 'rotateY(180deg)' 
            : `rotateY(${isHovered ? (mousePosition.x - 0.5) * 8 : 0}deg) rotateX(${isHovered ? (0.5 - mousePosition.y) * 8 : 0}deg) translateZ(${isHovered ? '20px' : '0px'})`
        }}
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl bg-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 ease-out"
          style={{ 
            backfaceVisibility: 'hidden',
            boxShadow: isHovered 
              ? '0 30px 60px -12px rgba(254, 95, 1, 0.35), 0 0 0 1px rgba(254, 95, 1, 0.2)' 
              : '0 10px 30px -5px rgba(16, 40, 55, 0.3)'
          }}
        >
          {/* Content Wrapper - Flex Column */}
          <div className="h-full flex flex-col relative z-10">
            {/* Header */}
            <div className="px-8 pt-8 pb-6">
              <p className="text-3xl text-[#E5E4E2] font-garnet mb-3">{subtitle || title}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-[#FE5F01]">{price}</span>
                {period && <span className="text-[#E5E4E2]/60 font-medium text-sm">/{period}</span>}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#F77F00]/20" />

            {/* Features List */}
            <div className="px-8 py-6 space-y-4 flex-1">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-[#E5E4E2]/90 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Section - Always at bottom */}
            <div className="px-8 pb-8 pt-4 mt-auto">
            <div className="relative">
              {/* Button */}
              <button
                onClick={onCTAClick}
                className="w-full rounded-full h-12 text-sm font-semibold transition-all duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 bg-[#FE5F01] text-white hover:bg-[#ff7a2e] hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 hover:scale-105 flex items-center justify-center gap-2"
              >
                {showInstagramIcon && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                )}
                {ctaLabel}
              </button>
              
              {/* Vezi Detalii Button (if description exists) */}
              {description && (
                <button
                  onClick={() => setIsFlipped(true)}
                  className="w-full mt-4 py-2.5 px-4 text-sm font-semibold text-white bg-transparent border-2 border-white hover:bg-white/10 rounded-full transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                >
                  <span>Vezi detalii</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              )}
            </div>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        {description && (
          <div 
            className="absolute inset-0 w-full h-full rounded-3xl bg-white/10 backdrop-blur-md overflow-hidden transition-all duration-500"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              boxShadow: '0 30px 60px -12px rgba(254, 95, 1, 0.25), 0 0 0 1px rgba(254, 95, 1, 0.15)'
            }}
          >
            {/* Back Content */}
            <div className="relative z-10 p-6 h-full flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h4 className="text-[#E5E4E2] font-bold text-xl">{title}</h4>
                <button
                  onClick={() => setIsFlipped(false)}
                  className="w-10 h-10 rounded-full bg-[#F77F00]/10 hover:bg-[#F77F00]/20 border border-[#F77F00]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 active:scale-95"
                >
                  <svg className="w-5 h-5 text-[#E5E4E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Description - Scrollable */}
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#F77F00]/30 scrollbar-track-transparent pr-2">
                <p className="text-[#E5E4E2]/80 text-sm leading-relaxed">
                  {description}
                </p>
                
                {/* Extra Info if available */}
                {extras && extras.length > 0 && (
                  <div className="mt-6">
                    <h5 className="text-[#FE5F01] font-semibold text-sm uppercase tracking-wider mb-3">Ce includem:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2.5">
                      {extras.map((extra, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-[#F77F00] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[#E5E4E2]/80 text-xs leading-tight">{extra}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Info */}
              <div className="pt-3 border-t border-[#F77F00]/20 flex justify-between items-center">
                <div>
                  <div className="text-[#FE5F01] font-bold text-lg">{price}</div>
                  {period && <div className="text-[#E5E4E2]/60 text-xs">{period}</div>}
                </div>
                <button
                  onClick={() => setIsFlipped(false)}
                  className="px-4 py-2 bg-transparent border-2 border-white hover:bg-white/10 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Înapoi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}






