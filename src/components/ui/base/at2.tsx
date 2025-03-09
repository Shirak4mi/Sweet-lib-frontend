"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "./table/Animated";
import { Input, Button, Badge, Checkbox, AnimatedButton } from "@/components/ui/base";
import {
  MoreVertical,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Grid,
  Plus,
  Search,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, MotionConfig } from "framer-motion";
import { cn } from "@/utils/functions";

type User = {
  id: string;
  name: string;
  email: string;
  location: string;
  status: "Active" | "Inactive";
  performance: "Excellent" | "Very Good" | "Good";
  balance: number;
};

interface UsersTableProps {
  initialUsers?: User[];
  className?: string;
}

export function UsersTableAnim({ initialUsers, className }: UsersTableProps) {
  const prefersReducedMotion = useReducedMotion();
  const [users] = useState<User[]>(initialUsers || mockUsers);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof User>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [lastNavigationDirection, setLastNavigationDirection] = useState<"forward" | "backward" | null>(null);
  const [hoverRowId, setHoverRowId] = useState<string | null>(null);

  // Memoized filtering logic
  const filteredUsers = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase().trim();
    if (!lowerQuery) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery) ||
        user.location.toLowerCase().includes(lowerQuery)
    );
  }, [users, searchQuery]);

  // Memoized sorting logic
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      }

      // Handle numeric fields
      if (sortDirection === "asc") {
        return (fieldA as number) - (fieldB as number);
      }
      return (fieldB as number) - (fieldA as number);
    });
  }, [filteredUsers, sortField, sortDirection]);

  // Memoized pagination
  const totalPages = useMemo(() => Math.ceil(sortedUsers.length / rowsPerPage), [sortedUsers.length, rowsPerPage]);

  const paginatedUsers = useMemo(
    () => sortedUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage),
    [sortedUsers, currentPage, rowsPerPage]
  );

  // Optimized handlers using useCallback
  const handleSort = useCallback(
    (field: keyof User) => {
      if (field === sortField) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
    },
    [sortField]
  );

  const handleCheckAll = useCallback(() => {
    setSelectedUsers((prev) =>
      prev.size === paginatedUsers.length ? new Set() : new Set(paginatedUsers.map((user) => user.id))
    );
  }, [paginatedUsers]);

  const handleCheckUser = useCallback((userId: string) => {
    setSelectedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  }, []);

  const navigatePage = useCallback(
    (direction: "forward" | "backward", newPage: number) => {
      setLastNavigationDirection(direction);
      setCurrentPage(Math.max(1, Math.min(totalPages, newPage)));
    },
    [totalPages]
  );

  // Reset navigation direction after animation completes
  useEffect(() => {
    if (!lastNavigationDirection) return;
    const timer = setTimeout(() => setLastNavigationDirection(null), 600);
    return () => clearTimeout(timer);
  }, [currentPage, lastNavigationDirection]);

  const getPerformanceColor = useCallback((performance: string) => {
    switch (performance) {
      case "Excellent":
        return "text-green-500";
      case "Very Good":
        return "text-blue-500";
      case "Good":
        return "text-yellow-500";
      default:
        return "";
    }
  }, []);

  // Enhanced animation variants
  const tableContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
        duration: 0.3,
      },
    },
  };

  const tableHeaderVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const rowVariants = {
    hidden: (direction: "forward" | "backward" | null) => ({
      x: direction === "forward" ? 30 : direction === "backward" ? -30 : 0,
      opacity: 0,
      scale: 0.98,
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1,
        duration: prefersReducedMotion ? 0 : 0.4,
      },
    },
    exit: (direction: "forward" | "backward" | null) => ({
      x: direction === "forward" ? -30 : direction === "backward" ? 30 : 0,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.25,
        ease: [0.32, 0.72, 0.35, 0.94],
      },
    }),
    hover: {
      backgroundColor: "rgba(45, 55, 72, 0.5)",
      transition: {
        duration: 0.2,
      },
    },
  };

  const cellVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.2,
      },
    }),
  };

  const sortIconVariants = {
    asc: { rotate: 0, transition: { type: "spring", stiffness: 200 } },
    desc: { rotate: 180, transition: { type: "spring", stiffness: 200 } },
  };

  // Search debounce logic
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(debouncedSearchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchTerm]);

  // Virtualized row renderer for better performance
  const renderRows = () => {
    return (
      <AnimatePresence mode="sync" custom={lastNavigationDirection}>
        {paginatedUsers.map((user, index) => (
          <TableRow
            key={user.id}
            custom={lastNavigationDirection}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={rowVariants}
            className={cn(
              "border-gray-800 hover:bg-gray-900/50 transition-colors duration-300",
              hoverRowId === user.id && "bg-gray-800/40"
            )}
            onMouseEnter={() => setHoverRowId(user.id)}
            onMouseLeave={() => setHoverRowId(null)}
            style={{
              transitionProperty: "background-color, transform, opacity",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <TableCell>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
              >
                <Checkbox
                  checked={selectedUsers.has(user.id)}
                  onCheckedChange={() => handleCheckUser(user.id)}
                  className="border-gray-600"
                />
              </motion.div>
            </TableCell>
            <TableCell className="font-medium text-gray-300">
              <motion.div custom={0} variants={cellVariants} initial="hidden" animate="visible">
                {user.name}
              </motion.div>
            </TableCell>
            <TableCell className="text-gray-400">
              <motion.div custom={1} variants={cellVariants} initial="hidden" animate="visible">
                {user.email}
              </motion.div>
            </TableCell>
            <TableCell className="text-gray-400">
              <motion.div custom={2} variants={cellVariants} initial="hidden" animate="visible">
                {user.location}
              </motion.div>
            </TableCell>
            <TableCell>
              <motion.div custom={3} variants={cellVariants} initial="hidden" animate="visible">
                <Badge
                  variant={user.status === "Active" ? "default" : "secondary"}
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    user.status === "Active"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  )}
                >
                  {user.status}
                </Badge>
              </motion.div>
            </TableCell>
            <TableCell className={cn("font-medium", getPerformanceColor(user.performance))}>
              <motion.div custom={4} variants={cellVariants} initial="hidden" animate="visible">
                {user.performance}
              </motion.div>
            </TableCell>
            <TableCell className="text-gray-300 font-medium">
              <motion.div custom={5} variants={cellVariants} initial="hidden" animate="visible">
                ${user.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </motion.div>
            </TableCell>
            <TableCell>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: hoverRowId === user.id ? 1 : 0,
                  scale: hoverRowId === user.id ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
                >
                  <MoreVertical size={16} />
                </Button>
              </motion.div>
            </TableCell>
          </TableRow>
        ))}
      </AnimatePresence>
    );
  };

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
      <motion.div
        className={cn("space-y-4 bg-black rounded-lg p-4 border border-gray-800", className)}
        initial="hidden"
        animate="visible"
        variants={tableContainerVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-500" />
            </div>
            <Input
              className="pl-10 pr-3 py-2 bg-gray-900 border-gray-800 text-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500"
              placeholder="Filter by name or email..."
              value={debouncedSearchTerm}
              onChange={(e) => setDebouncedSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800"
            >
              <Filter size={16} />
              Status
              <ChevronDown size={16} />
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800"
            >
              <Grid size={16} />
              View
            </Button>
            <AnimatedButton
              className="ml-auto bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Plus size={16} />
              Add user
            </AnimatedButton>
          </div>
        </div>

        <motion.div className="rounded-lg border border-gray-800 overflow-hidden" variants={tableContainerVariants}>
          <Table>
            <TableHeader className="bg-gray-900">
              <TableRow
                className="border-gray-800 hover:bg-gray-900"
                variants={tableHeaderVariants}
                initial="hidden"
                animate="visible"
              >
                <TableHead className="w-12">
                  <Checkbox
                    checked={paginatedUsers.length > 0 && selectedUsers.size === paginatedUsers.length}
                    onCheckedChange={handleCheckAll}
                    className="border-gray-600"
                  />
                </TableHead>
                <TableHead className="text-gray-400 cursor-pointer" onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-1 group">
                    Name
                    {sortField === "name" && (
                      <motion.div variants={sortIconVariants} animate={sortDirection === "asc" ? "asc" : "desc"}>
                        <ChevronDown size={16} />
                      </motion.div>
                    )}
                    {sortField !== "name" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0 }}
                        whileHover={{ opacity: 0.5 }}
                        className="text-gray-500"
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Location</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Performance</TableHead>
                <TableHead className="text-gray-400 cursor-pointer" onClick={() => handleSort("balance")}>
                  <div className="flex items-center gap-1 group">
                    Balance
                    {sortField === "balance" && (
                      <motion.div variants={sortIconVariants} animate={sortDirection === "asc" ? "asc" : "desc"}>
                        <ChevronDown size={16} />
                      </motion.div>
                    )}
                    {sortField !== "balance" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0 }}
                        whileHover={{ opacity: 0.5 }}
                        className="text-gray-500"
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    )}
                  </div>
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-black">{renderRows()}</TableBody>
            <TableFooter className="bg-gray-900 border-gray-800">
              <TableRow className="hover:bg-gray-900 border-none">
                <TableCell colSpan={8}>
                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>Rows per page:</span>
                      <select
                        className="bg-gray-900 border-none text-gray-300 focus:ring-0"
                        value={rowsPerPage}
                        onChange={(e) => {
                          setRowsPerPage(Number(e.target.value));
                          setCurrentPage(1); // Reset to first page when changing rows per page
                        }}
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-400">
                        {sortedUsers.length > 0
                          ? `${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
                              currentPage * rowsPerPage,
                              sortedUsers.length
                            )} of ${sortedUsers.length}`
                          : `0 of ${sortedUsers.length}`}
                      </span>
                      <div className="flex items-center gap-1 ml-4">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30"
                            disabled={currentPage === 1}
                            onClick={() => navigatePage("backward", 1)}
                          >
                            <ChevronsLeft size={16} />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30"
                            disabled={currentPage === 1}
                            onClick={() => navigatePage("backward", currentPage - 1)}
                          >
                            <ChevronLeft size={16} />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30"
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => navigatePage("forward", currentPage + 1)}
                          >
                            <ChevronRight size={16} />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30"
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => navigatePage("forward", totalPages)}
                          >
                            <ChevronsRight size={16} />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Allan",
    email: "alex.allan@company.com",
    location: "BR São Paulo, BR",
    status: "Active",
    performance: "Excellent",
    balance: 2100.0,
  },
  {
    id: "2",
    name: "Alex Thompson",
    email: "a.tompson@company.com",
    location: "US San Francisco, US",
    status: "Inactive",
    performance: "Excellent",
    balance: 1750.0,
  },
  {
    id: "3",
    name: "Anna Visconti",
    email: "anna.visconti@company.com",
    location: "IT Rome, IT",
    status: "Active",
    performance: "Good",
    balance: 0.0,
  },
  {
    id: "4",
    name: "Astrid Andersen",
    email: "a.andersen@company.com",
    location: "NO Oslo, NO",
    status: "Inactive",
    performance: "Good",
    balance: 1100.0,
  },
  {
    id: "5",
    name: "Cheng Wei",
    email: "c.wei@company.com",
    location: "CN Shanghai, CN",
    status: "Active",
    performance: "Excellent",
    balance: 2700.0,
  },
  {
    id: "6",
    name: "David Kim",
    email: "d.kim@company.com",
    location: "FR Paris, FR",
    status: "Active",
    performance: "Very Good",
    balance: 890.0,
  },
  {
    id: "7",
    name: "Diego Mendoza",
    email: "d.mendoza@company.com",
    location: "MX Mexico City, MX",
    status: "Active",
    performance: "Good",
    balance: 1800.0,
  },
  {
    id: "8",
    name: "Emma Laurent",
    email: "e.laurent@company.com",
    location: "DE Berlin, DE",
    status: "Active",
    performance: "Very Good",
    balance: 1200.0,
  },
  {
    id: "9",
    name: "Eva Kowalski",
    email: "e.kowalski@company.com",
    location: "KR Seoul, KR",
    status: "Active",
    performance: "Good",
    balance: 920.0,
  },
  {
    id: "10",
    name: "Fatima Al-Sayed",
    email: "f.alsayed@company.com",
    location: "EG Cairo, EG",
    status: "Active",
    performance: "Excellent",
    balance: 1950.0,
  },
  // Additional users for pagination demonstration
  {
    id: "11",
    name: "Gabriel Silva",
    email: "g.silva@company.com",
    location: "PT Lisbon, PT",
    status: "Active",
    performance: "Very Good",
    balance: 3200.0,
  },
  {
    id: "12",
    name: "Hiroshi Tanaka",
    email: "h.tanaka@company.com",
    location: "JP Tokyo, JP",
    status: "Active",
    performance: "Excellent",
    balance: 4500.0,
  },
  {
    id: "13",
    name: "Isabella Romano",
    email: "i.romano@company.com",
    location: "IT Milan, IT",
    status: "Inactive",
    performance: "Good",
    balance: 750.0,
  },
  {
    id: "14",
    name: "Jamal Wilson",
    email: "j.wilson@company.com",
    location: "CA Toronto, CA",
    status: "Active",
    performance: "Very Good",
    balance: 2850.0,
  },
  {
    id: "15",
    name: "Katarina Novak",
    email: "k.novak@company.com",
    location: "CZ Prague, CZ",
    status: "Active",
    performance: "Good",
    balance: 1350.0,
  },
];
