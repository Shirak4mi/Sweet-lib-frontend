"use client";
import { menuItemDropdownVariants } from "@/utils/variants/animated.ts";
import useClickOutside from "@/utils/hooks/useClickOutside";
import { type ReactNode, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import type { IDropdownMenuProps } from "@/types/components.ts";

export default function NavbarDropdownMenu({ trigger, children, width = "w-[200px]" }: IDropdownMenuProps): ReactNode {
  // Ref
  const dropdownRef = useRef<HTMLDivElement>(null);

  // State
  const [isOpen, setIsOpen] = useState(false);

  // Hooks
  useClickOutside(dropdownRef, () => setIsOpen(() => false));

  // Functions
  function handleOpen(): void {
    setIsOpen((old) => !old);
  }

  return (
    <div className="relative" ref={dropdownRef} id={trigger}>
      <button onClick={handleOpen} className="flex items-center text-sm font-medium transition-colors focus:outline-none">
        {trigger}
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            exit="hidden"
            initial="hidden"
            animate="visible"
            variants={menuItemDropdownVariants}
            className={`absolute z-10 mt-2 ${width} origin-top-right`}
          >
            <div className="bg-white/80 backdrop-blur-xl shadow-lg rounded-md border border-gray-200/50">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
