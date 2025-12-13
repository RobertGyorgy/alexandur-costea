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
    heading: 'O nouă perspectivă pentru orice: filmmaker, creator de conținut, influencer, antreprenor etc.',
    subheading: 'Hai să transformăm împreună ideile în storytelling autentic, cu impact viral pe Reels și pe retelele sociale.',
    ctaPrimary: {
      label: 'Descoperă cursurile',
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
    title: 'Te învăț sau te ajut\nsă creezi conținut\nvideo creativ:\nde la Idee la Reel.',
    description: 'Sunt Alexandru Costea, director de imagine, creator de conținut și co-fondator CROProject. Lucrez în industria cinematografică de peste zece ani și fac parte din foarte multe proiecte creative pentru multe branduri mari din Romania. Sunt pasionat de artele audio-vizuale care transmit emoție, claritate și reacție. De la concept și filmare, până la montaj, efecte vizuale, sound design și colorizare, creez materiale video dinamice, creative și cu impact real.',
    content: `În ultimii ani, am ales să îmi duc experiența din producție și în zona educației, prin cursuri și programe dedicate creatorilor. Așa a apărut primul meu masterclass, „De la Idee la Reel", care s-a bucurat de un succes real. Cred în învățarea aplicată, în ghidaj concret și în rezultate obținute prin practică, nu doar la întâmplare.\n\nScopul meu merge mai departe de a crea video-uri. Vreau să construiesc cea mai mare comunitate de creatori de conținut vizual din România, un spațiu în care învățăm împreună, schimbăm idei, primim feedback real și ne susținem dezvoltarea ca profesioniști. Nu doar un curs, ci un loc în care creativitatea devine colaborare, nu competiție.`,
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
        role: 'Cursant prima ediție - Masterclass de la Idee la Reel',
        company: '',
        avatar: '/assets/images/avatar-criski.jpg',
        quote: "Să știi că mă bucur foarte mult pentru că ai făcut acest curs. Te urmăresc de mult timp și ceea ce faci e wow, îmi doresc să pot să învăț de la tine și mă bucur că acum pot. La curs mă simt bine, simt că e o discuție între prieteni, sunt sigur că am ce învăța și de la ceilalți, nu doar de la tine. Învățăm fiecare de la fiecare și toți de la tine.",
        rating: 5,
      },
      {
        id: 'amada',
        name: 'Amada',
        role: 'Cursant prima ediție - Masterclass de la Idee la Reel',
        company: '',
        avatar: '/assets/images/avatar-amada.jpg',
        quote: "Primul curs a fost super bine structurat, perfect ca introducere! Îmi place mult că suntem o grupă micuță, e mult mai ușor să schimbăm idei și păreri chiar și în timpul discuțiilor. Good goooood job, abia aștept ce urmează!",
        rating: 5,
      },
      {
        id: 'alexandru',
        name: 'Alexandru',
        role: 'Cursant prima ediție - Masterclass de la Idee la Reel',
        company: '',
        avatar: '/assets/images/avatar-alexandru.jpg',
        quote: "Super primul curs. Multă informație esențială, bine structurată. Ah, și foarte interactiv, ceea ce e esențial și face lucrurile mai dinamice, nu e doar un alt curs monoton.",
        rating: 5,
      },
      {
        id: 'silvia',
        name: 'Silvia',
        role: 'Cursant prima ediție - Masterclass de la Idee la Reel',
        company: '',
        avatar: '/assets/images/avatar-silvia.jpg',
        quote: "Am intrat în această etapă cu brațele deschise și cu încrederea că voi învăța lucruri valoroase. Pot spune că orice așteptări am avut, le-ai bifat pe toate și chiar le-ai depășit. Ador faptul că tot ce se întâmplă în cadrul cursului se simte natural, vibe-ul este relaxat, dar în același timp totul este foarte bine organizat. În plus, m-am bucurat mult să descopăr un grup de oameni faini și dedicați. Abia aștept următoarele sesiuni!",
        rating: 5,
      },
      {
        id: 'david',
        name: 'David',
        role: 'Cursant prima ediție - Masterclass de la Idee la Reel',
        company: '',
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
        question: 'Cât timp durează un curs?',
        answer: 'Durata diferă în funcție de program: ReelUp → 6 module online, pe care le parcurgi în ritmul tău. Masterclass → 8 module live, desfășurate pe parcursul a 8 săptămâni, câte o întâlnire săptămânală. Ambele programe includ acces pe viață la materialele video + înregistrare module.',
      },
      {
        id: 'locations',
        question: 'Pot învăța de oriunde?',
        answer: 'Da. Toate lecțiile pot fi urmărite online, de pe laptop sau telefon. Sesiunile live se înregistrează pentru cei care vor rata o întâlnire. Tot ce ai nevoie este conexiune la internet și mindset creativ.',
      },
      {
        id: 'equipment',
        question: 'Am nevoie de echipament profesional?',
        answer: 'Nu. Poți începe doar cu telefonul și un laptop. În acest curs înveți principiile vizuale, nu doar cum să folosești o cameră. Cred cu tărie că accesul la echipament profesionist nu îți garantează creativitate și uneori chiar o limitează. Scopul este să îți formezi o bază solidă, astfel încât să poți crea cu orice instrument ai la îndemână, iar apoi să evoluezi spre echipament mai avansat doar dacă simți nevoia.',
      },
      {
        id: 'certificate',
        question: 'Primesc certificat la finalul cursului?',
        answer: 'Da. Primești certificat digital la final, după finalizarea cursului. Pentru Masterclass, certificatul marchează participarea la sesiuni live și finalizarea proiectului propriu.',
      },
      {
        id: 'feedback',
        question: 'Primesc feedback personalizat?',
        answer: 'Da, dar în funcție de program: ReelUp → feedback general în comunitate. Masterclass → feedback personalizat pe proiectul tău și feedback general în comunitate.',
      },
      {
        id: 'software',
        question: 'Ce software folosim în curs?',
        answer: 'Lucrăm în principal în DaVinci Resolve, dar vei putea aplica același teorie în orice program de editare. Alegem software-ul în funcție de obiectiv, nu invers.',
      },
      {
        id: 'beginner',
        question: 'Sunt începător. Este potrivit pentru mine?',
        answer: 'Da, dacă alegi ReelUp. Este creat ca fundație pentru cei la început. Masterclass-ul este recomandat dacă ai deja o minimă experiență și vrei să evoluezi profesional.',
      },
      {
        id: 'experienced',
        question: 'Creez deja conținut. Merită să fac cursul?',
        answer: 'Da, mai ales Masterclass-ul. Programul nu îți oferă doar tehnică, ci proces complet de la concept, bazele filmării și tehnici avansate de montaj.',
      },
      {
        id: 'access',
        question: 'Pot să revin asupra lecțiilor după ce le termin?',
        answer: 'Da. Ai acces pe viață la materialele video.',
      },
      {
        id: 'next-edition',
        question: 'Când începe următoarea ediție?',
        answer: 'Masterclass-ul se organizează în aproximativ 1-2 ediții pe an. Te poți înscrie pe lista de notificări pentru a primi prioritate. ReelUp este disponibil oricând.',
      },
      {
        id: 'time',
        question: 'Ce se întâmplă dacă nu am timp acum?',
        answer: 'Poți urmări lecțiile în ritmul tău și ai acces le materiale oricând. Recomandarea mea este să-l începi când ești pregătit.',
      },
      {
        id: 'results',
        question: 'Ce rezultate pot obține?',
        answer: 'Treci de la "filmez ceva și văd eu ce iese" la materiale video gândite cap-coadă: cu concept clar, execuție curată și montaj care captează atenția. Creezi cu sens, nu la întâmplare.',
      },
      {
        id: 'different',
        question: 'Am mai făcut cursuri și nu m-au ajutat. Ce e diferit aici?',
        answer: 'Nu înveți doar teorie. Lucrăm pe un proces real, cu pași clari, exemple concrete și feedback aplicat. Scopul este să creezi un proiect final la standard de industrie. În plus, nu înveți doar cum să aplici regulile, ci și de ce funcționează, astfel încât ulterior să le poți depăși intenționat. De aici apar rezultatele cu adevărat creative și stilul tău personal.',
      },
      {
        id: 'talent',
        question: 'Este nevoie să fiu talentat sau creativ?',
        answer: 'Nu este nevoie să fii talentat sau „născut creativ". Talentul ajută, dar progresul adevărat vine din practică, exercițiu și un proces clar. Cursul te ajută să devii creativ prin structură și aplicare, nu prin noroc sau inspirație întâmplătoare. Important este să îți dai voie să experimentezi, să greșești și să înveți din fiecare încercare. Creativitatea se dezvoltă în timp, odată cu curajul de a repeta, a învăța și evolua.',
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

