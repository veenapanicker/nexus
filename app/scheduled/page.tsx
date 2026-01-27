"use client";

import { useState } from "react";
import { useReports } from "@/lib/context";
import { getProductColor, formatFrequency } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Calendar,
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Pause,
  Play,
  MoreVertical,
  Mail,
  Download,
  FileSpreadsheet,
  FileText,
  Files,
} from "lucide-react";
import Link from "next/link";

export default function ScheduledReportsPage() {
  const { scheduledReports, deleteScheduledReport, toggleScheduledReport } = useReports();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleDelete = (scheduleId: string, reportName: string) => {
    deleteScheduledReport(scheduleId);
    toast.success("Schedule deleted", {
      description: `${reportName} schedule has been removed.`,
    });
    setOpenMenuId(null);
  };

  const handleToggle = (scheduleId: string, isActive: boolean, reportName: string) => {
    toggleScheduledReport(scheduleId);
    toast.success(isActive ? "Schedule paused" : "Schedule resumed", {
      description: `${reportName} schedule has been ${isActive ? "paused" : "resumed"}.`,
    });
    setOpenMenuId(null);
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "csv":
        return <FileText className="h-4 w-4" />;
      case "xlsx":
        return <FileSpreadsheet className="h-4 w-4" />;
      case "both":
        return <Files className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

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
                <h1 className="text-2xl font-bold text-[var(--foreground)]">Scheduled Reports</h1>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  Manage your recurring report schedules
                </p>
              </div>
            </div>
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                "bg-nexus-purple text-white",
                "hover:bg-nexus-purple-dark"
              )}
            >
              <Plus className="h-4 w-4" />
              New Schedule
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {scheduledReports.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--muted)] flex items-center justify-center">
              <Calendar className="h-8 w-8 text-[var(--muted-foreground)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">No scheduled reports</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">
              Set up recurring reports to automate your data collection
            </p>
            <Link
              href="/"
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                "bg-nexus-purple text-white",
                "hover:bg-nexus-purple-dark"
              )}
            >
              <Plus className="h-4 w-4" />
              Create your first schedule
            </Link>
          </div>
        ) : (
          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] gap-4 px-6 py-4 bg-[var(--muted)] border-b border-[var(--border)]">
              <div className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Report
              </div>
              <div className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Product
              </div>
              <div className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Frequency
              </div>
              <div className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Next Run
              </div>
              <div className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Delivery
              </div>
              <div className="w-10"></div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[var(--border)]">
              {scheduledReports.map((schedule) => (
                <div
                  key={schedule.id}
                  className={cn(
                    "grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] gap-4 px-6 py-4 items-center hover:bg-[var(--muted)]/50 transition-colors",
                    !schedule.isActive && "opacity-60"
                  )}
                >
                  {/* Report Name */}
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        schedule.isActive ? "bg-nexus-purple/10" : "bg-[var(--muted)]"
                      )}
                    >
                      {getFormatIcon(schedule.format)}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{schedule.reportName}</p>
                      <p className="text-xs text-[var(--muted-foreground)] md:hidden">
                        {formatFrequency(schedule.frequency, schedule.dayOfWeek, schedule.dayOfMonth)}
                      </p>
                    </div>
                  </div>

                  {/* Product */}
                  <div>
                    <span
                      className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        getProductColor(schedule.product)
                      )}
                    >
                      {schedule.product}
                    </span>
                  </div>

                  {/* Frequency */}
                  <div className="hidden md:block">
                    <p className="text-sm text-[var(--foreground)]">
                      {formatFrequency(schedule.frequency, schedule.dayOfWeek, schedule.dayOfMonth)}
                    </p>
                  </div>

                  {/* Next Run */}
                  <div className="hidden md:block">
                    <p className="text-sm text-[var(--foreground)]">
                      {format(schedule.nextRun, "MMM d, yyyy")}
                    </p>
                    {!schedule.isActive && (
                      <span className="text-xs text-nexus-red font-medium">Paused</span>
                    )}
                  </div>

                  {/* Delivery */}
                  <div className="hidden md:flex items-center gap-2">
                    {(schedule.deliveryMethod === "email" || schedule.deliveryMethod === "both") && (
                      <div
                        className="p-1.5 rounded bg-[var(--muted)]"
                        title={`Email: ${schedule.email}`}
                      >
                        <Mail className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                      </div>
                    )}
                    {(schedule.deliveryMethod === "download-center" ||
                      schedule.deliveryMethod === "both") && (
                      <div className="p-1.5 rounded bg-[var(--muted)]" title="Download Center">
                        <Download className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === schedule.id ? null : schedule.id)}
                      className="p-2 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-all"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === schedule.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-0 mt-1 w-48 bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-lg z-20 py-1 animate-slideUp">
                          <button
                            onClick={() =>
                              handleToggle(schedule.id, schedule.isActive, schedule.reportName)
                            }
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                          >
                            {schedule.isActive ? (
                              <>
                                <Pause className="h-4 w-4" />
                                Pause Schedule
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4" />
                                Resume Schedule
                              </>
                            )}
                          </button>
                          <button
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                          >
                            <Pencil className="h-4 w-4" />
                            Edit Schedule
                          </button>
                          <hr className="my-1 border-[var(--border)]" />
                          <button
                            onClick={() => handleDelete(schedule.id, schedule.reportName)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-nexus-red hover:bg-nexus-red/10 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Schedule
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
