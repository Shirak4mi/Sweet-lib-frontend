"use client";
import * as React from "react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/base";
import { cn } from "@/utils/functions";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Assuming lucide-react for icons

// Menu container variants for dropdowns
const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: {
      duration: 0.4,
      ease: [0.7, 0.1, 0.3, 1],
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      mass: 0.8,
    },
  },
};

// Mobile menu variants (full-screen slide-in)
const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    x: "-100%", // Slide in from left
    transition: {
      duration: 0.3,
      ease: [0.7, 0.1, 0.3, 1],
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 0.8,
    },
  },
};

// Menu item variants for both dropdowns and mobile
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.5,
    },
  },
};

const VercelNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full max-w-7xl mx-auto py-4 px-6">
      {/* Vercel Logo */}
      <a href="/" className="text-xl font-bold text-black z-20">
        Vercel
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            {/* Product Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                Product
              </NavigationMenuTrigger>
              <AnimatePresence>
                <motion.div initial="hidden" animate="visible" exit="hidden" variants={menuVariants}>
                  <NavigationMenuContent
                    className={cn(
                      "p-4 bg-white/80 backdrop-blur-md shadow-lg rounded-md border border-gray-200/50 w-[400px]"
                    )}
                  >
                    <motion.ul
                      className="grid gap-3 p-2"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                        hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                      }}
                    >
                      <motion.li variants={itemVariants}>
                        <NavigationMenuLink
                          href="/product/nextjs"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100/50"
                          )}
                        >
                          <div className="text-sm font-medium text-gray-900">Next.js</div>
                          <p className="text-sm text-gray-500">The React Framework</p>
                        </NavigationMenuLink>
                      </motion.li>
                      <motion.li variants={itemVariants}>
                        <NavigationMenuLink
                          href="/product/vercel-platform"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100/50"
                          )}
                        >
                          <div className="text-sm font-medium text-gray-900">Vercel Platform</div>
                          <p className="text-sm text-gray-500">Deploy with ease</p>
                        </NavigationMenuLink>
                      </motion.li>
                    </motion.ul>
                  </NavigationMenuContent>
                </motion.div>
              </AnimatePresence>
            </NavigationMenuItem>

            {/* Solutions Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                Solutions
              </NavigationMenuTrigger>
              <AnimatePresence>
                <motion.div initial="hidden" animate="visible" exit="hidden" variants={menuVariants}>
                  <NavigationMenuContent
                    className={cn(
                      "p-4 bg-white/80 backdrop-blur-md shadow-lg rounded-md border border-gray-200/50 w-[400px]"
                    )}
                  >
                    <motion.ul
                      className="grid gap-3 p-2"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                        hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                      }}
                    >
                      <motion.li variants={itemVariants}>
                        <NavigationMenuLink
                          href="/solutions/enterprise"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100/50"
                          )}
                        >
                          <div className="text-sm font-medium text-gray-900">Enterprise</div>
                          <p className="text-sm text-gray-500">Scale with confidence</p>
                        </NavigationMenuLink>
                      </motion.li>
                      <motion.li variants={itemVariants}>
                        <NavigationMenuLink
                          href="/solutions/startups"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100/50"
                          )}
                        >
                          <div className="text-sm font-medium text-gray-900">Startups</div>
                          <p className="text-sm text-gray-500">Launch fast</p>
                        </NavigationMenuLink>
                      </motion.li>
                    </motion.ul>
                  </NavigationMenuContent>
                </motion.div>
              </AnimatePresence>
            </NavigationMenuItem>

            {/* Pricing Link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/pricing"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Docs Link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/docs"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                Docs
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Auth Buttons */}
        <div className="flex items-center gap-4">
          <a href="/login" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
            Sign In
          </a>
          <a
            href="/signup"
            className="text-sm font-medium bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Sign Up
          </a>
        </div>
      </div>

      {/* Mobile Hamburger Toggle */}
      <button className="md:hidden z-20" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="fixed inset-0 bg-white/95 backdrop-blur-md flex flex-col items-start justify-center p-6 md:hidden z-10"
          >
            <motion.ul
              className="space-y-6 w-full"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
            >
              <motion.li variants={itemVariants}>
                <a
                  href="/product"
                  className="text-lg font-medium text-gray-900 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Product
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a
                  href="/solutions"
                  className="text-lg font-medium text-gray-900 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Solutions
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a
                  href="/pricing"
                  className="text-lg font-medium text-gray-900 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a
                  href="/docs"
                  className="text-lg font-medium text-gray-900 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Docs
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a
                  href="/login"
                  className="text-lg font-medium text-gray-900 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a
                  href="/signup"
                  className="text-lg font-medium bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 inline-block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VercelNavbar;
