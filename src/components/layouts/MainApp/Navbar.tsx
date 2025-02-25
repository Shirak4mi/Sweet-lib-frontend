"use client";
import { type ReactNode, useEffect, useState } from "react";
import { motion, useScroll } from "motion/react";
import { cn } from "@/utils/functions";
import {
  Button,
  ListItem,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/base";
import DropdownMenu from "@/components/ui/customs/Navbars/parts/customDropdownMenu";

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

  // Functions
  const unsubscribe = scrollY.on("change", (latest) => setBlurred(() => latest > 1));
  const mobileHandler = () => setMobileMenuOpen((old) => !old);

  // Effect
  useEffect(() => () => unsubscribe(), [scrollY]);

  return (
    <motion.header
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "sticky top-0 z-30 w-full border-b px-10",
        blurred ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-background"
      )}
    >
      <div className="container flex h-14 items-center">
        {/* 1 */}
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

        {/* 2 */}
        <div className="hidden md:block">
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-6">
              
              {/* Solutions Dropdown */}

              <DropdownMenu trigger="Solutions" width="w-[400px]">
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
              </DropdownMenu>

              {/* Pricing Link */}
              <a href="/pricing" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                Pricing
              </a>

              {/* Docs Link */}
              <a href="/docs" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                Docs
              </a>

              {/* Product Dropdown */}
              <DropdownMenu trigger="Product" width="w-[200px]">
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
              </DropdownMenu>


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
        </div>

        {/* 3 */}
        <div className="ml-auto flex items-center space-x-4"></div>
      </div>
    </motion.header>
  );
}
