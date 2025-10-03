import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'elevated' | 'glass';
  as?: 'section' | 'div' | 'header' | 'footer' | 'main';
}

export const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  className,
  containerSize = 'lg',
  spacing = 'lg',
  background = 'default',
  as: Component = 'section',
  ...props
}, ref) => {
  const spacingClasses = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-24 lg:py-28',
    xl: 'py-24 md:py-28 lg:py-32',
  };

  const backgroundClasses = {
    default: 'bg-bg',
    elevated: 'bg-bg-elev',
    glass: 'bg-glass backdrop-blur-md',
  };

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={cn(
        'relative',
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </Component>
  );
});

Section.displayName = 'Section';


