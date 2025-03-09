"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
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

// Animation variants with refined physics and timing
const tableContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.03,
      duration: 0.25,
    },
  },
};

const tableHeaderVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      duration: 0.3,
    },
  },
};

const rowVariants = {
  hidden: (direction: "forward" | "backward" | null) => ({
    x: direction === "forward" ? 20 : direction === "backward" ? -20 : 0,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
      mass: 0.8,
      duration: 0.3,
    },
  },
  exit: (direction: "forward" | "backward" | null) => ({
    x: direction === "forward" ? -20 : direction === "backward" ? 20 : 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
  hover: {
    backgroundColor: "rgba(45, 55, 72, 0.5)",
    transition: { duration: 0.15 },
  },
  headerClick: (i: number) => ({
    scale: [1, 0.98, 1],
    backgroundColor: ["rgba(0, 0, 0, 0)", "rgba(59, 130, 246, 0.15)", "rgba(0, 0, 0, 0)"],
    transition: {
      duration: 0.4,
      delay: i * 0.02,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const cellVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.02,
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
  headerClick: (i: number) => ({
    scale: [1, 1.03, 1],
    transition: {
      duration: 0.35,
      delay: i * 0.015,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export function UsersTableAnim({ initialUsers, className }: UsersTableProps) {
  const prefersReducedMotion = useReducedMotion();
  const [users] = useState<User[]>(initialUsers || mockUsers);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof User>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [lastNavigationDirection, setLastNavigationDirection] = useState<"forward" | "backward" | null>(null);
  const [hoverRowId, setHoverRowId] = useState<string | null>(null);
  const [sortChangeDirection, setSortChangeDirection] = useState<"up" | "down" | null>(null);
  const [isHeaderClicked, setIsHeaderClicked] = useState(false);

  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      }
      return sortDirection === "asc" ? (fieldA as number) - (fieldB as number) : (fieldB as number) - (fieldA as number);
    });
  }, [filteredUsers, sortField, sortDirection]);

  const totalPages = useMemo(() => Math.ceil(sortedUsers.length / rowsPerPage), [sortedUsers.length, rowsPerPage]);
  const paginatedUsers = useMemo(
    () => sortedUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage),
    [sortedUsers, currentPage, rowsPerPage]
  );

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      setSearchQuery(debouncedSearchTerm);
    }, 300) as NodeJS.Timeout;
    return () => {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    };
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!lastNavigationDirection) return;
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    animationTimeoutRef.current = setTimeout(() => {
      setLastNavigationDirection(null);
    }, 400) as NodeJS.Timeout;
    return () => {
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    };
  }, [currentPage, lastNavigationDirection]);

  const handleSort = useCallback(
    (field: keyof User) => {
      setIsHeaderClicked(true);
      if (field === sortField) {
        setSortDirection((prev) => {
          setSortChangeDirection(prev === "asc" ? "down" : "up");
          return prev === "asc" ? "desc" : "asc";
        });
      } else {
        setSortField(field);
        setSortDirection("asc");
        setSortChangeDirection("up");
      }
      setTimeout(() => {
        setSortChangeDirection(null);
        setIsHeaderClicked(false);
      }, 400);
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
      if (newSet.has(userId)) newSet.delete(userId);
      else newSet.add(userId);
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

  const getSortableHeaderProps = useCallback(
    (field: keyof User, label?: string) => ({
      onClick: () => handleSort(field),
      className: cn("text-gray-400 cursor-pointer relative transition-colors", sortField === field && "text-blue-400"),
      children: (
        <motion.div
          className="flex items-center gap-1 group px-2 py-1 rounded-md"
          initial={{ backgroundColor: "rgba(17, 24, 39, 0)" }}
          whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.5)" }}
          whileTap={{ scale: 0.97, backgroundColor: "rgba(31, 41, 55, 0.8)", transition: { duration: 0.1 } }}
          layout
        >
          <span>{label || field.charAt(0).toUpperCase() + field.slice(1)}</span>
          <motion.div
            initial={{ rotate: 0, scale: 0.8, opacity: 0.5 }}
            animate={
              sortField === field
                ? sortDirection === "asc"
                  ? { rotate: 0, scale: 1, opacity: 1 }
                  : { rotate: 180, scale: 1, opacity: 1 }
                : { rotate: 0, scale: 0.8, opacity: 0.5 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <ChevronDown size={16} className={cn("text-gray-500", sortField === field && "text-blue-400")} />
          </motion.div>
          {sortField === field && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              initial={{ width: 0, left: "50%" }}
              animate={{ width: "100%", left: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      ),
    }),
    [sortField, sortDirection, handleSort]
  );

  const renderRows = useCallback(() => {
    return (
      <AnimatePresence mode="sync" custom={lastNavigationDirection}>
        {paginatedUsers.map((user, index) => (
          <TableRow
            key={user.id}
            custom={lastNavigationDirection}
            initial="hidden"
            animate={isHeaderClicked ? ["visible", "headerClick"] : "visible"}
            exit="exit"
            variants={rowVariants}
            className={cn("border-gray-800 hover:bg-gray-900/50", hoverRowId === user.id && "bg-gray-800/40")}
            onMouseEnter={() => setHoverRowId(user.id)}
            onMouseLeave={() => setHoverRowId(null)}
            style={{
              transitionProperty: "background-color, transform, opacity",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <TableCell>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                custom={index}
                variants={isHeaderClicked && !prefersReducedMotion ? cellVariants : undefined}
              >
                <Checkbox
                  checked={selectedUsers.has(user.id)}
                  onCheckedChange={() => handleCheckUser(user.id)}
                  className="border-gray-600"
                />
              </motion.div>
            </TableCell>
            <TableCell className="font-medium text-gray-300">
              <motion.div
                custom={0}
                variants={cellVariants}
                initial="hidden"
                animate={isHeaderClicked && !prefersReducedMotion ? ["visible", "headerClick"] : "visible"}
              >
                {user.name}
              </motion.div>
            </TableCell>
            <TableCell className="text-gray-400">
              <motion.div
                custom={1}
                variants={cellVariants}
                initial="hidden"
                animate={isHeaderClicked && !prefersReducedMotion ? ["visible", "headerClick"] : "visible"}
              >
                {user.email}
              </motion.div>
            </TableCell>
            <TableCell className="text-gray-400">
              <motion.div
                custom={2}
                variants={cellVariants}
                initial="hidden"
                animate={isHeaderClicked && !prefersReducedMotion ? ["visible", "headerClick"] : "visible"}
              >
                {user.location}
              </motion.div>
            </TableCell>
            <TableCell>
              <motion.div
                custom={3}
                variants={cellVariants}
                initial="hidden"
                animate={isHeaderClicked && !prefersReducedMotion ? ["visible", "headerClick"] : "visible"}
              >
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
              <motion.div
                custom={4}
                variants={cellVariants}
                initial="hidden"
                animate={isHeaderClicked && !prefersReducedMotion ? ["visible", "headerClick"] : "visible"}
              >
                {user.performance}
              </motion.div>
            </TableCell>
            <TableCell className="text-gray-300 font-medium">
              <motion.div
                custom={5}
                variants={cellVariants}
                initial="hidden"
                animate={isHeaderClicked && !prefersReducedMotion ? ["visible", "headerClick"] : "visible"}
              >
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
  }, [
    paginatedUsers,
    lastNavigationDirection,
    isHeaderClicked,
    hoverRowId,
    selectedUsers,
    handleCheckUser,
    getPerformanceColor,
    rowVariants,
    cellVariants,
    prefersReducedMotion,
  ]);

  const RippleEffect = useCallback(
    ({ isActive, x, y }: { isActive: boolean; x: number; y: number }) => {
      if (prefersReducedMotion || !isActive) return null;
      return (
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute pointer-events-none"
              style={{ left: x, top: y }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 10, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-2 h-2 rounded-full bg-blue-500/40" />
            </motion.div>
          )}
        </AnimatePresence>
      );
    },
    [prefersReducedMotion]
  );

  const [rippleEffect, setRippleEffect] = useState({ active: false, x: 0, y: 0 });

  const triggerRipple = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRippleEffect({ active: true, x, y });
      setTimeout(() => setRippleEffect({ active: false, x: 0, y: 0 }), 800);
    },
    [prefersReducedMotion]
  );

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
      <motion.div
        className={cn("space-y-4 bg-black rounded-lg p-4 border border-gray-800 relative", className)}
        initial="hidden"
        animate="visible"
        variants={tableContainerVariants}
      >
        <AnimatePresence>
          {sortChangeDirection && !prefersReducedMotion && (
            <motion.div
              className="absolute top-14 right-1/2 transform translate-x-1/2 z-10 text-white bg-blue-600 px-3 py-1 rounded-md shadow-lg flex items-center gap-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span>
                Sorting {sortField} {sortDirection === "asc" ? "ascending" : "descending"}
              </span>
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: 3, duration: 0.3 }}>
                {sortDirection === "asc" ? "▲" : "▼"}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Plus size={16} />
              Add user
            </AnimatedButton>
          </div>
        </div>

        <motion.div className="rounded-lg border border-gray-800 overflow-hidden relative" variants={tableContainerVariants}>
          <RippleEffect isActive={rippleEffect.active} x={rippleEffect.x} y={rippleEffect.y} />
          <Table>
            <TableHeader className="bg-gray-900">
              <TableRow
                className="border-gray-800 hover:bg-gray-900"
                variants={tableHeaderVariants}
                initial="hidden"
                animate="visible"
                onClick={triggerRipple}
              >
                <TableHead className="w-12">
                  <Checkbox
                    checked={paginatedUsers.length > 0 && selectedUsers.size === paginatedUsers.length}
                    onCheckedChange={handleCheckAll}
                    className="border-gray-600"
                  />
                </TableHead>
                <TableHead {...getSortableHeaderProps("name")} />
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Location</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead {...getSortableHeaderProps("performance")} />
                <TableHead {...getSortableHeaderProps("balance")} />
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
                          setCurrentPage(1);
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
                        <motion.div
                          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                          whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                        >
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
                        <motion.div
                          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                          whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                        >
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
                        <motion.div
                          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                          whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                        >
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
                        <motion.div
                          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                          whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                        >
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
