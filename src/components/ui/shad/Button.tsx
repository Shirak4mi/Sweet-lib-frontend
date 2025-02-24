import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { type TButtonVariants, buttonVariants } from "@/utils/variants";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/functions";

import type { VariantProps } from "class-variance-authority";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<TButtonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref): ReactNode => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
  }
);

Button.displayName = "Button";
