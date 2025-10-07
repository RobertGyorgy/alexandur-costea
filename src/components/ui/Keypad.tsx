'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import './Keypad.css';

interface KeypadProps {
  onSubmit?: (data: { type?: string; email: string; password?: string; name?: string }) => void;
}

export function Keypad({ onSubmit }: KeypadProps) {
  const [activeForm, setActiveForm] = useState<'signin' | 'signup'>('signup');
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  // Sign Up Form State
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  
  const formRef = useRef<HTMLFormElement>(null);

  // Sound effect using .wav file
  const playClickSound = () => {
    if (typeof window !== 'undefined') {
      const audio = new Audio('/mixkit-single-key-type-2533.wav');
      audio.volume = 0.3; // Set volume to 30%
      audio.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign In:', { email: signInEmail, password: signInPassword });
    if (onSubmit) onSubmit({ type: 'signin', email: signInEmail, password: signInPassword });
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign Up:', { name: signUpName, email: signUpEmail, password: signUpPassword });
    if (onSubmit) onSubmit({ type: 'signup', name: signUpName, email: signUpEmail, password: signUpPassword });
  };

  const handleKeyPress = (id: string) => {
    playClickSound(); // Play sound on click
    setPressedKey(id);
    setTimeout(() => setPressedKey(null), 120);
    
    // Handle button actions
    if (id === 'one') {
      setActiveForm('signin');
    } else if (id === 'two') {
      setActiveForm('signup');
    } else if (id === 'three') {
      // Submit the active form
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  const formVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.95,
      rotateY: direction > 0 ? 15 : -15,
      filter: 'blur(4px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 60 : -60,
      opacity: 0,
      scale: 0.95,
      rotateY: direction < 0 ? 15 : -15,
      filter: 'blur(4px)',
    }),
  };

  return (
    <div className="keypad-wrapper">
      <section className="keypad-section">
        {/* Mobile: Sign In/Sign Up Toggle Above Form */}
        {isMobile && (
          <div className="flex gap-3 mb-8">
            <Button
              variant={activeForm === 'signin' ? 'primary' : 'glass'}
              size="md"
              onClick={() => setActiveForm('signin')}
              className="flex-1 rounded-full !text-white"
            >
              Autentificare
            </Button>
            <Button
              variant={activeForm === 'signup' ? 'primary' : 'glass'}
              size="md"
              onClick={() => setActiveForm('signup')}
              className="flex-1 rounded-full !text-white"
            >
              Înregistrare
            </Button>
          </div>
        )}
        
        <div>
          <AnimatePresence mode="wait" custom={activeForm === 'signup' ? 1 : -1}>
            {activeForm === 'signin' ? (
              <motion.div
                key="signin"
                custom={-1}
                variants={formVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  mass: 0.8,
                }}
                style={{ transformPerspective: 1200 }}
              >
                <div className="mb-6">
                  <h1 className={`keypad-title ${isMobile ? 'text-center' : ''}`} style={{ color: '#c5c7ce' }}>
                    Bine ai <span style={{ color: '#ff6b35' }}>revenit!</span>
                  </h1>
                  <p className={`keypad-description ${isMobile ? 'text-center' : ''}`}>
                    Autentifică-te pentru a accesa contul tău și a continua călătoria creativă.
                  </p>
                </div>
                <form ref={formRef} onSubmit={handleSignInSubmit} className={`keypad-form ${isMobile ? 'w-full overflow-visible' : ''}`}>
                  <div className="relative">
                    <label className={`text-xs uppercase tracking-wider mb-2 block ${isMobile ? 'text-center' : ''}`} style={{ color: '#ff6b35', opacity: 0.8 }}>
                      Adresa Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="adresa@email.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      className="keypad-input w-full"
                      style={{ borderColor: signInEmail ? '#ff6b35' : 'rgba(255, 255, 255, 0.25)' }}
                    />
                  </div>
                  <div className="relative">
                    <label className={`text-xs uppercase tracking-wider mb-2 block ${isMobile ? 'text-center' : ''}`} style={{ color: '#ff6b35', opacity: 0.8 }}>
                      Parolă
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="keypad-input w-full"
                      style={{ borderColor: signInPassword ? '#ff6b35' : 'rgba(255, 255, 255, 0.25)' }}
                    />
                  </div>
                  {!isMobile && (
                    <div className="mt-4 text-center">
                      <p className="text-xs" style={{ color: '#c5c7ce', opacity: 0.6 }}>
                        Apasă <span style={{ color: '#ff6b35' }}>ENTER</span> pentru autentificare
                      </p>
                    </div>
                  )}
                </form>
                
                {/* Mobile: Enter Button Below Form */}
                {isMobile && (
                  <div className="mt-8 w-full">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => {
                        if (formRef.current) {
                          formRef.current.requestSubmit();
                        }
                      }}
                      className="w-full rounded-full !text-white"
                    >
                      Intră
                    </Button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                custom={1}
                variants={formVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  mass: 0.8,
                }}
                style={{ transformPerspective: 1200 }}
              >
                <div className="mb-6">
                  <h1 className={`keypad-title ${isMobile ? 'text-center' : ''}`} style={{ color: '#c5c7ce' }}>
                    <span style={{ color: '#ff6b35' }}>Creează-ți</span> contul
                  </h1>
                  <p className={`keypad-description ${isMobile ? 'text-center' : ''}`}>
                    Alătură-te comunității de creatori. Împărtășește-ți munca, inspiră-te și dezvoltă-ți călătoria creativă.
                  </p>
                </div>
                <form ref={formRef} onSubmit={handleSignUpSubmit} className={`keypad-form ${isMobile ? 'w-full overflow-visible' : ''}`}>
                  <div className="relative">
                    <label className={`text-xs uppercase tracking-wider mb-2 block ${isMobile ? 'text-center' : ''}`} style={{ color: '#ff6b35', opacity: 0.8 }}>
                      Nume Complet
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Numele Tău"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      className="keypad-input w-full"
                      style={{ borderColor: signUpName ? '#ff6b35' : 'rgba(255, 255, 255, 0.25)' }}
                    />
                  </div>
                  <div className="relative">
                    <label className={`text-xs uppercase tracking-wider mb-2 block ${isMobile ? 'text-center' : ''}`} style={{ color: '#ff6b35', opacity: 0.8 }}>
                      Adresa Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="creator@email.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="keypad-input w-full"
                      style={{ borderColor: signUpEmail ? '#ff6b35' : 'rgba(255, 255, 255, 0.25)' }}
                    />
                  </div>
                  <div className="relative">
                    <label className={`text-xs uppercase tracking-wider mb-2 block ${isMobile ? 'text-center' : ''}`} style={{ color: '#ff6b35', opacity: 0.8 }}>
                      Parolă
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className="keypad-input w-full"
                      style={{ borderColor: signUpPassword ? '#ff6b35' : 'rgba(255, 255, 255, 0.25)' }}
                    />
                  </div>
                  {!isMobile && (
                    <div className="mt-4 text-center">
                      <p className="text-xs" style={{ color: '#c5c7ce', opacity: 0.6 }}>
                        Apasă <span style={{ color: '#ff6b35' }}>ENTER</span> pentru a crea contul
                      </p>
                    </div>
                  )}
                </form>
                
                {/* Mobile: Enter Button Below Form */}
                {isMobile && (
                  <div className="mt-8 w-full">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => {
                        if (formRef.current) {
                          formRef.current.requestSubmit();
                        }
                      }}
                      className="w-full rounded-full !text-white"
                    >
                      Intră
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Desktop: 3D Keypad - Only show on desktop */}
      {!isMobile && (
        <div className="keypad">
          <div className="keypad__base">
            <Image
              src="https://assets.codepen.io/605876/keypad-base.png?format=auto&quality=86"
              alt="Keypad base"
              width={400}
              height={300}
              unoptimized
            />
          </div>

          <button
          id="one"
          className={`key keypad__single keypad__single--left ${pressedKey === 'one' ? 'key--pressed' : ''}`}
          onClick={() => handleKeyPress('one')}
          style={{
            '--hue': '0',
            '--saturate': '0',
            '--brightness': '1.4'
          } as React.CSSProperties}
        >
          <span className="key__mask">
            <span className="key__content">
              <span className="key__text">
                sign<br />in
              </span>
              <Image
                src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86"
                alt="Keypad single button"
                width={100}
                height={100}
                unoptimized
              />
            </span>
          </span>
        </button>

        <button
          id="two"
          className={`key keypad__single ${pressedKey === 'two' ? 'key--pressed' : ''}`}
          onClick={() => handleKeyPress('two')}
          style={{
            '--hue': '130',
            '--saturate': '1.3',
            '--brightness': '1.3'
          } as React.CSSProperties}
        >
          <span className="key__mask">
            <span className="key__content">
              <span className="key__text">
                sign<br />up
              </span>
              <Image
                src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86"
                alt="Keypad single button"
                width={100}
                height={100}
                unoptimized
              />
            </span>
          </span>
        </button>

        <button
          id="three"
          className={`key keypad__double ${pressedKey === 'three' ? 'key--pressed' : ''}`}
          onClick={() => handleKeyPress('three')}
          style={{
            '--hue': '0',
            '--saturate': '0',
            '--brightness': '0.5'
          } as React.CSSProperties}
        >
          <span className="key__mask">
            <span className="key__content">
              <span className="key__text">enter</span>
              <Image
                src="https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86"
                alt="Keypad double button"
                width={200}
                height={100}
                unoptimized
              />
            </span>
          </span>
          </button>
        </div>
      )}
    </div>
  );
}

