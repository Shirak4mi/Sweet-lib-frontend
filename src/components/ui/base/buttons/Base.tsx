import { buttonVariants } from "@/utils/variants";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/functions";

import type { IButtonProps } from "@/types/components.ts";
import type { ReactNode } from "react";

export default function Button({ className, variant, size, asChild = false, ...props }: IButtonProps): ReactNode {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
