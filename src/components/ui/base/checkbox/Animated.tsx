"use client";
import { Root, Indicator } from "@radix-ui/react-checkbox";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/utils/functions";

import type { ComponentProps, ReactNode } from "react";

const MotionCheckboxIndicator = motion.create(Indicator);

export default function AnimatedCheckbox({ className, ...props }: ComponentProps<typeof Root>): ReactNode {
  return (
    <Root
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        "transition-colors duration-200",
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait">
        <MotionCheckboxIndicator
          animate={{ transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] }, opacity: 1, scale: 1 }}
          exit={{ transition: { duration: 0.1, ease: [0.23, 1, 0.32, 1] }, opacity: 0, scale: 0.5 }}
          className={cn("flex items-center justify-center text-current")}
          initial={{ opacity: 0, scale: 0.5 }}
        >
          <motion.svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              d="M2 6L4.5 8.5L10 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                transition: { pathLength: { duration: 0.2, ease: "easeOut", delay: 0.1 }, opacity: { duration: 0.05 } },
                pathLength: 1,
                opacity: 1,
              }}
              exit={{
                transition: { pathLength: { duration: 0.2, ease: "easeIn" }, opacity: { duration: 0.1, delay: 0.1 } },
                pathLength: 0,
                opacity: 0,
              }}
            />
          </motion.svg>
        </MotionCheckboxIndicator>
      </AnimatePresence>
    </Root>
  );
}
