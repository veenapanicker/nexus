"use client";

import { Report, getProductColor, getProductBorderColor } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FileText, Calendar, PlayCircle, Clock } from "lucide-react";

interface ReportCardProps {
  report: Report;
  onGenerate: (report: Report) => void;
  onSchedule: (report: Report) => void;
}

export function ReportCard({ report, onGenerate, onSchedule }: ReportCardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 hover:shadow-lg transition-all duration-300 group",
        "hover:border-[var(--foreground)]/20"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                getProductColor(report.product)
              )}
            >
              {report.product}
            </span>
            <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-[var(--muted)] text-[var(--muted-foreground)]">
              {report.category}
            </span>
          </div>
          <h3 className="font-semibold text-[var(--foreground)] mb-1 truncate">
            {report.name}
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-3">
            {report.description}
          </p>
          <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
            <Clock className="h-3.5 w-3.5" />
            <span>
              {report.lastGenerated
                ? `Last generated: ${format(report.lastGenerated, "MMM d, yyyy")}`
                : "Never generated"}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              "bg-[var(--muted)]"
            )}
          >
            <FileText className="h-5 w-5 text-[var(--muted-foreground)]" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--border)]">
        <Button
          variant="primary"
          size="md"
          className="flex-1"
          onClick={() => onGenerate(report)}
          leftIcon={<PlayCircle className="h-4 w-4" />}
        >
          Generate Now
        </Button>
        <Button
          variant="secondary"
          size="md"
          className="flex-1"
          onClick={() => onSchedule(report)}
          leftIcon={<Calendar className="h-4 w-4" />}
        >
          Schedule
        </Button>
      </div>
    </div>
  );
}
