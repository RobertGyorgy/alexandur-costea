'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ResponsiveVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2';
  className?: string;
  showControls?: boolean;
  autoPlay?: boolean;
}

export function ResponsiveVideo({
  src,
  poster,
  aspectRatio = '16/9',
  className,
  showControls = true,
  autoPlay = false,
  ...props
}: ResponsiveVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const aspectRatioClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '3/2': 'aspect-[3/2]',
  };

  const handlePlay = async () => {
    if (!videoRef.current) return;
    
    try {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        await videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Video play error:', error);
      setHasError(true);
    }
  };

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);
  const handleVideoError = () => setHasError(true);

  if (hasError) {
    return (
      <div
        className={cn(
          'relative flex items-center justify-center rounded-lg bg-bg-elev text-muted',
          aspectRatioClasses[aspectRatio],
          className
        )}
      >
        <p className="text-center">
          Video could not be loaded
          <br />
          <span className="text-sm opacity-70">Please check the video source</span>
        </p>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden rounded-lg', className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={cn(
          'h-full w-full object-cover',
          aspectRatioClasses[aspectRatio]
        )}
        playsInline
        preload="auto"
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        onError={handleVideoError}
        autoPlay={autoPlay && !prefersReducedMotion()}
        muted={autoPlay} // Required for autoplay on most browsers
        controls={showControls && !autoPlay}
        {...props}
      />
      
      {/* Custom play button overlay for better control */}
      {showControls && !autoPlay && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="glass"
            size="lg"
            onClick={handlePlay}
            className={cn(
              'transition-opacity duration-300',
              isPlaying ? 'opacity-0' : 'opacity-100'
            )}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {isPlaying ? (
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              ) : (
                <path d="M8 5v14l11-7z" />
              )}
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}

// Utility function to check for reduced motion (if not available in utils)
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

