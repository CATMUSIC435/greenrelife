import * as React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
}

export function SectionTitle({
  title,
  subtitle,
  alignment = 'center',
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'mb-8',
        alignment === 'center' && 'text-center',
        alignment === 'right' && 'text-right',
        className
      )}
      {...props}
    >
      <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
