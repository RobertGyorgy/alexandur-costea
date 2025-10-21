# Îmbunătățiri de Securitate pentru Site

## 🚨 Probleme Actuale

### 1. HTTrack Protection - LIPSA
- Nu există protecție împotriva HTTrack, wget, sau alte site scrapers
- Nu există rate limiting
- Nu există User-Agent blocking pentru scraper tools

### 2. Code Protection - LIPSA  
- Codul JavaScript este complet vizibil
- Nu există obfuscation
- Nu există anti-debugging measures

### 3. Security Headers - LIPSA
- Nu există Content Security Policy (CSP)
- Nu există security headers în next.config.js

## 🛡️ Soluții Recomandate

### 1. HTTrack Protection

#### A. Update robots.txt
```
User-agent: *
Allow: /

# Block known scrapers
User-agent: HTTrack
Disallow: /

User-agent: wget
Disallow: /

User-agent: curl
Disallow: /

User-agent: python-requests
Disallow: /

User-agent: Go-http-client
Disallow: /

User-agent: Java
Disallow: /

# Block AI crawlers
User-agent: ChatGPT-User
Disallow: /
```

#### B. Add Server-Side Protection (middleware.js)
```javascript
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const userAgent = request.headers.get('user-agent') || ''
  
  // Block known scrapers
  const blockedAgents = [
    'httrack', 'wget', 'curl', 'python-requests',
    'go-http-client', 'java/', 'bot', 'spider',
    'crawler', 'scraper'
  ]
  
  if (blockedAgents.some(agent => 
    userAgent.toLowerCase().includes(agent)
  )) {
    return new NextResponse('Access Denied', { status: 403 })
  }
  
  return NextResponse.next()
}
```

### 2. Security Headers

#### A. Update next.config.mjs
```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://vercel.live; frame-ancestors 'none';"
  }
]

const nextConfig = {
  // ... existing config
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

### 3. Client-Side Protection

#### A. Anti-Debugging Script (layout.tsx)
```javascript
// Add to layout.tsx head section
<script dangerouslySetInnerHTML={{
  __html: `
    // Anti-debugging
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > 200) {
        document.body.innerHTML = 'Access denied';
      }
    }, 1000);
    
    // Disable right-click and F12
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        return false;
      }
    });
    
    // Detect dev tools
    let devtools = {open: false, orientation: null};
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > 160 || 
          window.outerWidth - window.innerWidth > 160) {
        if (!devtools.open) {
          devtools.open = true;
          console.clear();
          console.log('%cStop!', 'color: red; font-size: 50px; font-weight: bold;');
        }
      } else {
        devtools.open = false;
      }
    }, 500);
  `
}} />
```

### 4. Advanced Protection

#### A. Cloudflare Protection
- Enable "Bot Fight Mode"
- Rate limiting
- DDoS protection
- Block known scrapers

#### B. Vercel Protection (if using)
```javascript
// vercel.json
{
  "functions": {
    "pages/api/security.js": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "noindex, nofollow, noarchive, nosnippet"
        }
      ]
    }
  ]
}
```

## ⚠️ Limitări

### Ceea ce NU poate fi protejat complet:
1. **HTML Static** - Tot HTML-ul este vizibil
2. **CSS Styles** - Toate stilurile sunt publice  
3. **JavaScript Minified** - Poate fi de-obfuscated
4. **Images/Media** - Toate asset-urile sunt publice

### Recomandare Finală:
Pentru un site portofoliu, focus-ul ar trebui să fie pe:
1. **Rate limiting** pentru a preveni scraping masiv
2. **Headers de securitate** pentru a proteja utilizatorii
3. **Monitoring** pentru a detecta tentativa de scraping

**NOTA**: Protecția perfectă împotriva copierii este imposibilă pentru site-uri statice. Scopul este să faci procesul suficient de dificil pentru majoritatea scraper-urilor casnice.
