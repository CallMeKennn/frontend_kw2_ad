import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.ComponentProps<typeof Input>;

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, type, ...props }, ref) => {
     return (
          <input
               type={type}
               className={cn(
                    'dark:text-black flex h-10 w-full bg-none rounded-md px-3 py-4 text-base placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus:border-blue-500',
                    className,
               )}
               ref={ref}
               {...props}
          />
     );
});

Input.displayName = 'Input';

export { Input };
