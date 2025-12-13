/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commented for dev server
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  typescript: {
    // Ignore build errors for now (warnings about function props in client components are false positives)
    ignoreBuildErrors: false,
  },
  webpack: (config, { isServer, dev }) => {
    // Only minimize in production builds, not in dev mode (this was slowing down dev server!)
    if (!isServer && !dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
      };
    }
    
    return config;
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet, notranslate',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  env: {
    CUSTOM_KEY: 'custom-value',
  },
};

export default nextConfig;

