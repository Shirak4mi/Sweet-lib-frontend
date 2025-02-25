import useClickOutside from "@/utils/hooks/useClickOutside";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ReactElement, ReactNode, useRef, useState } from "react";

interface IDropdownMenuProps {
  children?: ReactElement;
  trigger?: string;
  width?: string;
}

const menuVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.7, 0.1, 0.3, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      mass: 0.8,
    },
  },
};

export default function DropdownMenu({ trigger, children, width = "w-[200px]" }: IDropdownMenuProps): ReactNode {
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
      <button
        onClick={handleOpen}
        className="flex items-center text-sm font-medium text-gray-700 hover:text-black transition-colors focus:outline-none"
      >
        {trigger}
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className={`absolute z-10 mt-2 ${width} origin-top-right`}
          >
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-md border border-gray-200/50">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
