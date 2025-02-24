"use client";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./Base";
import { cn } from "@/utils/functions";

import * as React from "react";

interface AdvancedTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number;
  className?: string;
}

export function AdvancedTooltip({ children, content, delayDuration = 0, className }: AdvancedTooltipProps) {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  const springConfig = { damping: 15, stiffness: 300 };
  const springX = useSpring(rotateX, springConfig);
  const springY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <AnimatePresence>
          {open && (
            <TooltipContent
              ref={ref}
              className={cn("overflow-hidden p-0 backdrop-blur-sm bg-background/95", className)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10, filter: "blur(10px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  y: 10,
                  filter: "blur(10px)",
                  transition: {
                    type: "spring",
                    damping: 15,
                    stiffness: 200,
                  },
                }}
                style={{
                  rotateX: springX,
                  rotateY: springY,
                  transformPerspective: 1000,
                }}
                className="relative p-3"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0"
                  initial={false}
                  animate={{
                    opacity: 0.1,
                    background: `radial-gradient(circle at ${position.x}px ${position.y}px, hsl(var(--primary)) 0%, transparent 100%)`,
                  }}
                  transition={{ type: "spring", bounce: 0 }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.1,
                      type: "spring",
                      damping: 20,
                      stiffness: 300,
                    },
                  }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {content}
                </motion.div>
              </motion.div>
            </TooltipContent>
          )}
        </AnimatePresence>
      </Tooltip>
    </TooltipProvider>
  );
}
