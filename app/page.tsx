"use client";

import React, { useState, useMemo } from "react";
import { useReports } from "@/lib/context";
import { Report, Product } from "@/lib/mock-data";
import { ReportCard } from "@/components/reports/ReportCard";
import { ReportFilters } from "@/components/filters/ReportFilters";
import { GenerateModal } from "@/components/reports/GenerateModal";
import { ScheduleModal } from "@/components/reports/ScheduleModal";
import { ReportCardGridSkeleton } from "@/components/ui/LoadingSkeleton";
import { Calendar, Download, FileText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ReportLibraryPage() {
  const { reports, scheduledReports, generatedReports } = useReports();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const [generateModalReport, setGenerateModalReport] = useState<Report | null>(null);
  const [scheduleModalReport, setScheduleModalReport] = useState<Report | null>(null);

  // Simulate loading on mount
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(reports.map((r) => r.category));
    return Array.from(cats).sort();
  }, [reports]);

  // Filter reports
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        searchQuery === "" ||
        report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProduct =
        selectedProduct === "all" || report.product === selectedProduct;

      const matchesCategory =
        selectedCategory === "all" || report.category === selectedCategory;

      return matchesSearch && matchesProduct && matchesCategory;
    });
  }, [reports, searchQuery, selectedProduct, selectedCategory]);

  // Group reports by product
  const groupedReports = useMemo(() => {
    const groups: Record<string, Report[]> = {};
    filteredReports.forEach((report) => {
      if (!groups[report.product]) {
        groups[report.product] = [];
      }
      groups[report.product].push(report);
    });
    return groups;
  }, [filteredReports]);

  const productOrder: Product[] = ["Connect", "ALEKS", "SimNet", "Sharpen"];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--card)] border-b border-[var(--border)] sticky top-0 z-10 shadow-sm animate-slideInFromLeft">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-[var(--foreground)]">EDS Reporting Hub</h1>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                Access and manage reports from all McGraw Hill products
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/scheduled"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "border border-[var(--border)] text-[var(--foreground)]",
                  "hover:bg-[var(--muted)] hover:border-[#E21A23]/30 hover:shadow-glow"
                )}
              >
                <Calendar className="h-4 w-4" />
                Scheduled ({scheduledReports.length})
              </Link>
              <Link
                href="/downloads"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "bg-[#E21A23] text-white",
                  "hover:bg-[#B8131A] hover:shadow-glow hover:scale-105"
                )}
              >
                <Download className="h-4 w-4" />
                Downloads ({generatedReports.length})
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { icon: FileText, label: "Available Reports", value: reports.length, color: "from-[#E21A23] to-[#F04A52]", bgColor: "#E21A23" },
            { icon: Calendar, label: "Active Schedules", value: scheduledReports.filter((s) => s.isActive).length, color: "from-[#4A3B8A] to-[#6A5BAA]", bgColor: "#4A3B8A" },
            { icon: Download, label: "Reports Ready", value: generatedReports.length, color: "from-[#7B4B94] to-[#9B6BB4]", bgColor: "#7B4B94" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 hover:shadow-lg transition-all duration-300 hover:border-[#E21A23]/30 glow-effect animate-slideUp"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <ReportFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedProduct={selectedProduct}
          onProductChange={setSelectedProduct}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {/* Reports Grid */}
        {isLoading ? (
          <ReportCardGridSkeleton count={9} />
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-12 animate-fadeIn">
            <FileText className="h-12 w-12 text-[var(--muted-foreground)] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">No reports found</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <div className="space-y-8 animate-fadeIn">
            {productOrder.map((product, productIdx) => {
              const productReports = groupedReports[product];
              if (!productReports || productReports.length === 0) return null;

              return (
                <div key={product} style={{ animationDelay: `${productIdx * 150}ms` }} className="animate-slideUp">
                  <h2 className="text-lg font-display font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <span
                      className={cn(
                        "w-3 h-3 rounded-full animate-pulse",
                        product === "Connect" && "bg-[#E21A23]",
                        product === "ALEKS" && "bg-[#E21A23]",
                        product === "SimNet" && "bg-[#7B4B94]",
                        product === "Sharpen" && "bg-[#F08080]"
                      )}
                    />
                    {product} Reports
                    <span className="text-sm font-normal text-[var(--muted-foreground)]">
                      ({productReports.length})
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {productReports.map((report, cardIdx) => (
                      <div key={report.id} style={{ animationDelay: `${cardIdx * 50}ms` }} className="animate-slideUp">
                        <ReportCard
                          report={report}
                          onGenerate={setGenerateModalReport}
                          onSchedule={setScheduleModalReport}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      <GenerateModal
        report={generateModalReport}
        isOpen={!!generateModalReport}
        onClose={() => setGenerateModalReport(null)}
      />
      <ScheduleModal
        report={scheduleModalReport}
        isOpen={!!scheduleModalReport}
        onClose={() => setScheduleModalReport(null)}
      />
    </div>
  );
}
