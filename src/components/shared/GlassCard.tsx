import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const glassCardVariants = cva(
  'relative rounded-xl border transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-glass border-line glass-base',
        subtle: 'bg-glass/50 border-line/50 glass-base',
        strong: 'bg-glass border-line glass-base backdrop-blur-xl',
        accent: 'bg-accent/5 border-accent/20 glass-base',
        'accent-2': 'bg-accent-2/5 border-accent-2/20 glass-base',
      },
      blur: {
        none: '',
        sm: 'backdrop-blur-sm',
        md: 'backdrop-blur-md',
        lg: 'backdrop-blur-lg',
        xl: 'backdrop-blur-xl',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      blur: 'md',
      padding: 'md',
    },
  }
);

interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
  children: React.ReactNode;
}

export function GlassCard({
  variant,
  blur,
  padding,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(glassCardVariants({ variant, blur, padding }), className)}
      {...props}
    >
      {/* Fallback background for browsers without backdrop-filter support */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-bg-elev/80 opacity-0 transition-opacity duration-300 [.no-backdrop-filter_&]:opacity-100" />
      {children}
    </div>
  );
}


