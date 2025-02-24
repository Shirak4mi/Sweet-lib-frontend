"use client";
import { Root } from "@radix-ui/react-label";
import { cn } from "@/utils/functions";

import type { ComponentProps, ReactNode } from "react";

export function Label({ className, ...props }: ComponentProps<typeof Root>): ReactNode {
  return (
    <Root
      data-slot="label"
      className={cn(
        "text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
