"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Report, ReportFormat, Frequency, DeliveryMethod, getProductColor } from "@/lib/mock-data";
import { useReports } from "@/lib/context";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { CheckCircle2, Mail, Download, FileSpreadsheet, FileText, Files } from "lucide-react";

interface ScheduleModalProps {
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function ScheduleModal({ report, isOpen, onClose }: ScheduleModalProps) {
  const { scheduleReport } = useReports();
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [dayOfWeek, setDayOfWeek] = useState(1); // Monday
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState<ReportFormat>("xlsx");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("both");
  const [email, setEmail] = useState("admin@university.edu");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!report) return null;

  const handleSchedule = () => {
    scheduleReport(report.id, {
      frequency,
      dayOfWeek: frequency === "weekly" ? dayOfWeek : undefined,
      dayOfMonth: frequency === "monthly" ? dayOfMonth : undefined,
      format: selectedFormat,
      deliveryMethod,
      email: deliveryMethod !== "download-center" ? email : undefined,
    });

    setIsSuccess(true);
    toast.success("Report scheduled successfully!", {
      description: `${report.name} will be generated automatically.`,
    });
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  const formatOptions: { value: ReportFormat; label: string; icon: React.ReactNode }[] = [
    { value: "csv", label: "CSV", icon: <FileText className="h-4 w-4" /> },
    { value: "xlsx", label: "Excel", icon: <FileSpreadsheet className="h-4 w-4" /> },
    { value: "both", label: "Both", icon: <Files className="h-4 w-4" /> },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Report" size="md">
      {isSuccess ? (
        <div className="py-8 text-center animate-slideUp">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E21A23]/10 flex items-center justify-center animate-scaleUp">
            <CheckCircle2 className="h-8 w-8 text-[#E21A23]" />
          </div>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 font-display">Schedule Created!</h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            You can manage this schedule in the Scheduled Reports section.
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
          </div>

          {/* Frequency Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
              Frequency
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["daily", "weekly", "monthly", "term-end"] as Frequency[]).map((freq) => (
                <label
                  key={freq}
                  className={cn(
                    "flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-all text-sm font-medium capitalize",
                    frequency === freq
                      ? "border-nexus-purple bg-nexus-purple/10 text-nexus-purple"
                      : "border-[var(--border)] text-[var(--foreground)] hover:border-nexus-purple/30"
                  )}
                >
                  <input
                    type="radio"
                    name="frequency"
                    value={freq}
                    checked={frequency === freq}
                    onChange={(e) => setFrequency(e.target.value as Frequency)}
                    className="sr-only"
                  />
                  {freq === "term-end" ? "End of Term" : freq}
                </label>
              ))}
            </div>

            {/* Day Selection */}
            {frequency === "weekly" && (
              <div className="mt-4">
                <label className="block text-xs text-[var(--muted-foreground)] mb-2">Day of Week</label>
                <select
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(Number(e.target.value))}
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-sm",
                    "bg-[var(--muted)] border border-transparent",
                    "text-[var(--foreground)]",
                    "focus:outline-none focus:border-nexus-purple focus:ring-1 focus:ring-nexus-purple"
                  )}
                >
                  {days.map((day, idx) => (
                    <option key={day} value={idx}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {frequency === "monthly" && (
              <div className="mt-4">
                <label className="block text-xs text-[var(--muted-foreground)] mb-2">Day of Month</label>
                <select
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(Number(e.target.value))}
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-sm",
                    "bg-[var(--muted)] border border-transparent",
                    "text-[var(--foreground)]",
                    "focus:outline-none focus:border-nexus-purple focus:ring-1 focus:ring-nexus-purple"
                  )}
                >
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* File Format */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
              File Format
            </label>
            <div className="flex gap-2">
              {formatOptions.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all text-sm font-medium",
                    selectedFormat === option.value
                      ? "border-nexus-purple bg-nexus-purple/10 text-nexus-purple"
                      : "border-[var(--border)] text-[var(--foreground)] hover:border-nexus-purple/30"
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
                  {option.icon}
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Delivery Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
              Delivery
            </label>
            <div className="space-y-2">
              <label
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                  deliveryMethod === "email" || deliveryMethod === "both"
                    ? "border-nexus-purple bg-nexus-purple/5"
                    : "border-[var(--border)] hover:border-nexus-purple/30"
                )}
              >
                <input
                  type="checkbox"
                  checked={deliveryMethod === "email" || deliveryMethod === "both"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDeliveryMethod(deliveryMethod === "download-center" ? "both" : "email");
                    } else {
                      setDeliveryMethod("download-center");
                    }
                  }}
                  className="w-4 h-4 rounded border-[var(--border)] text-nexus-purple focus:ring-nexus-purple"
                />
                <Mail className="h-4 w-4 text-[var(--muted-foreground)]" />
                <span className="text-sm text-[var(--foreground)]">Email notification</span>
              </label>

              <label
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                  deliveryMethod === "download-center" || deliveryMethod === "both"
                    ? "border-nexus-purple bg-nexus-purple/5"
                    : "border-[var(--border)] hover:border-nexus-purple/30"
                )}
              >
                <input
                  type="checkbox"
                  checked={deliveryMethod === "download-center" || deliveryMethod === "both"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDeliveryMethod(deliveryMethod === "email" ? "both" : "download-center");
                    } else {
                      setDeliveryMethod("email");
                    }
                  }}
                  className="w-4 h-4 rounded border-[var(--border)] text-nexus-purple focus:ring-nexus-purple"
                />
                <Download className="h-4 w-4 text-[var(--muted-foreground)]" />
                <span className="text-sm text-[var(--foreground)]">Save to Download Center</span>
              </label>
            </div>

            {/* Email Input */}
            {(deliveryMethod === "email" || deliveryMethod === "both") && (
              <div className="mt-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-sm",
                    "bg-[var(--muted)] border border-transparent",
                    "text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]",
                    "focus:outline-none focus:border-nexus-purple focus:ring-1 focus:ring-nexus-purple"
                  )}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
            <button
              onClick={onClose}
              className={cn(
                "px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "border border-[var(--border)] text-[var(--foreground)]",
                "hover:bg-[var(--muted)] hover:border-[#E21A23]/30",
                "active:scale-95"
              )}
            >
              Cancel
            </button>
            <button
              onClick={handleSchedule}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "bg-[#1a1a1a] text-white",
                "hover:bg-[#2a2a2a] hover:shadow-lg hover:scale-105",
                "focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2",
                "active:scale-95"
              )}
            >
              Create Schedule
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
