"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Report, ReportFormat, getProductColor } from "@/lib/mock-data";
import { useReports } from "@/lib/context";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import { FileSpreadsheet, FileText, Files, Loader2, CheckCircle2 } from "lucide-react";
import { ProgressBar } from "@/components/ui/LoadingSkeleton";

interface GenerateModalProps {
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GenerateModal({ report, isOpen, onClose }: GenerateModalProps) {
  const { generateReport, isGenerating } = useReports();
  const [selectedFormat, setSelectedFormat] = useState<ReportFormat>("xlsx");
  const [dateFrom, setDateFrom] = useState(format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"));
  const [dateTo, setDateTo] = useState(format(new Date(), "yyyy-MM-dd"));
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate progress
  React.useEffect(() => {
    if (!isGenerating) {
      setProgress(0);
      return;
    }
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 40, 90));
    }, 300);
    return () => clearInterval(interval);
  }, [isGenerating]);

  if (!report) return null;

  const handleGenerate = async () => {
    try {
      await generateReport(report.id, selectedFormat, {
        from: new Date(dateFrom),
        to: new Date(dateTo),
      });
      setIsSuccess(true);
      toast.success("Report generated successfully!", {
        description: `${report.name} is ready for download.`,
      });
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    } catch {
      toast.error("Failed to generate report", {
        description: "Please try again.",
      });
    }
  };

  const formatOptions: { value: ReportFormat; label: string; icon: React.ReactNode; description: string }[] = [
    {
      value: "csv",
      label: "CSV",
      icon: <FileText className="h-5 w-5" />,
      description: "Comma-separated values, ideal for data processing",
    },
    {
      value: "xlsx",
      label: "Excel (.xlsx)",
      icon: <FileSpreadsheet className="h-5 w-5" />,
      description: "Microsoft Excel format with formatting preserved",
    },
    {
      value: "both",
      label: "Both Formats",
      icon: <Files className="h-5 w-5" />,
      description: "Download both CSV and Excel files",
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Generate Report`} size="md">
      {isSuccess ? (
        <div className="py-8 text-center animate-slideUp">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E21A23]/10 flex items-center justify-center animate-scaleUp">
            <CheckCircle2 className="h-8 w-8 text-[#E21A23]" />
          </div>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 font-display">Report Generated!</h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            Your report is now available in the Download Center.
          </p>
        </div>
      ) : isGenerating ? (
        <div className="py-8 animate-fadeIn">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-[var(--foreground)]">Generating report...</span>
              <span className="text-xs text-[var(--muted-foreground)]">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-[var(--muted)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E21A23] to-[#F04A52] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] text-center">
            Processing your data and generating the report...
          </p>
        </div>
      ) : (
        <>
          {/* Report Info */}
          <div className="mb-6 p-4 rounded-lg bg-[var(--muted)]">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn("px-2 py-0.5 rounded text-xs font-medium", getProductColor(report.product))}>
                {report.product}
              </span>
            </div>
            <h3 className="font-medium text-[var(--foreground)]">{report.name}</h3>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">{report.description}</p>
          </div>

          {/* Format Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
              Select Format
            </label>
            <div className="space-y-2">
              {formatOptions.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all",
                    selectedFormat === option.value
                      ? "border-nexus-purple bg-nexus-purple/5"
                      : "border-[var(--border)] hover:border-nexus-purple/30"
                  )}
                >
                  <input
                    type="radio"
                    name="format"
                    value={option.value}
                    checked={selectedFormat === option.value}
                    onChange={(e) => setSelectedFormat(e.target.value as ReportFormat)}
                    className="sr-only"
                  />
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      selectedFormat === option.value
                        ? "bg-nexus-purple text-white"
                        : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                    )}
                  >
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-[var(--foreground)]">{option.label}</div>
                    <div className="text-sm text-[var(--muted-foreground)]">{option.description}</div>
                  </div>
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      selectedFormat === option.value
                        ? "border-nexus-purple bg-nexus-purple"
                        : "border-[var(--border)]"
                    )}
                  >
                    {selectedFormat === option.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
              Date Range <span className="text-[var(--muted-foreground)] font-normal">(optional)</span>
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs text-[var(--muted-foreground)] mb-1">From</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-sm",
                    "bg-[var(--muted)] border border-transparent",
                    "text-[var(--foreground)]",
                    "focus:outline-none focus:border-nexus-purple focus:ring-1 focus:ring-nexus-purple"
                  )}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-[var(--muted-foreground)] mb-1">To</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-sm",
                    "bg-[var(--muted)] border border-transparent",
                    "text-[var(--foreground)]",
                    "focus:outline-none focus:border-nexus-purple focus:ring-1 focus:ring-nexus-purple"
                  )}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
            <button
              onClick={onClose}
              disabled={isGenerating}
              className={cn(
                "px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "border border-[var(--border)] text-[var(--foreground)]",
                "hover:bg-[var(--muted)] hover:border-[#E21A23]/30",
                "disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              )}
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "bg-[#1a1a1a] text-white",
                "hover:bg-[#2a2a2a] hover:shadow-lg hover:scale-105",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2",
                "flex items-center gap-2 active:scale-95"
              )}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Report"
              )}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
