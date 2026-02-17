"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Sparkles,
  Search,
  ArrowRight,
  FileText,
  Users,
  BookOpen,
  Key,
  Download,
  RefreshCw,
  HelpCircle,
  TrendingDown,
  Clock,
  Loader2,
  X,
  ChevronRight,
  Zap,
  MessageSquare,
  Command,
} from "lucide-react";
import Link from "next/link";

interface SearchResult {
  type: "data" | "action" | "insight" | "help";
  icon: React.ElementType;
  title: string;
  description: string;
  link?: string;
  product?: "connect" | "aleks" | "simnet" | "sharpen";
}

// Product brand colors - used contextually, not for buttons
const productBranding = {
  connect: {
    color: "#4A3B8A",
    bg: "bg-[#4A3B8A]",
    bgLight: "bg-[#4A3B8A]/8",
    text: "text-[#4A3B8A]",
    name: "Platform 1",
    icon: "/logos/connect-icon.svg",
  },
  aleks: {
    color: "#E21A23",
    bg: "bg-[#E21A23]",
    bgLight: "bg-[#E21A23]/8",
    text: "text-[#C41920]",
    name: "Platform 2",
    icon: "/logos/aleks-icon.svg",
  },
  simnet: {
    color: "#10B981",
    bg: "bg-[#10B981]",
    bgLight: "bg-[#10B981]/8",
    text: "text-[#10B981]",
    name: "Platform 3",
    icon: "/logos/simnet-icon.svg",
  },
  sharpen: {
    color: "#F08080",
    bg: "bg-[#F08080]",
    bgLight: "bg-[#F08080]/10",
    text: "text-[#D66060]",
    name: "Platform 4",
    icon: "/logos/sharpen-icon.svg",
  },
};

const suggestedPrompts = [
  {
    icon: TrendingDown,
    text: "Show courses with low enrollment",
    category: "insight",
  },
  {
    icon: Users,
    text: "Which students are inactive?",
    category: "data",
  },
  {
    icon: Download,
    text: "Export Biology 101 roster",
    category: "action",
  },
  {
    icon: RefreshCw,
    text: "Sync Canvas now",
    category: "action",
  },
  {
    icon: Key,
    text: "Find expiring licenses",
    category: "data",
  },
  {
    icon: HelpCircle,
    text: "How do I schedule a report?",
    category: "help",
  },
];

// Mock AI responses
const getAIResults = (query: string): SearchResult[] => {
  const q = query.toLowerCase();

  if (q.includes("low enrollment") || q.includes("enrollment")) {
    return [
      {
        type: "insight",
        icon: TrendingDown,
        title: "3 courses below 50% capacity",
        description: "Linear Algebra (65/75), Computer Skills (72/80), and Statistics (125/150) have lower enrollment",
        link: "/enrollment",
      },
      {
        type: "data",
        icon: BookOpen,
        title: "View all enrollment data",
        description: "34 total courses, 1,247 students enrolled",
        link: "/enrollment",
      },
    ];
  }

  if (q.includes("inactive") || q.includes("not active")) {
    return [
      {
        type: "insight",
        icon: Users,
        title: "158 inactive students found",
        description: "Students with no activity in the last 30 days across all courses",
        link: "/enrollment",
      },
      {
        type: "data",
        icon: BookOpen,
        title: "Biology 101 has 49 inactive",
        description: "Highest number of inactive students in a single course",
        link: "/enrollment/enc-1",
        product: "connect",
      },
    ];
  }

  if (q.includes("export") || q.includes("download")) {
    return [
      {
        type: "action",
        icon: Download,
        title: "Export Biology 101 roster",
        description: "Download student list as Excel or CSV",
        link: "/enrollment/enc-1",
        product: "connect",
      },
      {
        type: "action",
        icon: FileText,
        title: "Generate enrollment report",
        description: "Create a full enrollment summary report",
        link: "/",
      },
    ];
  }

  if (q.includes("sync") || q.includes("canvas") || q.includes("lms")) {
    return [
      {
        type: "action",
        icon: RefreshCw,
        title: "Sync with Canvas LMS",
        description: "Last synced 3 days ago - 34 courses, 1,247 students",
        link: "/enrollment",
      },
      {
        type: "insight",
        icon: Clock,
        title: "Auto-sync runs daily at 10:45 AM",
        description: "Next scheduled sync in 18 hours",
      },
    ];
  }

  if (q.includes("license") || q.includes("expiring") || q.includes("expire")) {
    return [
      {
        type: "insight",
        icon: Key,
        title: "142 licenses expiring soon",
        description: "Platform 3 licenses expire Feb 28, 2026",
        link: "/licenses",
        product: "simnet",
      },
      {
        type: "data",
        icon: Key,
        title: "License utilization: 88%",
        description: "1,008 of 1,150 total licenses in use",
        link: "/licenses",
      },
    ];
  }

  if (q.includes("report") || q.includes("schedule")) {
    return [
      {
        type: "help",
        icon: HelpCircle,
        title: "How to schedule a report",
        description: "1. Go to Reports Hub → 2. Select a report → 3. Click 'Schedule' → 4. Choose frequency",
      },
      {
        type: "data",
        icon: FileText,
        title: "5 scheduled reports active",
        description: "Next report: Course Enrollment Summary on Monday",
        link: "/scheduled",
      },
    ];
  }

  if (q.includes("how") || q.includes("help") || q.includes("what")) {
    return [
      {
        type: "help",
        icon: HelpCircle,
        title: "Getting started with Axis",
        description: "Axis is your central hub for managing EduTech products across your institution",
      },
      {
        type: "help",
        icon: BookOpen,
        title: "View documentation",
        description: "Learn about reports, licenses, and enrollment management",
      },
    ];
  }

  if (q.includes("connect")) {
    return [
      {
        type: "data",
        icon: BookOpen,
        title: "Platform 1: 856 students enrolled",
        description: "18 courses using Platform 1 this term",
        link: "/enrollment",
        product: "connect",
      },
      {
        type: "data",
        icon: Key,
        title: "Platform 1 licenses: 423/500 used",
        description: "77 licenses available, expires Aug 15",
        link: "/licenses",
        product: "connect",
      },
    ];
  }

  if (q.includes("aleks")) {
    return [
      {
        type: "data",
        icon: BookOpen,
        title: "Platform 2: 421 students enrolled",
        description: "11 courses using Platform 2, 90% active rate",
        link: "/enrollment",
        product: "aleks",
      },
      {
        type: "data",
        icon: Key,
        title: "Platform 2 licenses: 287/300 used",
        description: "13 licenses available, expires May 31",
        link: "/licenses",
        product: "aleks",
      },
    ];
  }

  if (q.includes("simnet") || q.includes("sim net")) {
    return [
      {
        type: "data",
        icon: BookOpen,
        title: "Platform 3: 178 students enrolled",
        description: "5 courses using Platform 3, 80% active rate",
        link: "/enrollment",
        product: "simnet",
      },
      {
        type: "data",
        icon: Key,
        title: "Platform 3 licenses: 142/150 used",
        description: "8 licenses available, expires Feb 28",
        link: "/licenses",
        product: "simnet",
      },
    ];
  }

  if (q.includes("sharpen")) {
    return [
      {
        type: "data",
        icon: BookOpen,
        title: "Platform 4: 156 students active",
        description: "Study app engagement across all courses",
        link: "/enrollment",
        product: "sharpen",
      },
    ];
  }

  return [
    {
      type: "data",
      icon: Search,
      title: `Search results for "${query}"`,
      description: "Searching across courses, students, reports, and licenses...",
    },
    {
      type: "help",
      icon: HelpCircle,
      title: "Try asking differently",
      description: "Example: 'Show inactive students' or 'Export enrollment data'",
    },
  ];
};

export function AISearchHero() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setResults(getAIResults(query));
        setIsSearching(false);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  const handlePromptClick = (prompt: string) => {
    setQuery(prompt);
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.focus();
  };

  // Refined result styling - no red, uses contextual product colors
  const getResultTypeStyles = (type: SearchResult["type"], product?: string) => {
    if (product && productBranding[product as keyof typeof productBranding]) {
      const p = productBranding[product as keyof typeof productBranding];
      return `${p.bgLight} ${p.text}`;
    }
    switch (type) {
      case "action":
        return "bg-emerald-50 text-emerald-700";
      case "insight":
        return "bg-amber-50 text-amber-700";
      case "help":
        return "bg-slate-100 text-slate-600";
      default:
        return "bg-[var(--muted)] text-[var(--muted-foreground)]";
    }
  };

  const getResultTypeLabel = (type: SearchResult["type"], product?: string) => {
    if (product && productBranding[product as keyof typeof productBranding]) {
      return productBranding[product as keyof typeof productBranding].name;
    }
    switch (type) {
      case "action":
        return "Action";
      case "insight":
        return "Insight";
      case "help":
        return "Help";
      default:
        return "Data";
    }
  };

  return (
    <div className="relative mb-10" ref={containerRef}>
      {/* Hero Card */}
      <div className="relative bg-[var(--card)] rounded-3xl border border-[var(--border)] overflow-hidden">
        {/* EduTech Brand Strip - THE ONLY place red appears prominently */}
        <div className="h-1 bg-gradient-to-r from-[#E21A23] via-[#4A3B8A] to-[#10B981]" />

        {/* Subtle background texture */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-slate-100/50 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-slate-100/50 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 p-8 md:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              {/* AI Icon - uses brand red as an accent mark, not a button */}
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E21A23] to-[#B8131A] flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--card)]" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-[var(--foreground)]">
                  Axis AI Assistant
                </h2>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Search, analyze, and take action across all your data
                </p>
              </div>
            </div>

            {/* Keyboard hint */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--muted)] text-[var(--muted-foreground)]">
              <Command className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">K</span>
            </div>
          </div>

          {/* Search Input - Clean, professional styling */}
          <div className="relative">
            <div
              className={cn(
                "relative flex items-center rounded-2xl transition-all duration-200",
                isFocused
                  ? "bg-white border-2 border-[var(--foreground)]/20 shadow-lg"
                  : "bg-[var(--muted)] border-2 border-transparent hover:bg-[var(--muted)]/80"
              )}
            >
              <div className="pl-5 flex items-center">
                {isSearching ? (
                  <Loader2 className="h-5 w-5 text-[var(--muted-foreground)] animate-spin" />
                ) : (
                  <Search className="h-5 w-5 text-[var(--muted-foreground)]" />
                )}
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask anything... 'Show inactive students', 'Export data', 'How do I...'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="flex-1 px-4 py-4 bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none text-base"
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="p-2 mr-1 rounded-xl text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              {/* Primary CTA */}
              <Button
                variant="primary"
                disabled={!query}
                leftIcon={<Sparkles className="h-4 w-4" />}
                className="m-2"
              >
                <span className="hidden sm:inline">Ask</span>
              </Button>
            </div>

            {/* Results Dropdown */}
            {isFocused && (query.length > 2 || results.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-xl overflow-hidden z-50 animate-slideUp">
                {isSearching ? (
                  <div className="p-8 text-center">
                    <div className="w-10 h-10 rounded-xl bg-[var(--muted)] flex items-center justify-center mx-auto mb-3">
                      <Loader2 className="h-5 w-5 text-[var(--muted-foreground)] animate-spin" />
                    </div>
                    <p className="text-sm font-medium text-[var(--foreground)]">Searching...</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">Analyzing your request</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="divide-y divide-[var(--border)]">
                    {results.map((result, idx) => (
                      <Link
                        key={idx}
                        href={result.link || "#"}
                        className="flex items-start gap-4 p-4 hover:bg-[var(--muted)]/50 transition-colors group"
                        onClick={() => setIsFocused(false)}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                          getResultTypeStyles(result.type, result.product)
                        )}>
                          {result.product ? (
                            <Image
                              src={productBranding[result.product].icon}
                              alt={productBranding[result.product].name}
                              width={24}
                              height={24}
                            />
                          ) : (
                            <result.icon className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={cn(
                              "text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide",
                              getResultTypeStyles(result.type, result.product)
                            )}>
                              {getResultTypeLabel(result.type, result.product)}
                            </span>
                          </div>
                          <p className="font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)]">
                            {result.title}
                          </p>
                          <p className="text-sm text-[var(--muted-foreground)] line-clamp-1 mt-0.5">
                            {result.description}
                          </p>
                        </div>
                        {result.link && (
                          <div className="flex-shrink-0 mt-2 w-8 h-8 rounded-lg bg-[var(--muted)] flex items-center justify-center group-hover:bg-[var(--foreground)]/10 transition-colors">
                            <ArrowRight className="h-4 w-4 text-[var(--muted-foreground)]" />
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
