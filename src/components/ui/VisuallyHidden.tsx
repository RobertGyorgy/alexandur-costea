import React from 'react';
import { cn } from '@/lib/utils';

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  as?: React.ElementType;
}

export function VisuallyHidden({ 
  children, 
  className, 
  as: Component = 'span',
  ...props 
}: VisuallyHiddenProps) {
  return (
    <Component
      className={cn(
        'absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0',
        'clip-[rect(1px,1px,1px,1px)]',
        // Modern clip-path for better browser support
        '[clip-path:inset(50%)]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}


