"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  enrollmentCourses,
  courseStudents,
  getProductColor,
  currentUser,
  type Product,
} from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { format, differenceInDays } from "date-fns";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  Download,
  Users,
  Activity,
  Calendar,
  AlertTriangle,
  Eye,
  FileDown,
  ChevronRight,
} from "lucide-react";

const productColors: Record<Product, { bg: string; text: string; border: string }> = {
  Connect: { bg: "bg-[#4A3B8A]", text: "text-white", border: "border-[#4A3B8A]" },
  ALEKS: { bg: "bg-[#E21A23]", text: "text-white", border: "border-[#E21A23]" },
  SIMnet: { bg: "bg-[#10B981]", text: "text-white", border: "border-[#10B981]" },
  SIMnet: { bg: "bg-[#10B981]", text: "text-white", border: "border-[#10B981]" },
  Sharpen: { bg: "bg-[#F8B4D9]", text: "text-[#4A3B8A]", border: "border-[#F8B4D9]" },
};

type FilterStatus = "all" | "active" | "inactive";
type SortField = "name" | "studentId" | "lastAccess";
type SortOrder = "asc" | "desc";

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  // Find the course from mock data
  const course = enrollmentCourses.find((c) => c.id === courseId) || {
    id: "enc-1",
    name: "Biology 101",
    code: "BIO 101",
    product: "Connect" as Product,
    instructor: "Dr. Sarah Ahmed",
    term: "Spring 2026",
    enrolledCount: 247,
    activeCount: 198,
    lastUpdated: new Date("2026-01-26T10:45:00"),
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const isViewOnly = currentUser.permissions.enrollment === "view_only";

  // Calculate stats
  const totalStudents = course.enrolledCount;
  const activeStudents = course.activeCount;
  const inactiveStudents = totalStudents - activeStudents;
  const activePercentage = Math.round((activeStudents / totalStudents) * 100);
  const inactivePercentage = 100 - activePercentage;

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    let result = [...courseStudents];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.studentId.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      result = result.filter((student) => student.status === filterStatus);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "studentId":
          comparison = a.studentId.localeCompare(b.studentId);
          break;
        case "lastAccess":
          const dateA = a.lastAccess?.getTime() || 0;
          const dateB = b.lastAccess?.getTime() || 0;
          comparison = dateA - dateB;
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, filterStatus, sortField, sortOrder]);

  const colors = productColors[course.product];

  // Check if student is inactive (5+ days since last access)
  const isInactive = (lastAccess: Date | null) => {
    if (!lastAccess) return true;
    return differenceInDays(new Date(), lastAccess) >= 5;
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--card)] border-b border-[var(--border)] px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="animate-slideInFromLeft">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-4">
                <Link
                  href="/enrollment"
                  className="flex items-center gap-1 text-sm text-[#E21A23] hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Enrollment
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colors.bg)}>
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-display font-bold text-[var(--foreground)]">
                      {course.name}
                    </h1>
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", colors.bg, colors.text)}>
                      {course.product}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {course.instructor} • {course.term}
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
        {/* Course Info Card */}
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 mb-6 animate-slideUp">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className={cn("px-3 py-1.5 rounded-lg text-sm font-medium", colors.bg, colors.text)}>
                {course.code}
              </span>
              <span className="text-sm text-[var(--muted-foreground)]">
                {course.instructor}
              </span>
              <div className="h-5 w-px bg-[var(--border)]" />
              <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", colors.bg, colors.text)}>
                {course.product}
              </span>
              <div className="h-5 w-px bg-[var(--border)]" />
              <span className="text-sm text-[var(--muted-foreground)]">
                {course.term}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-4 pt-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--muted-foreground)]">Total:</span>
              <span className="text-lg font-bold text-[var(--foreground)]">{totalStudents}</span>
            </div>
            <div className="h-5 w-px bg-[var(--border)]" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--muted-foreground)]">Active (30d):</span>
              <span className="text-lg font-bold text-green-600">{activeStudents}</span>
              <span className="text-sm text-green-600">({activePercentage}%)</span>
            </div>
            <div className="h-5 w-px bg-[var(--border)]" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--muted-foreground)]">Inactive:</span>
              <span className="text-lg font-bold text-amber-600">{inactiveStudents}</span>
              <span className="text-sm text-amber-600">({inactivePercentage}%)</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--muted-foreground)]">
              Last Synced: {format(course.lastUpdated, "MMM d, h:mm a")}
            </p>
          </div>
        </div>

        {/* Student List Section */}
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden animate-slideUp" style={{ animationDelay: "100ms" }}>
          {/* Header with Filters */}
          <div className="p-5 border-b border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-display font-semibold text-[var(--foreground)]">
                Student List
              </h2>
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm hover:bg-[var(--muted)] transition-colors">
                  <FileDown className="h-4 w-4" />
                  Export Student List
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Filter Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg text-sm bg-[var(--muted)] border border-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[#E21A23] focus:ring-2 focus:ring-[#E21A23]/20"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--muted-foreground)]">Filter:</span>
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg text-sm bg-[var(--muted)] border border-transparent text-[var(--foreground)] focus:outline-none focus:border-[#E21A23] cursor-pointer"
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none" />
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--muted-foreground)]">Sort:</span>
                <div className="relative">
                  <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value as SortField)}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg text-sm bg-[var(--muted)] border border-transparent text-[var(--foreground)] focus:outline-none focus:border-[#E21A23] cursor-pointer"
                  >
                    <option value="name">Name</option>
                    <option value="studentId">Student ID</option>
                    <option value="lastAccess">Last Access</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Student Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--muted)]">
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                    Name
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                    Student ID
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                    Email
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                    Last Access
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center">
                      <div className="text-[var(--muted-foreground)]">
                        <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                        <p>No students found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => {
                    const inactive = isInactive(student.lastAccess);
                    return (
                      <tr
                        key={student.id}
                        className="hover:bg-[var(--muted)]/50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-[var(--foreground)]">{student.name}</p>
                        </td>
                        <td className="px-5 py-4 text-sm text-[var(--muted-foreground)]">
                          {student.studentId}
                        </td>
                        <td className="px-5 py-4 text-sm text-[var(--muted-foreground)]">
                          {student.email}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-sm",
                              inactive ? "text-amber-600" : "text-[var(--foreground)]"
                            )}>
                              {student.lastAccess
                                ? format(student.lastAccess, "MMM d")
                                : "Never"}
                            </span>
                            {inactive && (
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                            )}
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
              Showing <span className="font-medium text-[var(--foreground)]">1-{filteredStudents.length}</span> of{" "}
              <span className="font-medium text-[var(--foreground)]">{totalStudents}</span>
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

        {/* Legend */}
        <div className="mt-4 flex items-center gap-2 text-sm text-[var(--muted-foreground)] animate-slideUp" style={{ animationDelay: "150ms" }}>
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <span>= Inactive (no access in 5+ days)</span>
        </div>
      </main>
    </div>
  );
}
