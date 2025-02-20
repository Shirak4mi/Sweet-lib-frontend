"use client";
import { type HTMLMotionProps, motion } from "motion/react";
import { cn } from "@/utils/functions";
import Button from "./Base";

import type { IButtonProps } from "@/types";
import type { ReactNode } from "react";

const MotionButton = motion(Button);

// Combine Button props with Motion props, excluding overlapping props
export interface AnimatedButtonProps extends Omit<IButtonProps, keyof HTMLMotionProps<"button">>, HTMLMotionProps<"button"> {
  children: ReactNode;
}
export function AnimatedButton({ className, children, ...props }: AnimatedButtonProps): ReactNode {
  return (
    <MotionButton
      className={cn(className)}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 15,
      }}
      {...props}
    >
      {children}
    </MotionButton>
  );
}
