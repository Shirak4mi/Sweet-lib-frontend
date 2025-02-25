"use client";

import { motion, AnimatePresence } from "motion/react";
import { NavbarDropdown } from "@/components/ui/base";
import { type ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";

// Mobile menu variants
const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    x: "-100%",
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

// Menu item variants
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

export default function VercelNavbar(): ReactNode {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full max-w-7xl mx-auto py-4 px-6">
      {/* Vercel Logo */}
      <a href="/" className="text-xl font-bold text-black z-20">
        Vercel
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex gap-6">
          {/* Solutions Dropdown */}

          <NavbarDropdown trigger="Solutions" width="w-[400px]">
            <div className="p-4">
              <ul className="grid gap-3 p-2">
                <li>
                  <a
                    href="/solutions/enterprise"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100/50"
                  >
                    <div className="text-sm font-medium text-gray-900">Enterprise</div>
                    <p className="text-sm text-gray-500">Scale with confidence</p>
                  </a>
                </li>
                <li>
                  <a
                    href="/solutions/startups"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100/50"
                  >
                    <div className="text-sm font-medium text-gray-900">Startups</div>
                    <p className="text-sm text-gray-500">Launch fast</p>
                  </a>
                </li>
              </ul>
            </div>
          </NavbarDropdown>

          {/* Pricing Link */}
          <a href="/pricing" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
            Pricing
          </a>

          {/* Docs Link */}
          <a href="/docs" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
            Docs
          </a>

          {/* Product Dropdown */}
          <NavbarDropdown trigger="Product" width="w-[200px]">
            <div className="p-2">
              <ul className="grid gap-2 p-1">
                <li>
                  <a
                    href="/product/nextjs"
                    className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-gray-100/50"
                  >
                    <div className="text-xs font-medium text-gray-900">Next.js</div>
                    <p className="text-xs text-gray-500">React Framework</p>
                  </a>
                </li>
                <li>
                  <a
                    href="/product/vercel-platform"
                    className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-gray-100/50"
                  >
                    <div className="text-xs font-medium text-gray-900">Platform</div>
                    <p className="text-xs text-gray-500">Deploy easy</p>
                  </a>
                </li>
              </ul>
            </div>
          </NavbarDropdown>
        </div>

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
                  href="/product"
                  className="text-lg font-medium text-gray-900 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Product
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
}
