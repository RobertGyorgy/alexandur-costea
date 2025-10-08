'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Section } from '@/components/ui/Section';

// Video list - all vertical videos from public folder
const VERTICAL_VIDEOS = [
  {
    id: 1,
    src: '/Alex - iPhone 16 Pro_web.mp4',
    title: 'iPhone 16 Pro',
    description: 'Prezentare produs',
    client: 'Apple Inc.',
    role: 'Director Creativ & Cineast',
    details: 'O călătorie vizuală cuprinzătoare care prezintă caracteristicile revoluționare ale iPhone 16 Pro. Acest proiect s-a concentrat pe captarea esenței inovației prin cinematografie dinamică și storytelling artistic.',
    achievements: 'Am creat o narațiune convingătoare care evidențiază tehnologia de ultimă generație a dispozitivului, menținând în același timp o conexiune emoțională cu publicul. Campania a îmbinat cu succes precizia tehnică cu expresia creativă.',
    techniques: 'Tehnici avansate de color grading, motion tracking și framing cinematic au fost folosite pentru a crea o experiență vizuală premium care reflectă limbajul sofisticat de design al produsului.'
  },
  {
    id: 2,
    src: '/Alex x Arman _elixir_web.mp4',
    title: 'Armani Elixir',
    description: 'Campanie parfum',
    client: 'Giorgio Armani Beauty',
    role: 'Videograf Principal & Povestitor Vizual',
    details: 'O campanie elegantă și sofisticată de parfum care captează esența luxoasă a Armani Elixir. Proiectul îmbină estetica haute couture cu cinematografia modernă pentru a crea o experiență senzorială imersivă.',
    achievements: 'Am tradus cu succes profilul olfactiv al parfumului într-un limbaj vizual, creând o narațiune emoțională care rezonează cu poziționarea premium a brandului. Campania a obținut un engagement excepțional pe multiple platforme.',
    techniques: 'Am utilizat capturi slow-motion, configurații dramatice de iluminare și mișcări atent coreografiate pentru a evoca calitățile senzuale și misterioase ale parfumului. Munca de post-producție s-a concentrat pe îmbunătățirea esteticii golden hour.'
  },
  {
    id: 3,
    src: '/ALEX x ARMANI_web.mp4',
    title: 'Colecția Armani',
    description: 'Editorial fashion',
    client: 'Armani Fashion House',
    role: 'Videograf Fashion & Director Editorial',
    details: 'O piesă editorială high-fashion care celebrează eleganța intemporală a celei mai recente colecții Armani. Acest proiect îmbină principiile fotografiei editoriale cu storytelling-ul video dinamic pentru a crea o narațiune fashion modernă.',
    achievements: 'Am dezvoltat un limbaj vizual care onorează moștenirea Armani în timp ce împinge granițele creative. Editorialul a primit recunoaștere pentru abordarea sa inovatoare a videografiei fashion și atenția la detaliile textile.',
    techniques: 'Am folosit adâncime de câmp redusă, mișcări precise de cameră și compoziție strategică pentru a evidenția detaliile vestimentare și fluxul țesăturilor. Color grading-ul a subliniat paleta sofisticată de culori a colecției.'
  },
  {
    id: 4,
    src: '/Alex x Trussardi_draft001 2_web.mp4',
    title: 'Trussardi',
    description: 'Colaborare brand de lux',
    client: 'Trussardi Group',
    role: 'Povestitor Brand & Lead Creativ',
    details: 'O colaborare prestigioasă cu brandul italian de lux Trussardi, prezentând angajamentul lor față de meșteșug și design inemporal. Acest proiect explorează intersecția dintre moștenire și stilul contemporan.',
    achievements: 'Am creat o narațiune brand convingătoare care face legătura între meșteșugul tradițional italian și stilul de viață luxury modern. Campania a poziționat cu succes identitatea unică a Trussardi pe piața competitivă a luxului.',
    techniques: 'Am combinat framing arhitectural cu close-up-uri intime pentru a prezenta detaliile produsului. Design-ul de iluminare a subliniat materialele și texturile luxoase, menținând estetica sofisticată a brandului.'
  },
  {
    id: 5,
    src: '/Alex_Franui_draft001_web.mp4',
    title: 'Franui',
    description: 'Direcție creativă',
    client: 'Franui Brand',
    role: 'Director Creativ & Strateg de Conținut',
    details: 'Un proiect inovator de direcție creativă care explorează noi posibilități de storytelling prin tehnici vizuale experimentale. Această lucrare împinge limitele conținutului brand convențional.',
    achievements: 'Am dezvoltat o identitate vizuală unică care distinge brandul în segmentul său de piață. Abordarea creativă a primit recunoaștere în industrie pentru metodele sale îndrăznețe și neconvenționale de storytelling.',
    techniques: 'Am integrat lucrul experimental cu camera cu ritmuri de editare contemporane. Post-producția a încorporat efecte vizuale subtile pentru a îmbunătăți narațiunea fără a copleși momentele autentice.'
  },
  {
    id: 6,
    src: '/BTS SPILL THE. TEA_web.mp4',
    title: 'Spill The Tea BTS',
    description: 'În culise',
    client: 'Proiect Independent',
    role: 'Regizor Documentar',
    details: 'O privire autentică în culisele procesului creativ de producție a "Spill The Tea". Această piesă în stil documentar dezvăluie dedicarea, colaborarea și viziunea artistică care dau viață unui proiect.',
    achievements: 'Am capturat momente autentice de colaborare creativă și rezolvare de probleme, oferind perspective asupra fluxului de producție. Conținutul BTS a generat engagement semnificativ din partea audienței și a adăugat valoare proiectului principal.',
    techniques: 'Filmare în stil documentar cu lucru manual cu camera și iluminare naturală pentru a menține autenticitatea. Post-producție minimală pentru a păstra natura brută și nefiltrată a procesului creativ.'
  },
  {
    id: 7,
    src: '/SpillTheTea_web.mp4',
    title: 'Spill The Tea',
    description: 'Producție completă',
    client: 'Conținut Original',
    role: 'Producător, Regizor & Editor',
    details: 'O producție completă de la concept la livrare finală, demonstrând abilități comprehensive de storytelling. Acest proiect demonstrează control creativ end-to-end și expertiză multidisciplinară în producția video.',
    achievements: 'Am gestionat cu succes toate aspectele producției incluzând planificarea pre-producției, direcția pe set și finalizarea post-producției. Piesa finală a avut succes viral și a stabilit o prezență puternică de brand.',
    techniques: 'Pipeline complet de producție incluzând scripting, scouting de locații, direcție de talente și editare avansată. Color grading și sound design au fost realizate meticulos pentru a crea un rezultat profesional și rafinat.'
  }
];

export function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  // Parallax effects
  const phoneY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const cardY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const phoneRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  
  // Enhanced parallax for description card content
  const cardContentY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const cardContentScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const cardContentRotate = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % VERTICAL_VIDEOS.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + VERTICAL_VIDEOS.length) % VERTICAL_VIDEOS.length);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Reset video when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPlaying) {
        videoRef.current.play();
      }
    }
  }, [currentIndex, isMuted, isPlaying]);

  // Mobile detection
  useEffect(() => {
    setIsMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentVideo = VERTICAL_VIDEOS[currentIndex];

  // Swipe variants for video transitions
  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Text animation variants
  const textVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <Section
      id="portfolio"
      spacing="xl"
      aria-labelledby="portfolio-heading"
      ref={sectionRef}
      className="bg-[#E5E4E2] relative overflow-hidden"
    >
      {/* Background Text Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
        <div className="absolute inset-0" style={{ transform: 'rotate(45deg) scale(1.5)' }}>
          {[...Array(30)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex whitespace-nowrap"
              style={{
                marginTop: rowIndex === 0 ? '-10%' : '0',
                marginBottom: '0.25rem'
              }}
            >
              {[...Array(12)].map((_, colIndex) => (
                <span
                  key={colIndex}
                  className="font-garnet text-[#FE5F01] text-[4rem] md:text-[6rem] font-bold mx-4"
                >
                  MY WORK
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop & Mobile Layout */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-16 gap-8 relative z-10">
        {/* Left Side: Phone Container with Overlaid Buttons */}
        <motion.div 
          className="relative lg:w-1/2 flex justify-center" 
          style={{ 
            y: isMounted && !isMobile ? phoneY : 0, 
            rotateZ: isMounted && !isMobile ? phoneRotate : 0 
          }}
        >
          {/* Phone Frame Wrapper for Button Positioning */}
          <div className="relative">
            {/* iPhone Buttons - Right Side (Power/Lock Button) - Outside Frame */}
            <div className="absolute -right-[3px] top-32 w-[3px] h-16 bg-accent rounded-r-sm shadow-lg z-30" />

            {/* iPhone Buttons - Left Side - Outside Frame */}
            {/* Silent/Do Not Disturb Switch */}
            <div className="absolute -left-[3px] top-20 w-[3px] h-8 bg-accent rounded-l-sm shadow-lg z-30" />
            {/* Volume Up Button */}
            <div className="absolute -left-[3px] top-36 w-[3px] h-12 bg-accent rounded-l-sm shadow-lg z-30" />
            {/* Volume Down Button */}
            <div className="absolute -left-[3px] top-52 w-[3px] h-12 bg-accent rounded-l-sm shadow-lg z-30" />

            {/* Phone Frame */}
            <div className="relative w-[300px] h-[600px] bg-[#102837] border-8 border-[#102837]/30 rounded-[3rem] shadow-[0_0_40px_rgba(16,40,55,0.4)] overflow-hidden">
            {/* Notch - Black Pill */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10 shadow-soft" />

            {/* Video Content Area */}
            <div className="relative w-full h-full overflow-hidden bg-[#0a1620]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  {/* Video */}
                  <video
                    ref={videoRef}
                    key={currentVideo.id}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={currentVideo.src} type="video/mp4" />
                  </video>

                  {/* Video Info Overlay - Glass Card with Controls */}
                  <div className="absolute bottom-6 left-4 right-4">
                    <div className="backdrop-blur-lg bg-bg-elev/90 border border-line rounded-2xl p-4 shadow-soft">
                      <div className="flex items-start justify-between gap-3">
                        {/* Text Content */}
                        <div className="flex-1">
                          <h3 className="!text-white font-bold text-lg mb-1">
                            {currentVideo.title}
                          </h3>
                          <p className="!text-white/80 text-sm">
                            {currentVideo.description}
                          </p>
                        </div>

                        {/* Video Controls - Right Side */}
                        <div className="flex flex-row gap-2">
                          {/* Play/Pause Button */}
                          <button
                            onClick={togglePlayPause}
                            className="w-10 h-10 rounded-full backdrop-blur-lg bg-transparent border-2 border-white flex items-center justify-center hover:bg-white/10 transition-all duration-300 shadow-soft"
                            aria-label={isPlaying ? 'Pause video' : 'Play video'}
                          >
                            {isPlaying ? (
                              <svg className="w-4 h-4 !text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 !text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>

                          {/* Mute/Unmute Button */}
                          <button
                            onClick={toggleMute}
                            className="w-10 h-10 rounded-full backdrop-blur-lg bg-transparent border-2 border-white flex items-center justify-center hover:bg-white/10 transition-all duration-300 shadow-soft"
                            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                          >
                            {isMuted ? (
                              <svg className="w-4 h-4 !text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 !text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Counter */}
                  <div className="absolute top-8 right-4 px-3 py-1 bg-bg/60 backdrop-blur-sm rounded-full">
                    <span className="!text-white text-sm font-medium">
                      {currentIndex + 1} / {VERTICAL_VIDEOS.length}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Buttons - Overlaid on Right Side */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-20">
            {/* Up Button */}
            <button
              onClick={handlePrevious}
              className="w-14 h-14 rounded-full backdrop-blur-lg bg-[#FE5F01] border-2 border-white flex items-center justify-center hover:bg-[#ff7a2e] transition-all duration-300 shadow-[0_0_20px_rgba(254,95,1,0.4)]"
              aria-label="Previous video"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>

            {/* Down Button */}
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full backdrop-blur-lg bg-[#FE5F01] border-2 border-white flex items-center justify-center hover:bg-[#ff7a2e] transition-all duration-300 shadow-[0_0_20px_rgba(254,95,1,0.4)]"
              aria-label="Next video"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          </div>
        </motion.div>

        {/* Right Side: Unified Content Card (Desktop Only) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex lg:w-1/2 flex-col justify-center"
          style={{ 
            y: isMounted && !isMobile ? cardY : 0,
            scale: isMounted && !isMobile ? cardContentScale : 1,
            rotateZ: isMounted && !isMobile ? cardContentRotate : 0
          }}
        >
          {/* Unified Project Info Card with Animated Text */}
          <div className="relative backdrop-blur-xl border-4 border-[#102837]/20 rounded-3xl p-7 shadow-[0_0_60px_rgba(16,40,55,0.3)] overflow-hidden h-[600px]" style={{ backgroundColor: '#102837' }}>
            {/* Text content with animations */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="space-y-5"
                style={{ 
                  y: isMounted && !isMobile ? cardContentY : 0
                }}
              >
                {/* Header with title and counter */}
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#E5E4E2]/20">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#E5E4E2] mb-1">
                      {currentVideo.title}
                    </h3>
                    <p className="text-[#FE5F01] text-xs font-medium uppercase tracking-wider">
                      {currentVideo.description}
                    </p>
                  </div>
                  <span className="text-[#E5E4E2]/70 text-xs font-medium px-2 py-1 bg-[#E5E4E2]/10 rounded-full">
                    {currentIndex + 1} / {VERTICAL_VIDEOS.length}
                  </span>
                </div>

                {/* Client and Role */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#E5E4E2]/50 mb-1">Client</p>
                    <p className="text-[#E5E4E2] font-medium text-sm">{currentVideo.client}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#E5E4E2]/50 mb-1">Role</p>
                    <p className="text-[#E5E4E2] font-medium text-sm">{currentVideo.role}</p>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#E5E4E2]/50 mb-1">Project Overview</p>
                    <p className="text-[#E5E4E2]/80 leading-relaxed text-sm">
                      {currentVideo.details}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#E5E4E2]/50 mb-1">Key Achievements</p>
                    <p className="text-[#E5E4E2]/80 leading-relaxed text-sm">
                      {currentVideo.achievements}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#E5E4E2]/50 mb-1">Techniques & Approach</p>
                    <p className="text-[#E5E4E2]/80 leading-relaxed text-sm">
                      {currentVideo.techniques}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

