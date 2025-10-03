export const BREAKPOINTS = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const COLORS = {
  bg: '#0B0F19',
  bgElev: '#101523',
  fg: '#F5F7FA',
  muted: '#A9B0C1',
  accent: '#FFD60A',
  accent2: '#A855F7',
  line: 'rgba(255,255,255,0.08)',
  glass: 'rgba(255,255,255,0.06)',
} as const;

export const SHADOWS = {
  soft: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  softMd: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  softLg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  softXl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  glowAccent: '0 0 20px rgb(255 214 10 / 0.4)',
  glowAccent2: '0 0 20px rgb(168 85 247 / 0.4)',
} as const;

export const RADII = {
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  '4xl': '2rem',
  '5xl': '2.5rem',
} as const;

export const Z_INDEX = {
  behind: -1,
  normal: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
} as const;

export const TRANSITIONS = {
  fast: '150ms ease-out',
  normal: '250ms ease-out',
  slow: '350ms ease-out',
  spring: '300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

export const ANIMATION_DURATIONS = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.35,
  verySlow: 0.5,
} as const;


