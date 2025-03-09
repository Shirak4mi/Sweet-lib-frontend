"use client";
import { ComponentType, memo, NamedExoticComponent, ReactNode, useMemo, useRef } from "react";
import { motion, useInView } from "motion/react";

// Optimized Higher Order Component for blur effects
export default function withBlurEffect<P extends object>(Component: ComponentType<P>): NamedExoticComponent<P> {
  return memo(function WithBlurEffectComponent(props: P): ReactNode {
    // Refs
    const ref = useRef(null);

    // Hooks
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    // Memoize the style to prevent re-renders
    const blurStyle = useMemo(
      () => ({
        filter: isInView ? "blur(0px)" : "blur(8px)",
        opacity: isInView ? 1 : 0.6,
        transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s",
        willChange: "filter, opacity",
      }),
      [isInView]
    );

    return (
      <motion.div ref={ref} style={blurStyle}>
        <Component {...props} />
      </motion.div>
    );
  });
}
