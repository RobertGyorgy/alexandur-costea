 import { Metadata } from 'next';
import { siteContent } from './content';

const siteUrl = siteContent.site.url;
const siteName = siteContent.site.name;
const siteDescription = siteContent.site.description;

export const defaultMetadata: Metadata = {
  title: {
    default: `${siteName} - Content Creator & Digital Storyteller`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'content creator',
    'video production',
    'photography',
    'brand collaborations',
    'digital storytelling',
    'social media content',
    'creative direction',
    'Alex Costea',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: `${siteName} - Content Creator & Digital Storyteller`,
    description: siteDescription,
    images: [
      {
        url: '/assets/images/og-image.jpg', // TODO: Create OG image
        width: 1200,
        height: 630,
        alt: `${siteName} - Content Creator Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@alexcostea', // TODO: Update with actual Twitter handle
    creator: '@alexcostea',
    title: `${siteName} - Content Creator & Digital Storyteller`,
    description: siteDescription,
    images: ['/assets/images/twitter-image.jpg'], // TODO: Create Twitter image
  },
  verification: {
    // TODO: Add verification IDs when available
    // google: 'your-google-verification-id',
    // yandex: 'your-yandex-verification-id',
    // yahoo: 'your-yahoo-verification-id',
  },
  other: {
    'theme-color': '#FFD60A',
    'color-scheme': 'dark',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': siteName,
    'application-name': siteName,
    'msapplication-TileColor': '#0B0F19',
    'msapplication-config': '/browserconfig.xml',
    'format-detection': 'telephone=no',
  },
};

export function generatePageMetadata({
  title,
  description,
  path = '',
  images,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  images?: string[];
  noIndex?: boolean;
}): Metadata {
  const pageUrl = `${siteUrl}${path}`;
  const pageTitle = title ? `${title} | ${siteName}` : (typeof defaultMetadata.title === 'object' && defaultMetadata.title !== null && 'default' in defaultMetadata.title ? defaultMetadata.title.default : `${siteName} - Content Creator & Digital Storyteller`);
  const pageDescription = description || siteDescription;
  const pageImages = images || ['/assets/images/og-image.jpg'];

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: pageUrl,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      images: pageImages.map((image) => ({
        url: image,
        width: 1200,
        height: 630,
        alt: `${title || siteName} - Preview`,
      })),
    },
    twitter: {
      title: pageTitle,
      description: pageDescription,
      images: pageImages,
    },
  };
}

// JSON-LD structured data
export function generateJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    image: `${siteUrl}/assets/images/alex-profile.jpg`, // TODO: Add profile image
    sameAs: siteContent.footer.socials.map((social) => social.href),
    jobTitle: 'Content Creator & Digital Storyteller',
    worksFor: {
      '@type': 'Organization',
      name: siteName,
    },
    knowsAbout: [
      'Video Production',
      'Photography',
      'Content Creation',
      'Digital Storytelling',
      'Brand Collaborations',
      'Creative Direction',
      'Social Media Marketing',
    ],
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `${siteUrl}/assets/images/logo.png`, // TODO: Add logo
    sameAs: siteContent.footer.socials.map((social) => social.href),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@alexcostea.com', // TODO: Update with actual email
    },
    founder: {
      '@type': 'Person',
      name: siteName,
    },
    foundingDate: '2019', // TODO: Update with actual date
    areaServed: 'Worldwide',
    serviceType: [
      'Video Production',
      'Photography Services',
      'Content Creation',
      'Brand Collaboration',
      'Creative Direction',
    ],
  };
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Person',
      name: siteName,
    },
  };
}
