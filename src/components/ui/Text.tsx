import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-fluid-xs',
      sm: 'text-fluid-sm',
      base: 'text-fluid-base',
      lg: 'text-fluid-lg',
      xl: 'text-fluid-xl',
      '2xl': 'text-fluid-2xl',
    },
    color: {
      default: 'text-muted',
      primary: 'text-fg',
      accent: 'text-accent',
      'accent-2': 'text-accent-2',
      muted: 'text-muted',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'base',
    color: 'default',
    align: 'left',
    weight: 'normal',
  },
});

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'small' | 'strong';
}

export function Text({
  size,
  color,
  align,
  weight,
  className,
  as: Component = 'p',
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants({ size, color, align, weight }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
