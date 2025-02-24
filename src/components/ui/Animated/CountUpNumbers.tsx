"use client";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";
import { cn } from "@/utils/functions";

import type { ICountUpNumbersProps } from "@/types/components.ts";

export default function CountUpNumbers({
  startWhen = true,
  direction = "up",
  className = "",
  separator = "",
  duration = 2,
  delay = 0,
  from = 0,
  onStart,
  onEnd,
  to,
}: ICountUpNumbersProps): ReactNode {
  // Refs
  const ref = useRef<HTMLSpanElement>(null);

  // Calculate damping and stiffness based on duration
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  // Hooks
  const motionValue = useMotionValue(direction === "down" ? to : from);
  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  // Set initial text content to the initial value based on direction
  useEffect(() => {
    if (ref.current) ref.current.textContent = String(direction === "down" ? to : from);
  }, [from, to, direction]);

  // Start the animation when in view and startWhen is true
  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === "function") onStart();
      const timeoutId = setTimeout(() => motionValue.set(direction === "down" ? from : to), delay * 1000);
      const durationTimeoutId = setTimeout(() => typeof onEnd === "function" && onEnd(), delay * 1000 + duration * 1000);
      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  // Update text content with formatted number on spring value change
  useEffect(() => {
    return () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          const options = { useGrouping: !!separator, minimumFractionDigits: 0, maximumFractionDigits: 0 };
          const formattedNumber = Intl.NumberFormat("en-US", options).format(Number(latest.toFixed(0)));
          ref.current.textContent = separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
        }
      })();
  }, [springValue, separator]);

  return <span className={cn(className)} ref={ref} />;
}
