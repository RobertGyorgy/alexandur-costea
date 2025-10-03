# Alex Costea - Content Creator Landing Page

A production-grade, dark-themed landing page built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features advanced scroll-driven animations, accessibility-first design, and hardened cross-browser compatibility.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
/
├── public/
│   ├── assets/
│   │   ├── images/        # Placeholder images (replace with actual assets)
│   │   └── videos/        # Placeholder videos (replace with actual assets)
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── globals.css   # Global styles and CSS variables
│   │   ├── layout.tsx    # Root layout with SEO and navigation
│   │   ├── page.tsx      # Home page combining all sections
│   │   ├── sitemap.ts    # Generated sitemap
│   │   └── robots.txt    # SEO robots file
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Heading.tsx
│   │   │   ├── Text.tsx
│   │   │   └── VisuallyHidden.tsx
│   │   ├── sections/     # Page sections (isolated components)
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Pricing.tsx      # ⭐ Vertical card stack animation
│   │   │   ├── Testimonials.tsx # ⭐ Lateral horizontal card stack
│   │   │   ├── FAQ.tsx
│   │   │   ├── Newsletter.tsx
│   │   │   └── Footer.tsx
│   │   └── shared/       # Shared components
│   │       ├── NavBar.tsx
│   │       ├── Logo.tsx
│   │       ├── Icon.tsx
│   │       ├── ThemeNoise.tsx      # Animated background effect
│   │       ├── GlassCard.tsx       # Backdrop-filter with fallbacks
│   │       ├── Lightbox.tsx        # Accessible media lightbox
│   │       ├── ResponsiveVideo.tsx # Smart video component
│   │       └── SectionHeader.tsx
│   ├── lib/              # Utilities and configuration
│   │   ├── content.ts    # 🔥 ALL CONTENT CONFIGURATION
│   │   ├── seo.ts        # SEO metadata and structured data
│   │   ├── analytics.ts  # Analytics utilities (placeholder)
│   │   ├── utils.ts      # Common utilities and helpers
│   │   └── constants.ts  # Design system constants
│   └── styles/
│       └── prose.css     # Typography styles for rich content
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── postcss.config.mjs
├── .eslintrc.cjs
├── .prettierrc
└── .commitlintrc.cjs
```

## 🎨 Design System

### Dark Theme Color Palette

```css
--bg:       #0B0F19;   /* Page background (deep blue-charcoal) */
--bg-elev:  #101523;   /* Raised surfaces */
--fg:       #F5F7FA;   /* Primary text */
--muted:    #A9B0C1;   /* Secondary text */
--accent:   #FFD60A;   /* Primary highlight (golden yellow) */
--accent-2: #A855F7;   /* Secondary accent (purple) */
--line:     rgba(255,255,255,.08); /* Borders */
--glass:    rgba(255,255,255,.06); /* Glass effects */
```

### Typography

- **Font**: Inter Variable with system fallbacks
- **Fluid scaling**: Uses `clamp()` for responsive typography
- **Accessibility**: WCAG AA contrast ratios maintained

## ✨ Special Features

### 1. Pricing: Vertical Card Stack Animation

Located in `/src/components/sections/Pricing.tsx`

**How it works:**
- Uses a tall container with `position: sticky` frame
- Three cards positioned absolutely with Framer Motion transforms
- Scroll progress drives Y-translation, scaling, and blur effects
- Each card appears to slide over the previous with smooth transitions
- Respects `prefers-reduced-motion` for accessibility

**Customization:**
```typescript
// Adjust scroll-driven transforms in Pricing.tsx
const card1Y = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, -20, -40, -60]);
const card1Scale = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [1, 0.98, 0.96, 0.94]);
```

**Fallbacks:**
- No-JS users see cards in a simple vertical stack
- Reduced motion users get cross-fades without blur/scale

### 2. Testimonials: Lateral Card Stack

Located in `/src/components/sections/Testimonials.tsx`

**How it works:**
- Horizontal scroll container with `scroll-snap-type: x mandatory`
- Active testimonial overlays with scale/blur transforms based on position
- Arrow navigation and pagination dots for accessibility
- Touch/trackpad friendly on mobile devices

**Customization:**
```typescript
// Adjust card appearance based on position
const scale = isActive ? 1 : 0.95;
const opacity = isActive ? 1 : isPrevious || isNext ? 0.7 : 0.5;
const blur = isActive ? 0 : isPrevious || isNext ? 2 : 6;
```

## 🎬 Animation Philosophy

### Performance-First Approach
- **GPU-accelerated**: Only animates `transform`, `opacity`, and `filter`
- **Will-change optimization**: Applied strategically to animated elements
- **Intersection Observer**: Triggers animations when elements enter viewport
- **Reduced motion**: Complete animation system respects user preferences

### Cross-Browser Safety
- **Safari-compatible**: Avoids known webkit bugs with sticky + filter
- **Backdrop-filter fallbacks**: Graceful degradation for unsupported browsers
- **No experimental CSS**: Uses stable, well-supported properties only

## 📝 Content Management

### Editing Content

**All content is centralized in `/src/lib/content.ts`**

```typescript
export const siteContent: SiteContent = {
  site: {
    name: 'Alex Costea',
    description: 'Professional content creator...',
    nav: [
      { label: 'Home', href: '#hero' },
      // Add or modify navigation items
    ],
  },
  hero: {
    heading: 'Your heading here',
    subheading: 'Your subheading here',
    // ... more content
  },
  // ... other sections
};
```

### Adding Media Assets

1. **Images**: Place in `/public/assets/images/`
2. **Videos**: Place in `/public/assets/videos/`
3. **Update paths**: Modify `content.ts` to reference new files

### Portfolio Items

```typescript
// Add new portfolio items in content.ts
{
  id: 'unique-id',
  title: 'Project Title',
  description: 'Project description',
  media: {
    src: '/assets/videos/your-video.mp4',
    poster: '/assets/images/your-poster.jpg',
    alt: 'Alt text for accessibility',
    type: 'video',
    aspectRatio: '16/9'
  },
  tags: ['Tag1', 'Tag2'],
  featured: true  // Shows featured badge
}
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```env
# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Contact form endpoint
NEXT_PUBLIC_CONTACT_API=your-contact-form-endpoint
```

### SEO Configuration

Update `/src/lib/seo.ts` for:
- Site metadata
- Open Graph images
- Twitter cards  
- Structured data

### Analytics Integration

Replace placeholder functions in `/src/lib/analytics.ts` with your preferred provider:
- Google Analytics
- Plausible
- Mixpanel
- Custom solution

## 🧪 Quality Assurance

### Testing Checklist

**Manual QA Matrix:**
- [ ] iOS Safari (latest)
- [ ] Safari macOS  
- [ ] Chrome
- [ ] Firefox
- [ ] Edge

**Accessibility:**
- [ ] Keyboard navigation works throughout
- [ ] Screen reader compatibility
- [ ] Focus management in modal/lightbox
- [ ] `prefers-reduced-motion` respected
- [ ] WCAG AA contrast ratios

**Performance:**
- [ ] Lighthouse scores 95+ (Performance/Best Practices/SEO)
- [ ] Lighthouse scores 100 (Accessibility)
- [ ] No hydration warnings in console
- [ ] Smooth animations on low-end devices

### Development Scripts

```bash
# Linting and formatting
pnpm lint          # Check for ESLint issues
pnpm lint:fix      # Auto-fix ESLint issues
pnpm format        # Format with Prettier
pnpm format:check  # Check formatting
pnpm type-check    # TypeScript type checking

# Git hooks (via Husky)
pnpm prepare       # Set up git hooks
```

## 🚀 Deployment

### Build Optimization

The project is optimized for:
- **Vercel**: Zero-config deployment
- **Netlify**: Static site generation
- **Docker**: Containerized deployment
- **Traditional hosting**: Static export capability

### Pre-deployment Checklist

1. [ ] Update `/src/lib/content.ts` with real content
2. [ ] Replace placeholder images/videos in `/public/assets/`
3. [ ] Configure analytics in `/src/lib/analytics.ts`  
4. [ ] Update social media links and contact information
5. [ ] Test contact form integration
6. [ ] Verify SEO metadata in `/src/lib/seo.ts`
7. [ ] Run full QA testing matrix

### Performance Monitoring

After deployment, monitor:
- Core Web Vitals via Google Search Console
- Real User Monitoring with your analytics provider
- Lighthouse CI in your deployment pipeline

## 🎯 Customization Guide

### Adding New Sections

1. **Create component** in `/src/components/sections/NewSection.tsx`
2. **Add to page** in `/src/app/page.tsx`
3. **Update navigation** in `/src/lib/content.ts`
4. **Add content** to the content configuration

### Modifying Animations

**Disable blur effects** for better mobile performance:
```typescript
// In animation components, wrap blur transforms
filter: prefersReducedMotion() || isMobile 
  ? 'none' 
  : `blur(${blurValue}px)`
```

**Adjust animation timing:**
```typescript
// In constants.ts
export const ANIMATION_DURATIONS = {
  fast: 0.15,    // Quick interactions
  normal: 0.25,  // Standard transitions  
  slow: 0.35,    // Scroll-driven animations
  verySlow: 0.5, // Large content changes
};
```

### Theme Customization

**Colors**: Update CSS custom properties in `/src/app/globals.css`
**Typography**: Modify font settings in `/src/lib/constants.ts`
**Shadows**: Adjust shadow definitions in Tailwind config

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` new features
- `fix:` bug fixes  
- `docs:` documentation
- `style:` formatting
- `refactor:` code restructuring
- `test:` test additions
- `chore:` maintenance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions, issues, or customization help:
- **Email**: hello@alexcostea.com
- **LinkedIn**: [linkedin.com/in/alexcostea](https://linkedin.com/in/alexcostea)
- **Issues**: [GitHub Issues](https://github.com/alexcostea/landing-page/issues)

---

**Built with ❤️ using Next.js 14, TypeScript, Tailwind CSS, and Framer Motion**


