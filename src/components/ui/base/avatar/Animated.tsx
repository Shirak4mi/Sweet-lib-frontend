"use client";
import { Avatar, AvatarImage, AvatarFallback } from "./Base.tsx";
import { motion } from "framer-motion";
import { cn } from "@/utils/functions";

import type { IAnimatedAvatarProps } from "@/types/components.ts";
import type { ReactNode } from "react";

const MotionAvatar = motion.create(Avatar);
const MotionAvatarImage = motion.create(AvatarImage);
const MotionAvatarFallback = motion.create(AvatarFallback);

export default function AnimatedAvatar(compProps: IAnimatedAvatarProps): ReactNode {
  // Props
  const { className, src, alt, fallback, delayMs = 0, showRing = true, ...props } = compProps;

  return (
    <div className="relative group">
      {showRing && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/10"
          transition={{ duration: 0.2, ease: "easeOut" }}
          whileHover={{ opacity: 1, scale: 1.2 }}
          initial={{ opacity: 0, scale: 1 }}
        />
      )}
      <MotionAvatar
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: delayMs }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className={cn(
          "cursor-pointer relative border-2 border-transparent transition-colors duration-200",
          "group-hover:border-primary/20",
          className
        )}
        {...props}
      >
        <MotionAvatarImage
          transition={{ duration: 0.2, delay: delayMs + 0.1 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          alt={alt || "Avatar"}
          src={src}
        />
        <MotionAvatarFallback
          transition={{ duration: 0.2, delay: delayMs + 0.1 }}
          className="bg-muted font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {fallback || (alt ?? "Avatar").charAt(0) || "A"}
        </MotionAvatarFallback>
      </MotionAvatar>
    </div>
  );
}
