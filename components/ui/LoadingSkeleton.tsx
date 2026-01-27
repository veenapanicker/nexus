"use client";

import { cn } from "@/lib/utils";

export function ReportCardSkeleton() {
  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="skeleton h-6 w-20 rounded"></div>
            <div className="skeleton h-6 w-16 rounded"></div>
          </div>
          <div className="skeleton h-5 w-3/4 rounded mb-3"></div>
          <div className="skeleton h-4 w-full rounded mb-2"></div>
          <div className="skeleton h-4 w-2/3 rounded"></div>
        </div>
        <div className="skeleton h-10 w-10 rounded-lg flex-shrink-0"></div>
      </div>
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--border)]">
        <div className="skeleton flex-1 h-10 rounded-lg"></div>
        <div className="skeleton flex-1 h-10 rounded-lg"></div>
      </div>
    </div>
  );
}

export function ReportCardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ReportCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] gap-4 px-6 py-4 border-b border-[var(--border)] animate-pulse">
      <div className="flex items-center gap-3">
        <div className="skeleton h-10 w-10 rounded-lg flex-shrink-0"></div>
        <div className="flex-1">
          <div className="skeleton h-4 w-3/4 rounded mb-2"></div>
          <div className="skeleton h-3 w-1/2 rounded"></div>
        </div>
      </div>
      <div className="skeleton h-6 w-16 rounded"></div>
      <div className="skeleton h-4 w-24 rounded"></div>
      <div className="skeleton h-4 w-20 rounded"></div>
      <div className="skeleton h-4 w-16 rounded"></div>
      <div className="skeleton h-8 w-20 rounded"></div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
      <div className="hidden md:grid grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] gap-4 px-6 py-4 bg-[var(--muted)] border-b border-[var(--border)]">
        <div className="skeleton h-4 w-20 rounded"></div>
        <div className="skeleton h-4 w-16 rounded"></div>
        <div className="skeleton h-4 w-20 rounded"></div>
        <div className="skeleton h-4 w-16 rounded"></div>
        <div className="skeleton h-4 w-16 rounded"></div>
        <div className="skeleton h-4 w-12 rounded"></div>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {Array.from({ length: rows }).map((_, i) => (
          <TableRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function ProgressBar() {
  return (
    <div className="w-full h-1 bg-[var(--muted)] rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-[#E21A23] to-[#F04A52] animate-loadingBar rounded-full"></div>
    </div>
  );
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className={cn("animate-spin", sizeClasses[size])}>
      <svg
        className="h-full w-full text-[#E21A23]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}

export function SkeletonPulse() {
  return <div className="animate-pulse bg-[var(--muted)] rounded"></div>;
}
