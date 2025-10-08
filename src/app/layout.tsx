import './globals.css';
import '../styles/prose.css';
import { defaultMetadata, generateJsonLd, generateOrganizationJsonLd, generateWebsiteJsonLd } from '@/lib/seo';
import { NavBar } from '@/components/shared/NavBar';
import { PageBlur } from '@/components/shared/PageBlur';
import { LoaderScreen } from '@/components/shared/LoaderScreen';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { PageTransitionProvider } from '@/lib/page-transition';
import IosBottomUIFix from '@/components/ui/IosBottomUIFix';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
  colorScheme: 'dark',
  viewportFit: 'cover',
  // Force Safari to maintain toolbar and prevent collapsing
  interactiveWidget: 'resizes-content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className="scroll-smooth" 
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        {/* Safari toolbar and search bar control */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Alexandru Costea" />
        {/* Force Safari to use system colors and non-transparent toolbar */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteJsonLd()),
          }}
        />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Prevent FOUC and set initial theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Set no-js class for progressive enhancement
              document.documentElement.classList.add('no-js');
              
              // Check for backdrop-filter support
              if (!CSS.supports('backdrop-filter', 'blur(10px)')) {
                document.documentElement.classList.add('no-backdrop-filter');
              }
              
              // Remove no-js class when JS loads
              document.addEventListener('DOMContentLoaded', function() {
                document.documentElement.classList.remove('no-js');
              });
            `,
          }}
        />
      </head>
        <body className="min-h-screen bg-bg text-fg font-sans antialiased">
          <PageTransitionProvider>
            {/* Custom Cursor */}
            <CustomCursor />
            
            {/* Loader Screen */}
            <LoaderScreen />

            {/* Navigation */}
            <NavBar />
          
          {/* iOS Safari toolbar fix */}
          <IosBottomUIFix />
          
          {/* Gradual blur - visible until 50% of newsletter section */}
          <PageBlur />
          
          {/* Main content */}
          <main className="relative overflow-x-hidden pb-[calc(var(--blur-height)+var(--ios-bottom-ui))]">
            {children}
          </main>
          </PageTransitionProvider>
        
        {/* Analytics initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize analytics when page loads
              if (typeof window !== 'undefined') {
                // TODO: Initialize your analytics provider here
                console.log('Analytics initialized');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
