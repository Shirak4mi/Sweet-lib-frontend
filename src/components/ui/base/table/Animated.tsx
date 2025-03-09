"use client";
import { HTMLMotionProps, motion } from "motion/react";
import { cn } from "@/utils/functions";

import type { ReactNode } from "react";

export function Table({ className, ...props }: HTMLMotionProps<"table">): ReactNode {
  return (
    <div className="relative w-full overflow-auto">
      <motion.table data-slot="table" className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: HTMLMotionProps<"thead">): ReactNode {
  return <motion.thead data-slot="table-header" className={cn("[&_tr]:border-b", className)} {...props} />;
}

export function TableBody({ className, ...props }: HTMLMotionProps<"tbody">): ReactNode {
  return <motion.tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

export function TableFooter({ className, ...props }: HTMLMotionProps<"tfoot">): ReactNode {
  return (
    <motion.tfoot
      data-slot="table-footer"
      className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: HTMLMotionProps<"tr">): ReactNode {
  return (
    <motion.tr
      data-slot="table-row"
      className={cn("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: HTMLMotionProps<"th">): ReactNode {
  return (
    <motion.th
      data-slot="table-head"
      className={cn(
        "text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: HTMLMotionProps<"td">): ReactNode {
  return (
    <motion.td
      data-slot="table-cell"
      className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
      {...props}
    />
  );
}

export function TableCaption({ className, ...props }: HTMLMotionProps<"caption">): ReactNode {
  return (
    <motion.caption data-slot="table-caption" className={cn("text-muted-foreground mt-4 text-sm", className)} {...props} />
  );
}
