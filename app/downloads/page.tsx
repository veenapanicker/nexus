"use client";

import { useState, useMemo } from "react";
import { useReports } from "@/lib/context";
import { Product, getProductColor } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { format, isAfter, isBefore, subDays } from "date-fns";
import { toast } from "sonner";
import {
  Download,
  ArrowLeft,
  Trash2,
  FileSpreadsheet,
  FileText,
  Files,
  Clock,
  Search,
  Filter,
  CheckSquare,
  Square,
  X,
  HardDrive,
} from "lucide-react";
import Link from "next/link";

export default function DownloadCenterPage() {
  const { generatedReports, deleteGeneratedReport } = useReports();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | "all">("all");
  const [dateRange, setDateRange] = useState<"all" | "7days" | "30days" | "90days">("all");
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());

  const filteredReports = useMemo(() => {
    return generatedReports.filter((report) => {
      const matchesSearch =
        searchQuery === "" ||
        report.reportName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProduct =
        selectedProduct === "all" || report.product === selectedProduct;

      let matchesDate = true;
      if (dateRange !== "all") {
        const daysAgo = parseInt(dateRange);
        const cutoffDate = subDays(new Date(), daysAgo);
        matchesDate = isAfter(report.generatedAt, cutoffDate);
      }

      return matchesSearch && matchesProduct && matchesDate;
    });
  }, [generatedReports, searchQuery, selectedProduct, dateRange]);

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "csv":
        return <FileText className="h-5 w-5" />;
      case "xlsx":
        return <FileSpreadsheet className="h-5 w-5" />;
      case "both":
        return <Files className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getFormatLabel = (format: string) => {
    switch (format) {
      case "csv":
        return "CSV";
      case "xlsx":
        return "Excel";
      case "both":
        return "CSV + Excel";
      default:
        return format;
    }
  };

  const handleSelectAll = () => {
    if (selectedReports.size === filteredReports.length) {
      setSelectedReports(new Set());
    } else {
      setSelectedReports(new Set(filteredReports.map((r) => r.id)));
    }
  };

  const handleSelectReport = (id: string) => {
    const newSelected = new Set(selectedReports);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedReports(newSelected);
  };

  const handleBulkDownload = () => {
    toast.success(`Downloading ${selectedReports.size} reports`, {
      description: "Your download will start shortly.",
    });
    setSelectedReports(new Set());
  };

  const handleBulkDelete = () => {
    selectedReports.forEach((id) => deleteGeneratedReport(id));
    toast.success(`Deleted ${selectedReports.size} reports`);
    setSelectedReports(new Set());
  };

  const handleDownload = (reportName: string) => {
    toast.success("Download started", {
      description: `Downloading ${reportName}`,
    });
  };

  const handleDelete = (id: string, reportName: string) => {
    deleteGeneratedReport(id);
    toast.success("Report deleted", {
      description: `${reportName} has been removed.`,
    });
  };

  const isExpiringSoon = (expiresAt: Date) => {
    const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    return isBefore(expiresAt, sevenDaysFromNow);
  };

  const products: (Product | "all")[] = ["all", "Connect", "ALEKS", "SIMnet", "Sharpen"];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--card)] border-b border-[var(--border)] sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-[var(--foreground)]">Download Center</h1>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  Access your generated reports (retained for 90 days)
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Filters */}
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 rounded-lg text-sm",
                  "bg-[var(--muted)] border border-transparent",
                  "text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]",
                  "focus:outline-none focus:border-nexus-purple focus:ring-1 focus:ring-nexus-purple"
                )}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Product Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[var(--muted-foreground)] hidden sm:block" />
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value as Product | "all")}
                className={cn(
                  "px-4 py-2.5 rounded-lg text-sm",
                  "bg-[var(--muted)] border border-transparent",
                  "text-[var(--foreground)]",
                  "focus:outline-none focus:border-nexus-purple"
                )}
              >
                {products.map((product) => (
                  <option key={product} value={product}>
                    {product === "all" ? "All Products" : product}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <select
                value={dateRange}
                onChange={(e) =>
                  setDateRange(e.target.value as "all" | "7days" | "30days" | "90days")
                }
                className={cn(
                  "px-4 py-2.5 rounded-lg text-sm",
                  "bg-[var(--muted)] border border-transparent",
                  "text-[var(--foreground)]",
                  "focus:outline-none focus:border-nexus-purple"
                )}
              >
                <option value="all">All Time</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedReports.size > 0 && (
          <div className="bg-nexus-purple/10 rounded-xl border border-nexus-purple/30 p-4 mb-6 flex items-center justify-between animate-slideUp">
            <p className="text-sm font-medium text-nexus-purple">
              {selectedReports.size} report{selectedReports.size > 1 ? "s" : ""} selected
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkDownload}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  "bg-nexus-purple text-white hover:bg-nexus-purple-dark"
                )}
              >
                <Download className="h-4 w-4" />
                Download All
              </button>
              <button
                onClick={handleBulkDelete}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  "border border-nexus-red text-nexus-red hover:bg-nexus-red/10"
                )}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
              <button
                onClick={() => setSelectedReports(new Set())}
                className="p-2 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Reports List */}
        {filteredReports.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--muted)] flex items-center justify-center">
              <HardDrive className="h-8 w-8 text-[var(--muted-foreground)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">No reports found</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">
              {searchQuery || selectedProduct !== "all" || dateRange !== "all"
                ? "Try adjusting your filters"
                : "Generate a report to see it here"}
            </p>
            <Link
              href="/"
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                "bg-nexus-purple text-white hover:bg-nexus-purple-dark"
              )}
            >
              Go to Report Library
            </Link>
          </div>
        ) : (
          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[auto,2fr,1fr,1fr,1fr,1fr,auto] gap-4 px-6 py-4 bg-[var(--muted)] border-b border-[var(--border)]">
              <div>
                <button
                  onClick={handleSelectAll}
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  {selectedReports.size === filteredReports.length ? (
                    <CheckSquare className="h-4 w-4" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Report
              </div>
              <div className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Product
              </div>
              <div className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Format
              </div>
              <div className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Generated
              </div>
              <div className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Size
              </div>
              <div className="w-24"></div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[var(--border)]">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className={cn(
                    "grid grid-cols-1 md:grid-cols-[auto,2fr,1fr,1fr,1fr,1fr,auto] gap-4 px-6 py-4 items-center hover:bg-[var(--muted)]/50 transition-colors",
                    selectedReports.has(report.id) && "bg-nexus-purple/5"
                  )}
                >
                  {/* Checkbox */}
                  <div className="hidden md:block">
                    <button
                      onClick={() => handleSelectReport(report.id)}
                      className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    >
                      {selectedReports.has(report.id) ? (
                        <CheckSquare className="h-4 w-4 text-nexus-purple" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Report Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)]">
                      {getFormatIcon(report.format)}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{report.reportName}</p>
                      <p className="text-xs text-[var(--muted-foreground)] md:hidden">
                        {format(report.generatedAt, "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>

                  {/* Product */}
                  <div>
                    <span
                      className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        getProductColor(report.product)
                      )}
                    >
                      {report.product}
                    </span>
                  </div>

                  {/* Format */}
                  <div className="hidden md:block">
                    <span className="text-sm text-[var(--foreground)]">
                      {getFormatLabel(report.format)}
                    </span>
                  </div>

                  {/* Generated Date */}
                  <div className="hidden md:block">
                    <p className="text-sm text-[var(--foreground)]">
                      {format(report.generatedAt, "MMM d, yyyy")}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {format(report.generatedAt, "h:mm a")}
                    </p>
                  </div>

                  {/* Size */}
                  <div className="hidden md:block">
                    <p className="text-sm text-[var(--foreground)]">{report.fileSize}</p>
                    {isExpiringSoon(report.expiresAt) && (
                      <p className="text-xs text-nexus-red flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Expires soon
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(report.reportName)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                        "bg-nexus-purple text-white hover:bg-nexus-purple-dark"
                      )}
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                    <button
                      onClick={() => handleDelete(report.id, report.reportName)}
                      className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:bg-nexus-red/10 hover:text-nexus-red transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Info */}
        {filteredReports.length > 0 && (
          <p className="text-xs text-[var(--muted-foreground)] mt-4 text-center">
            Reports are automatically deleted 90 days after generation. Download important reports to keep them.
          </p>
        )}
      </div>
    </div>
  );
}
