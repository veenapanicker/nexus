"use client";

import { Users, UserCheck, Clock, Shield } from "lucide-react";
import { AdminUser, getAdminStats } from "@/lib/mock-data";

interface AdminStatsCardsProps {
  admins: AdminUser[];
}

export function AdminStatsCards({ admins }: AdminStatsCardsProps) {
  const stats = getAdminStats(admins);

  const cards = [
    {
      icon: Users,
      label: "Administrators",
      value: stats.total,
      color: "from-[#1E3A8A] to-[#3B82F6]",
    },
    {
      icon: UserCheck,
      label: "Currently Active",
      value: stats.active,
      color: "from-[#10B981] to-[#6EE7B7]",
    },
    {
      icon: Clock,
      label: "Pending Invites",
      value: stats.invited,
      color: "from-[#F59E0B] to-[#FCD34D]",
    },
    {
      icon: Shield,
      label: "Avg. Modules per Admin",
      value: stats.avgModules,
      color: "from-[#4A3B8A] to-[#6A5BAA]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div
          key={card.label}
          className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 hover:shadow-lg transition-all duration-300 hover:border-[var(--foreground)]/20 animate-slideUp"
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[var(--muted-foreground)]">{card.label}</span>
            <div
              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}
            >
              <card.icon className="h-4 w-4 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--foreground)]">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
