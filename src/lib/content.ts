export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface MediaItem {
  src: string;
  poster?: string;
  alt: string;
  type: 'image' | 'video';
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2';
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  media: MediaItem;
  tags: string[];
  featured?: boolean;
}

export interface PricingPlan {
  id: string;
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaUrl: string;
  badge?: string;
  highlighted?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  quote: string;
  rating?: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string; // Icon name from Icon component
}

export interface SiteContent {
  site: {
    name: string;
    description: string;
    url: string;
    nav: NavLink[];
  };
  hero: {
    kicker: string;
    heading: string;
    subheading: string;
    ctaPrimary: {
      label: string;
      href: string;
    };
    ctaSecondary: {
      label: string;
      href: string;
    };
    backgroundVideo: {
      src: string;
      poster: string;
      alt: string;
    };
  };
  about: {
    kicker: string;
    title: string;
    description: string;
    content: string; // Rich text content
    stats: {
      label: string;
      value: string;
    }[];
  };
  portfolio: {
    kicker: string;
    title: string;
    description: string;
    items: PortfolioItem[];
  };
  pricing: {
    kicker: string;
    title: string;
    description: string;
    plans: PricingPlan[];
  };
  testimonials: {
    kicker: string;
    title: string;
    description: string;
    items: Testimonial[];
  };
  faq: {
    kicker: string;
    title: string;
    description: string;
    items: FAQItem[];
  };
  newsletter: {
    kicker: string;
    title: string;
    description: string;
    placeholderText: string;
    ctaLabel: string;
    formAction: string; // TODO: Replace with actual endpoint
  };
  footer: {
    description: string;
    links: {
      title: string;
      items: NavLink[];
    }[];
    socials: SocialLink[];
    copyright: string;
  };
}

// Main content configuration
export const siteContent: SiteContent = {
  site: {
    name: 'Alex Costea',
    description: 'Professional content creator and digital storyteller specializing in video production, photography, and brand collaborations.',
    url: 'https://alexcostea.com', // TODO: Update with actual domain
    nav: [
      { label: 'Acasă', href: '#hero' },
      { label: 'Despre', href: '#about' },
      { label: 'Portofoliu', href: '#portfolio' },
      { label: 'Cursuri', href: '#pricing' },
    ],
  },
  hero: {
    kicker: 'Content Creator & Digital Storyteller',
    heading: 'Bringing Your Vision to Life Through Compelling Content',
    subheading: 'Professional video production, photography, and brand collaborations that captivate audiences and drive engagement across all platforms.',
    ctaPrimary: {
      label: 'Cursuri',
      href: '#pricing',
    },
    ctaSecondary: {
      label: 'Portofoliu',
      href: '#portfolio',
    },
    backgroundVideo: {
      src: '/assets/videos/hero-background.mp4', // TODO: Add actual video
      poster: '/assets/videos/hero-background-poster.jpg', // TODO: Add actual poster
      alt: 'Alex Costea creating content in studio',
    },
  },
  about: {
    kicker: 'About Me',
    title: 'Transformă ideile\nîn povești vizuale\ncare rămân',
    description: 'Sunt Alexandru Costea, creator de conținut video și strateg de storytelling vizual. Ajut brandurile să transforme ideile în experiențe memorabile prin puterea imaginii în mișcare.',
    content: `De la campanii de brand și spoturi publicitare, până la documentare și content personal, scopul meu e simplu: să transform orice idee în storytelling memorabil. Ca parte din echipa CROProject creez povești vizuale complete – filmare, montaj, efecte vizuale – tot ce ai nevoie ca să creezi o experiență vizuală de top.`,
    stats: [
      { label: 'Projects Completed', value: '200+' },
      { label: 'Brands Collaborated', value: '50+' },
      { label: 'Years Experience', value: '5+' },
      { label: 'Content Pieces Created', value: '1000+' },
    ],
  },
  portfolio: {
    kicker: 'Featured Work',
    title: 'My Work',
    description: 'A showcase of recent collaborations and creative projects across different industries and platforms.',
    items: [
      {
        id: 'iphone-campaign',
        title: 'iPhone 16 Pro Campaign',
        description: 'Premium lifestyle photography and video content showcasing the latest iPhone features in real-world scenarios.',
        media: {
          src: '/Alex - iPhone 16 Pro_web.mp4',
          poster: '/assets/images/iphone-campaign-poster.jpg', // TODO: Generate poster
          alt: 'iPhone 16 Pro campaign video',
          type: 'video',
          aspectRatio: '16/9',
        },
        tags: ['Video Production', 'Product Photography', 'Tech'],
        featured: true,
      },
      {
        id: 'armani-collaboration',
        title: 'Armani Fashion Collaboration',
        description: 'Elegant fashion photography and videography for luxury brand collaboration featuring latest collections.',
        media: {
          src: '/ALEX x ARMANI_web.mp4',
          poster: '/assets/images/armani-poster.jpg', // TODO: Generate poster
          alt: 'Armani fashion collaboration video',
          type: 'video',
          aspectRatio: '16/9',
        },
        tags: ['Fashion', 'Luxury Brands', 'Photography'],
        featured: true,
      },
      {
        id: 'trussardi-project',
        title: 'Trussardi Creative Direction',
        description: 'Creative direction and content production for Trussardi brand campaign focusing on contemporary luxury.',
        media: {
          src: '/Alex x Trussardi_draft001 2_web.mp4',
          poster: '/assets/images/trussardi-poster.jpg', // TODO: Generate poster
          alt: 'Trussardi creative direction video',
          type: 'video',
          aspectRatio: '16/9',
        },
        tags: ['Creative Direction', 'Luxury', 'Brand Campaign'],
      },
      {
        id: 'spill-tea-series',
        title: 'Spill The Tea Content Series',
        description: 'Behind-the-scenes and lifestyle content creation for popular social media series with engaging storytelling.',
        media: {
          src: '/SpillTheTea_web.mp4',
          poster: '/assets/images/spill-tea-poster.jpg', // TODO: Generate poster
          alt: 'Spill The Tea content series',
          type: 'video',
          aspectRatio: '16/9',
        },
        tags: ['Social Media', 'Lifestyle', 'Content Series'],
      },
      {
        id: 'portfolio-showcase',
        title: 'Personal Brand Showcase',
        description: 'A comprehensive video presentation highlighting versatility and range across different content creation styles.',
        media: {
          src: '/video prezentare_landscape_web.mp4',
          poster: '/assets/images/presentation-poster.jpg', // TODO: Generate poster
          alt: 'Personal brand showcase video',
          type: 'video',
          aspectRatio: '16/9',
        },
        tags: ['Personal Brand', 'Showcase', 'Portfolio'],
      },
    ],
  },
  pricing: {
    kicker: 'Services',
    title: 'Content Creation Services',
    description: 'Flexible pricing options to fit your content creation needs, from individual shoots to comprehensive brand campaigns.',
    plans: [
      {
        id: 'essential',
        title: 'Essential Package',
        price: '$2,500',
        period: 'per project',
        description: 'Perfect for small businesses and individual creators looking for high-quality content.',
        features: [
          '1-day photo/video shoot',
          '10-15 final edited photos',
          '2-3 short-form videos (60s max)',
          'Basic color grading and editing',
          'Online gallery delivery',
          '2 revision rounds',
        ],
        ctaLabel: 'Get Started',
        ctaUrl: '#newsletter',
        badge: 'Most Popular',
        highlighted: false,
      },
      {
        id: 'professional',
        title: 'Professional Package',
        price: '$5,000',
        period: 'per project',
        description: 'Comprehensive content creation for established brands and growing businesses.',
        features: [
          '2-day photo/video production',
          '25-30 final edited photos',
          '5-7 videos (mix of short and long-form)',
          'Advanced editing and post-production',
          'Multiple format deliverables',
          'Usage rights for 1 year',
          'Unlimited revision rounds',
          'Rush delivery available',
        ],
        ctaLabel: 'Choose Professional',
        ctaUrl: '#newsletter',
        badge: 'Best Value',
        highlighted: true,
      },
      {
        id: 'enterprise',
        title: 'Enterprise Package',
        price: '$10,000+',
        period: 'per campaign',
        description: 'Full-service content creation and campaign management for large-scale projects.',
        features: [
          'Multi-day production schedule',
          'Unlimited photo deliverables',
          'Full video production suite',
          'Creative direction and strategy',
          'Multiple location shoots',
          'Brand asset creation',
          'Extended usage rights',
          'Priority support and consultation',
          'Custom deliverable formats',
        ],
        ctaLabel: 'Discuss Project',
        ctaUrl: '#newsletter',
        highlighted: false,
      },
    ],
  },
  testimonials: {
    kicker: 'Client Reviews',
    title: 'What Clients Say',
    description: 'Hear from the brands and creators who have worked with me on their content creation journey.',
    items: [
      {
        id: 'criski',
        name: 'Criski',
        role: 'Cursant ReelUp',
        company: 'Masterclass De la Idee la Reel',
        avatar: '/assets/images/avatar-criski.jpg',
        quote: "Să știi că mă bucur foarte mult pentru că ai făcut acest curs. Te urmăresc de mult timp și ceea ce faci e wow, îmi doresc să pot să învăț de la tine și mă bucur că acum pot. La curs mă simt bine, simt că e o discuție între prieteni, sunt sigur că am ce învăța și de la ceilalți, nu doar de la tine. Învățăm fiecare de la fiecare și toți de la tine.",
        rating: 5,
      },
      {
        id: 'amanda',
        name: 'Amanda',
        role: 'Cursant ReelUp',
        company: 'Masterclass De la Idee la Reel',
        avatar: '/assets/images/avatar-amanda.jpg',
        quote: "Primul curs a fost super bine structurat, perfect ca introducere! Îmi place mult că suntem o grupă micuță, e mult mai ușor să schimbăm idei și păreri chiar și în timpul discuțiilor. Good goooood job, abia aștept ce urmează!",
        rating: 5,
      },
      {
        id: 'alexandru',
        name: 'Alexandru',
        role: 'Cursant ReelUp',
        company: 'Masterclass De la Idee la Reel',
        avatar: '/assets/images/avatar-alexandru.jpg',
        quote: "Super primul curs. Multă informație esențială, bine structurată. Ah, și foarte interactiv, ceea ce e esențial și face lucrurile mai dinamice, nu e doar un alt curs monoton.",
        rating: 5,
      },
      {
        id: 'silvia',
        name: 'Silvia',
        role: 'Cursant ReelUp',
        company: 'Masterclass De la Idee la Reel',
        avatar: '/assets/images/avatar-silvia.jpg',
        quote: "Am intrat în această etapă cu brațele deschise și cu încrederea că voi învăța lucruri valoroase. Pot spune că orice așteptări am avut, le-ai bifat pe toate și chiar le-ai depășit. Ador faptul că tot ce se întâmplă în cadrul cursului se simte natural, vibe-ul este relaxat, dar în același timp totul este foarte bine organizat. În plus, m-am bucurat mult să descopăr un grup de oameni faini și dedicați. Abia aștept următoarele sesiuni!",
        rating: 5,
      },
      {
        id: 'david',
        name: 'David',
        role: 'Cursant ReelUp',
        company: 'Masterclass De la Idee la Reel',
        avatar: '/assets/images/avatar-david.jpg',
        quote: "Mulțumesc că-mi dai curaj să visez măreț.",
        rating: 5,
      },
    ],
  },
  faq: {
    kicker: 'FAQ',
    title: 'Întrebări Frecvente',
    description: 'Tot ce trebuie să știi despre cursurile și proiectele de creare de conținut.',
    items: [
      {
        id: 'timeline',
        question: 'Care este durata tipică a unui curs?',
        answer: 'Durata cursurilor variază în funcție de nivel: ReelUp durează 4 săptămâni, Masterclass "De la Idee la Reel" durează 8 săptămâni, iar Newbie este conținut continuu pe Instagram. Toate cursurile includ acces pe viață la materiale.',
      },
      {
        id: 'locations',
        question: 'Pot învăța de oriunde?',
        answer: 'Da! Toate cursurile sunt online și poți învăța în ritmul tău, de oriunde. Ai nevoie doar de un telefon sau laptop și o conexiune la internet. Sesiunile live se înregistrează pentru cei care nu pot participa în direct.',
      },
      {
        id: 'usage-rights',
        question: 'Ce echipament am nevoie?',
        answer: 'Pentru ReelUp ai nevoie doar de un telefon și un laptop. Pentru Masterclass recomandăm un telefon performant sau o cameră și acces la DaVinci Resolve (gratuit). Nu ai nevoie de echipament profesional pentru a începe.',
      },
      {
        id: 'equipment',
        question: 'Primesc certificat la finalul cursului?',
        answer: 'Da! La finalul cursului Masterclass primești un certificat de absolvire. De asemenea, ai acces pe viață la comunitatea privată de creatori și la toate actualizările viitoare ale materialelor.',
      },
      {
        id: 'revisions',
        question: 'Primesc feedback personalizat?',
        answer: 'Da! Toți participanții primesc feedback personalizat pe proiectele lor. În funcție de pachet, ai acces la sesiuni de review, feedback în comunitate și sfaturi adaptate nevoilor tale specifice.',
      },
      {
        id: 'formats',
        question: 'Când începe următorul curs?',
        answer: 'Pentru informații despre data de start a următorului Masterclass sau pentru întrebări despre cursuri, abonează-te la newsletter. Acolo anunțăm toate edițiile noi și ofertele speciale.',
      },
    ],
  },
  newsletter: {
    kicker: 'Get In Touch',
    title: 'Ready to Create Something Amazing?',
    description: 'Let\'s discuss your project and bring your creative vision to life. Send me your details and I\'ll get back to you within 24 hours.',
    placeholderText: 'Enter your email address',
    ctaLabel: 'Start Your Project',
    formAction: '/api/contact', // TODO: Implement contact form endpoint
  },
  footer: {
    description: 'Professional content creator and digital storyteller based in [Location]. Specializing in brand collaborations, video production, and visual storytelling.',
    links: [
      {
        title: 'Services',
        items: [
          { label: 'Video Production', href: '#portfolio' },
          { label: 'Photography', href: '#portfolio' },
          { label: 'Brand Collaborations', href: '#portfolio' },
          { label: 'Creative Direction', href: '#portfolio' },
        ],
      },
      {
        title: 'Company',
        items: [
          { label: 'About', href: '#about' },
          { label: 'Portfolio', href: '#portfolio' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Contact', href: '#newsletter' },
        ],
      },
      {
        title: 'Resources',
        items: [
          { label: 'FAQ', href: '#faq' },
          { label: 'Process', href: '#about' },
          { label: 'Testimonials', href: '#testimonials' },
          { label: 'Blog', href: '#', external: true },
        ],
      },
    ],
    socials: [
      { label: 'Instagram', href: 'https://instagram.com/alexcostea', icon: 'instagram' },
      { label: 'Twitter', href: 'https://twitter.com/alexcostea', icon: 'twitter' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/alexcostea', icon: 'linkedin' },
      { label: 'GitHub', href: 'https://github.com/alexcostea', icon: 'github' },
    ],
    copyright: '© 2024 Alex Costea. All rights reserved.',
  },
};

