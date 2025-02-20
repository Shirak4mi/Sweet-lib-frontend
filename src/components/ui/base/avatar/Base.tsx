"use client";
import { Root, Image, Fallback } from "@radix-ui/react-avatar";
import { cn } from "@/utils/functions";

import type { ComponentProps, ReactNode } from "react";

export function Avatar({ className, ...props }: ComponentProps<typeof Root>): ReactNode {
  return (
    <Root
      className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
      data-slot="avatar"
      {...props}
    />
  );
}

export function AvatarImage({ className, ...props }: ComponentProps<typeof Image>): ReactNode {
  return <Image data-slot="avatar-image" className={cn("aspect-square size-full", className)} {...props} />;
}

export function AvatarFallback({ className, ...props }: ComponentProps<typeof Fallback>): ReactNode {
  return (
    <Fallback
      className={cn("bg-muted flex size-full items-center justify-center rounded-full", className)}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}
