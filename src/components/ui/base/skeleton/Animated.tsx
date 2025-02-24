"use client";
import { cn } from "@/utils/functions";
import { motion } from "motion/react";
import {
  skeletonVariants,
  getSkeletonTransition,
  skeletonPulseVariants,
  skeletonShimmerVariants,
} from "@/utils/variants/animated.ts";

import type { IAnimatedSkeletonProps } from "@/types/components";
import type { ReactNode } from "react";

export default function AnimatedSkeleton(props: IAnimatedSkeletonProps): ReactNode {
  // Props
  const { variant = "default", shimmer = true, pulse = false, className, ...eProps } = props;

  // Constants
  const skellVars = pulse ? skeletonPulseVariants : skeletonShimmerVariants;
  const skellTrs = getSkeletonTransition(pulse);

  return (
    <motion.div
      transition={skellTrs}
      variants={skellVars}
      initial="initial"
      animate="animate"
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
