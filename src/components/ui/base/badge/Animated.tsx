"use client";

import { badgeVariants } from "@/utils/variants";
import { cn } from "@/utils/functions";
import { motion } from "motion/react";
import Badge from "./Base";

import type { IAnimatedBadgeProps } from "@/types";
import type { ReactNode } from "react";

const MotionBadge = motion.create(Badge);

export default function AnimatedBadge(props: IAnimatedBadgeProps): ReactNode {
  // Props
  const { variant, className, asChild, removeIcon, children, ...eprops } = props;

  return (
    <MotionBadge
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
    </MotionBadge>
  );
}
