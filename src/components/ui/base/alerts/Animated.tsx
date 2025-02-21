"use client";
import { cn } from "@/utils/functions";
import { motion } from "motion/react";
import { Alert } from "./Base.tsx";

import type { IAnimatedAlertProps } from "@/types/components.ts";
import type { ReactNode } from "react";

const MotionAlert = motion.create(Alert);

export default function AnimatedAlert({ className, children, ...props }: IAnimatedAlertProps): ReactNode {
  return (
    <MotionAlert
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </MotionAlert>
  );
}
