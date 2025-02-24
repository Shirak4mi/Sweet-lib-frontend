"use client";
import { type TToggleVariants, toggleVariants } from "@/utils/variants";
import { Root } from "@radix-ui/react-toggle";
import { cn } from "@/utils/functions";

import type { ComponentProps, ReactNode } from "react";

interface IToggleProps extends ComponentProps<typeof Root>, TToggleVariants {}

export default function Toggle({ className, variant, size, ...props }: IToggleProps): ReactNode {
  return <Root data-slot="toggle" className={cn(toggleVariants({ variant, size, className }))} {...props} />;
}
