import type { Transition, Variants } from "motion/react";

export const skeletonVariants = {
  avatar: "h-12 w-12 rounded-full",
  card: "h-48 w-full rounded-xl",
  button: "h-10 w-24 rounded-md",
  default: "h-4 w-full",
  text: "h-4 w-3/4",
};

export const skeletonShimmerVariants: Variants = {
  animate: { backgroundPosition: ["1000px 0", "-1000px 0"] },
  initial: { backgroundPosition: "-1000px 0" },
};

export const skeletonPulseVariants: Variants = { initial: { opacity: 0.5 }, animate: { opacity: [0.5, 0.8, 0.5] } };

export const MoonSvgVariants: Variants = { animate: { rotate: [0, -10, 10, -5, 5, 0] }, normal: { rotate: 0 } };

export const MoonSvgTransition: Transition = { ease: "easeInOut", duration: 1.2 };

export const BookCardVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

export function getModalVariants(isSmall: boolean): Variants {
  return isSmall
    ? { hidden: { y: "100%", opacity: 1 }, visible: { y: 0, opacity: 1 }, exit: { y: "100%", opacity: 1 } }
    : { hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1 }, exit: { scale: 0.95, opacity: 0 } };
}

export function getSkeletonTransition(pulse: boolean): Transition {
  return pulse
    ? { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
    : { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" };
}

export const menuItemDropdownVariants: Variants = {
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 15, mass: 0.8 } },
  hidden: { opacity: 0, y: -10, transition: { duration: 0.3, ease: [0.7, 0.1, 0.3, 1] } },
};
