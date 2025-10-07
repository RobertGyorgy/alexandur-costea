'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/ui/PageTransition';

interface PageTransitionContextType {
  startTransition: (path: string) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const router = useRouter();

  const startTransition = useCallback((path: string) => {
    setTargetPath(path);
    setIsTransitioning(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    if (targetPath) {
      router.push(targetPath);
      // Keep showing transition until all exit cards finish
      setTimeout(() => {
        setIsTransitioning(false);
        setTargetPath(null);
      }, 100);
    }
  }, [targetPath, router]);

  return (
    <PageTransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {children}
      <PageTransition 
        isTransitioning={isTransitioning} 
        onTransitionComplete={handleTransitionComplete}
      />
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (context === undefined) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider');
  }
  return context;
}

