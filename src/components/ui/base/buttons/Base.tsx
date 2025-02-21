import { buttonVariants } from "@/utils/variants";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/functions";

import type { IButtonProps } from "@/types/components.ts";
import type { ReactNode } from "react";

export default function Button({ className, variant, size, asChild = false, isLoading, ...props }: IButtonProps): ReactNode {
  // Component Instancing
  const Comp = asChild ? Slot : "button";

  // Tailwind Classes
  const btcn = "";

  return (
    <Comp
      className={cn(isLoading && "cursor-progress ", buttonVariants({ variant, size, className }))}
      data-slot="button"
      {...props}
    />
  );
}
