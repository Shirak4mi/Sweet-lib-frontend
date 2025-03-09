"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/base";

const AncaiEnhancedTable = () => {
  // Sample data
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active", role: "Developer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive", role: "Designer" },
    { id: 3, name: "Robert Johnson", email: "robert@example.com", status: "Active", role: "Manager" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", status: "Pending", role: "Content Writer" },
    { id: 5, name: "Michael Brown", email: "michael@example.com", status: "Active", role: "Developer" },
  ];

  // State for row hover and selected row
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full p-6 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl">
      <Table className="w-full border-collapse overflow-hidden rounded-lg bg-white">
        <TableCaption className="text-lg font-bold italic text-gray-700 pb-4">Team Members Dashboard</TableCaption>

        <TableHeader className="bg-gradient-to-r from-purple-600 to-indigo-600">
          <TableRow>
            <TableHead className="font-bold text-white p-4 text-left">ID</TableHead>
            <TableHead className="font-bold text-white p-4 text-left">Name</TableHead>
            <TableHead className="font-bold text-white p-4 text-left hidden md:table-cell">Email</TableHead>
            <TableHead className="font-bold text-white p-4 text-left">Status</TableHead>
            <TableHead className="font-bold text-white p-4 text-left hidden sm:table-cell">Role</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              className={`
                border-b border-gray-200 transition-all duration-300 
                ${hoveredRow === row.id ? "bg-gray-50 transform scale-102" : "bg-white"}
                ${selectedRow === row.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""}
              `}
              onMouseEnter={() => setHoveredRow(row.id)}
              onMouseLeave={() => setHoveredRow(null)}
              onClick={() => setSelectedRow(row.id === selectedRow ? null : row.id)}
            >
              <TableCell className="p-4 font-mono text-gray-500">{row.id}</TableCell>
              <TableCell className="p-4 font-medium">{row.name}</TableCell>
              <TableCell className="p-4 hidden md:table-cell text-gray-600">{row.email}</TableCell>
              <TableCell className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                  {row.status}
                </span>
              </TableCell>
              <TableCell className="p-4 hidden sm:table-cell text-gray-700">{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 text-sm text-gray-500 italic">
        Click on a row to select it • Responsive design adapts to screen size
      </div>
    </div>
  );
};

export default AncaiEnhancedTable;
