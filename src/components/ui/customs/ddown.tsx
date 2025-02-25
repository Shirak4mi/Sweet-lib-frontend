"use client";

import * as React from "react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/base";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Animation variants for the dropdown container
const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -15,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.7, 0, 0.3, 1], // Smooth ease-in with a slight pull-back
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20, // Soft bounce for a fancy touch
      mass: 0.8,
      when: "beforeChildren",
    },
  },
};

// Animation variants for individual menu items
const itemVariants = {
  hidden: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.5, -0.15, 0.2, 1.2], // Luxurious overshoot and settle
    },
  },
};

const FancyDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
            Menu
            <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>

        <AnimatePresence>
          {isOpen && (
            <DropdownMenuContent asChild>
              <motion.div exit="hidden" initial="hidden" animate="visible" variants={dropdownVariants}>
                <motion.div
                  variants={{
                    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                    hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                  }}
                >
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
          )}
        </AnimatePresence>
      </DropdownMenu>
  );
};

export default FancyDropdown;
