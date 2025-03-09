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
  Users,
  Plus,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define types for our data
type User = {
  id: string;
  name: string;
  email: string;
  location: { code: string; city: string };
  status: "active" | "inactive";
  performance: "excellent" | "very good" | "good" | "poor";
  balance: number;
};

// Sample data (unchanged for brevity)
const sampleUsers: User[] = [
  /* your sample data */
  {
    id: "1",
    name: "Alex Thompson",
    email: "a.tompson@company.com",
    location: { code: "US", city: "San Francisco" },
    status: "inactive",
    performance: "excellent",
    balance: 1750.0,
  },
];

// Component
const UsersTable = () => {
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filtering and sorting logic (unchanged for brevity)
  useEffect(() => {
    let result = [...users];
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${user.location.city} ${user.location.code}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter);
    }
    if (sortConfig) {
      result.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === "location.city") {
          aValue = a.location.city;
          bValue = b.location.city;
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    setFilteredUsers(result);
    setPage(1);
  }, [users, searchTerm, statusFilter, sortConfig]);

  // Pagination logic
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
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortDirectionIcon = (key: keyof User | "location.city") => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-3 h-3 ml-1 text-slate-500" />
    ) : (
      <ArrowDown className="w-3 h-3 ml-1 text-slate-500" />
    );
  };

  const getPerformanceBadge = (performance: User["performance"]) => {
    const styles = {
      excellent: "bg-green-500/20 text-green-400",
      "very good": "bg-emerald-500/20 text-emerald-400",
      good: "bg-blue-500/20 text-blue-400",
      poor: "bg-red-500/20 text-red-400",
    };
    return (
      <span className={`px-2 py-1 rounded text-xs ${styles[performance]}`}>
        {performance.charAt(0).toUpperCase() + performance.slice(1)}
      </span>
    );
  };

  // Animation variants
  const tableVariants = {
    hidden: (direction: "left" | "right") => ({
      x: direction === "left" ? -20 : 20,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "left" ? 20 : -20,
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2, ease: [0.25, 0.8, 0.25, 1] },
    },
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-[#111827] to-[#0f172a] rounded-xl shadow-md text-slate-300">
      {/* Header */}
      <div className="flex justify-between items-center gap-2 p-4">
        <div className="relative w-64">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Filter by name or email..."
            className="pl-10 bg-[#1e293b] border-0 text-slate-200 placeholder:text-slate-500 rounded-md h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] bg-[#1e293b] border-0 text-slate-200 h-10 rounded-md">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e293b] border-slate-700 text-slate-200 rounded-md">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="bg-[#1e293b] border-0 text-slate-200 h-10 rounded-md flex items-center gap-2"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <Button variant="outline" className="bg-[#1e293b] border-0 text-slate-200 h-10 rounded-md flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{filteredUsers.length} Users</span>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-10 rounded-md flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add user</span>
          </Button>
        </div>
      </div>

      {/* Filter Dropdown */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-[#1e293b] mx-4 p-4 rounded-md mb-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Performance</label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full bg-[#1e293b] border-slate-700 text-slate-200 rounded-md">
                    <SelectValue placeholder="All Performance" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e293b] border-slate-700 text-slate-200 rounded-md">
                    <SelectItem value="all">All Performance</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="very good">Very Good</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Add more filters as needed */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="overflow-x-auto flex-grow">
        <Table className="w-full min-w-[700px] table-fixed">
          <TableHeader>
            <TableRow className="border-b border-slate-700 hover:bg-[#1e293b]">
              <TableHead className="w-12 text-center">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-800" />
              </TableHead>
              <TableHead className="text-slate-400 cursor-pointer text-left" onClick={() => requestSort("name")}>
                <div className="flex items-center gap-1">Name {getSortDirectionIcon("name")}</div>
              </TableHead>
              <TableHead className="text-slate-400 cursor-pointer text-left" onClick={() => requestSort("email")}>
                <div className="flex items-center gap-1">Email {getSortDirectionIcon("email")}</div>
              </TableHead>
              <TableHead className="text-slate-400 cursor-pointer text-left" onClick={() => requestSort("location.city")}>
                <div className="flex items-center gap-1">Location {getSortDirectionIcon("location.city")}</div>
              </TableHead>
              <TableHead className="text-slate-400 cursor-pointer text-left" onClick={() => requestSort("status")}>
                <div className="flex items-center gap-1">Status {getSortDirectionIcon("status")}</div>
              </TableHead>
              <TableHead className="text-slate-400 cursor-pointer text-left" onClick={() => requestSort("performance")}>
                <div className="flex items-center gap-1">Performance {getSortDirectionIcon("performance")}</div>
              </TableHead>
              <TableHead className="text-slate-400 cursor-pointer text-right" onClick={() => requestSort("balance")}>
                <div className="flex items-center justify-end gap-1">Balance {getSortDirectionIcon("balance")}</div>
              </TableHead>
              <TableHead className="w-12 text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <AnimatePresence mode="wait">
            <TableBody>
              {currentPageUsers.map((user) => (
                <TableRow key={user.id} className="border-b border-slate-700 hover:bg-[#1e293b] cursor-pointer">
                  <TableCell className="w-12 text-center">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-800" />
                  </TableCell>
                  <TableCell className="text-left">{user.name}</TableCell>
                  <TableCell className="text-left">{user.email}</TableCell>
                  <TableCell className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-slate-700 text-xs flex items-center justify-center">
                        {user.location.code}
                      </span>
                      {user.location.city}
                    </div>
                  </TableCell>
                  <TableCell className="text-left">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.status === "active" ? "bg-green-500/20 text-green-400" : "bg-slate-500/20 text-slate-400"
                      }`}
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-left">{getPerformanceBadge(user.performance)}</TableCell>
                  <TableCell className="text-right">
                    ${user.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="w-12 text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </AnimatePresence>
        </Table>
      </div>

      {/* Pagination (unchanged for brevity) */}
      <div className="flex justify-between items-center p-4 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Rows per page</span>
          <Select value={String(rowsPerPage)} onValueChange={(val) => setRowsPerPage(Number(val))}>
            <SelectTrigger className="w-16 h-8 bg-[#1e293b] border-0 text-slate-200 rounded-md">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e293b] border-slate-700 text-slate-200 rounded-md">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-slate-400">
            {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(1)}
            disabled={page === 1}
            className="h-8 w-8 bg-[#1e293b] border-0 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-50 rounded-md"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="h-8 w-8 bg-[#1e293b] border-0 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-50 rounded-md"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="h-8 w-8 bg-[#1e293b] border-0 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-50 rounded-md"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(totalPages)}
            disabled={page === totalPages}
            className="h-8 w-8 bg-[#1e293b] border-0 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-50 rounded-md"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
