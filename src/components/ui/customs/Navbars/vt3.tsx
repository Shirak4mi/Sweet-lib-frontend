"use client";
import { Button, NavbarDropdown } from "@/components/ui/base";
import { type ReactNode, useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/functions";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function NavbarHamburguer(): ReactNode {
  // Hooks
  const { scrollY } = useScroll();

  // State
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [blurred, setBlurred] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("EN");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);

  // Languages
  const languages = ["EN", "ES", "FR", "DE"];

  // Functions
  const unsubscribe = scrollY.on("change", (old) => setBlurred(() => old > 1));
  const mobileHandler = () => {
    setMobileMenuOpen((old) => !old);
    if (isLangDropdownOpen) setIsLangDropdownOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLangDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };

  const changeLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  // Effect
  useEffect(() => () => unsubscribe(), [scrollY]);

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    closed: {
      y: 10,
      opacity: 0,
      transition: { duration: 0.2 },
    },
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  const langDropdownVariants = {
    closed: {
      opacity: 0,
      y: -5,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.header
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "sticky top-0 z-30 w-full border-b px-4 md:px-10",
        isDarkMode
          ? "bg-black text-white border-gray-800"
          : blurred
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-background"
      )}
    >
      <div className="container flex h-14 items-center justify-between">
        {/* Logo/Brand (Left Side) */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <div className="mr-4 md:hidden">
            <Button
              size="icon"
              className="group"
              variant="outline"
              onClick={mobileHandler}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className="pointer-events-none"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12L20 12"
                  className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                />
                <path
                  d="M4 12H20"
                  className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                />
                <path
                  d="M4 12H20"
                  className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                />
              </svg>
            </Button>
          </div>

          {/* Brand Logo */}
          <motion.div
            className="flex-shrink-0 font-medium tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-bold">LOGO</span>
          </motion.div>
        </div>

        {/* Desktop Navigation (Center) */}
        <div className="hidden md:block">
          <div className="hidden md:flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
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
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Language Selector - Always Visible */}
          <div className="relative hidden sm:block">
            <motion.button
              className={`px-2 py-1 text-sm rounded-md border ${
                isDarkMode ? "border-gray-800 hover:border-gray-700" : "border-gray-200 hover:border-gray-300"
              } focus:outline-none transition-colors duration-200`}
              onClick={toggleLangDropdown}
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <span className="mr-1">{selectedLanguage}</span>
              <motion.span
                animate={{ rotate: isLangDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="inline-block text-xs"
              >
                ▼
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div
                  className={`absolute right-0 mt-1 ${
                    isDarkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200 shadow-sm"
                  } rounded-md overflow-hidden z-50 w-20`}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={langDropdownVariants}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      className={`block w-full text-left px-3 py-2 text-sm ${
                        selectedLanguage === lang
                          ? isDarkMode
                            ? "bg-gray-800"
                            : "bg-gray-100"
                          : isDarkMode
                          ? "hover:bg-gray-800"
                          : "hover:bg-gray-100"
                      } transition-colors duration-150`}
                      onClick={() => changeLanguage(lang)}
                    >
                      {lang}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle - Always Visible */}
          <motion.button
            className="p-2 rounded-md focus:outline-none hidden sm:flex"
            onClick={toggleTheme}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </motion.button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
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
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={`fixed inset-x-0 top-14 ${
              isDarkMode ? "bg-black border-t border-gray-800" : "bg-white border-t border-gray-200"
            } z-40`}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="container py-6">
              {/* Main Mobile Navigation */}
              <ul className="space-y-6">
                <motion.li variants={itemVariants}>
                  <a
                    href="/solutions"
                    className={`block py-1 text-lg font-medium ${
                      isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"
                    } transition-colors duration-200`}
                  >
                    Solutions
                  </a>
                </motion.li>

                <motion.li variants={itemVariants}>
                  <a
                    href="/pricing"
                    className={`block py-1 text-lg font-medium ${
                      isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"
                    } transition-colors duration-200`}
                  >
                    Pricing
                  </a>
                </motion.li>

                <motion.li variants={itemVariants}>
                  <a
                    href="/docs"
                    className={`block py-1 text-lg font-medium ${
                      isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"
                    } transition-colors duration-200`}
                  >
                    Docs
                  </a>
                </motion.li>

                <motion.li variants={itemVariants}>
                  <a
                    href="/product"
                    className={`block py-1 text-lg font-medium ${
                      isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"
                    } transition-colors duration-200`}
                  >
                    Product
                  </a>
                </motion.li>
              </ul>

              {/* Mobile Only Actions */}
              <motion.div className="mt-6 flex items-center gap-4" variants={itemVariants}>
                <div className="relative sm:hidden">
                  <button
                    className={`px-2 py-1 text-sm rounded-md border ${
                      isDarkMode ? "border-gray-800" : "border-gray-200"
                    } focus:outline-none`}
                    onClick={toggleLangDropdown}
                  >
                    {selectedLanguage} ▼
                  </button>
                </div>

                <button
                  className="p-2 rounded-md focus:outline-none sm:hidden"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                </button>
              </motion.div>

              {/* Mobile Auth Buttons */}
              <motion.div className="mt-8 space-y-3" variants={itemVariants}>
                <a
                  href="/login"
                  className={`block w-full py-2 px-4 text-center rounded-md transition-colors duration-200 ${
                    isDarkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className={`block w-full py-2 px-4 text-center rounded-md border transition-colors duration-200 ${
                    isDarkMode ? "border-white text-white hover:bg-gray-900" : "border-black text-black hover:bg-gray-100"
                  }`}
                >
                  Sign Up
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
