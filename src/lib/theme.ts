'use client';

import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme] = useState<Theme>('dark');

  useEffect(() => {
    // Always set dark theme
    const root = document.documentElement;
    root.setAttribute('data-theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Theme toggle disabled - always dark mode
  };

  return { theme, toggleTheme };
}

