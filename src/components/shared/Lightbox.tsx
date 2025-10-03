'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { Icon } from './Icon';
import { ResponsiveVideo } from './ResponsiveVideo';
import { cn } from '@/lib/utils';
import type { MediaItem } from '@/lib/content';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaItem;
  title?: string;
  description?: string;
}

export function Lightbox({ isOpen, onClose, media, title, description }: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus trap
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const modal = document.querySelector('[data-lightbox-modal]');
      const firstFocusableElement = modal?.querySelector(focusableElements) as HTMLElement;
      const focusableContent = modal?.querySelectorAll(focusableElements);
      const lastFocusableElement = focusableContent?.[focusableContent.length - 1] as HTMLElement;

      // Focus first element
      setTimeout(() => firstFocusableElement?.focus(), 100);

      const handleTabKeyPress = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement?.focus();
            e.preventDefault();
          }
        }
      };

      const handleEscapeKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleTabKeyPress);
      document.addEventListener('keydown', handleEscapeKeyPress);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleTabKeyPress);
        document.removeEventListener('keydown', handleEscapeKeyPress);
      };
    }
    
    return () => {
      // Cleanup when not open
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 },
    },
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-6xl bg-bg-elev rounded-2xl border border-line shadow-soft-xl overflow-hidden"
              data-lightbox-modal
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'lightbox-title' : undefined}
              aria-describedby={description ? 'lightbox-description' : undefined}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-line">
                <div className="flex-1">
                  {title && (
                    <h2 
                      id="lightbox-title"
                      className="text-lg font-semibold text-fg"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p 
                      id="lightbox-description"
                      className="text-sm text-muted mt-1"
                    >
                      {description}
                    </p>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="ml-4"
                  aria-label="Close lightbox"
                >
                  <Icon name="close" size={20} />
                </Button>
              </div>

              {/* Media Content */}
              <div className="relative bg-bg">
                {media.type === 'video' ? (
                  <ResponsiveVideo
                    src={media.src}
                    poster={media.poster}
                    aspectRatio={media.aspectRatio || '16/9'}
                    className="w-full"
                    controls
                    autoPlay={false}
                  />
                ) : (
                  <div className={cn(
                    'relative w-full',
                    media.aspectRatio === '16/9' && 'aspect-video',
                    media.aspectRatio === '4/3' && 'aspect-[4/3]',
                    media.aspectRatio === '1/1' && 'aspect-square',
                    media.aspectRatio === '3/2' && 'aspect-[3/2]',
                    !media.aspectRatio && 'aspect-video'
                  )}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={media.src}
                      alt={media.alt}
                      className="w-full h-full object-contain bg-bg"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              {/* Footer - Optional additional actions */}
              <div className="p-4 border-t border-line bg-bg-elev/50">
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted">
                    Press ESC to close
                  </div>
                  <div className="flex space-x-2">
                    {/* Add additional actions like download, share, etc. */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(media.src, '_blank')}
                    >
                      <Icon name="externalLink" size={16} />
                      <span className="ml-2">Open Original</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
