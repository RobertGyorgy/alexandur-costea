import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva('font-semibold text-fg', {
  variants: {
    level: {
      h1: 'text-fluid-5xl lg:text-fluid-6xl',
      h2: 'text-fluid-4xl lg:text-fluid-5xl',
      h3: 'text-fluid-3xl lg:text-fluid-4xl',
      h4: 'text-fluid-2xl lg:text-fluid-3xl',
      h5: 'text-fluid-xl lg:text-fluid-2xl',
      h6: 'text-fluid-lg lg:text-fluid-xl',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    level: 'h2',
    align: 'left',
    weight: 'semibold',
  },
});

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function Heading({
  level,
  align,
  weight,
  className,
  as,
  children,
  ...props
}: HeadingProps) {
  const Component = as || level || 'h2';

  return (
    <Component
      className={cn(headingVariants({ level, align, weight }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}


