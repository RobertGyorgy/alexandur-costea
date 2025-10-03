import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-bg-elev border border-line text-muted',
        accent: 'bg-accent/10 border border-accent/30 text-accent',
        'accent-2': 'bg-accent-2/10 border border-accent-2/30 text-accent-2',
        success: 'bg-green-500/10 border border-green-500/30 text-green-400',
        warning: 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-400',
        error: 'bg-red-500/10 border border-red-500/30 text-red-400',
        glass: 'bg-glass border border-line backdrop-blur-sm text-fg',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };


