"use client";
import { Provider, Root, Trigger, Portal, Content, Arrow } from "@radix-ui/react-tooltip";
import { cn } from "@/utils/functions";

import { ComponentProps, ReactNode } from "react";


export function TooltipProvider({ delayDuration = 0, ...props }: ComponentProps<typeof Provider>): ReactNode {
  return <Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}

export function Tooltip({ ...props }: ComponentProps<typeof Root>): ReactNode {
  return (
    <TooltipProvider>
      <Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

export function TooltipTrigger({ ...props }: ComponentProps<typeof Trigger>): ReactNode {
  return <Trigger data-slot="tooltip-trigger" {...props} />;
}

export function TooltipContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: ComponentProps<typeof Content>): ReactNode {
  return (
    <Portal>
      <Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-w-sm rounded-md px-3 py-1.5 text-xs",
          className
        )}
        {...props}
      >
        {children}
        <Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </Content>
    </Portal>
  );
}
