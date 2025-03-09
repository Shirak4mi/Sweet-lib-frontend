"use client";
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/base";
import { Badge } from "@/components/ui/base";
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
  ArrowUpDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define types for our data
type User = {
  id: string;
  name: string;
  email: string;
  location: {
    city: string;
    country: string;
  };
  status: "active" | "inactive";
  performance: "excellent" | "very good" | "good" | "average" | "poor";
  balance: number;
};

// Sample data
const sampleUsers: User[] = [
  {
    id: "1",
    name: "Alex Allan",
    email: "alex.allan@company.com",
    location: { city: "São Paulo", country: "BR" },
    status: "active",
    performance: "excellent",
    balance: 2100.0,
  },
  {
    id: "2",
    name: "Alex Thompson",
    email: "a.tompson@company.com",
    location: { city: "San Francisco", country: "US" },
    status: "inactive",
    performance: "excellent",
    balance: 1750.0,
  },
  {
    id: "3",
    name: "Anna Visconti",
    email: "anna.visconti@company.com",
    location: { city: "Rome", country: "IT" },
    status: "active",
    performance: "good",
    balance: 0.0,
  },
  {
    id: "4",
    name: "Astrid Andersen",
    email: "a.andersen@company.com",
    location: { city: "Oslo", country: "NO" },
    status: "inactive",
    performance: "good",
    balance: 1100.0,
  },
  {
    id: "5",
    name: "Cheng Wei",
    email: "c.wei@company.com",
    location: { city: "Shanghai", country: "CN" },
    status: "active",
    performance: "excellent",
    balance: 2700.0,
  },
  {
    id: "6",
    name: "David Kim",
    email: "d.kim@company.com",
    location: { city: "Paris", country: "FR" },
    status: "active",
    performance: "very good",
    balance: 890.0,
  },
  {
    id: "7",
    name: "Diego Mendoza",
    email: "d.mendoza@company.com",
    location: { city: "Mexico City", country: "MX" },
    status: "active",
    performance: "good",
    balance: 1800.0,
  },
  {
    id: "8",
    name: "Emma Laurent",
    email: "e.laurent@company.com",
    location: { city: "Berlin", country: "DE" },
    status: "active",
    performance: "very good",
    balance: 1200.0,
  },
  {
    id: "9",
    name: "Eva Kowalski",
    email: "e.kowalski@company.com",
    location: { city: "Seoul", country: "KR" },
    status: "active",
    performance: "good",
    balance: 920.0,
  },
  {
    id: "10",
    name: "Fatima Al-Sayed",
    email: "f.alsayed@company.com",
    location: { city: "Cairo", country: "EG" },
    status: "active",
    performance: "excellent",
    balance: 1950.0,
  },
  // Add more sample data here
];

// Generate more users for demonstration
for (let i = 11; i <= 50; i++) {
  const performance = ["excellent", "very good", "good", "average", "poor"][
    Math.floor(Math.random() * 5)
  ] as User["performance"];
  const status = Math.random() > 0.3 ? "active" : "inactive";
  sampleUsers.push({
    id: i.toString(),
    name: `Test User ${i}`,
    email: `user${i}@company.com`,
    location: { city: "Test City", country: "TC" },
    status,
    performance,
    balance: Math.round(Math.random() * 3000 * 100) / 100,
  });
}

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(sampleUsers);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{ key: keyof User | "location.country"; direction: "asc" | "desc" } | null>(
    null
  );
  const [animationDirection, setAnimationDirection] = useState<"left" | "right">("right");
  const [isFiltering, setIsFiltering] = useState(false);

  // Handle search and filtering
  useEffect(() => {
    let result = [...users];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${user.location.city} ${user.location.country}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter);
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        let aValue, bValue;

        if (sortConfig.key === "location.country") {
          aValue = a.location.country;
          bValue = b.location.country;
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredUsers(result);
    setPage(1); // Reset to first page when filters change
  }, [users, searchTerm, statusFilter, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPageUsers = filteredUsers.slice(startIndex, endIndex);

  // Handle pagination
  const goToPage = (newPage: number) => {
    setAnimationDirection(newPage > page ? "right" : "left");
    setPage(newPage);
  };

  // Handle sorting
  const requestSort = (key: keyof User | "location.country") => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sort direction icon
  const getSortDirectionIcon = (key: keyof User | "location.country") => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="w-4 h-4 ml-1 opacity-50" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUpDown className="w-4 h-4 ml-1 text-blue-500" />
    ) : (
      <ArrowUpDown className="w-4 h-4 ml-1 text-blue-500 rotate-180" />
    );
  };

  // Get performance badge color
  const getPerformanceColor = (performance: User["performance"]) => {
    switch (performance) {
      case "excellent":
        return "bg-green-500";
      case "very good":
        return "bg-emerald-500";
      case "good":
        return "bg-blue-500";
      case "average":
        return "bg-yellow-500";
      case "poor":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Animation variants for the table rows
  const tableVariants = {
    hidden: (direction: "left" | "right") => ({
      x: direction === "left" ? -20 : 20,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.04,
        delayChildren: 0.03,
      },
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "left" ? 20 : -20,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    }),
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
        ease: "easeInOut",
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
      {/* Header with filter and actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border-b border-slate-700 bg-slate-800/50">
        <div className="relative w-full md:w-64">
          <Input
            placeholder="Filter by name or email..."
            className="pl-9 bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Filter className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 bg-slate-800 border-slate-600 text-slate-100">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600 text-slate-100">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="secondary"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white border-none"
            onClick={() => setIsFiltering(!isFiltering)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Button variant="secondary" size="sm" className="bg-slate-800 hover:bg-slate-700 text-white border-slate-600">
            <Users className="h-4 w-4 mr-2" />
            {filteredUsers.length} Users
          </Button>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white border-none">
            <Plus className="h-4 w-4 mr-2" />
            Add user
          </Button>
        </div>
      </div>

      {/* Expanded filter panel */}
      {isFiltering && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-slate-800/30 p-4 border-b border-slate-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Performance</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-slate-100">
                  <SelectValue placeholder="All Performance" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 text-slate-100">
                  <SelectItem value="all">All Performance</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="very good">Very Good</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-1 block">Balance</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-slate-100">
                  <SelectValue placeholder="All Balances" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 text-slate-100">
                  <SelectItem value="all">All Balances</SelectItem>
                  <SelectItem value="positive">Positive Balance</SelectItem>
                  <SelectItem value="zero">Zero Balance</SelectItem>
                  <SelectItem value="1000plus">$1,000+</SelectItem>
                  <SelectItem value="2000plus">$2,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-1 block">Location</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-slate-100">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 text-slate-100">
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="eu">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-slate-800/50">
            <TableRow className="border-b-slate-700 hover:bg-slate-800/80">
              <TableHead className="w-12 text-slate-400">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-500 text-blue-600 focus:ring-blue-500" />
              </TableHead>
              <TableHead className="text-slate-400 cursor-pointer" onClick={() => requestSort("name")}>
                <div className="flex items-center">
                  Name
                  {getSortDirectionIcon("name")}
                </div>
              </TableHead>
              <TableHead className="text-slate-400 cursor-pointer" onClick={() => requestSort("email")}>
                <div className="flex items-center">
                  Email
                  {getSortDirectionIcon("email")}
                </div>
              </TableHead>
              <TableHead className="text-slate-400 cursor-pointer" onClick={() => requestSort("location.country")}>
                <div className="flex items-center">
                  Location
                  {getSortDirectionIcon("location.country")}
                </div>
              </TableHead>
              <TableHead className="text-slate-400 cursor-pointer" onClick={() => requestSort("status")}>
                <div className="flex items-center">
                  Status
                  {getSortDirectionIcon("status")}
                </div>
              </TableHead>
              <TableHead className="text-slate-400 cursor-pointer" onClick={() => requestSort("performance")}>
                <div className="flex items-center">
                  Performance
                  {getSortDirectionIcon("performance")}
                </div>
              </TableHead>
              <TableHead className="text-right text-slate-400 cursor-pointer" onClick={() => requestSort("balance")}>
                <div className="flex items-center justify-end">
                  Balance
                  {getSortDirectionIcon("balance")}
                </div>
              </TableHead>
              <TableHead className="w-12 text-slate-400"></TableHead>
            </TableRow>
          </TableHeader>

          <AnimatePresence mode="wait" custom={animationDirection}>
            <motion.div
              key={page}
              custom={animationDirection}
              variants={tableVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <TableBody>
                {currentPageUsers.length > 0 ? (
                  currentPageUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      custom={index}
                      variants={rowVariants}
                      className="border-b border-slate-700 hover:bg-slate-800/50 cursor-pointer text-slate-300 transition-colors"
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-500 text-blue-600 focus:ring-blue-500"
                        />
                      </TableCell>
                      <TableCell className="font-medium text-white">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-xs bg-slate-700 px-1.5 py-0.5 rounded text-slate-300">
                            {user.location.country}
                          </span>
                          <span>{user.location.city}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            user.status === "active"
                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                              : "bg-slate-500/20 text-slate-400 hover:bg-slate-500/30"
                          } border-none`}
                        >
                          {user.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${getPerformanceColor(user.performance)}`}></div>
                          <span className="capitalize">{user.performance}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`font-mono ${user.balance > 0 ? "text-green-400" : "text-slate-400"}`}>
                          ${user.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-slate-400">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </motion.div>
          </AnimatePresence>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-slate-800/30 border-t border-slate-700">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <span className="text-sm text-slate-400">Rows per page</span>
          <Select value={String(rowsPerPage)} onValueChange={(val) => setRowsPerPage(Number(val))}>
            <SelectTrigger className="w-16 h-8 bg-slate-800 border-slate-600 text-slate-100">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600 text-slate-100">
              <SelectItem value="5">5</SelectItem>
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
            className="h-8 w-8 bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-50"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="h-8 w-8 bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Calculate which page numbers to show
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <Button
                  key={i}
                  variant={page === pageNum ? "default" : "outline"}
                  size="icon"
                  onClick={() => goToPage(pageNum)}
                  className={`h-8 w-8 mx-0.5 ${
                    page === pageNum
                      ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                      : "bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="h-8 w-8 bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(totalPages)}
            disabled={page === totalPages}
            className="h-8 w-8 bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-50"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
