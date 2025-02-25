"use client";

import * as React from "react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/base";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/functions";
import { ChevronDown } from "lucide-react";

// Animation variants for the dropdown container
const dropdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1], // Ease-in-back for a subtle pull-back
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.8, 0.3, 1], // Ease-out with a gentle overshoot
      when: "beforeChildren",
    },
  },
};

// Animation variants for individual menu items
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99], // Elastic bounce for a fancy pop
    },
  },
};

// Trigger button animation variants
const triggerVariants = {
  rest: { rotate: 0 },
  hover: { rotate: 180, transition: { duration: 0.3, ease: "easeInOut" } },
};

const FancyDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <motion.button
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            whileHover="hover"
            animate="rest"
            variants={triggerVariants}
          >
            Options
            <motion.span variants={triggerVariants}>
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </DropdownMenuTrigger>

        <AnimatePresence>
          {isOpen && (
            <DropdownMenuContent asChild>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
                className={cn(
                  "w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-1",
                  "backdrop-blur-md bg-opacity-90 dark:bg-opacity-90"
                )}
              >
                <motion.div
                  variants={{
                    visible: { transition: { staggerChildren: 0.05 } },
                    hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                  }}
                >
                  <DropdownMenuItem asChild>
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center px-3 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Profile
                    </motion.div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center px-3 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Settings
                    </motion.div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center px-3 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Log Out
                    </motion.div>
                  </DropdownMenuItem>
                </motion.div>
              </motion.div>
            </DropdownMenuContent>
          )}
        </AnimatePresence>
      </DropdownMenu>
    </div>
  );
};

export default FancyDropdown;
