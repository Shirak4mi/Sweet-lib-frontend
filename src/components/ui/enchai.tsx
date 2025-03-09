"use client";
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/base";
import { Button, Input } from "@/components/ui/base";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/base";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Filter,
  Plus,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define Types
type User = {
  id: string;
  name: string;
  email: string;
  location: { code: string; city: string };
  status: "active" | "inactive";
  performance: "excellent" | "very good" | "good" | "poor";
  balance: number;
};

// Sample Data
const sampleUsers: User[] = [
  {
    id: "1",
    name: "Alex Allan",
    email: "alex.allan@company.com",
    location: { code: "BR", city: "São Paulo" },
    status: "active",
    performance: "excellent",
    balance: 2100.0,
  },
  {
    id: "2",
    name: "Alex Thompson",
    email: "a.thompson@company.com",
    location: { code: "US", city: "San Francisco" },
    status: "inactive",
    performance: "excellent",
    balance: 1750.0,
  },
  {
    id: "3",
    name: "Anna Visconti",
    email: "anna.visconti@company.com",
    location: { code: "IT", city: "Rome" },
    status: "active",
    performance: "good",
    balance: 0.0,
  },
  {
    id: "4",
    name: "Astrid Andersen",
    email: "a.andersen@company.com",
    location: { code: "NO", city: "Oslo" },
    status: "inactive",
    performance: "good",
    balance: 1100.0,
  },
  {
    id: "5",
    name: "Cheng Wei",
    email: "c.wei@company.com",
    location: { code: "CN", city: "Shanghai" },
    status: "active",
    performance: "excellent",
    balance: 2700.0,
  },
  {
    id: "6",
    name: "David Kim",
    email: "d.kim@company.com",
    location: { code: "FR", city: "Paris" },
    status: "active",
    performance: "very good",
    balance: 890.0,
  },
  {
    id: "7",
    name: "Diego Mendoza",
    email: "d.mendoza@company.com",
    location: { code: "MX", city: "Mexico City" },
    status: "active",
    performance: "good",
    balance: 1800.0,
  },
  {
    id: "8",
    name: "Emma Laurent",
    email: "e.laurent@company.com",
    location: { code: "DE", city: "Berlin" },
    status: "active",
    performance: "very good",
    balance: 1200.0,
  },
  {
    id: "9",
    name: "Eva Kowalski",
    email: "e.kowalski@company.com",
    location: { code: "KR", city: "Seoul" },
    status: "active",
    performance: "good",
    balance: 920.0,
  },
  {
    id: "10",
    name: "Fatima Al-Sayed",
    email: "f.alsayed@company.com",
    location: { code: "EG", city: "Cairo" },
    status: "active",
    performance: "excellent",
    balance: 1950.0,
  },
];

// Component
const TableDashboard = () => {
  const [users] = useState<User[]>(sampleUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(sampleUsers);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{ key: keyof User | "location.city"; direction: "asc" | "desc" } | null>(
    null
  );
  const [animationDirection, setAnimationDirection] = useState<"left" | "right">("right");

  // Filtering and Sorting
  useEffect(() => {
    let result = [...users];
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter);
    }
    if (sortConfig) {
      result.sort((a, b) => {
        let aValue = sortConfig.key === "location.city" ? a.location.city : (a[sortConfig.key] as string | number);
        let bValue = sortConfig.key === "location.city" ? b.location.city : (b[sortConfig.key] as string | number);
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    setFilteredUsers(result);
    setPage(1);
  }, [users, searchTerm, statusFilter, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPageUsers = filteredUsers.slice(startIndex, endIndex);

  const goToPage = (newPage: number) => {
    setAnimationDirection(newPage > page ? "right" : "left");
    setPage(newPage);
  };

  const requestSort = (key: keyof User | "location.city") => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const getSortDirectionIcon = (key: keyof User | "location.city") => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return (
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: sortConfig.direction === "asc" ? 0 : 180 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {sortConfig.direction === "asc" ? (
          <ArrowUp className="h-4 w-4 text-teal-400" />
        ) : (
          <ArrowDown className="h-4 w-4 text-teal-400" />
        )}
      </motion.div>
    );
  };

  const getPerformanceBadge = (performance: User["performance"]) => {
    const styles = {
      excellent: "bg-gradient-to-r from-emerald-500 to-green-500 text-white",
      "very good": "bg-gradient-to-r from-teal-500 to-cyan-500 text-white",
      good: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
      poor: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
    };
    return (
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`px-2 py-1 rounded-full text-sm font-semibold shadow-lg ${styles[performance]}`}
      >
        {performance.charAt(0).toUpperCase() + performance.slice(1)}
      </motion.span>
    );
  };

  // Animation Variants
  const tableVariants = {
    hidden: (direction: "left" | "right") => ({
      x: direction === "left" ? -100 : 100,
      opacity: 0,
      scale: 0.95,
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        duration: 0.6,
      },
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "left" ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeInOut" },
    }),
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    }),
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const headerItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      boxShadow: "0 0 15px rgba(45, 212, 191, 0.5)",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    tap: { scale: 0.9, transition: { duration: 0.2 } },
  };

  const statusVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 15 } },
    whileHover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-4 rounded-xl shadow-2xl">
      {/* Header with Staggered Animation */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-between items-center mb-6 p-4 bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700 shadow-lg"
      >
        <motion.div variants={headerItemVariants} className="relative w-64">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-400" />
          <Input
            placeholder="Filter by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border-0 text-white placeholder-gray-400 rounded-full focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>
        <motion.div variants={headerItemVariants} className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-gray-700/50 border-0 text-white rounded-full h-10">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 rounded-xl">
              <SelectItem value="all" className="hover:bg-teal-500/20">
                All
              </SelectItem>
              <SelectItem value="active" className="hover:bg-teal-500/20">
                Active
              </SelectItem>
              <SelectItem value="inactive" className="hover:bg-teal-500/20">
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>
          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-0 rounded-full h-10 px-4 hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" /> Add User
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Table with Animated Rows */}
      <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-md">
        <Table className="w-full text-left">
          <TableHeader className="bg-gradient-to-r from-gray-800 to-gray-900 sticky top-0 z-10">
            <TableRow className="border-b border-gray-700 hover:bg-gray-800/50">
              <TableHead className="w-12 p-2 text-center">
                <motion.input
                  type="checkbox"
                  className="h-5 w-5 rounded-lg border-gray-600 bg-gray-800 accent-teal-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                />
              </TableHead>
              <TableHead className="p-2 text-teal-300 font-bold cursor-pointer" onClick={() => requestSort("name")}>
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                  Name {getSortDirectionIcon("name")}
                </motion.div>
              </TableHead>
              <TableHead className="p-2 text-teal-300 font-bold cursor-pointer" onClick={() => requestSort("email")}>
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                  Email {getSortDirectionIcon("email")}
                </motion.div>
              </TableHead>
              <TableHead className="p-2 text-teal-300 font-bold cursor-pointer" onClick={() => requestSort("location.city")}>
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                  Location {getSortDirectionIcon("location.city")}
                </motion.div>
              </TableHead>
              <TableHead className="p-2 text-teal-300 font-bold cursor-pointer" onClick={() => requestSort("status")}>
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                  Status {getSortDirectionIcon("status")}
                </motion.div>
              </TableHead>
              <TableHead className="p-2 text-teal-300 font-bold cursor-pointer" onClick={() => requestSort("performance")}>
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                  Performance {getSortDirectionIcon("performance")}
                </motion.div>
              </TableHead>
              <TableHead className="p-2 text-teal-300 font-bold cursor-pointer" onClick={() => requestSort("balance")}>
                <motion.div className="flex items-center gap-2 justify-end" whileHover={{ scale: 1.05 }}>
                  Balance {getSortDirectionIcon("balance")}
                </motion.div>
              </TableHead>
              <TableHead className="w-12 p-2 text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="wait">
              <motion.tbody
                key={page}
                custom={animationDirection}
                variants={tableVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="transition-all duration-300"
              >
                {currentPageUsers.length > 0 ? (
                  currentPageUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      custom={index}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="border-b border-gray-700 hover:bg-gray-800/70 transition-colors duration-300"
                      whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.8)", scale: 1.01 }}
                    >
                      <TableCell className="w-12 p-2 text-center">
                        <motion.input
                          type="checkbox"
                          className="h-5 w-5 rounded-lg border-gray-600 bg-gray-800 accent-teal-500"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        />
                      </TableCell>
                      <TableCell className="p-2 font-medium text-white">
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {user.name}
                        </motion.span>
                      </TableCell>
                      <TableCell className="p-2 text-gray-300">
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {user.email}
                        </motion.span>
                      </TableCell>
                      <TableCell className="p-2 text-gray-300">
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="flex items-center gap-2"
                        >
                          <motion.span
                            className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-teal-400"
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.5 }}
                          >
                            {user.location.code}
                          </motion.span>
                          {user.location.city}
                        </motion.span>
                      </TableCell>
                      <TableCell className="p-2">
                        <motion.span
                          variants={statusVariants}
                          initial="initial"
                          animate="animate"
                          whileHover="whileHover"
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.status === "active" ? "bg-teal-500/20 text-teal-300" : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </motion.span>
                      </TableCell>
                      <TableCell className="p-2">{getPerformanceBadge(user.performance)}</TableCell>
                      <TableCell className="p-2 text-right text-green-400 font-bold">
                        <motion.span
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          ${user.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </motion.span>
                      </TableCell>
                      <TableCell className="w-12 p-2 text-center">
                        <motion.div whileHover={{ scale: 1.2, rotate: 90 }} transition={{ duration: 0.3 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-teal-400 hover:bg-gray-700 rounded-full transition-all duration-300"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </motion.div>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-gray-400">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </motion.tbody>
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* Pagination with Enhanced Animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-between items-center mt-4 p-4 bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700 shadow-lg"
      >
        <motion.div
          className="flex items-center gap-4"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm text-gray-400">Rows per page</span>
          <Select value={String(rowsPerPage)} onValueChange={(val) => setRowsPerPage(Number(val))}>
            <SelectTrigger className="w-16 bg-gray-700/50 border-0 text-white rounded-full h-8">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 rounded-xl">
              <SelectItem value="10" className="hover:bg-teal-500/20">
                10
              </SelectItem>
              <SelectItem value="20" className="hover:bg-teal-500/20">
                20
              </SelectItem>
              <SelectItem value="30" className="hover:bg-teal-500/20">
                30
              </SelectItem>
            </SelectContent>
          </Select>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-gray-400"
          >
            {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}
          </motion.span>
        </motion.div>
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(1)}
              disabled={page === 1}
              className="bg-gray-700/50 border-0 text-teal-400 hover:bg-teal-500/50 rounded-full h-8 w-8 transition-all duration-300"
            >
              <ChevronsLeft className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="bg-gray-700/50 border-0 text-teal-400 hover:bg-teal-500/50 rounded-full h-8 w-8 transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="bg-gray-700/50 border-0 text-teal-400 hover:bg-teal-500/50 rounded-full h-8 w-8 transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(totalPages)}
              disabled={page === totalPages}
              className="bg-gray-700/50 border-0 text-teal-400 hover:bg-teal-500/50 rounded-full h-8 w-8 transition-all duration-300"
            >
              <ChevronsRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TableDashboard;
