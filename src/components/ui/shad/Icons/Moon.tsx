"use client";
import { type MouseEvent, forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { svgTransition, svgVariants } from "@/utils/variants";
import { motion, useAnimation } from "motion/react";

import type { IAnimatedIconHandle } from "@/types/components";
import type { HTMLAttributes } from "react";

const MoonIcon = forwardRef<IAnimatedIconHandle, HTMLAttributes<HTMLDivElement>>(
  ({ onMouseEnter, onMouseLeave, ...props }, ref) => {
    // Hooks
    const isControlledRef = useRef(false);
    const controls = useAnimation();

    // Handlers
    useImperativeHandle(ref, (): IAnimatedIconHandle => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    // Callbacks
    const handleMouseEnter = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start("animate");
        else onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start("normal");
        else onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          width="28"
          height="28"
          fill="none"
          strokeWidth="2"
          animate={controls}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={svgVariants}
          transition={svgTransition}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </motion.svg>
      </div>
    );
  }
);

MoonIcon.displayName = "MoonIcon";

export { MoonIcon };
