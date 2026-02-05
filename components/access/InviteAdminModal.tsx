"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  AdminUser,
  RolePreset,
  rolePresets,
  allProducts,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  FileText,
  Key,
  GraduationCap,
  Shield,
  Settings,
  CheckCircle2,
  Mail,
} from "lucide-react";

interface InviteAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (admin: AdminUser) => void;
}

const presetIcons: Record<RolePreset, React.ElementType> = {
  reports_admin: FileText,
  licenses_manager: Key,
  enrollment_lead: GraduationCap,
  full_admin: Shield,
  custom: Settings,
};

export function InviteAdminModal({ isOpen, onClose, onInvite }: InviteAdminModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<RolePreset>("full_admin");
  const [sendEmail, setSendEmail] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; name?: string }>({});

  const currentPreset = rolePresets.find((p) => p.id === selectedPreset)!;

  const validate = () => {
    const newErrors: { email?: string; name?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newAdmin: AdminUser = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        role: "institutional_admin",
        institution: "State University",
        permissions: { ...currentPreset.permissions },
        addedDate: new Date(),
        addedBy: "Sarah Chen",
        status: "invited",
        productAccess: {
          reports: currentPreset.permissions.reports !== "none" ? [...currentPreset.defaultProducts] : [],
          licenses: currentPreset.permissions.licenses !== "none" ? [...currentPreset.defaultProducts] : [],
          enrollment: currentPreset.permissions.enrollment !== "none" ? [...currentPreset.defaultProducts] : [],
        },
      };

      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => {
        onInvite(newAdmin);
        resetForm();
      }, 1500);
    }, 800);
  };

  const resetForm = () => {
    setEmail("");
    setName("");
    setSelectedPreset("full_admin");
    setSendEmail(true);
    setShowSuccess(false);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const accessLabel = (level: string) => {
    if (level === "full") return "Full";
    if (level === "view_only") return "View Only";
    return "None";
  };

  const accessColor = (level: string) => {
    if (level === "full") return "text-green-700 bg-green-100";
    if (level === "view_only") return "text-blue-600 bg-blue-100";
    return "text-[var(--muted-foreground)] bg-[var(--muted)]";
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Invite New Administrator" size="lg">
      {showSuccess ? (
        <div className="py-10 text-center animate-fadeIn">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">Invitation Sent!</h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            An invite has been sent to <span className="font-medium">{email}</span>
          </p>
        </div>
      ) : (
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="admin@stateuniversity.edu"
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg text-sm bg-[var(--muted)] border text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all",
                  errors.email
                    ? "border-red-400 focus:border-red-400"
                    : "border-transparent focus:border-[#3B82F6]"
                )}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="John Smith"
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg text-sm bg-[var(--muted)] border text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all",
                  errors.name
                    ? "border-red-400 focus:border-red-400"
                    : "border-transparent focus:border-[#3B82F6]"
                )}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Access Preset Selection */}
          <div>
            <h3 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-3">
              Access Preset
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {rolePresets.map((preset) => {
                const Icon = presetIcons[preset.id];
                const isSelected = selectedPreset === preset.id;

                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset.id)}
                    className={cn(
                      "text-left p-4 rounded-xl border-2 transition-all duration-200",
                      isSelected
                        ? "border-[#1E3A8A] bg-blue-50/50 shadow-sm"
                        : "border-[var(--border)] hover:border-[var(--muted-foreground)]",
                      preset.id === "custom" && "col-span-2"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          isSelected ? "text-[#1E3A8A]" : "text-[var(--muted-foreground)]"
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isSelected ? "text-[#1E3A8A]" : "text-[var(--foreground)]"
                        )}
                      >
                        {preset.name}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted-foreground)]">{preset.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Permission Preview */}
          <div className="bg-[var(--muted)] rounded-xl p-4">
            <h4 className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-3">
              Permission Preview
            </h4>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {(["reports", "licenses", "enrollment"] as const).map((mod) => (
                <span key={mod} className="inline-flex items-center gap-1.5 text-xs">
                  <span className="text-[var(--muted-foreground)] capitalize">{mod}:</span>
                  <span className={cn("px-1.5 py-0.5 rounded font-medium", accessColor(currentPreset.permissions[mod]))}>
                    {accessLabel(currentPreset.permissions[mod])}
                  </span>
                </span>
              ))}
            </div>
            {currentPreset.defaultProducts.length > 0 && (
              <p className="text-xs text-[var(--muted-foreground)]">
                Products: {currentPreset.defaultProducts.join(", ")}
              </p>
            )}
          </div>

          {/* Send Email Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={sendEmail}
              onChange={(e) => setSendEmail(e.target.checked)}
              className="w-4 h-4 rounded accent-[#1E3A8A]"
            />
            <Mail className="h-4 w-4 text-[var(--muted-foreground)]" />
            <span className="text-sm text-[var(--foreground)]">Send invitation email</span>
          </label>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border)]">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
              Send Invite
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
