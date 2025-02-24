"use client";
import { type MotionValue, motion, useSpring, useTransform } from "motion/react";
import { type ReactNode, useEffect } from "react";
import { DFMT } from "@/utils/functions";

import type { IAnimatedNumberProps } from "@/types/components.tsx";

export function AnimatedNumber(props: IAnimatedNumberProps): ReactNode {
  // Props
  const { value, mass = 0.8, stiffness = 75, damping = 15, precision = 0, format = DFMT, onAnimInit, onAnimDone } = props;

  // Hooks
  const spring = useSpring(value, { mass, stiffness, damping });
  const display: MotionValue<string> = useTransform(spring, (curr) => format(parseFloat(curr.toFixed(precision))));

  useEffect(() => {
    spring.set(value);
    if (onAnimInit) onAnimInit();
    const unsubscribe = spring.on("change", () => {
      if (spring.get() === value && onAnimDone) onAnimDone();
    });
    return () => unsubscribe();
  }, [spring, value, onAnimInit, onAnimDone]);

  return <motion.span>{display}</motion.span>;
}
