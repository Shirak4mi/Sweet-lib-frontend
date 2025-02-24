import { cn } from "@/utils/functions";

import type { ComponentProps, ReactNode } from "react";

export default function Skeleton({ className, ...props }: ComponentProps<"div">): ReactNode {
  return <div data-slot="skeleton" className={cn("bg-primary/10 animate-pulse rounded-md", className)} {...props} />;
}
