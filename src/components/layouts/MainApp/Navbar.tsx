"use client";
import { motion, useScroll, AnimatePresence } from "motion/react";
import { Button, NavbarDropdown } from "@/components/ui/base";
import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/utils/functions";

// Language Selector Component
const LanguageSelector = ({ selectedLanguage, setSelectedLanguage, isOpen, setIsOpen }) => {
  const languages = ["EN", "ES", "FR", "DE"];

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lang) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  const langDropdownVariants = {
    closed: { opacity: 0, y: -5, height: 0, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.2 } },
  };

  return (
    <div className="relative">
      <motion.button
        className="px-3 py-2 text-sm rounded-md border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        onClick={toggleDropdown}
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <span className="mr-1">{selectedLanguage}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-block text-xs">
          ▼
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden z-50 w-24 shadow-lg"
            initial="closed"
            animate="open"
            exit="closed"
            variants={langDropdownVariants}
          >
            {languages.map((lang) => (
              <button
                key={lang}
                className={cn(
                  "block w-full text-left px-4 py-3 text-sm",
                  selectedLanguage === lang ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-100 dark:hover:bg-gray-800",
                  "transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                )}
                onClick={() => changeLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Theme Toggle Component
const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  return (
    <motion.button
      className="p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      onClick={toggleTheme}
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </motion.button>
  );
};

// Main Navbar Component
export default function NavbarHamburguer(): ReactNode {
  const { scrollY } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blurred, setBlurred] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const unsubscribe = scrollY.on("change", (old) => setBlurred(old > 1));
  const mobileHandler = () => {
    setMobileMenuOpen((old) => !old);
    if (isLangDropdownOpen) setIsLangDropdownOpen(false);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => () => unsubscribe(), [scrollY]);

  // Updated animation variants for mobile
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const itemVariants = {
    closed: { y: 20, opacity: 0, transition: { duration: 0.2 } },
    open: { y: 0, opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <>
      <motion.header
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "sticky top-0 z-50 w-full border-b px-6",
          blurred ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-background"
        )}
      >
        <div className="flex h-14 items-center justify-between">
          {/* Logo/Brand (Left Side) */}
          <div className="flex items-center gap-4">
            <div className="mr-4 md:hidden">
              <Button
                size="icon"
                className="group w-12 h-12"
                variant="outline"
                onClick={mobileHandler}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <svg
                  className="pointer-events-none w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
            <motion.div
              className="flex-shrink-0 font-medium tracking-tight text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="font-bold">LOGO</span>
            </motion.div>
          </div>

          {/* Desktop Navigation (Center) */}
          <div className="hidden md:block">
            <div className="flex items-center gap-6">
              <NavbarDropdown trigger="Solutions" width="w-[400px]">
                <div className="p-4">
                  <ul className="grid gap-3 p-2">
                    <li>
                      <a
                        href="/solutions/enterprise"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50 focus:ring-2 focus:ring-gray-500"
                      >
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Enterprise</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Scale with confidence</p>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/solutions/startups"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50 focus:ring-2 focus:ring-gray-500"
                      >
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Startups</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Launch fast</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </NavbarDropdown>
              <a
                href="/pricing"
                className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Pricing
              </a>
              <a
                href="/docs"
                className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Docs
              </a>
              <NavbarDropdown trigger="Product" width="w-[200px]">
                <div className="p-2">
                  <ul className="grid gap-2 p-1">
                    <li>
                      <a
                        href="/product/nextjs"
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50 focus:ring-2 focus:ring-gray-500"
                      >
                        <div className="text-xs font-medium text-gray-900 dark:text-gray-100">Next.js</div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">React Framework</p>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/product/vercel-platform"
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50 focus:ring-2 focus:ring-gray-500"
                      >
                        <div className="text-xs font-medium text-gray-900 dark:text-gray-100">Platform</div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Deploy easy</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </NavbarDropdown>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                isOpen={isLangDropdownOpen}
                setIsOpen={setIsLangDropdownOpen}
              />
            </div>
            <div className="hidden sm:flex">
              <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </div>
            <div className="hidden md:flex items-center gap-4">
              <a
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="text-sm font-medium bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 "
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={mobileHandler}
            />
            {/* Menu */}
            <motion.div
              className="fixed inset-x-0 top-14 h-screen bg-white dark:bg-gray-900 z-50 overflow-y-auto"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="container py-8 px-6 flex flex-col h-full">
                <ul className="space-y-6 flex-grow">
                  <motion.li variants={itemVariants}>
                    <a
                      href="/solutions"
                      className="block py-4 text-xl font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Solutions
                    </a>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <a
                      href="/pricing"
                      className="block py-4 text-xl font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Pricing
                    </a>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <a
                      href="/docs"
                      className="block py-4 text-xl font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Docs
                    </a>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <a
                      href="/product"
                      className="block py-4 text-xl font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Product
                    </a>
                  </motion.li>
                </ul>
                <motion.div className="flex mt-8 space-y-6 sm:hidden" variants={itemVariants}>
                  <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                    isOpen={isLangDropdownOpen}
                    setIsOpen={setIsLangDropdownOpen}
                  />
                  <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                </motion.div>
                <motion.div className="mt-8 space-y-4 pb-8" variants={itemVariants}>
                  <a
                    href="/login"
                    className="block w-full py-4 px-6 text-lg text-center rounded-md bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="block w-full py-4 px-6 text-lg text-center rounded-md border border-black text-black hover:bg-gray-100 dark:border-white dark:text-white dark:hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Sign Up
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
