"use client";

import React, { useState, useMemo } from "react";
import {
  enrollmentCourses,
  enrollmentByProduct,
  lmsSyncInfo,
  getEnrollmentDashboardStats,
  getProductColor,
  currentUser,
  type Product,
} from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import {
  TrendingUp,
  Search,
  ChevronDown,
  Download,
  RefreshCw,
  Users,
  BookOpen,
  Activity,
  CheckCircle2,
  Eye,
  History,
  FileDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { EnrollmentActionsModal } from "@/components/enrollment/EnrollmentActionsModal";

const productColors: Record<Product, { bg: string; text: string; border: string; icon: string }> = {
  "Platform 1": { bg: "bg-[#4A3B8A]", text: "text-white", border: "border-[#4A3B8A]", icon: "bg-[#4A3B8A]/10 text-[#4A3B8A]" },
  "Platform 2": { bg: "bg-[#E21A23]", text: "text-white", border: "border-[#E21A23]", icon: "bg-[#E21A23]/10 text-[#E21A23]" },
  "Platform 3": { bg: "bg-[#10B981]", text: "text-white", border: "border-[#10B981]", icon: "bg-[#10B981]/10 text-[#10B981]" },
  "Platform 4": { bg: "bg-[#F8B4D9]", text: "text-[#4A3B8A]", border: "border-[#F8B4D9]", icon: "bg-[#F8B4D9]/20 text-[#4A3B8A]" },
};

type ViewMode = "course" | "product";

export default function EnrollmentPage() {
  const stats = getEnrollmentDashboardStats();
  const [viewMode, setViewMode] = useState<ViewMode>("course");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | "all">("all");
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [modalTab, setModalTab] = useState<"sync" | "export">("sync");

  const isViewOnly = currentUser.permissions.enrollment === "view_only";

  const filteredCourses = useMemo(() => {
    return enrollmentCourses.filter((course) => {
      const matchesSearch =
        searchQuery === "" ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProduct = selectedProduct === "all" || course.product === selectedProduct;

      return matchesSearch && matchesProduct;
    });
  }, [searchQuery, selectedProduct]);

  const openSyncModal = () => {
    setModalTab("sync");
    setShowActionsModal(true);
  };

  const openExportModal = () => {
    setModalTab("export");
    setShowActionsModal(true);
  };

  const timeSinceSync = formatDistanceToNow(lmsSyncInfo.lastSynced, { addSuffix: false });

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--card)] border-b border-[var(--border)] px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="animate-slideInFromLeft">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E21A23] to-[#F04A52] flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold text-[var(--foreground)]">
                    Enrollment Data
                  </h1>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Institution: State University
                  </p>
                </div>
              </div>
            </div>
            {isViewOnly && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--muted)] text-[var(--muted-foreground)] text-sm">
                <Eye className="h-4 w-4" />
                View Only
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* LMS Sync Status Card */}
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 mb-6 animate-slideUp">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--foreground)]">LMS:</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#4A3B8A]/10 text-[#4A3B8A] text-sm font-medium">
                  {lmsSyncInfo.lmsName}
                </span>
              </div>
              <div className="h-5 w-px bg-[var(--border)]" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--muted-foreground)]">Last Synced:</span>
                <span className="text-sm text-[var(--foreground)]">
                  {format(lmsSyncInfo.lastSynced, "MMM d, h:mm a")} ({timeSinceSync} ago)
                </span>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
              <span className="font-medium text-[var(--foreground)]">{lmsSyncInfo.totalCourses}</span> courses
              <span className="mx-1">•</span>
              <span className="font-medium text-[var(--foreground)]">{lmsSyncInfo.totalStudents.toLocaleString()}</span> students
              <span className="mx-1">•</span>
              <span className="text-green-600">+{lmsSyncInfo.newEnrollments} new</span>,
              <span className="text-red-500 ml-1">-{lmsSyncInfo.droppedStudents} dropped</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={openSyncModal}
                leftIcon={<RefreshCw className="h-4 w-4" />}
              >
                Sync Now
              </Button>
              <button
                onClick={openSyncModal}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm hover:bg-[var(--muted)] transition-colors"
              >
                <History className="h-4 w-4" />
                View History
              </button>
            </div>
            <div className="relative">
              <button
                onClick={openExportModal}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm hover:bg-[var(--muted)] transition-colors"
              >
                <FileDown className="h-4 w-4" />
                Export All Data
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Enrollment Summary Stats */}
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 mb-6 animate-slideUp" style={{ animationDelay: "50ms" }}>
          <h2 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-4">
            Enrollment Summary
          </h2>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--muted-foreground)]">Total:</span>
              <span className="text-lg font-bold text-[var(--foreground)]">{stats.total.toLocaleString()}</span>
            </div>
            <div className="h-5 w-px bg-[var(--border)]" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--muted-foreground)]">Active (30d):</span>
              <span className="text-lg font-bold text-[var(--foreground)]">{stats.active.toLocaleString()}</span>
              <span className="text-sm text-green-600">({stats.activePercentage}%)</span>
            </div>
            <div className="h-5 w-px bg-[var(--border)]" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--muted-foreground)]">Courses:</span>
              <span className="text-lg font-bold text-[var(--foreground)]">{stats.courses}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 pt-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-2">
              <span className={cn("w-3 h-3 rounded-full", productColors["Platform 1"].bg)} />
              <span className="text-sm text-[var(--muted-foreground)]">Platform 1:</span>
              <span className="text-sm font-medium text-[var(--foreground)]">{stats.byProduct["Platform 1"].count.toLocaleString()}</span>
              <span className="text-xs text-[var(--muted-foreground)]">({stats.byProduct["Platform 1"].percentage}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn("w-3 h-3 rounded-full", productColors["Platform 2"].bg)} />
              <span className="text-sm text-[var(--muted-foreground)]">Platform 2:</span>
              <span className="text-sm font-medium text-[var(--foreground)]">{stats.byProduct["Platform 2"].count.toLocaleString()}</span>
              <span className="text-xs text-[var(--muted-foreground)]">({stats.byProduct["Platform 2"].percentage}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn("w-3 h-3 rounded-full", productColors["Platform 3"].bg)} />
              <span className="text-sm text-[var(--muted-foreground)]">Platform 3:</span>
              <span className="text-sm font-medium text-[var(--foreground)]">{stats.byProduct["Platform 3"].count.toLocaleString()}</span>
              <span className="text-xs text-[var(--muted-foreground)]">({stats.byProduct["Platform 3"].percentage}%)</span>
            </div>
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-0 mb-6 animate-slideUp" style={{ animationDelay: "100ms" }}>
          <button
            onClick={() => setViewMode("course")}
            className={cn(
              "px-6 py-3 text-sm font-medium rounded-l-xl border transition-all",
              viewMode === "course"
                ? "bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] shadow-sm"
                : "bg-[var(--muted)] border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            )}
          >
            By Course
          </button>
          <button
            onClick={() => setViewMode("product")}
            className={cn(
              "px-6 py-3 text-sm font-medium rounded-r-xl border transition-all",
              viewMode === "product"
                ? "bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] shadow-sm"
                : "bg-[var(--muted)] border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            )}
          >
            By Product
          </button>
        </div>

        {/* By Course View */}
        {viewMode === "course" && (
          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden animate-slideUp" style={{ animationDelay: "150ms" }}>
            {/* Filters */}
            <div className="p-5 border-b border-[var(--border)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg text-sm bg-[var(--muted)] border border-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[#E21A23] focus:ring-2 focus:ring-[#E21A23]/20"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="text-sm text-[var(--muted-foreground)] mr-2">Filter:</span>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value as Product | "all")}
                      className="appearance-none pl-3 pr-8 py-2 rounded-lg text-sm bg-[var(--muted)] border border-transparent text-[var(--foreground)] focus:outline-none focus:border-[#E21A23] cursor-pointer"
                    >
                      <option value="all">All Products</option>
                      <option value="Platform 1">Platform 1</option>
                      <option value="Platform 2">Platform 2</option>
                      <option value="Platform 3">Platform 3</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--muted)]">
                    <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                      Course
                    </th>
                    <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                      Product
                    </th>
                    <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                      Enrolled
                    </th>
                    <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                      Active
                    </th>
                    <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                      Updated
                    </th>
                    <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center">
                        <div className="text-[var(--muted-foreground)]">
                          <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                          <p>No courses found</p>
                          <p className="text-sm">Try adjusting your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((course, idx) => {
                      const colors = productColors[course.product];
                      return (
                        <tr
                          key={course.id}
                          className="hover:bg-[var(--muted)]/50 transition-colors"
                        >
                          <td className="px-5 py-4">
                            <p className="text-sm font-medium text-[var(--foreground)]">{course.name}</p>
                            <p className="text-xs text-[var(--muted-foreground)]">{course.code}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", colors.bg, colors.text)}>
                              {course.product}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-sm font-medium text-[var(--foreground)]">
                            {course.enrolledCount}
                          </td>
                          <td className="px-5 py-4 text-sm text-[var(--foreground)]">
                            {course.activeCount}
                          </td>
                          <td className="px-5 py-4 text-sm text-[var(--muted-foreground)]">
                            {format(course.lastUpdated, "MMM d, h:mm a")}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/enrollment/${course.id}`}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                              >
                                View
                              </Link>
                              <button
                                onClick={openExportModal}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors"
                              >
                                Export
                              </button>
                            </div>
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
                Showing <span className="font-medium text-[var(--foreground)]">1-{filteredCourses.length}</span> of{" "}
                <span className="font-medium text-[var(--foreground)]">{lmsSyncInfo.totalCourses}</span>
              </p>
              <div className="flex items-center gap-2">
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
                  Next Page
                </button>
                <ChevronRight className="h-4 w-4 text-[var(--muted-foreground)]" />
              </div>
            </div>
          </div>
        )}

        {/* By Product View */}
        {viewMode === "product" && (
          <div className="space-y-4 animate-slideUp" style={{ animationDelay: "150ms" }}>
            {enrollmentByProduct.map((productData, idx) => {
              const colors = productColors[productData.product];
              const productIcons: Record<string, string> = {
                "Platform 1": "text-[#4A3B8A]",
                "Platform 2": "text-[#E21A23]",
                "Platform 3": "text-[#10B981]",
              };

              return (
                <div
                  key={productData.product}
                  className="bg-[var(--card)] rounded-xl border-2 border-[var(--border)] p-6 hover:shadow-lg transition-all"
                  style={{ animationDelay: `${150 + idx * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colors.icon)}>
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-semibold text-[var(--foreground)] uppercase">
                          {productData.product}
                        </h3>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          {productData.totalStudents.toLocaleString()} students ({productData.activeStudents.toLocaleString()} active, {productData.activePercentage}%)
                          <span className="mx-2">•</span>
                          {productData.courseCount} courses
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-[var(--muted-foreground)] mb-2">
                      Top: {productData.topCourses.map((c, i) => (
                        <span key={c.name}>
                          {c.name} ({c.enrolled}){i < productData.topCourses.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/enrollment?product=${productData.product}`}
                      onClick={() => {
                        setSelectedProduct(productData.product);
                        setViewMode("course");
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm hover:bg-[var(--muted)] transition-colors"
                    >
                      View Courses
                    </Link>
                    <button
                      onClick={openExportModal}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--muted-foreground)] text-sm hover:bg-[var(--muted)] transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Export Data
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Enrollment Actions Modal */}
      <EnrollmentActionsModal
        open={showActionsModal}
        onClose={() => setShowActionsModal(false)}
        initialTab={modalTab}
      />
    </div>
  );
}
