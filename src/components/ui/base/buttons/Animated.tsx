"use client";
import { cn } from "@/utils/functions";
import { motion } from "motion/react";
import Button from "./Base.tsx";

import type { IAnimatedButtonProps } from "@/types/components.ts";
import type { ReactNode } from "react";

const MotionButton = motion.create(Button);

export default function AnimatedButton({ className, children, ...props }: IAnimatedButtonProps): ReactNode {
	return (
		<MotionButton
			transition={{ type: "spring", stiffness: 500, damping: 15 }}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.95 }}
			className={cn(className)}
			{...props}>
			{children}
		</MotionButton>
	);
}
