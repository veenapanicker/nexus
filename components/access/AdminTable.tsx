"use client";

import { AdminUser, currentUser, getProductColor } from "@/lib/mock-data";
import { AccessBadge } from "./AccessBadge";
import { Button } from "@/components/ui/Button";
import { Pencil, Search, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminTableProps {
  admins: AdminUser[];
  onEdit: (admin: AdminUser) => void;
  onRemove: (admin: AdminUser) => void;
}

const roleLabels: Record<string, { label: string; className: string }> = {
  platform_admin: { label: "Platform Admin", className: "bg-purple-100 text-purple-700" },
  institutional_admin: { label: "Inst. Admin", className: "bg-blue-100 text-blue-700" },
  billing_admin: { label: "Billing Admin", className: "bg-amber-100 text-amber-700" },
};

const productDotColors: Record<string, string> = {
  "Platform 1": "bg-[#4A3B8A]",
  "Platform 2": "bg-[#E21A23]",
  "Platform 3": "bg-[#10B981]",
  "Platform 4": "bg-[#F08080]",
};

function getUniqueProducts(admin: AdminUser): string[] {
  const products = new Set<string>();
  Object.values(admin.productAccess).forEach((arr) => {
    arr.forEach((p) => products.add(p));
  });
  return Array.from(products);
}

export function AdminTable({ admins, onEdit, onRemove }: AdminTableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--muted)]">
              <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                Administrator
              </th>
              <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                Role
              </th>
              <th className="text-center text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-3 py-3">
                Reports
              </th>
              <th className="text-center text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-3 py-3">
                Licenses
              </th>
              <th className="text-center text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-3 py-3">
                Enrollment
              </th>
              <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                Products
              </th>
              <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                Status
              </th>
              <th className="text-right text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {admins.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center">
                  <div className="text-[var(--muted-foreground)]">
                    <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                    <p>No administrators found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              admins.map((admin, idx) => {
                const role = roleLabels[admin.role] || { label: admin.role, className: "bg-gray-100 text-gray-700" };
                const uniqueProducts = getUniqueProducts(admin);
                const isSelf = admin.id === currentUser.id;

                return (
                  <tr
                    key={admin.id}
                    className="hover:bg-[var(--muted)]/50 transition-colors"
                  >
                    {/* Admin */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {admin.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[var(--foreground)] truncate">
                            {admin.name}
                            {isSelf && (
                              <span className="ml-2 text-xs text-[var(--muted-foreground)]">(You)</span>
                            )}
                          </p>
                          <p className="text-xs text-[var(--muted-foreground)] truncate">{admin.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-medium", role.className)}>
                        {role.label}
                      </span>
                    </td>

                    {/* Reports */}
                    <td className="px-3 py-4 text-center">
                      <AccessBadge access={admin.permissions.reports} />
                    </td>

                    {/* Licenses */}
                    <td className="px-3 py-4 text-center">
                      <AccessBadge access={admin.permissions.licenses} />
                    </td>

                    {/* Enrollment */}
                    <td className="px-3 py-4 text-center">
                      <AccessBadge access={admin.permissions.enrollment} />
                    </td>

                    {/* Products */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        {uniqueProducts.length > 0 ? (
                          uniqueProducts.map((p) => (
                            <span
                              key={p}
                              className={cn("w-5 h-5 rounded-full flex items-center justify-center", productDotColors[p])}
                              title={p}
                            >
                              <span className="text-[8px] text-white font-bold">{p[0]}</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-[var(--muted-foreground)]">—</span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
                          admin.status === "active"
                            ? "bg-green-100 text-green-700"
                            : admin.status === "invited"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        )}
                      >
                        {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => onEdit(admin)}
                          leftIcon={<Pencil className="h-3.5 w-3.5" />}
                        >
                          Edit
                        </Button>
                        {!isSelf && (
                          <button
                            onClick={() => onRemove(admin)}
                            className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Remove admin"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="px-5 py-4 border-t border-[var(--border)] flex items-center justify-between">
        <p className="text-sm text-[var(--muted-foreground)]">
          Showing{" "}
          <span className="font-medium text-[var(--foreground)]">{admins.length}</span>{" "}
          administrator{admins.length !== 1 ? "s" : ""}
        </p>
      </div>
    </>
  );
}
