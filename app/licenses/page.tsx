"use client";

import React, { useState, useMemo } from "react";
import {
  licenses,
  studentLicenses,
  getLicenseStats,
  getLicenseStatusColor,
  getProductColor,
  currentUser,
  type Product,
  type LicenseStatus,
} from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Key,
  Users,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  ChevronDown,
  Calendar,
  Mail,
  Eye,
} from "lucide-react";
import { AddLicenseModal } from "@/components/licenses/AddLicenseModal";

const productColors: Record<Product, { bg: string; text: string; border: string }> = {
  "Platform 1": { bg: "bg-[#4A3B8A]", text: "text-white", border: "border-[#4A3B8A]" },
  "Platform 2": { bg: "bg-[#E21A23]", text: "text-white", border: "border-[#E21A23]" },
  "Platform 3": { bg: "bg-[#10B981]", text: "text-white", border: "border-[#10B981]" },
  "Platform 4": { bg: "bg-[#F8B4D9]", text: "text-[#4A3B8A]", border: "border-[#F8B4D9]" },
};

export default function LicensesPage() {
  const stats = getLicenseStats();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<LicenseStatus | "all">("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const isViewOnly = currentUser.permissions.licenses === "view_only";

  const filteredStudentLicenses = useMemo(() => {
    return studentLicenses.filter((sl) => {
      const matchesSearch =
        searchQuery === "" ||
        sl.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sl.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sl.studentId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProduct = selectedProduct === "all" || sl.product === selectedProduct;
      const matchesStatus = selectedStatus === "all" || sl.status === selectedStatus;

      return matchesSearch && matchesProduct && matchesStatus;
    });
  }, [searchQuery, selectedProduct, selectedStatus]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--card)] border-b border-[var(--border)] px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="animate-slideInFromLeft">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A3B8A] to-[#6A5BAA] flex items-center justify-center">
                  <Key className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold text-[var(--foreground)]">
                    License Management
                  </h1>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Track and manage licenses across all EduTech products
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isViewOnly ? (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--muted)] text-[var(--muted-foreground)] text-sm">
                  <Eye className="h-4 w-4" />
                  View Only
                </div>
              ) : (
                <>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm hover:bg-[var(--muted)] transition-colors">
                    <Upload className="h-4 w-4" />
                    Bulk Import
                  </button>
                  <Button
                    variant="primary"
                    onClick={() => setShowAddModal(true)}
                    leftIcon={<Plus className="h-4 w-4" />}
                  >
                    Add License
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 animate-slideUp">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[var(--muted-foreground)]">Total Licenses</span>
              <div className="w-8 h-8 rounded-lg bg-[#4A3B8A]/10 flex items-center justify-center">
                <Key className="h-4 w-4 text-[#4A3B8A]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[var(--foreground)]">{stats.total.toLocaleString()}</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">Across all products</p>
          </div>

          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 animate-slideUp" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[var(--muted-foreground)]">In Use</span>
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <Users className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[var(--foreground)]">{stats.used.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {stats.utilizationRate}% utilization
            </p>
          </div>

          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 animate-slideUp" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[var(--muted-foreground)]">Available</span>
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Key className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[var(--foreground)]">{stats.available}</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">Ready to assign</p>
          </div>

          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 animate-slideUp" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[var(--muted-foreground)]">Expiring Soon</span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-amber-600">{stats.expiring}</p>
            <p className="text-xs text-amber-600 mt-1">Requires attention</p>
          </div>
        </div>

        {/* Product License Cards */}
        <div className="mb-8">
          <h2 className="text-lg font-display font-semibold text-[var(--foreground)] mb-4">
            License by Product
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {licenses.map((license, idx) => {
              const colors = productColors[license.product];
              const utilizationPercent = Math.round((license.usedSeats / license.totalSeats) * 100);

              return (
                <div
                  key={license.id}
                  className={cn(
                    "bg-[var(--card)] rounded-xl border-2 p-5 transition-all duration-300 hover:shadow-lg animate-slideUp",
                    license.status === "expiring_soon" ? "border-amber-400" : "border-[var(--border)]"
                  )}
                  style={{ animationDelay: `${200 + idx * 50}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn("px-3 py-1 rounded-full text-xs font-medium", colors.bg, colors.text)}>
                      {license.product}
                    </span>
                    {license.status === "expiring_soon" && (
                      <span className="flex items-center gap-1 text-xs text-amber-600">
                        <AlertTriangle className="h-3 w-3" />
                        Expiring
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-2xl font-bold text-[var(--foreground)]">{license.usedSeats}</span>
                      <span className="text-sm text-[var(--muted-foreground)]">/ {license.totalSeats}</span>
                    </div>
                    <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", colors.bg)}
                        style={{ width: `${utilizationPercent}%` }}
                      />
                    </div>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">{utilizationPercent}% utilized</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--muted-foreground)]">Available</span>
                      <span className="font-medium text-[var(--foreground)]">{license.availableSeats}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--muted-foreground)]">Expires</span>
                      <span className={cn("font-medium", license.status === "expiring_soon" ? "text-amber-600" : "text-[var(--foreground)]")}>
                        {format(license.expirationDate, "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--muted-foreground)]">Cost/Seat</span>
                      <span className="font-medium text-[var(--foreground)]">${license.costPerSeat}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Student Licenses Table */}
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden animate-slideUp" style={{ animationDelay: "400ms" }}>
          <div className="p-5 border-b border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-display font-semibold text-[var(--foreground)]">
                Student Licenses
              </h2>
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 w-64 rounded-lg text-sm bg-[var(--muted)] border border-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[#E21A23] focus:ring-2 focus:ring-[#E21A23]/20"
                  />
                </div>

                {/* Product Filter */}
                <div className="relative">
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value as Product | "all")}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg text-sm bg-[var(--muted)] border border-transparent text-[var(--foreground)] focus:outline-none focus:border-[#E21A23] cursor-pointer"
                  >
                    <option value="all">All Products</option>
                    <option value="Platform 1">Platform 1</option>
                    <option value="Platform 2">Platform 2</option>
                    <option value="Platform 3">Platform 3</option>
                    <option value="Platform 4">Platform 4</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none" />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as LicenseStatus | "all")}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg text-sm bg-[var(--muted)] border border-transparent text-[var(--foreground)] focus:outline-none focus:border-[#E21A23] cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expiring_soon">Expiring Soon</option>
                    <option value="expired">Expired</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none" />
                </div>

                <button className="p-2 rounded-lg border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--muted)]">
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                    Student
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                    Product
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                    Course
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                    Assigned
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                    Expires
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                    Last Access
                  </th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredStudentLicenses.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center">
                      <div className="text-[var(--muted-foreground)]">
                        <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                        <p>No student licenses found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudentLicenses.map((sl, idx) => {
                    const colors = productColors[sl.product];
                    return (
                      <tr
                        key={sl.id}
                        className="hover:bg-[var(--muted)]/50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4A3B8A] to-[#6A5BAA] flex items-center justify-center text-white text-xs font-bold">
                              {sl.studentName.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[var(--foreground)]">{sl.studentName}</p>
                              <p className="text-xs text-[var(--muted-foreground)]">{sl.studentId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", colors.bg, colors.text)}>
                            {sl.product}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-[var(--foreground)]">
                          {sl.courseName || "—"}
                        </td>
                        <td className="px-5 py-4 text-sm text-[var(--muted-foreground)]">
                          {format(sl.assignedDate, "MMM d, yyyy")}
                        </td>
                        <td className="px-5 py-4 text-sm text-[var(--muted-foreground)]">
                          {format(sl.expirationDate, "MMM d, yyyy")}
                        </td>
                        <td className="px-5 py-4">
                          <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium capitalize", getLicenseStatusColor(sl.status))}>
                            {sl.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-[var(--muted-foreground)]">
                          {sl.lastAccess ? format(sl.lastAccess, "MMM d, yyyy") : "Never"}
                        </td>
                        <td className="px-5 py-4">
                          <button className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-5 py-4 border-t border-[var(--border)] flex items-center justify-between">
            <p className="text-sm text-[var(--muted-foreground)]">
              Showing <span className="font-medium text-[var(--foreground)]">1-{filteredStudentLicenses.length}</span> of{" "}
              <span className="font-medium text-[var(--foreground)]">{stats.used.toLocaleString()}</span> student licenses
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--muted-foreground)] mr-2">
                Page 1 of {Math.ceil(stats.used / 8)}
              </span>
              <button
                disabled
                className="px-3 py-1.5 rounded-lg text-sm border border-[var(--border)] text-[var(--muted-foreground)] disabled:opacity-50"
              >
                Previous
              </button>
              <Button variant="primary" size="sm">
                1
              </Button>
              <button className="px-3 py-1.5 rounded-lg text-sm border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]">
                2
              </button>
              <button className="px-3 py-1.5 rounded-lg text-sm border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]">
                3
              </button>
              <span className="text-[var(--muted-foreground)]">...</span>
              <button className="px-3 py-1.5 rounded-lg text-sm border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]">
                {Math.ceil(stats.used / 8)}
              </button>
              <button className="px-3 py-1.5 rounded-lg text-sm border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Add License Modal */}
      <AddLicenseModal open={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
