"use client";
import { type ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getModalVariants } from "@/utils/variants";
import { AnimatedButton, Button } from "@/components/ui";
import { cn } from "@/utils/functions";

export default function SoftAnimatedLogin(): ReactNode {
  //  State
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Constants
  const modalVariants = getModalVariants(isSmallScreen);

  // Functions
  const checkScreenSize = () => setIsSmallScreen((_) => window.innerWidth < 640);
  const handleVisibility = () => setIsOpen((old) => !old);

  // Effects
  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline" isLoading={isOpen}>
        Sign In
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={handleVisibility}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              animate="visible"
              initial="hidden"
              exit="exit"
              className={cn(
                isSmallScreen ? "max-h-[90vh] overflow-y-auto" : "max-h-none overflow-y-visible",
                "bg-background rounded-2xl shadow-lg p-6 w-full sm:max-w-md"
              )}
            >
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                <AnimatedButton type="submit" className="w-full" isLoading>
                  Sign in
                </AnimatedButton>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center text-sm"
              >
                <a href="#" className="text-primary hover:underline">
                  Forgot password?
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
