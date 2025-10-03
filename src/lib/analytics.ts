// Analytics configuration and utilities
// TODO: Replace with actual analytics provider (Google Analytics, Plausible, etc.)

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Placeholder analytics functions
export const analytics = {
  // Track page views
  pageview: (url: string) => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // TODO: Implement actual page view tracking
      console.log('Pageview:', url);
    }
  },

  // Track custom events
  track: (event: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // TODO: Implement actual event tracking
      console.log('Event:', event);
    }
  },

  // Track form submissions
  trackFormSubmission: (formName: string, success: boolean = true) => {
    analytics.track({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'engagement',
      label: formName,
    });
  },

  // Track video interactions
  trackVideoPlay: (videoTitle: string) => {
    analytics.track({
      action: 'video_play',
      category: 'media',
      label: videoTitle,
    });
  },

  // Track CTA clicks
  trackCTAClick: (ctaLabel: string, location: string) => {
    analytics.track({
      action: 'cta_click',
      category: 'engagement',
      label: `${ctaLabel} - ${location}`,
    });
  },

  // Track scroll depth
  trackScrollDepth: (percentage: number, page: string) => {
    analytics.track({
      action: 'scroll_depth',
      category: 'engagement',
      label: page,
      value: percentage,
    });
  },

  // Track contact form submissions
  trackContactSubmission: (source: string) => {
    analytics.track({
      action: 'contact_form_submit',
      category: 'conversion',
      label: source,
    });
  },

  // Track portfolio item views
  trackPortfolioView: (itemTitle: string) => {
    analytics.track({
      action: 'portfolio_view',
      category: 'content',
      label: itemTitle,
    });
  },
};

// Initialize analytics (to be called in app layout)
export const initAnalytics = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
    return;
  }

  // TODO: Initialize your analytics provider here
  // Example for Google Analytics:
  /*
  gtag('config', 'GA_MEASUREMENT_ID', {
    page_title: document.title,
    page_location: window.location.href,
  });
  */
};

// Utility to check if analytics should be enabled
export const shouldEnableAnalytics = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for user consent (GDPR compliance)
  const consent = localStorage.getItem('analytics-consent');
  return consent === 'true' && process.env.NODE_ENV === 'production';
};

// Set user consent for analytics
export const setAnalyticsConsent = (consent: boolean) => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('analytics-consent', consent.toString());
  
  if (consent) {
    initAnalytics();
  }
};

// Get user consent status
export const getAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const consent = localStorage.getItem('analytics-consent');
  return consent === 'true';
};

export default analytics;


