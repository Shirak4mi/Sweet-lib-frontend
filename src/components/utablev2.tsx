"use client";
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/base";
import { Button } from "@/components/ui/base";
import { Input } from "@/components/ui/base";
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

const cstfs: Array<User> = [
  {
    id: "1",
    name: "Alex Allan2",
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
  // Add more users as needed (up to 30 for demo)
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
  // Extend to 30 users with random data if needed
];

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
  // Add more users as needed (up to 30 for demo)
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
  ...cstfs,
  // Extend to 30 users with random data if needed
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
    return sortConfig.direction === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const getPerformanceBadge = (performance: User["performance"]) => {
    const styles = {
      excellent: "bg-gradient-to-r from-emerald-500 to-green-500 text-white",
      "very good": "bg-gradient-to-r from-teal-500 to-cyan-500 text-white",
      good: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
      poor: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-sm font-semibold shadow-lg ${styles[performance]}`}>
        {performance.charAt(0).toUpperCase() + performance.slice(1)}
      </span>
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

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-4 rounded-xl shadow-2xl">
      {/* Header with Glow Effect */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-between items-center mb-6 p-4 bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700 shadow-lg"
      >
        <div className="relative w-64">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-400" />
          <Input
            placeholder="Filter by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border-0 text-white placeholder-gray-400 rounded-full focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
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
          <Button
            variant="outline"
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-0 rounded-full h-10 px-4 hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus className="h-5 w-5 mr-2" /> Add User
          </Button>
        </div>
      </motion.div>

      {/* Table with Stunning Design */}
      <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-md">
        <Table className="w-full text-left">
          <TableHeader className="bg-gradient-to-r from-gray-800 to-gray-900 sticky top-0 z-10">
            <TableRow className="border-b border-gray-700 hover:bg-gray-800/50">
              <TableHead className="w-12 p-2 text-center">
                <input type="checkbox" className="h-5 w-5 rounded-lg border-gray-600 bg-gray-800 accent-teal-500" />
              </TableHead>
              <TableHead className="p-2 text-teal-300 font-bold cursor-pointer" onClick={() => requestSort("name")}>
                <div className="flex items-center gap-2">Name {getSortDirectionIcon("name")}</div>
              </TableHead>
              <TableHead className="p-2 text-teal-300 font-bold cursor-pointer" onClick={() => requestSort("email")}>
                <div className="flex items-center gap-2">Email {getSortDirectionIcon("email")}</div>
              </TableHead>
              <TableHead className="p-2 text-teal-300 font-bold cursor-pointer" onClick={() => requestSort("location.city")}>
                <div className="flex items-center gap-2">Location {getSortDirectionIcon("location.city")}</div>
              </TableHead>
              <TableHead className="p-2 text-teal-300 font-bold cursor-pointer" onClick={() => requestSort("status")}>
                <div className="flex items-center gap-2">Status {getSortDirectionIcon("status")}</div>
              </TableHead>
              <TableHead className="p-2 text-teal-300 font-bold cursor-pointer" onClick={() => requestSort("performance")}>
                <div className="flex items-center gap-2">Performance {getSortDirectionIcon("performance")}</div>
              </TableHead>
              <TableHead className="p-2 text-teal-300 font-bold cursor-pointer" onClick={() => requestSort("balance")}>
                <div className="flex items-center gap-2 justify-end">Balance {getSortDirectionIcon("balance")}</div>
              </TableHead>
              <TableHead className="w-12 p-2 text-center"></TableHead>
            </TableRow>
          </TableHeader>
          {/* <motion.tbody
            key={page}
            custom={animationDirection}
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="transition-all duration-300"
          > */}
          <TableBody>
            <AnimatePresence mode="wait">
              {currentPageUsers.length > 0 ? (
                currentPageUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-b border-gray-700 hover:bg-gray-800/70 transition-colors duration-300"
                  >
                    <TableCell className="w-12 p-2 text-center">
                      <input type="checkbox" className="h-5 w-5 rounded-lg border-gray-600 bg-gray-800 accent-teal-500" />
                    </TableCell>
                    <TableCell className="p-2 font-medium text-white animate-pulse-once">{user.name}</TableCell>
                    <TableCell className="p-2 text-gray-300">{user.email}</TableCell>
                    <TableCell className="p-2 text-gray-300">
                      <span className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-teal-400">
                          {user.location.code}
                        </span>
                        {user.location.city}
                      </span>
                    </TableCell>
                    <TableCell className="p-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.status === "active" ? "bg-teal-500/20 text-teal-300" : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="p-2">{getPerformanceBadge(user.performance)}</TableCell>
                    <TableCell className="p-2 text-right text-green-400 font-bold">
                      ${user.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="w-12 p-2 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-teal-400 hover:bg-gray-700 rounded-full transition-all duration-300"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-gray-400">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
          {/* </motion.tbody> */}
        </Table>
      </div>

      {/* Pagination with Glow and Direction-Aware Animation */}
      <div className="flex justify-between items-center mt-4 p-4 bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700 shadow-lg">
        <div className="flex items-center gap-4">
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
          <span className="text-sm text-gray-400">
            {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(1)}
            disabled={page === 1}
            className="bg-gray-700/50 border-0 text-teal-400 hover:bg-teal-500/50 rounded-full h-8 w-8 transition-all duration-300"
          >
            <ChevronsLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="bg-gray-700/50 border-0 text-teal-400 hover:bg-teal-500/50 rounded-full h-8 w-8 transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="bg-gray-700/50 border-0 text-teal-400 hover:bg-teal-500/50 rounded-full h-8 w-8 transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(totalPages)}
            disabled={page === totalPages}
            className="bg-gray-700/50 border-0 text-teal-400 hover:bg-teal-500/50 rounded-full h-8 w-8 transition-all duration-300"
          >
            <ChevronsRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableDashboard;
