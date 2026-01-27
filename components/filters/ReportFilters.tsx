"use client";

import { Product } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Search, X, Filter } from "lucide-react";

interface ReportFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedProduct: Product | "all";
  onProductChange: (product: Product | "all") => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const products: (Product | "all")[] = ["all", "Connect", "ALEKS", "SimNet", "Sharpen"];

export function ReportFilters({
  searchQuery,
  onSearchChange,
  selectedProduct,
  onProductChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: ReportFiltersProps) {
  const hasActiveFilters = searchQuery || selectedProduct !== "all" || selectedCategory !== "all";

  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              "w-full pl-10 pr-4 py-2.5 rounded-lg text-sm",
              "bg-[var(--muted)] border border-transparent",
              "text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]",
              "focus:outline-none focus:border-nexus-purple focus:ring-1 focus:ring-nexus-purple",
              "transition-all"
            )}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
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
            onChange={(e) => onProductChange(e.target.value as Product | "all")}
            className={cn(
              "px-4 py-2.5 rounded-lg text-sm",
              "bg-[var(--muted)] border border-transparent",
              "text-[var(--foreground)]",
              "focus:outline-none focus:border-nexus-purple focus:ring-1 focus:ring-nexus-purple",
              "transition-all cursor-pointer"
            )}
          >
            {products.map((product) => (
              <option key={product} value={product}>
                {product === "all" ? "All Products" : product}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={cn(
              "px-4 py-2.5 rounded-lg text-sm",
              "bg-[var(--muted)] border border-transparent",
              "text-[var(--foreground)]",
              "focus:outline-none focus:border-nexus-purple focus:ring-1 focus:ring-nexus-purple",
              "transition-all cursor-pointer"
            )}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={() => {
              onSearchChange("");
              onProductChange("all");
              onCategoryChange("all");
            }}
            className={cn(
              "px-4 py-2.5 rounded-lg text-sm font-medium",
              "text-nexus-red hover:bg-nexus-red/10",
              "transition-all"
            )}
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
