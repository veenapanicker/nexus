"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  lmsSyncInfo,
  syncHistory,
  type SyncHistoryItem,
} from "@/lib/mock-data";
import {
  RefreshCw,
  FileDown,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  X,
  ChevronRight,
  Loader2,
} from "lucide-react";

interface EnrollmentActionsModalProps {
  open: boolean;
  onClose: () => void;
  initialTab?: "sync" | "export";
}

type SyncState = "idle" | "syncing" | "complete";

export function EnrollmentActionsModal({
  open,
  onClose,
  initialTab = "sync",
}: EnrollmentActionsModalProps) {
  const [activeTab, setActiveTab] = useState<"sync" | "export">(initialTab);
  const [syncState, setSyncState] = useState<SyncState>("idle");
  const [syncProgress, setSyncProgress] = useState(0);
  const [showHistory, setShowHistory] = useState(false);

  // Export state
  const [exportScope, setExportScope] = useState<"all" | "product" | "current">("all");
  const [exportFormat, setExportFormat] = useState<"xlsx" | "csv">("xlsx");
  const [exportProducts, setExportProducts] = useState<string[]>([]);
  const [exportFields, setExportFields] = useState({
    courseInfo: true,
    enrollmentCounts: true,
    studentDetails: true,
    enrollmentDates: true,
    instructorDetails: false,
    activeOnly: false,
  });

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (!open) {
      setSyncState("idle");
      setSyncProgress(0);
      setShowHistory(false);
    }
  }, [open]);

  const handleStartSync = () => {
    setSyncState("syncing");
    setSyncProgress(0);

    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSyncState("complete");
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const handleExport = () => {
    // Simulate export
    onClose();
  };

  const toggleExportProduct = (product: string) => {
    setExportProducts((prev) =>
      prev.includes(product)
        ? prev.filter((p) => p !== product)
        : [...prev, product]
    );
  };

  const getSyncStatusIcon = (status: SyncHistoryItem["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "partial":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "failed":
        return <X className="h-4 w-4 text-red-500" />;
    }
  };

  const getSyncStatusText = (status: SyncHistoryItem["status"]) => {
    switch (status) {
      case "success":
        return "Success";
      case "partial":
        return "Partial";
      case "failed":
        return "Failed";
    }
  };

  // Calculate sync steps for progress display
  const syncSteps = [
    { name: "Connecting to Canvas LMS", threshold: 10 },
    { name: "Authenticating", threshold: 20 },
    { name: "Retrieving course list", threshold: 35 },
    { name: "Fetching enrollment data", threshold: 50 },
    { name: "Processing student records", threshold: 75 },
    { name: "Validating data", threshold: 90 },
    { name: "Updating database", threshold: 100 },
  ];

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={
        syncState === "syncing"
          ? "Syncing..."
          : syncState === "complete"
          ? "Sync Complete!"
          : showHistory
          ? "Sync History - Last 30 Days"
          : "Enrollment Actions"
      }
      size="lg"
    >
      {/* Sync History View */}
      {showHistory ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowHistory(false)}
              className="text-sm text-[#E21A23] hover:underline"
            >
              &larr; Back to Sync
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors">
              <Download className="h-4 w-4" />
              Download Full Log
            </button>
          </div>

          <div className="border border-[var(--border)] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--muted)]">
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-4 py-3">
                    Date/Time
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-4 py-3">
                    Type
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-4 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-4 py-3">
                    Changes
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {syncHistory.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr className="hover:bg-[var(--muted)]/50">
                      <td className="px-4 py-3 text-sm text-[var(--foreground)]">
                        {format(item.timestamp, "MMM d, h:mm a")}
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--muted-foreground)] capitalize">
                        {item.type}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {getSyncStatusIcon(item.status)}
                          <span className="text-sm">{getSyncStatusText(item.status)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--foreground)]">
                        <span className="text-green-600">+{item.newEnrollments}</span>
                        <span className="text-[var(--muted-foreground)]">/</span>
                        <span className="text-red-500">-{item.droppedStudents}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-sm text-[#E21A23] hover:underline">
                          View
                        </button>
                      </td>
                    </tr>
                    {item.errorMessage && (
                      <tr>
                        <td colSpan={5} className="px-4 py-2 bg-amber-50 text-sm text-amber-700">
                          {item.errorMessage}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-[var(--muted-foreground)]">
              Showing 7 of 20 syncs • Page 1 of 3
            </p>
            <p className="text-sm text-[var(--muted-foreground)]">
              Reliability: <span className="text-green-600 font-medium">95%</span> (19/20 successful)
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowHistory(false)}
              className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm hover:bg-[var(--muted)] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      ) : syncState === "syncing" ? (
        /* Syncing State */
        <div className="py-4">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--muted-foreground)]">Progress:</span>
              <span className="text-sm font-medium text-[var(--foreground)]">{Math.min(Math.round(syncProgress), 100)}%</span>
            </div>
            <div className="h-3 bg-[var(--muted)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E21A23] to-[#F04A52] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(syncProgress, 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {syncSteps.map((step, idx) => {
              const isComplete = syncProgress >= step.threshold;
              const isActive = syncProgress < step.threshold && (idx === 0 || syncProgress >= syncSteps[idx - 1].threshold);

              return (
                <div key={step.name} className="flex items-center gap-3">
                  {isComplete ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : isActive ? (
                    <Loader2 className="h-5 w-5 text-[#E21A23] flex-shrink-0 animate-spin" />
                  ) : (
                    <Clock className="h-5 w-5 text-[var(--muted-foreground)] flex-shrink-0" />
                  )}
                  <span
                    className={cn(
                      "text-sm",
                      isComplete
                        ? "text-[var(--foreground)]"
                        : isActive
                        ? "text-[var(--foreground)] font-medium"
                        : "text-[var(--muted-foreground)]"
                    )}
                  >
                    {step.name}
                    {isActive && step.name === "Processing student records" && (
                      <span className="ml-2 text-[var(--muted-foreground)]">
                        ({Math.round((syncProgress - 50) * 50)}/1,247)
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-sm text-[var(--muted-foreground)] text-center">
            Please wait... ~{Math.max(5, Math.round((100 - syncProgress) / 2))} seconds remaining
          </p>
        </div>
      ) : syncState === "complete" ? (
        /* Sync Complete State */
        <div className="py-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-[var(--muted-foreground)]">Duration: 2 min 18 sec</p>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[var(--muted-foreground)]">•</span>
              <span className="text-[var(--foreground)]">34 courses updated</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[var(--muted-foreground)]">•</span>
              <span className="text-[var(--foreground)]">1,247 student records processed</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[var(--muted-foreground)]">•</span>
              <span className="text-green-600">12 new enrollments</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[var(--muted-foreground)]">•</span>
              <span className="text-red-500">3 students dropped</span>
            </div>
          </div>

          <div className="bg-[var(--muted)] rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-[var(--foreground)] mb-2">Changes:</p>
            <div className="space-y-1 text-sm text-[var(--muted-foreground)]">
              <p>• Biology 101: <span className="text-green-600">+5 students</span></p>
              <p>• Calculus I: <span className="text-green-600">+3 students</span></p>
              <p>• Intro to Chemistry: <span className="text-red-500">-2 students</span></p>
            </div>
          </div>

          <div className="text-sm text-[var(--muted-foreground)] mb-6">
            <p>Last Synced: {format(new Date(), "MMM d, yyyy 'at' h:mm a")}</p>
            <p>Next Auto: Jan 27, 2026 at 10:45 AM</p>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm hover:bg-[var(--muted)] transition-colors">
              <Download className="h-4 w-4" />
              Download Sync Report
            </button>
            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--muted-foreground)] text-sm hover:bg-[var(--muted)] transition-colors"
            >
              View History
            </button>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border)]">
            <button
              onClick={() => {
                setSyncState("idle");
                onClose();
              }}
              className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm hover:bg-[var(--muted)] transition-colors"
            >
              View Dashboard
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#60A5FA] text-white text-sm font-medium hover:bg-[#3B82F6] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        /* Main Tabs View */
        <>
          {/* Tab Buttons */}
          <div className="flex items-center gap-0 mb-6">
            <button
              onClick={() => setActiveTab("sync")}
              className={cn(
                "flex-1 px-4 py-3 text-sm font-medium rounded-l-xl border transition-all",
                activeTab === "sync"
                  ? "bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] shadow-sm"
                  : "bg-[var(--muted)] border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Sync LMS
              </div>
            </button>
            <button
              onClick={() => setActiveTab("export")}
              className={cn(
                "flex-1 px-4 py-3 text-sm font-medium rounded-r-xl border transition-all",
                activeTab === "export"
                  ? "bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] shadow-sm"
                  : "bg-[var(--muted)] border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <FileDown className="h-4 w-4" />
                Export Data
              </div>
            </button>
          </div>

          {/* Sync Tab Content */}
          {activeTab === "sync" && (
            <div>
              <div className="mb-4">
                <p className="text-sm text-[var(--muted-foreground)]">
                  LMS: <span className="font-medium text-[var(--foreground)]">{lmsSyncInfo.lmsName}</span>
                </p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Institution: <span className="font-medium text-[var(--foreground)]">King Saud University</span>
                </p>
              </div>

              <hr className="border-[var(--border)] my-4" />

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-[var(--foreground)] uppercase tracking-wider">
                  Sync Details
                </h3>

                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Last Successful Sync:</p>
                  <p className="text-sm font-medium text-[var(--foreground)]">
                    {format(lmsSyncInfo.lastSynced, "MMM d, yyyy 'at' h:mm a")} (2 hours ago)
                  </p>
                </div>

                <div className="bg-[var(--muted)] rounded-lg p-4">
                  <p className="text-sm font-medium text-[var(--foreground)] mb-2">This sync will:</p>
                  <ul className="space-y-1 text-sm text-[var(--muted-foreground)]">
                    <li>• Check {lmsSyncInfo.totalCourses} courses</li>
                    <li>• Update ~{lmsSyncInfo.totalStudents.toLocaleString()} student records</li>
                    <li>• Take approximately 2-3 minutes</li>
                  </ul>
                </div>

                <p className="text-sm text-[var(--muted-foreground)]">
                  Auto-sync scheduled: Daily at {lmsSyncInfo.autoSyncTime}
                </p>

                <button
                  onClick={() => setShowHistory(true)}
                  className="text-sm text-[#E21A23] hover:underline"
                >
                  View Sync History
                </button>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[var(--border)]">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm hover:bg-[var(--muted)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartSync}
                  className="px-4 py-2 rounded-lg bg-[#60A5FA] text-white text-sm font-medium hover:bg-[#3B82F6] transition-colors"
                >
                  Start Sync Now
                </button>
              </div>
            </div>
          )}

          {/* Export Tab Content */}
          {activeTab === "export" && (
            <div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-[var(--foreground)] uppercase tracking-wider mb-3">
                    Export Scope
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="scope"
                        checked={exportScope === "all"}
                        onChange={() => setExportScope("all")}
                        className="w-4 h-4 text-[#E21A23] focus:ring-[#E21A23]"
                      />
                      <span className="text-sm text-[var(--foreground)]">
                        All courses ({lmsSyncInfo.totalCourses} courses, {lmsSyncInfo.totalStudents.toLocaleString()} students)
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="scope"
                        checked={exportScope === "product"}
                        onChange={() => setExportScope("product")}
                        className="w-4 h-4 text-[#E21A23] focus:ring-[#E21A23] mt-0.5"
                      />
                      <div>
                        <span className="text-sm text-[var(--foreground)]">By product:</span>
                        <div className="flex items-center gap-4 mt-2">
                          {["Connect", "ALEKS", "SimNet"].map((product) => (
                            <label key={product} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={exportProducts.includes(product)}
                                onChange={() => toggleExportProduct(product)}
                                disabled={exportScope !== "product"}
                                className="w-4 h-4 text-[#E21A23] focus:ring-[#E21A23] rounded"
                              />
                              <span className={cn(
                                "text-sm",
                                exportScope === "product" ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"
                              )}>
                                {product}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="scope"
                        checked={exportScope === "current"}
                        onChange={() => setExportScope("current")}
                        className="w-4 h-4 text-[#E21A23] focus:ring-[#E21A23]"
                      />
                      <span className="text-sm text-[var(--foreground)]">
                        Current view (Biology 101 only)
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-[var(--foreground)] uppercase tracking-wider mb-3">
                    Format
                  </h3>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        checked={exportFormat === "xlsx"}
                        onChange={() => setExportFormat("xlsx")}
                        className="w-4 h-4 text-[#E21A23] focus:ring-[#E21A23]"
                      />
                      <span className="text-sm text-[var(--foreground)]">Excel (.xlsx)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        checked={exportFormat === "csv"}
                        onChange={() => setExportFormat("csv")}
                        className="w-4 h-4 text-[#E21A23] focus:ring-[#E21A23]"
                      />
                      <span className="text-sm text-[var(--foreground)]">CSV (.csv)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-[var(--foreground)] uppercase tracking-wider mb-3">
                    Include Fields
                  </h3>
                  <div className="space-y-2">
                    {[
                      { key: "courseInfo", label: "Course & Product Info" },
                      { key: "enrollmentCounts", label: "Enrollment Counts (Total & Active)" },
                      { key: "studentDetails", label: "Student Names, IDs, Emails" },
                      { key: "enrollmentDates", label: "Enrollment & Last Access Dates" },
                      { key: "instructorDetails", label: "Instructor Details" },
                      { key: "activeOnly", label: "Only active students (last 30 days)" },
                    ].map((field) => (
                      <label key={field.key} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exportFields[field.key as keyof typeof exportFields]}
                          onChange={() =>
                            setExportFields((prev) => ({
                              ...prev,
                              [field.key]: !prev[field.key as keyof typeof exportFields],
                            }))
                          }
                          className="w-4 h-4 text-[#E21A23] focus:ring-[#E21A23] rounded"
                        />
                        <span className="text-sm text-[var(--foreground)]">{field.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-[var(--muted)] rounded-lg p-4">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Estimated: <span className="font-medium text-[var(--foreground)]">~2.8 MB</span>, ~1,280 rows
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Data as of: 15 minutes ago ({format(new Date(), "MMM d, h:mm a")})
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[var(--border)]">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm hover:bg-[var(--muted)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 rounded-lg bg-[#60A5FA] text-white text-sm font-medium hover:bg-[#3B82F6] transition-colors"
                >
                  Generate Export
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
