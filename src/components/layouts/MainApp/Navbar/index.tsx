"use client";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import MobileDropdown from "./MNDropdownMenu.tsx";
import DropdownMenu from "./DropdownMenu.tsx";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/base";
import { cn } from "@/utils/functions";
import { useTheme } from "next-themes";
import { Link } from "@/i18n/routing";
import Image from "next/image";

import { NavItem } from "@/types/components";
import ThemeSwitcher from "@/components/ui/dmt3.tsx";

export default function AnimatedNavbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { label: "HOME", href: "/" },
    {
      label: "CONSULTAS",
      href: "/consultas",
      children: [
        { label: "Catálogo", href: "/consultas/catalogo" },
        { label: "Repositorio", href: "/consultas/repositorio" },
        { label: "Recursos", href: "/consultas/recursos" },
      ],
    },
    {
      label: "RESERVAS",
      href: "/reservas",
      children: [
        { label: "Salas", href: "/reservas/salas" },
        { label: "Equipos", href: "/reservas/equipos" },
      ],
    },
    { label: "CAPACITACIONES", href: "/capacitaciones" },
    { label: "LIBROS ELECTRÓNICOS", href: "/libros" },
    { label: "IMPRESIONES", href: "/impresiones" },
  ];

  // Memoized scroll handler to improve performance
  const handleScroll = useCallback(() => {
    if (window.scrollY > 20) {
      if (!scrolled) setScrolled(() => true);
    } else {
      if (scrolled) setScrolled(false);
    }
  }, [scrolled]);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (activeDropdown && !(target as Element).closest(".dropdown-container")) setActiveDropdown(() => null);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Used to avoid hydration mismatch
  useEffect(() => setMounted(() => true), []);

  // Close dropdown when route changes
  useEffect(() => {
    setActiveDropdown(() => null);
    setMobileMenuOpen(() => false);
  }, [pathname]);

  // Handle click outside to close dropdowns - improves user experience
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeDropdown]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
    // Close any open dropdown when toggling mobile menu
    setActiveDropdown(null);
  }, []);

  const toggleDropdown = useCallback((label: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveDropdown((prev) => (prev === label ? null : label));
  }, []);

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, []);

  // Avoid hydration mismatch by rendering only after mounting
  if (!mounted) return null;

  return (
    <header
      className={cn(
        scrolled ? "dark:bg-gray-900/80 bg-white/80 backdrop-blur-md shadow-lg" : "dark:bg-gray-900 bg-white",
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "border-b dark:border-gray-800 border-gray-100"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center">
              <div className="relative w-48 h-16">
                <Image
                  src="/logo.png"
                  alt="UNAPEC Logo"
                  fill
                  className={cn("object-contain transition-opacity", theme === "dark" ? "invert" : "")}
                  priority
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={item.label} className="relative group dropdown-container">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative"
                >
                  {item.children ? (
                    <button
                      onClick={(e) => toggleDropdown(item.label, e)}
                      className="flex items-center px-3 py-2 dark:text-blue-300 text-blue-800 dark:hover:text-blue-200 hover:text-blue-600 font-medium text-sm group"
                      aria-expanded={activeDropdown === item.label}
                      aria-controls={`dropdown-${item.label}`}
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 dark:bg-blue-400 bg-blue-600 group-hover:w-full transition-all duration-300"
                        whileHover={{ width: "100%" }}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "px-3 py-2 dark:text-blue-300 text-blue-800 dark:hover:text-blue-200 hover:text-blue-600 font-medium text-sm relative group",
                        pathname === item.href && "dark:text-blue-200 text-blue-700"
                      )}
                    >
                      {item.label}
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 dark:bg-blue-400 bg-blue-600 group-hover:w-full transition-all duration-300"
                        whileHover={{ width: "100%" }}
                      />
                    </Link>
                  )}
                </motion.div>

                {/* Dropdown Menu */}
                {item.children && (
                  <DropdownMenu item={item} isOpen={activeDropdown === item.label} onClose={closeDropdown} />
                )}
              </div>
            ))}

            {/* Theme Toggle Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ThemeSwitcher />
            </motion.div>

            {/* Language Selector */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button variant="ghost" size="sm" className="px-2 dark:text-blue-300 text-blue-800">
                <Globe className="w-5 h-5 mr-1" />
                <span>ES</span>
              </Button>
            </motion.div>

            {/* Login Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="ml-4"
            >
              <Button
                variant="outline"
                className="dark:bg-blue-700 bg-blue-800 text-white dark:border-blue-700 border-blue-800 dark:hover:bg-blue-600 hover:bg-blue-700"
              >
                LOGIN
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <ThemeSwitcher />

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <motion.div initial={false} animate={{ rotate: mobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 dark:text-blue-300 text-blue-800" />
                ) : (
                  <Menu className="h-6 w-6 dark:text-blue-300 text-blue-800" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="lg:hidden overflow-hidden dark:bg-gradient-to-r dark:from-blue-950 dark:to-gray-900 bg-gradient-to-r from-blue-900 to-blue-800"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item, index) => (
                <div key={item.label}>
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.children ? (
                      <div>
                        <button
                          onClick={(e) => toggleDropdown(item.label, e)}
                          className="flex items-center justify-between w-full py-3 text-white dark:border-blue-900 border-b border-blue-700"
                          aria-expanded={activeDropdown === item.label}
                        >
                          <span className="font-medium">{item.label}</span>
                          <motion.div
                            animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-5 w-5" />
                          </motion.div>
                        </button>

                        <MobileDropdown item={item} isOpen={activeDropdown === item.label} onClose={closeMobileMenu} />
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block py-3 text-white font-medium dark:border-blue-900 border-b border-blue-700",
                          pathname === item.href && "text-blue-200"
                        )}
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                </div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="mt-4 flex flex-col space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="text-white hover:text-blue-100">
                    <Globe className="w-5 h-5 mr-2" />
                    <span>ES</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full bg-white text-blue-800 border-white hover:bg-blue-50"
                    onClick={closeMobileMenu}
                  >
                    LOGIN
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
