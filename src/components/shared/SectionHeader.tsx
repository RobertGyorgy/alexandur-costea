import React from 'react';
import { cn } from '@/lib/utils';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  maxWidth?: string;
}

export function SectionHeader({
  kicker,
  title,
  description,
  align = 'center',
  className,
  titleClassName,
  descriptionClassName,
  maxWidth = 'max-w-3xl',
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div
      className={cn(
        'flex flex-col space-y-4',
        align === 'center' && 'mx-auto',
        maxWidth,
        alignClasses[align],
        className
      )}
    >
      {kicker && (
        <Badge variant="accent" size="md">
          {kicker}
        </Badge>
      )}
      
      <Heading
        level="h2"
        align={align}
        className={cn('leading-tight', titleClassName)}
      >
        {title.split('\n').map((line, index) => (
          <span key={index} className="block whitespace-nowrap">{line}</span>
        ))}
      </Heading>
      
      {description && (
        <Text
          size="lg"
          align={align}
          className={cn('leading-relaxed', descriptionClassName)}
        >
          {description}
        </Text>
      )}
    </div>
  );
}

