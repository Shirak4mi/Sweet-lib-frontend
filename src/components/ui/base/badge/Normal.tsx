import { badgeVariants } from "@/utils/variants";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/functions";

import type { IBadgeProps } from "@/types/components.tsx";
import type { ReactNode } from "react";

export default function Badge({ className, variant, asChild = false, ...props }: IBadgeProps): ReactNode {
  const Comp = asChild ? Slot : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}
