import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textClassName?: string;
}

export function Logo({ 
  className, 
  size = 'md',
  showText = true,
  textClassName 
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      {/* Logo Icon - Placeholder geometric design */}
      <div className={cn(
        'relative flex items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-bg',
        sizeClasses[size]
      )}>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-1/2 w-1/2"
        >
          <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.28L19.8 8.5L12 12.72L4.2 8.5L12 4.28ZM4 10.18L11 14.16V19.92L4 15.94V10.18ZM13 19.92V14.16L20 10.18V15.94L13 19.92Z" />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <span className={cn(
          'font-bold text-fg tracking-tight',
          textSizeClasses[size],
          textClassName
        )}>
          Alex Costea
        </span>
      )}
    </div>
  );
}


