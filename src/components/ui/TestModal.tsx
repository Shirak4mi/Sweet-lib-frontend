"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/shad/Button";
import { Input } from "@/components/ui/shad/Input";
import { Label } from "@/components/ui/label";

export default function SoftAnimatedLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Adjust this value as needed
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted", { email, password });
    setIsOpen(false);
  };

  const modalVariants = {
    hidden: isSmallScreen ? { y: "100%", opacity: 1 } : { scale: 0.95, opacity: 0 },
    visible: isSmallScreen ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1 },
    exit: isSmallScreen ? { y: "100%", opacity: 1 } : { scale: 0.95, opacity: 0 },
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline">
        Sign In
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-lg p-6 w-full sm:max-w-md"
              style={{
                maxHeight: isSmallScreen ? "90vh" : "none",
                overflowY: isSmallScreen ? "auto" : "visible",
              }}
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
