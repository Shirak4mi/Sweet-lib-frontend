import { type TAlertVariants, alertVariants } from "@/utils/variants";
import { cn } from "@/utils/functions";

import type { VariantProps } from "class-variance-authority";
import type { TAlertDivProps } from "@/types/components.ts";
import type { ReactNode } from "react";

export function Alert({ className, variant, ...props }: TAlertDivProps & VariantProps<TAlertVariants>): ReactNode {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

export function AlertTitle({ className, ...props }: TAlertDivProps): ReactNode {
  return (
    <div
      className={cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className)}
      data-slot="alert-title"
      {...props}
    />
  );
}

export function AlertDescription({ className, ...props }: TAlertDivProps): ReactNode {
  return (
    <div
      className={cn("col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", className)}
      data-slot="alert-description"
      {...props}
    />
  );
}
