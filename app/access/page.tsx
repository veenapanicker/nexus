"use client";

import React, { useState, useMemo } from "react";
import { adminUsers as initialAdmins, AdminUser } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { AdminTable } from "@/components/access/AdminTable";
import { EditPermissionsModal } from "@/components/access/EditPermissionsModal";
import { InviteAdminModal } from "@/components/access/InviteAdminModal";
import { Users, UserPlus, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserAccessPage() {
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);
  const [searchQuery, setSearchQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState<"all" | "reports" | "licenses" | "enrollment">("all");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);

  const filteredAdmins = useMemo(() => {
    return admins.filter((admin) => {
      const matchesSearch =
        searchQuery === "" ||
        admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesModule =
        moduleFilter === "all" || admin.permissions[moduleFilter] !== "none";

      return matchesSearch && matchesModule;
    });
  }, [admins, searchQuery, moduleFilter]);

  const handleSavePermissions = (updated: AdminUser) => {
    setAdmins((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    setEditingAdmin(null);
  };

  const handleInvite = (newAdmin: AdminUser) => {
    setAdmins((prev) => [...prev, newAdmin]);
    setShowInviteModal(false);
  };

  const handleRemove = (admin: AdminUser) => {
    setAdmins((prev) => prev.filter((a) => a.id !== admin.id));
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--card)] border-b border-[var(--border)] sticky top-0 z-10 shadow-sm animate-slideInFromLeft">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center shadow-sm">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-[var(--foreground)]">
                  User Access Management
                </h1>
                <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
                  Manage administrator permissions and access levels
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              onClick={() => setShowInviteModal(true)}
              leftIcon={<UserPlus className="h-4 w-4" />}
            >
              Invite Admin
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Admin Table Card */}
        <div
          className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden animate-slideUp"
          style={{ animationDelay: "200ms" }}
        >
          {/* Filters */}
          <div className="p-5 border-b border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-display font-semibold text-[var(--foreground)]">
                Administrators
              </h2>
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                  <input
                    type="text"
                    placeholder="Search admins..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 w-64 rounded-lg text-sm bg-[var(--muted)] border border-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                  />
                </div>

                {/* Module Filter */}
                <div className="relative">
                  <select
                    value={moduleFilter}
                    onChange={(e) =>
                      setModuleFilter(e.target.value as "all" | "reports" | "licenses" | "enrollment")
                    }
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg text-sm bg-[var(--muted)] border border-transparent text-[var(--foreground)] focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                  >
                    <option value="all">All Modules</option>
                    <option value="reports">Reports Access</option>
                    <option value="licenses">Licenses Access</option>
                    <option value="enrollment">Enrollment Access</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <AdminTable admins={filteredAdmins} onEdit={setEditingAdmin} onRemove={handleRemove} />
        </div>
      </div>

      {/* Modals */}
      {editingAdmin && (
        <EditPermissionsModal
          admin={editingAdmin}
          isOpen={true}
          onClose={() => setEditingAdmin(null)}
          onSave={handleSavePermissions}
        />
      )}

      <InviteAdminModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={handleInvite}
      />
    </div>
  );
}
