"use client";

import { badgeVariants, TBadgeVariants } from "@/utils/variants";
import { Slot } from "@radix-ui/react-slot";
import { HTMLMotionProps, motion } from "motion/react";
import { cn } from "@/utils/functions";

import type { HTMLAttributes, ReactNode } from "react";

export interface IBadgeProps extends HTMLAttributes<HTMLDivElement>, HTMLMotionProps<"div">, TBadgeVariants {
  asChild?: boolean;
  removeIcon?: boolean;
}

export default function AnimatedBadge(props: IBadgeProps): ReactNode {
  // Props
  const { variant, className, asChild, removeIcon, children, ...eprops } = props;

  const Comp = asChild ? Slot : motion.div;

  return (
    <Comp
      exit={{ scale: 0.8, opacity: 0, y: -10, transition: { type: "spring", stiffness: 300, damping: 20, mass: 0.5 } }}
      animate={{ scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20, mass: 0.5 } }}
      whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10, mass: 0.5 } }}
      whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 10, mass: 0.5 } }}
      className={cn(badgeVariants({ variant }), className)}
      initial={{ scale: 0.8, opacity: 0, y: 10 }}
      layoutDependency={false}
      layout="position"
      {...eprops}
    >
      {children}
      {removeIcon && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            transition: { delay: 0.1, type: "spring", stiffness: 400, damping: 20, mass: 0.5 },
            opacity: 0.6,
            scale: 1,
          }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{
            opacity: 1,
            scale: 1.1,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 20,
              mass: 0.5,
            },
          }}
          className="ml-1 cursor-pointer"
        >
          ×
        </motion.span>
      )}
    </Comp>
  );
}
