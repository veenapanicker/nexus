"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Download,
  Key,
  GraduationCap,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Eye,
  Home,
  LogOut,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { currentUser } from "@/lib/mock-data";

const mainNavigation = [
  {
    name: "Home",
    href: "/home",
    icon: Home,
    module: null, // Always accessible
  },
];

const moduleNavigation = [
  {
    name: "Reports Hub",
    href: "/",
    icon: FileText,
    module: "reports" as const,
    children: [
      { name: "Report Library", href: "/" },
      { name: "Scheduled Reports", href: "/scheduled" },
      { name: "Download Center", href: "/downloads" },
    ],
  },
  {
    name: "Licenses",
    href: "/licenses",
    icon: Key,
    module: "licenses" as const,
  },
  {
    name: "Enrollment",
    href: "/enrollment",
    icon: GraduationCap,
    module: "enrollment" as const,
  },
];

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | null>("reports");

  const getAccessLevel = (module: "reports" | "licenses" | "enrollment" | null) => {
    if (!module) return "full";
    return currentUser.permissions[module];
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/scheduled" || pathname === "/downloads";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-[var(--card)] border-r border-[var(--border)] transition-all duration-300 animate-slideInFromLeft",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-3 border-b border-[var(--border)]">
        <Link href="/home" className="flex items-center gap-2 w-full min-w-0">
          <div className={cn(
            "flex items-center justify-center flex-shrink-0 rounded-lg bg-[#E21A23]",
            collapsed ? "w-10 h-10" : "w-11 h-11"
          )}>
            <span className="text-white font-bold text-lg">N</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="font-display font-semibold text-[var(--foreground)] truncate text-sm">Nexus</h1>
              <p className="text-xs text-[var(--muted-foreground)]">Admin Dashboard</p>
            </div>
          )}
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {/* Home Link */}
        {mainNavigation.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                active
                  ? "bg-[#E21A23]/10 text-[#E21A23] font-medium"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", active && "text-[#E21A23]")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}

        {/* Modules Section */}
        <div className={cn("pt-4 mt-4 border-t border-[var(--border)]", collapsed && "border-none pt-2 mt-2")}>
          {!collapsed && (
            <p className="px-3 mb-2 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
              Modules
            </p>
          )}

          {moduleNavigation.map((item) => {
            const active = isActive(item.href);
            const accessLevel = getAccessLevel(item.module);
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedModule === item.module;

            return (
              <div key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => {
                    if (hasChildren) {
                      setExpandedModule(isExpanded ? null : item.module);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                    active
                      ? "bg-[#E21A23]/10 text-[#E21A23] font-medium"
                      : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? `${item.name}${accessLevel === "view_only" ? " (View Only)" : ""}` : undefined}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", active && "text-[#E21A23]")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {accessLevel === "full" ? (
                        <Star className="h-3 w-3 text-[#E21A23]" />
                      ) : (
                        <Eye className="h-3 w-3 text-[var(--muted-foreground)]" />
                      )}
                    </>
                  )}
                </Link>

                {/* Children (sub-nav) */}
                {hasChildren && isExpanded && !collapsed && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children?.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            "block px-3 py-2 rounded-lg text-sm transition-all duration-200",
                            childActive
                              ? "text-[#E21A23] font-medium bg-[#E21A23]/5"
                              : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                          )}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* User Access Link */}
      <div className="px-2 py-2 border-t border-[var(--border)]">
        <Link
          href="/access"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
            pathname === "/access"
              ? "bg-[#E21A23]/10 text-[#E21A23] font-medium"
              : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "User Access" : undefined}
        >
          <Users className={cn("h-5 w-5 flex-shrink-0", pathname === "/access" && "text-[#E21A23]")} />
          {!collapsed && <span>User Access</span>}
        </Link>
      </div>

      {/* User Section */}
      {!collapsed && (
        <div className="p-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E21A23] to-[#F04A52] flex items-center justify-center text-white text-xs font-bold">
              {currentUser.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--foreground)] truncate">{currentUser.name}</p>
              <p className="text-xs text-[var(--muted-foreground)] truncate">{currentUser.institution}</p>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Navigation */}
      <div className="px-2 py-2 border-t border-[var(--border)]">
        {secondaryNavigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-all",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? item.name : undefined}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
        <Link
          href="/login"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--muted-foreground)] hover:bg-red-50 hover:text-red-600 transition-all",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </Link>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-all"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </button>
    </aside>
  );
}
