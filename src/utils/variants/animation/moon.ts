import type { Transition, Variants } from "motion/react";

export const svgVariants: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -10, 10, -5, 5, 0],
  },
};

export const svgTransition: Transition = {
  duration: 1.2,
  ease: "easeInOut",
};
