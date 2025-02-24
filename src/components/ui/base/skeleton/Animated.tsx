"use client";
import { skeletonPulseVariants, skeletonShimmerVariants, skeletonVariants } from "@/utils/variants/animated.ts";
import { cn } from "@/utils/functions";
import { motion } from "motion/react";

import type { IAnimatedSkeletonProps } from "@/types/components";
import type { ReactNode } from "react";

export default function AnimatedSkeleton(props: IAnimatedSkeletonProps): ReactNode {
  // Props
  const { variant = "default", shimmer = true, pulse = false, className, ...eProps } = props;

  return (
    <motion.div
      variants={pulse ? skeletonPulseVariants : skeletonShimmerVariants}
      initial="initial"
      animate="animate"
      transition={
        pulse
          ? {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }
          : {
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }
      }
      className={cn(
        "relative isolate overflow-hidden rounded-md bg-muted",
        skeletonVariants[variant],
        shimmer &&
          "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        className
      )}
      {...eProps}
    />
  );
}
