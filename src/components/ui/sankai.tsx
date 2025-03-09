"use client";
import React from "react";
import { Table, TableHeader, TableBody } from "@/components/ui/base"; // Using canary version
import { motion, AnimatePresence } from "framer-motion";

// Define Types
type TableData = {
  id: string;
  [key: string]: string | number | boolean;
};

// Base Animated Table Component
const AnimatedTable = ({ data, columns }: { data: TableData[]; columns: { key: string; label: string }[] }) => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95, rotateX: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        delay: i * 0.15,
        duration: 0.6,
      },
    }),
    exit: { opacity: 0, y: -50, scale: 0.95, rotateX: -10, transition: { duration: 0.4, ease: "easeInOut" } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const headerItemVariants = {
    hidden: { opacity: 0, x: -30, rotate: -5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 0.4, type: "spring", stiffness: 150, damping: 15 },
    },
  };

  const cellVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, delay: i * 0.05 },
    }),
    hover: {
      scale: 1.1,
      boxShadow: "0 0 15px rgba(45, 212, 191, 0.7)",
      background: "rgba(45, 212, 191, 0.1)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const particleVariants = {
    animate: {
      y: [0, -10, 0],
      opacity: [0, 1, 0],
      transition: {
        repeat: Infinity,
        duration: Math.random() * 3 + 2,
        ease: "easeInOut",
      },
    },
  };

  // Generate particles for background effect
  const particles = Array.from({ length: 20 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-teal-400 rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      variants={particleVariants}
      animate="animate"
    />
  ));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full overflow-x-auto rounded-xl bg-gradient-to-br from-gray-900/70 via-black to-gray-800/70 backdrop-blur-lg border border-teal-500/30 shadow-[0_0_30px_rgba(45,212,191,0.4)]"
    >
      {/* Background Particle Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>

      {/* Glowing Overlay */}
      <motion.div
        className="absolute inset-0 border-2 border-teal-500/50 rounded-xl"
        variants={pulseVariants}
        animate="pulse"
      />

      {/* Table Content */}
      <motion.div className="relative z-10">
        <Table className="w-full text-left text-white">
          <TableHeader className="bg-gradient-to-r from-teal-900/80 to-gray-900/80 sticky top-0 z-20">
            <motion.tr
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              className="border-b-2 border-teal-500/40 hover:bg-teal-900/60 transition-all duration-300"
            >
              {columns.map((col, index) => (
                <motion.th
                  key={col.key}
                  variants={headerItemVariants}
                  className="p-4 font-bold text-teal-300 uppercase tracking-wider text-sm"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, color: "#2dd4bf", rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    {col.label}
                    <motion.div
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </motion.th>
              ))}
            </motion.tr>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {data.map((row, rowIndex) => (
                <motion.tr
                  key={row.id}
                  custom={rowIndex}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="border-b border-teal-500/30 hover:bg-teal-800/40 transition-all duration-300"
                  whileHover={{
                    background: "rgba(45, 212, 191, 0.15)",
                    boxShadow: "0 0 20px rgba(45, 212, 191, 0.3)",
                    transition: { duration: 0.3 },
                  }}
                >
                  {columns.map((col, colIndex) => (
                    <motion.td
                      key={`${row.id}-${col.key}`}
                      variants={cellVariants}
                      initial="initial"
                      animate="animate"
                      custom={colIndex}
                      whileHover="hover"
                      whileTap="tap"
                      className="p-4 text-gray-200 font-medium relative"
                    >
                      <motion.span
                        className="inline-block relative"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: colIndex * 0.2 }}
                      >
                        {typeof row[col.key] === "boolean" ? (
                          <motion.div
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              row[col.key] ? "bg-teal-500/30 text-teal-300" : "bg-gray-500/30 text-gray-400"
                            }`}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: colIndex * 0.3 }}
                          >
                            {row[col.key] ? "Active" : "Inactive"}
                          </motion.div>
                        ) : (
                          (row[col.key] as string | number)
                        )}
                        {/* Underline Glow Effect */}
                        <motion.div
                          className="absolute bottom-2 left-0 w-full h-0.5 bg-teal-500/50"
                          initial={{ width: "0%" }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.span>
                    </motion.td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>
    </motion.div>
  );
};

// Example Usage
const ExampleUsageSankai = () => {
  const sampleData: TableData[] = [
    { id: "1", name: "Alex Allan", email: "alex@company.com", status: true },
    { id: "2", name: "Anna Visconti", email: "anna@company.com", status: false },
    { id: "3", name: "Cheng Wei", email: "cheng@company.com", status: true },
    { id: "4", name: "David Kim", email: "david@company.com", status: true },
    { id: "5", name: "Emma Laurent", email: "emma@company.com", status: false },
  ];

  const sampleColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" },
  ];

  return <AnimatedTable data={sampleData} columns={sampleColumns} />;
};

export { AnimatedTable, ExampleUsageSankai };
