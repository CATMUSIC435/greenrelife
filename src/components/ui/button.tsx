import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out active:scale-95 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm hover:opacity-90',
        destructive:
          'bg-destructive text-white shadow-sm hover:opacity-90 focus-visible:ring-destructive/20 dark:bg-destructive/90 dark:focus-visible:ring-destructive/40',
        outline:
          'border border-border/50 bg-background/50 backdrop-blur-md shadow-sm hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary/80 backdrop-blur-md text-secondary-foreground hover:bg-secondary',
        ghost:
          'hover:bg-accent/50 hover:text-accent-foreground dark:hover:bg-accent/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        'default': 'h-10 px-5 py-2 has-[>svg]:px-4',
        'sm': 'h-8 px-4 text-xs has-[>svg]:px-3',
        'lg': 'h-12 px-8 text-base has-[>svg]:px-6',
        'icon': 'size-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
