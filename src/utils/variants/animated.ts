import type { Transition, Variants } from "motion/react";

export const skeletonVariants = {
  default: "h-4 w-full",
  card: "h-48 w-full rounded-xl",
  text: "h-4 w-3/4",
  avatar: "h-12 w-12 rounded-full",
  button: "h-10 w-24 rounded-md",
};

export const skeletonShimmerVariants = {
  initial: {
    backgroundPosition: "-1000px 0",
  },
  animate: {
    backgroundPosition: ["1000px 0", "-1000px 0"],
  },
};

export const skeletonPulseVariants = {
  initial: {
    opacity: 0.5,
  },
  animate: {
    opacity: [0.5, 0.8, 0.5],
  },
};

export const MoonSvgVariants: Variants = {
  animate: { rotate: [0, -10, 10, -5, 5, 0] },
  normal: { rotate: 0 },
};

export const MoonSvgTransition: Transition = {
  ease: "easeInOut",
  duration: 1.2,
};

export const BookCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export function getModalVariants(isSmall: boolean): Variants {
  return isSmall
    ? { hidden: { y: "100%", opacity: 1 }, visible: { y: 0, opacity: 1 }, exit: { y: "100%", opacity: 1 } }
    : { hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1 }, exit: { scale: 0.95, opacity: 0 } };
}
