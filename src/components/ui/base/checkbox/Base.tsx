import { Root, Indicator } from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/utils/functions";

import type { ComponentProps, ReactNode } from "react";

export function Checkbox({ className, ...props }: ComponentProps<typeof Root>): ReactNode {
  return (
    <Root
      className={cn(
        "peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 size-4 shrink-0 rounded-[4px] border shadow-xs transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-0",
        className
      )}
      data-slot="checkbox"
      {...props}
    >
      <Indicator data-slot="checkbox-indicator" className="flex items-center justify-center text-current">
        <CheckIcon className="size-3.5" />
      </Indicator>
    </Root>
  );
}
