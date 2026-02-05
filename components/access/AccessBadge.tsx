"use client";

import { Check, Eye, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModuleAccess } from "@/lib/mock-data";

interface AccessBadgeProps {
  access: ModuleAccess;
  className?: string;
}

export function AccessBadge({ access, className }: AccessBadgeProps) {
  if (access === "full") {
    return (
      <span className={cn("inline-flex items-center gap-1 text-xs font-medium text-green-700", className)}>
        <Check className="h-3.5 w-3.5" />
        Full
      </span>
    );
  }

  if (access === "view_only") {
    return (
      <span className={cn("inline-flex items-center gap-1 text-xs font-medium text-blue-600", className)}>
        <Eye className="h-3.5 w-3.5" />
        View
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)]", className)}>
      <X className="h-3.5 w-3.5" />
    </span>
  );
}
