"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/components/ui/base";
import { ArchiveRestoreIcon, ChevronDownIcon, PlusIcon, Share2Icon, TrashIcon } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Memoized framework options
const FRAMEWORK_OPTIONS = [
  { value: "nextjs", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit", disabled: true },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

// Smooth, cozy animations for dropdown content
const contentVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1], // Smooth, cozy easing
      staggerChildren: 0.05, // Gentle stagger for warmth
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -5,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1], // Soft exit
    },
  },
};

// Smooth item variants
const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1], // Silky smooth
      delay: i * 0.05,
    },
  }),
  hover: {
    scale: 1.02,
    x: 2,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
  tap: { scale: 0.98, transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } },
};

// Smooth submenu content
const subContentVariants = {
  hidden: { opacity: 0, scale: 0.95, x: 5 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.04,
    },
  },
  exit: { opacity: 0, scale: 0.98, x: 5, transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } },
};

export default function Component() {
  const prefersReducedMotion = useReducedMotion();
  const [framework, setFramework] = useState("nextjs");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [open, setOpen] = useState(false);

  const handleFrameworkChange = useCallback((value: string) => setFramework(value), []);
  const handleEmailNotificationsChange = useCallback((checked: boolean) => setEmailNotifications(checked), []);
  const handlePushNotificationsChange = useCallback((checked: boolean) => setPushNotifications(checked), []);

  const frameworkItems = useMemo(
    () =>
      FRAMEWORK_OPTIONS.map((item, i) => (
        <DropdownMenuRadioItem key={item.value} value={item.value} disabled={item.disabled}>
          <motion.div
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            className="w-full cursor-pointer"
          >
            {item.label}
          </motion.div>
        </DropdownMenuRadioItem>
      )),
    []
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <Button variant="outline" className="flex items-center gap-2">
            Rich menu with icons
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
              <ChevronDownIcon className="-me-1 opacity-60" size={16} aria-hidden="true" />
            </motion.span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>

      <AnimatePresence>
        {open && (
          <DropdownMenuContent sideOffset={5} className="p-0 overflow-hidden border-none">
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-56 shadow-lg rounded-md bg-white dark:bg-gray-900 p-1"
              layout
            >
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <motion.div
                    custom={0}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    className="flex items-center gap-2 w-full cursor-pointer"
                  >
                    <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 0.4, ease: "easeInOut" }}>
                      <PlusIcon size={16} className="opacity-60" aria-hidden="true" />
                    </motion.div>
                    <span>New</span>
                    <span className="ml-auto text-xs opacity-60">⌘N</span>
                  </motion.div>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="dark:bg-gray-700" />

              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <motion.div
                      custom={1}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      className="flex items-center gap-2 w-full cursor-pointer"
                    >
                      <span>Framework</span>
                    </motion.div>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="p-0 overflow-hidden border-none">
                      <motion.div
                        variants={subContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="p-1 bg-white dark:bg-gray-900"
                        layout
                      >
                        <DropdownMenuRadioGroup value={framework} onValueChange={handleFrameworkChange}>
                          {frameworkItems}
                        </DropdownMenuRadioGroup>
                      </motion.div>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <motion.div
                      custom={2}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      className="flex items-center gap-2 w-full cursor-pointer"
                    >
                      <span>Notifications</span>
                    </motion.div>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="p-0 overflow-hidden border-none">
                      <motion.div
                        variants={subContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="p-1 bg-white dark:bg-gray-900"
                        layout
                      >
                        <DropdownMenuCheckboxItem
                          checked={emailNotifications}
                          onCheckedChange={handleEmailNotificationsChange}
                        >
                          <motion.div
                            custom={0}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            whileTap="tap"
                            className="w-full cursor-pointer"
                          >
                            Email
                          </motion.div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={pushNotifications}
                          onCheckedChange={handlePushNotificationsChange}
                        >
                          <motion.div
                            custom={1}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            whileTap="tap"
                            className="w-full cursor-pointer"
                          >
                            Push
                          </motion.div>
                        </DropdownMenuCheckboxItem>
                      </motion.div>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="dark:bg-gray-700" />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <motion.div
                    custom={3}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    className="flex items-center gap-2 w-full cursor-pointer"
                  >
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                      <Share2Icon size={16} className="opacity-60" aria-hidden="true" />
                    </motion.div>
                    <span>Share</span>
                  </motion.div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <motion.div
                    custom={4}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    className="flex items-center gap-2 w-full cursor-pointer"
                  >
                    <motion.div animate={{ y: [0, -1, 0] }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                      <ArchiveRestoreIcon size={16} className="opacity-60" aria-hidden="true" />
                    </motion.div>
                    <span>Archive</span>
                  </motion.div>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="dark:bg-gray-700" />

              <DropdownMenuItem variant="destructive">
                <motion.div
                  custom={5}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ ...itemVariants.hover, color: "#ef4444" }}
                  whileTap="tap"
                  className="flex items-center gap-2 w-full cursor-pointer text-red-500 dark:text-red-400"
                >
                  <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 0.4, ease: "easeInOut" }}>
                    <TrashIcon size={16} aria-hidden="true" />
                  </motion.div>
                  <span>Delete</span>
                  <span className="ml-auto text-xs opacity-60">⌘⌫</span>
                </motion.div>
              </DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}
