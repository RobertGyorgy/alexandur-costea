'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Section } from '@/components/ui/Section';

// YouTube IFrame API types
interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setPlaybackRate: (rate: number) => void;
  setPlaybackQuality: (quality: string) => void;
  getPlayerState: () => number;
}

interface YouTubePlayerEvent {
  target: YouTubePlayer;
}

interface YouTubeWindow extends Window {
  YT?: {
    Player: new (elementId: string, config: {
      videoId: string;
      playerVars: Record<string, number | string>;
      events?: {
        onReady?: (event: YouTubePlayerEvent) => void;
      };
    }) => YouTubePlayer;
  };
}

// Video list - all vertical videos from public folder
const VERTICAL_VIDEOS = [
  {
    id: 1,
    youtubeId: 'DIYWlHpiI-4',
    title: 'iPhone 16 PRO',
    description: 'Prezentare produs',
    client: 'Apple',
    role: 'Director creativ, acting și editor',
    details: 'Un concept vizual dinamic non-narativ, realizat pentru a scoate în evidență noile funcții ale iPhone 16 Pro. Proiectul explorează estetica produsului prin mișcare, ritm și elemente cinematice.',
    achievements: 'Am construit o narațiune scurtă, dar impactantă, care prezintă tehnologia dispozitivului prin cadre fluide, efecte vizuale și compoziție orientată pe detalii, astfel încât să țină privitorul conectat pe totă durata video-ului.',
    techniques: 'A fost filmat cu Osmo Pocket 3 și am folosit efecte de măști, motion tracking, tranziții fluide, color grading, sound design și cadre diverse pentru a crea un reel energetic, premium, în acord cu limbajul vizual al produsului.'
  },
  {
    id: 2,
    youtubeId: '2YuORpHTpbA',
    title: 'Armani Elixir',
    description: 'Campanie parfum',
    client: 'Sephora Romania',
    role: 'Director creativ, acting și editor',
    details: 'Un concept vizual personal inspirat de parfumul Armani Elixir, realizat ca proiect creativ pentru Sephora. Campania explorează felul în care aroma și estetica parfumului se leagă de identitatea mea ca regizor, folosind cadre cinematice dinamice și tranziții inspirate din lumea filmului.',
    achievements: 'Am creat o narațiune vizuală în care parfumul devine elementul declanșator al unui „salt" între locații și stări, simbolizând modul în care inspirația mă poartă între diferite lumi vizuale. Conceptul a generat engagement organic și a fost apreciat pentru abordarea cinematică și ritmul energetic.',
    techniques: 'Proiectul a fost filmat cu RED Komodo 6K, folosind match cuts pe scaunul de regizor ca element narativ central, măști pe produs, tranziții dinamice între natură și spații urbane, iluminare dramatică și colorizare cu tonuri calde, dar și monocrom. Post-producția a pus accent pe ritm, sunet, coerență vizuală și flow.'
  },
  {
    id: 3,
    youtubeId: '4UyHJwnQe4c',
    title: 'Armani Aqua di Gio',
    description: 'Campanie parfum',
    client: 'Sephora Romania',
    role: 'Director creativ, acting și editor',
    details: 'O campanie personală creată pentru Sephora, inspirată de parfumul Armani Aqua di Gio. Conceptul urmărește descoperirea parfumului ca metaforă a descoperirii de sine. O tranziție fluidă între natură, haos urban și revenirea la esență, în cadrul unui ciclu vizual complet.',
    achievements: 'Am construit o narațiune cinematografică în care parfumul devine punctul de trecere între lumi contrastante: liniște vs. agitație, introspecție vs. ritm urban. Mixul dintre locații, styling și ritmul montajului a generat o diversitate vizuală puternică și o experiență autentică.',
    techniques: 'Filmările au fost realizate cu RED Komodo 6K, folosind compoziții fashion, unghiuri exagerate și mișcări de cameră, tranziții simbolice și cadre dramatice. Aspectul monocrom scoate în evidență un contrast puternic și amplifică emoția.'
  },
  {
    id: 4,
    youtubeId: 'tAuxjw4iOSM',
    title: 'TRUSSARDI PRIMO',
    description: 'Campanie parfum',
    client: 'Sephora Romania',
    role: 'Director creativ, acting și editor',
    details: 'Un concept cinematic filmat la răsărit pe plaja din Tuzla, inspirat de esența parfumului Trussardi Primo. Proiectul explorează libertatea, auto-descoperirea și relația dintre natură, identitate și rafinament personal.',
    achievements: 'Am creat o narațiune vizuală în care parfumul devine un simbol al reconectării cu sine, folosind momente de introspecție și mișcare liberă în spațiu deschis. Stilul și ritmul montajului au consolidat estetica luxury într-un mod natural și autentic.',
    techniques: 'Filmat cu RED Komodo 6K, am folosit compoziții wide pentru spațialitate și close-up-uri pentru emoție și textură. Montaj dinamic cu cut-uri pe mișcare, iluminare naturală aurie și colorizare caldă pentru a accentua senzația de libertate pe plajă și prospețime.'
  },
  {
    id: 5,
    youtubeId: 'rI8mz6KgBMk',
    title: 'FRANUI',
    description: 'Reel',
    client: 'Proiect personal realizat împreună cu participanții din Masterclass De la Idee la Reel',
    role: 'Director creativ, acting și editor',
    details: 'O producție cinematografică experimentală realizată în cadrul Masterclass-ului, în care am aplicat toți pașii parcurși în curs, de la concept și scenariu, la filmare și postproducție. Conceptul explorează dinamica a două personaje care descoperă Franui și sunt proiectate într-o fantezie psihologică, inspirată din jocuri video.',
    achievements: 'Am transformat o situație cotidiană într-o poveste vizuală cu elemente de umor, suprapuneri narative și „lume interioară". Alternanța dintre lumea reală și cea imaginară, plus montajul paralel, creează un ritm vizual dinamic și o reprezentare simbolică a dorinței și „irezistibilității" produsului.',
    techniques: 'Filmarea a fost realizată cu iPhone 16 Pro, folosind cut-uri pe mișcare, tranziții prin măști, efecte speciale cu green screen și montaj accelerat pentru a reda energia fanteziei. Am integrat cadre realiste în parc cu secvențe suprarealiste, inspirate de universul jocurilor video, pentru a crea o experiență vizuală fluidă și satisfăcătoare.'
  },
  {
    id: 6,
    youtubeId: 'nJ8XvNHIFOc',
    title: 'SPILL THE TEA',
    description: 'Reel',
    client: 'Spill the tea - contest',
    role: 'Director creativ, acting și editor',
    details: 'Reel creat pentru concursul „Spill The Tea", conceput ca o demonstrație de skill creativ și execuție video full-stack. Proiectul explorează storytelling-ul vizual prin ritm alert, tranziții complexe și schimbări de context care mențin atenția până la final.',
    achievements: 'Am valorificat oportunitatea competiției pentru a crea un material dinamic și de impact, construit pe o idee fresh, montaj cu un ritm alert și efecte vizuale. Materialul se remarcă prin diversitatea cadrelor, energia vizuală și finalul surpriză, în care ecranul se „sparge", ducând direct către home screen.',
    techniques: 'Filmat cu iPhone 16 Pro, tranziții prin măști, layering vizual, cut-uri pe mișcare, schimbări controlate de lumină, editare accelerată și sound design sincron cu acțiunea. Montajul construiește un flux continuu, cu elemente vizuale noi la fiecare secvență pentru a menține interesul până la ultimul cadru.'
  },
  {
    id: 7,
    youtubeId: 'bj1SprScBZQ',
    title: 'SPILL THE TEA',
    description: 'BTS',
    client: 'Spill the tea - contest',
    role: 'Director creativ, acting și editor',
    details: 'Un material behind-the-scenes care documentează procesul de filmare al proiectului Spill The Tea. Videoul surprinde modul în care conceptul a fost transpus vizual prin soluții creative, rigging improvizat și testare practică pe set.',
    achievements: 'Am capturat momente reale din procesul de producție, inclusiv modul în care au fost pregătite cutiile pentru filmare pe green screen și cum au fost generate tranzițiile finale. Materialul a oferit transparență asupra procesului și a crescut engagementul proiectului.',
    techniques: 'Filmări cu iPhone 16 Pro montat pe gimbal, produsele prinse pe green screen pentru tranziții create ulterior din măști și cadre suplimentare. Editare minimală pentru a păstra caracterul raw al procesului.'
  }
];

export function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const youtubePlayerRefs = useRef<{ [key: number]: YouTubePlayer | undefined }>({});
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

  const togglePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const player = youtubePlayerRefs.current[currentIndex];
    const newPlayingState = !isPlaying;
    
    setIsPlaying(newPlayingState);
    
    if (player) {
      try {
        // Check if methods exist before calling
        if (typeof player.playVideo === 'function' && typeof player.pauseVideo === 'function') {
          if (newPlayingState) {
            player.playVideo();
          } else {
            player.pauseVideo();
          }
        }
      } catch (error) {
        console.error('Error toggling play/pause:', error);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const player = youtubePlayerRefs.current[currentIndex];
    const newMutedState = !isMuted;
    
    setIsMuted(newMutedState);
    
    if (player) {
      try {
        // Check if methods exist before calling
        if (typeof player.mute === 'function' && typeof player.unMute === 'function') {
          if (newMutedState) {
            player.mute();
          } else {
            player.unMute();
          }
        }
      } catch (error) {
        console.error('Error toggling mute:', error);
      }
    }
  };

  // Load YouTube IFrame API (only once)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ytWindow = window as YouTubeWindow;
    if (!ytWindow.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Initialize player when currentIndex changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ytWindow = window as YouTubeWindow;
    
    // Clean up previous player if switching videos
    const prevIndex = Object.keys(youtubePlayerRefs.current).find(
      (key) => parseInt(key) !== currentIndex && youtubePlayerRefs.current[parseInt(key)]
    );
    if (prevIndex !== undefined) {
      const prevPlayer = youtubePlayerRefs.current[parseInt(prevIndex)];
      if (prevPlayer && typeof prevPlayer.pauseVideo === 'function') {
        try {
          prevPlayer.pauseVideo();
        } catch (e) {
          // Ignore errors when pausing
        }
      }
    }
    
    const initPlayer = () => {
      if (!ytWindow.YT || !ytWindow.YT.Player) return;

      const currentVideo = VERTICAL_VIDEOS[currentIndex];
      const playerId = `youtube-player-${currentVideo.id}`;
      
      // Check if player exists and if its DOM element still exists
      const existingPlayer = youtubePlayerRefs.current[currentIndex];
      if (existingPlayer) {
        // Try to check if player is still valid by checking if we can access its methods
        // If the DOM element was removed, the player might be invalid
        const playerElement = document.getElementById(playerId);
        if (playerElement) {
          // Player exists and element exists, just update state
          try {
            if (isMuted) {
              existingPlayer.mute();
            } else {
              existingPlayer.unMute();
            }
            if (isPlaying) {
              existingPlayer.playVideo();
            } else {
              existingPlayer.pauseVideo();
            }
          } catch (e) {
            // Player might be invalid, will recreate below
            delete youtubePlayerRefs.current[currentIndex];
          }
          return;
        } else {
          // Element doesn't exist, player is invalid, remove reference
          delete youtubePlayerRefs.current[currentIndex];
        }
      }
      
      // Wait for the DOM element to be available (AnimatePresence might still be transitioning)
      // The spring animation can take up to ~500ms, so we wait a bit longer
      const checkElement = setInterval(() => {
        const playerElement = document.getElementById(playerId);
        
        if (playerElement && !youtubePlayerRefs.current[currentIndex]) {
          clearInterval(checkElement);
          
          // Wait for AnimatePresence animation to complete (spring animation ~500ms)
          setTimeout(() => {
            // Double-check element still exists and player not already initialized
            const element = document.getElementById(playerId);
            if (element && !youtubePlayerRefs.current[currentIndex]) {
              try {
                youtubePlayerRefs.current[currentIndex] = new ytWindow.YT!.Player(playerId, {
                  videoId: currentVideo.youtubeId,
                  playerVars: {
                    autoplay: isPlaying ? 1 : 0,
                    mute: isMuted ? 1 : 0,
                    loop: 1,
                    playlist: currentVideo.youtubeId,
                    controls: 0,
                    playsinline: 1,
                    rel: 0,
                    modestbranding: 1,
                    iv_load_policy: 3,
                    showinfo: 0,
                    disablekb: 1,
                    fs: 0,
                    cc_load_policy: 0,
                    vq: 'hd1080',
                    enablejsapi: 1,
                  },
                  events: {
                    onReady: (event: YouTubePlayerEvent) => {
                      event.target.setPlaybackQuality('hd1080'); // Force 1080p quality
                      if (isMuted) {
                        event.target.mute();
                      } else {
                        event.target.unMute();
                      }
                      if (isPlaying) {
                        event.target.playVideo();
                      } else {
                        event.target.pauseVideo();
                      }
                    }
                  }
                });
              } catch (error) {
                console.error('Error initializing YouTube player:', error);
              }
            }
          }, 600); // Wait for animation to complete
        }
      }, 100);
      
      // Timeout after 5 seconds if element never appears
      setTimeout(() => clearInterval(checkElement), 5000);
      
      return () => clearInterval(checkElement);
    };

    // Wait for API to load, then initialize player
    if (ytWindow.YT && ytWindow.YT.Player) {
      const cleanup = initPlayer();
      return cleanup;
    } else {
      const checkYT = setInterval(() => {
        if (ytWindow.YT && ytWindow.YT.Player) {
          clearInterval(checkYT);
          initPlayer();
        }
      }, 100);
      return () => clearInterval(checkYT);
    }
  }, [currentIndex, isMuted, isPlaying]);

  // Sync player state when mute/play state changes (only if player exists)
  useEffect(() => {
    const player = youtubePlayerRefs.current[currentIndex];
    if (player) {
      try {
        if (isMuted) {
          player.mute();
        } else {
          player.unMute();
        }
        if (isPlaying) {
          player.playVideo();
        } else {
          player.pauseVideo();
        }
      } catch (_e) {
        // Player might not be ready yet, ignore
      }
    }
  }, [isMuted, isPlaying, currentIndex]);

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
      y: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 50 : -50,
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
      <div className="absolute inset-0 overflow-visible pointer-events-none opacity-80">
        <div 
          className="absolute" 
          style={{ 
            transform: 'rotate(45deg) scale(1.8)',
            top: '-20%',
            left: '-20%',
            width: '140%',
            height: '140%'
          }}
        >
          {[...Array(35)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex whitespace-nowrap"
              style={{
                marginTop: rowIndex === 0 ? '-15%' : '0',
                marginBottom: '0.2rem'
              }}
            >
              {[...Array(15)].map((_, colIndex) => (
                <span
                  key={colIndex}
                  className="font-garnet text-[#FE5F01] text-fib-4 md:text-fib-5 font-bold mx-3"
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
            <div className="relative w-full h-full overflow-hidden bg-[#0a1620] rounded-[2.5rem]">
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
                  className="absolute inset-0 overflow-hidden rounded-[2.5rem]"
                >
                  {/* YouTube Video - Div container for YouTube API to create iframe */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[2.5rem]">
                    <div
                      id={`youtube-player-${currentVideo.id}`}
                      className="absolute"
                      style={{ 
                        border: 'none',
                        width: '100%',
                        height: '177.78%', // 16:9 aspect ratio scaled up
                        minHeight: '100%',
                        minWidth: '56.25%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) scale(1.2)',
                        pointerEvents: 'none'
                      }}
                    />
                  </div>

                  {/* Video Info Overlay - Glass Card with Controls */}
                  <div className="absolute bottom-6 left-4 right-4">
                    <div className="backdrop-blur-lg bg-bg-elev/90 border border-line rounded-2xl p-4 shadow-soft">
                      <div className="flex items-start justify-between gap-3">
                        {/* Text Content */}
                        <div className="flex-1">
                          <h3 className="!text-white font-bold text-fib-2 mb-1">
                            {currentVideo.title}
                          </h3>
                          <p className="!text-white/80 text-fib-1">
                            {currentVideo.description}
                          </p>
                        </div>

                        {/* Video Controls - Right Side */}
                        <div className="flex flex-row gap-2" style={{ pointerEvents: 'auto' }}>
                          {/* Play/Pause Button */}
                          <button
                            onClick={togglePlayPause}
                            className="w-10 h-10 rounded-full backdrop-blur-lg bg-bg-elev/90 border border-line flex items-center justify-center hover:bg-glass/80 transition-all duration-300 hover:border-accent shadow-soft cursor-pointer"
                            aria-label={isPlaying ? 'Pause video' : 'Play video'}
                            style={{ pointerEvents: 'auto' }}
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
                            className="w-10 h-10 rounded-full backdrop-blur-lg bg-bg-elev/90 border border-line flex items-center justify-center hover:bg-glass/80 transition-all duration-300 hover:border-accent shadow-soft cursor-pointer"
                            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                            style={{ pointerEvents: 'auto' }}
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
                    <span className="!text-white text-fib-1 font-medium">
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
              className="w-14 h-14 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:border-[#FE5F01] shadow-soft-lg"
              aria-label="Previous video"
            >
              <svg
                className="w-6 h-6 text-[#E5E4E2]"
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
              className="w-14 h-14 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:border-[#FE5F01] shadow-soft-lg"
              aria-label="Next video"
            >
              <svg
                className="w-6 h-6 text-[#E5E4E2]"
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
                    <h3 className="text-fib-3 font-bold text-[#E5E4E2] mb-1">
                      {currentVideo.title}
                    </h3>
                    <p className="text-[#FE5F01] text-fib-1 font-medium uppercase tracking-wider">
                      {currentVideo.description}
                    </p>
                  </div>
                  <span className="text-[#E5E4E2]/70 text-fib-1 font-medium px-2 py-1 bg-[#E5E4E2]/10 rounded-full">
                    {currentIndex + 1} / {VERTICAL_VIDEOS.length}
                  </span>
                </div>

                {/* Client and Role */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-fib-1 uppercase tracking-wider text-[#E5E4E2]/50 mb-1">Client</p>
                    <p className="text-[#E5E4E2] font-medium text-fib-1">{currentVideo.client}</p>
                  </div>
                  <div>
                    <p className="text-fib-1 uppercase tracking-wider text-[#E5E4E2]/50 mb-1">Role</p>
                    <p className="text-[#E5E4E2] font-medium text-fib-1">{currentVideo.role}</p>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                  <div>
                    <p className="text-fib-1 uppercase tracking-wider text-[#E5E4E2]/50 mb-1">Project Overview</p>
                    <p className="text-[#E5E4E2]/80 leading-relaxed text-fib-1">
                      {currentVideo.details}
                    </p>
                  </div>

                  <div>
                    <p className="text-fib-1 uppercase tracking-wider text-[#E5E4E2]/50 mb-1">Key Achievements</p>
                    <p className="text-[#E5E4E2]/80 leading-relaxed text-fib-1">
                      {currentVideo.achievements}
                    </p>
                  </div>

                  <div>
                    <p className="text-fib-1 uppercase tracking-wider text-[#E5E4E2]/50 mb-1">Techniques & Approach</p>
                    <p className="text-[#E5E4E2]/80 leading-relaxed text-fib-1">
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

