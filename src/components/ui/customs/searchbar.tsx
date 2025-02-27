"use client";

import React, { useState } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  Input,
  Checkbox,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/base";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// Define filter property options
type FilterProperty = "name" | "category" | "date" | "price" | "status";

// Define types for filter categories
interface FilterOptions {
  category1: boolean;
  category2: boolean;
  category3: boolean;
  recentOnly: boolean;
}

// Define component props
interface AnimatedSearchBarProps {
  onSearch?: (query: string, property: FilterProperty, filters: FilterOptions) => void;
  className?: string;
}

const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = ({ onSearch, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    category1: false,
    category2: false,
    category3: false,
    recentOnly: false,
  });
  const [selectedProperty, setSelectedProperty] = useState<FilterProperty>("name");

  // Animation controls for more complex animations
  const iconControls = useAnimation();
  const filterBadgeControls = useAnimation();

  const handleFilterChange = (filter: keyof FilterOptions): void => {
    setSelectedFilters(() => ({ ...selectedFilters, [filter]: !selectedFilters[filter] }));

    // Animate badge when adding a filter
    if (!selectedFilters[filter]) {
      filterBadgeControls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.3 },
        opacity: 1,
      });
    }
  };

  const handleSearch = (): void => {
    // Provide visual feedback on search
    iconControls.start({ scale: [1, 0.9, 1], transition: { duration: 0.3 } });
    onSearch?.(searchQuery, selectedProperty, selectedFilters);
  };

  // Calculate number of active filters
  const activeFiltersCount: number = Object.values(selectedFilters).filter(Boolean).length;

  // Handle input keydown for search submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Property options for dropdown
  const propertyOptions: { value: FilterProperty; label: string }[] = [
    { value: "name", label: "Name" },
    { value: "category", label: "Category" },
    { value: "date", label: "Date" },
    { value: "price", label: "Price" },
    { value: "status", label: "Status" },
  ];

  // Animation for the search icon
  const searchIconVariants = {
    expanded: {
      scale: [1, 0.8, 1],
      transition: { duration: 0.4 },
    },
    collapsed: {
      scale: 1,
      transition: { duration: 0.2 },
    },
    hover: {
      rotate: [0, -5, 5, 0],
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.9,
      transition: {
        duration: 0.1,
      },
    },
  };

  // Filter menu item animation
  const filterItemVariants = {
    hidden: { opacity: 0, x: -10, height: 0 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      height: "auto",
      transition: {
        delay: i * 0.05,
        duration: 0.2,
        ease: "easeOut",
      },
    }),
    hover: {
      x: 3,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg w-full max-w-2xl mx-auto transition-colors duration-300 ${className}`}
    >
      <div className="w-full relative flex items-center justify-end">
        <AnimatePresence mode="sync">
          {isExpanded ? (
            <motion.div
              key="expanded-search"
              initial={{ width: "48px", borderRadius: "9999px" }}
              animate={{
                width: "100%",
                borderRadius: "0.5rem",
                transition: { type: "spring", stiffness: 400, damping: 30, duration: 0.3 },
              }}
              exit={{
                width: "48px",
                borderRadius: "9999px",
                transition: { duration: 0.2, ease: "easeInOut" },
              }}
              className="flex items-center w-full h-12 bg-white dark:bg-gray-700 rounded-lg shadow-md dark:shadow-gray-900/30 overflow-hidden absolute"
            >
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: 0.1,
                    duration: 0.2,
                  },
                }}
                className="flex-shrink-0 pl-2"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-9 px-2 gap-1 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      type="button"
                    >
                      <motion.div
                        className="flex items-center gap-1"
                        whileHover={{ y: [0, -2, 0], transition: { duration: 0.3 } }}
                      >
                        {propertyOptions.find((p) => p.value === selectedProperty)?.label}
                        <ChevronDown size={16} />
                      </motion.div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-32">
                    {propertyOptions.map((property, index) => (
                      <motion.div
                        key={property.value}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.05)", x: 2 }}
                      >
                        <DropdownMenuItem onClick={() => setSelectedProperty(property.value)} className="cursor-pointer">
                          {property.label}
                        </DropdownMenuItem>
                      </motion.div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>

              <motion.div
                animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.2 } }}
                initial={{ opacity: 0 }}
                className="flex-grow opacity-100"
              >
                <Input
                  type="text"
                  placeholder={`Search by ${selectedProperty}...`}
                  className="w-full border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: 0.2,
                    duration: 0.2,
                  },
                }}
                className="flex items-center"
              >
                {searchQuery && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-1 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 transition-colors duration-200"
                      onClick={() => setSearchQuery("")}
                      type="button"
                    >
                      <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                        <X size={18} />
                      </motion.div>
                    </Button>
                  </motion.div>
                )}

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-1 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 transition-colors duration-200"
                      type="button"
                    >
                      <motion.div
                        className="relative"
                        whileHover={{ rotate: [0, -15, 15, -5, 5, 0], transition: { duration: 0.6 } }}
                      >
                        <Filter size={18} />
                        {activeFiltersCount > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={filterBadgeControls}
                            className="absolute -top-1 -right-1 bg-blue-500 dark:bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full"
                          >
                            {activeFiltersCount}
                          </motion.span>
                        )}
                      </motion.div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-lg">
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.h4
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-medium text-sm text-gray-900 dark:text-gray-100"
                      >
                        Filter by:
                      </motion.h4>
                      <div className="space-y-2">
                        {(Object.keys(selectedFilters) as Array<keyof FilterOptions>).map(
                          (filter, index) =>
                            filter !== "recentOnly" && (
                              <motion.div
                                key={filter}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                variants={filterItemVariants}
                                whileHover="hover"
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={filter}
                                  checked={selectedFilters[filter]}
                                  onCheckedChange={() => handleFilterChange(filter)}
                                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-600 dark:data-[state=checked]:border-blue-600 transition-colors duration-200"
                                />
                                <Label htmlFor={filter} className="capitalize text-gray-700 dark:text-gray-300">
                                  {filter.replace(/([A-Z])/g, " $1").trim()}
                                </Label>
                              </motion.div>
                            )
                        )}
                      </div>
                      <motion.div
                        className="pt-2 border-t dark:border-gray-700"
                        initial={{ opacity: 0, scaleY: 0.7 }}
                        animate={{
                          opacity: 1,
                          scaleY: 1,
                          transition: { delay: 0.2, duration: 0.3 },
                        }}
                      >
                        <motion.div
                          className="flex items-center space-x-2 mt-2"
                          variants={filterItemVariants}
                          custom={4}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                        >
                          <Checkbox
                            id="recentOnly"
                            checked={selectedFilters.recentOnly}
                            onCheckedChange={() => handleFilterChange("recentOnly")}
                            className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-600 dark:data-[state=checked]:border-blue-600 transition-colors duration-200"
                          />
                          <Label htmlFor="recentOnly" className="text-gray-700 dark:text-gray-300">
                            Recent only
                          </Label>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </PopoverContent>
                </Popover>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                  className="mr-1 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 transition-colors duration-200"
                  type="button"
                >
                  <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                    <X size={18} />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed-search"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: {
                  duration: 0.1,
                },
              }}
              whileHover="hover"
              whileTap="tap"
              className="flex justify-center items-center w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-md dark:shadow-gray-900/30 cursor-pointer z-10"
              onClick={() => setIsExpanded(true)}
            >
              <motion.div variants={searchIconVariants} transition={{ type: "spring", stiffness: 300, damping: 10 }} >
                <Search size={20} className="text-gray-500 dark:text-gray-300" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedSearchBar;


// /app/storage/dentalpro/img/odontograma_imagenes/php/files/1771827/63948f21d2dfa_AMBROSIO