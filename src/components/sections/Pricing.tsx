'use client';

import React, { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { siteContent } from '@/lib/content';
import { analytics } from '@/lib/analytics';
import type { PricingPlan } from '@/lib/content';
import './PricingCard.css';

export function Pricing() {
  const { kicker, title, description, plans } = siteContent.pricing;
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const handleCardFlip = (planId: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
  };

  const handleCTAClick = (plan: PricingPlan) => {
    analytics.trackEvent('pricing_plan_selected', {
      plan: plan.title,
      price: plan.price,
      url: plan.ctaUrl
    });
  };

  // Get card colors based on plan
  const getCardColor = (planId: string) => {
    switch (planId) {
      case 'essential':
        return '#FE7F2D'; // Orange
      case 'professional':
        return '#9333EA'; // Purple
      case 'masterclass':
        return '#00A8E8'; // Cyan
      default:
        return '#FE7F2D';
    }
  };

  return (
    <Section
      id="pricing"
      spacing="xl"
      aria-labelledby="pricing-heading"
      className="relative overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">
          {kicker}
        </p>
        <h2 id="pricing-heading" className="text-5xl font-bold mb-6">
          {title}
        </h2>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="pricing-cards-container">
        {plans.map((plan, index) => {
          const isFlipped = flippedCards[plan.id] || false;
          const cardColor = getCardColor(plan.id);
          const isHighlighted = plan.highlighted;

          return (
            <div
              key={plan.id}
              className={`pricing-flip-card ${isHighlighted ? 'highlighted' : ''}`}
              style={{ '--card-color': cardColor } as React.CSSProperties}
            >
              <div className={`pricing-flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                {/* FRONT OF CARD */}
                <div className="pricing-flip-card-front">
                  {isHighlighted && (
                    <div className="popular-badge">
                      {plan.badge || 'Most Popular'}
                    </div>
                  )}
                  
                  <div className="card-front-content">
                    {/* Plan Name */}
                    <h3 className="plan-name">{plan.title}</h3>

                    {/* Price */}
                    <div className="price-section">
                      <span className="currency">RON</span>
                      <span className="amount">{plan.price}</span>
                      <span className="period">/{plan.period}</span>
                    </div>

                    {/* Features */}
                    <ul className="features-list">
                      {plan.features.slice(0, 5).map((feature, idx) => (
                        <li key={idx} className="feature-item">
                          <span className="check-icon">✓</span>
                          {feature}
                        </li>
                      ))}
                      {plan.features.length > 5 && (
                        <li className="feature-item more-features">
                          +{plan.features.length - 5} mai multe
                        </li>
                      )}
                    </ul>

                    {/* CTA Button */}
                    <a
                      href={plan.ctaUrl}
                      className="cta-button"
                      onClick={() => handleCTAClick(plan)}
                    >
                      {plan.ctaLabel}
                    </a>

                    {/* Flip Button */}
                    <button
                      className="flip-button"
                      onClick={() => handleCardFlip(plan.id)}
                      aria-label="Vezi detalii"
                    >
                      <span>Vezi detalii</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 12h18M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* Shine Effect */}
                  <div className="shine-effect"></div>
                </div>

                {/* BACK OF CARD */}
                <div className="pricing-flip-card-back">
                  <div className="card-back-content">
                    {/* Back Header */}
                    <div className="back-header">
                      <h3 className="plan-name">{plan.title}</h3>
                      <button
                        className="close-button"
                        onClick={() => handleCardFlip(plan.id)}
                        aria-label="Înapoi"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>

                    {/* Full Description */}
                    <div className="description-section">
                      <p className="description-text">{plan.description}</p>
                    </div>

                    {/* All Features */}
                    <div className="all-features-section">
                      <h4 className="features-title">Toate beneficiile:</h4>
                      <ul className="features-list-back">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="feature-item-back">
                            <span className="check-icon">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Back CTA */}
                    <a
                      href={plan.ctaUrl}
                      className="cta-button-back"
                      onClick={() => handleCTAClick(plan)}
                    >
                      {plan.ctaLabel}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
