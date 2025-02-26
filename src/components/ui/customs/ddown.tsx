"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/base";
import { AnimatePresence, motion, Variants } from "motion/react";
import { ChevronDown } from "lucide-react";

import type { ReactNode } from "react";

// Animation variants for the dropdown container
export const dropdownVariants: Variants = {
  hidden: {
    y: -15,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.3, ease: [0.7, 0, 0.3, 1], when: "afterChildren" },
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20, mass: 0.8, when: "beforeChildren" },
  },
};

// Animation variants for individual menu items
export const itemVariants: Variants = {
  visible: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.5, -0.15, 0.2, 1.2] } },
  hidden: { x: -10, opacity: 0, transition: { duration: 0.2 } },
};

export const dropdownContentVariants: Variants = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

export default function FancyDropdown(): ReactNode {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
          Menu
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>

      <AnimatePresence mode="sync">
        <DropdownMenuContent asChild>
          <motion.div exit="hidden" initial="hidden" animate="visible" variants={dropdownVariants}>
            <motion.div variants={dropdownContentVariants}>
              <DropdownMenuItem asChild>
                <motion.div variants={itemVariants}>Profile</motion.div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <motion.div variants={itemVariants}>Settings</motion.div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <motion.div variants={itemVariants}>Log Out</motion.div>
              </DropdownMenuItem>
            </motion.div>
          </motion.div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  );
}
