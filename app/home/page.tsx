"use client";

import { currentUser, getLicenseStats, getEnrollmentStats, reports, scheduledReports, generatedReports } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  FileText,
  Key,
  GraduationCap,
  ArrowRight,
  Star,
  Eye,
  Clock,
  TrendingUp,
  Users,
  BookOpen,
  AlertTriangle,
} from "lucide-react";
import { AISearchHero } from "@/components/home/AISearchHero";

export default function HomePage() {
  const licenseStats = getLicenseStats();
  const enrollmentStats = getEnrollmentStats();

  const modules = [
    {
      id: "reports",
      name: "Reports Hub",
      description: "Generate, schedule, and download reports from all EduTech products",
      icon: FileText,
      href: "/",
      access: currentUser.permissions.reports,
      color: "from-[#E21A23] to-[#F04A52]",
      stats: [
        { label: "Available Reports", value: reports.length },
        { label: "Scheduled", value: scheduledReports.length },
        { label: "Ready to Download", value: generatedReports.length },
      ],
    },
    {
      id: "licenses",
      name: "License Management",
      description: "Track, assign, and manage licenses across products and students",
      icon: Key,
      href: "/licenses",
      access: currentUser.permissions.licenses,
      color: "from-[#4A3B8A] to-[#6A5BAA]",
      stats: [
        { label: "Active Licenses", value: licenseStats.used.toLocaleString() },
        { label: "Available", value: licenseStats.available },
        { label: "Expiring Soon", value: licenseStats.expiring },
      ],
      alert: licenseStats.expiring > 0 ? `${licenseStats.expiring} licenses expiring` : undefined,
    },
    {
      id: "enrollment",
      name: "Enrollment",
      description: "View enrollment data, course details, and sync with your LMS",
      icon: GraduationCap,
      href: "/enrollment",
      access: currentUser.permissions.enrollment,
      color: "from-[#10B981] to-[#9B6BB4]",
      stats: [
        { label: "Total Students", value: enrollmentStats.totalStudents.toLocaleString() },
        { label: "Active Courses", value: enrollmentStats.activeCourses },
        { label: "Utilization", value: `${enrollmentStats.utilizationRate}%` },
      ],
    },
  ];

  const recentActivity = [
    { action: "Report generated", detail: "Course Enrollment Summary", time: "2 hours ago", icon: FileText },
    { action: "Licenses assigned", detail: "12 students added to Platform 1", time: "4 hours ago", icon: Key },
    { action: "Enrollment synced", detail: "Canvas LMS sync completed", time: "1 day ago", icon: GraduationCap },
    { action: "Schedule created", detail: "Weekly performance report", time: "2 days ago", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--card)] border-b border-[var(--border)] px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="animate-slideInFromLeft">
              <p className="text-sm text-[var(--muted-foreground)] mb-1">
                Welcome back,
              </p>
              <h1 className="text-2xl font-display font-bold text-[var(--foreground)]">
                {currentUser.name}
              </h1>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                {currentUser.institution} • {currentUser.role.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-[var(--muted-foreground)]">Last login</p>
                <p className="text-sm font-medium text-[var(--foreground)]">Today, 9:15 AM</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E21A23] to-[#F04A52] flex items-center justify-center text-white font-bold text-lg">
                {currentUser.name.split(" ").map((n) => n[0]).join("")}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* AI Search Hero */}
        <AISearchHero />

        {/* Module Cards */}
        <section className="mb-10">
          <h2 className="text-lg font-display font-semibold text-[var(--foreground)] mb-4">
            Your Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, idx) => (
              <Link
                key={module.id}
                href={module.href}
                className={cn(
                  "group relative bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 transition-all duration-300",
                  "hover:shadow-lg hover:border-[#E21A23]/30",
                  "animate-slideUp"
                )}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Access Badge */}
                <div className="absolute top-4 right-4">
                  {module.access === "full" ? (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#E21A23]/10 text-[#E21A23] text-xs font-medium">
                      <Star className="h-3 w-3" />
                      Primary
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] text-xs font-medium">
                      <Eye className="h-3 w-3" />
                      View Only
                    </div>
                  )}
                </div>

                {/* Alert Badge */}
                {module.alert && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium animate-pulse">
                      <AlertTriangle className="h-3 w-3" />
                      {module.alert}
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                    module.color
                  )}
                >
                  <module.icon className="h-7 w-7 text-white" />
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 group-hover:text-[#E21A23] transition-colors">
                  {module.name}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-4 line-clamp-2">
                  {module.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {module.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-lg font-bold text-[var(--foreground)]">{stat.value}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center text-sm font-medium text-[#E21A23] group-hover:gap-2 transition-all">
                  {module.access === "full" ? "Open Module" : "View Data"}
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Stats & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="lg:col-span-2 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 animate-slideUp" style={{ animationDelay: "300ms" }}>
            <h2 className="text-lg font-display font-semibold text-[var(--foreground)] mb-4">
              Quick Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[var(--muted)]">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-[#E21A23]" />
                  <span className="text-xs text-[var(--muted-foreground)]">Total Licenses</span>
                </div>
                <p className="text-2xl font-bold text-[var(--foreground)]">{licenseStats.total.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  {licenseStats.utilizationRate}% utilized
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--muted)]">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-[#4A3B8A]" />
                  <span className="text-xs text-[var(--muted-foreground)]">Active Courses</span>
                </div>
                <p className="text-2xl font-bold text-[var(--foreground)]">{enrollmentStats.activeCourses}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">Spring 2026</p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--muted)]">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-[#10B981]" />
                  <span className="text-xs text-[var(--muted-foreground)]">Reports Generated</span>
                </div>
                <p className="text-2xl font-bold text-[var(--foreground)]">{generatedReports.length}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">Last 90 days</p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--muted)]">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-[#E21A23]" />
                  <span className="text-xs text-[var(--muted-foreground)]">Scheduled Reports</span>
                </div>
                <p className="text-2xl font-bold text-[var(--foreground)]">{scheduledReports.length}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">Active schedules</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 animate-slideUp" style={{ animationDelay: "400ms" }}>
            <h2 className="text-lg font-display font-semibold text-[var(--foreground)] mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--muted)] flex items-center justify-center flex-shrink-0">
                    <activity.icon className="h-4 w-4 text-[var(--muted-foreground)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--foreground)]">{activity.action}</p>
                    <p className="text-xs text-[var(--muted-foreground)] truncate">{activity.detail}</p>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] flex-shrink-0">{activity.time}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg transition-colors">
              View all activity
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
