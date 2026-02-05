"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  AdminUser,
  ModuleAccess,
  Product,
  allProducts,
  enrollmentCourses,
  campuses,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { FileText, Key, GraduationCap, ChevronDown, ChevronRight, Search } from "lucide-react";

interface EditPermissionsModalProps {
  admin: AdminUser;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: AdminUser) => void;
}

const moduleConfig = [
  { key: "reports" as const, label: "Reports", icon: FileText },
  { key: "licenses" as const, label: "Licenses", icon: Key },
  { key: "enrollment" as const, label: "Enrollment", icon: GraduationCap },
];

const accessLevels: { value: ModuleAccess; label: string }[] = [
  { value: "full", label: "Full" },
  { value: "view_only", label: "View Only" },
  { value: "none", label: "None" },
];

const productDotColors: Record<string, string> = {
  "Platform 1": "bg-[#4A3B8A]",
  "Platform 2": "bg-[#E21A23]",
  "Platform 3": "bg-[#10B981]",
  "Platform 4": "bg-[#F08080]",
};

export function EditPermissionsModal({ admin, isOpen, onClose, onSave }: EditPermissionsModalProps) {
  const [permissions, setPermissions] = useState({ ...admin.permissions });
  const [productAccess, setProductAccess] = useState({
    reports: [...admin.productAccess.reports],
    licenses: [...admin.productAccess.licenses],
    enrollment: [...admin.productAccess.enrollment],
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [courseRestrictions, setCourseRestrictions] = useState<string[]>(admin.courseRestrictions || []);
  const [campusAccess, setCampusAccess] = useState<string[]>(admin.campusAccess || [...campuses]);
  const [courseSearch, setCourseSearch] = useState("");

  const handleAccessChange = (module: "reports" | "licenses" | "enrollment", level: ModuleAccess) => {
    setPermissions((prev) => ({ ...prev, [module]: level }));
    if (level === "none") {
      setProductAccess((prev) => ({ ...prev, [module]: [] }));
    } else if (productAccess[module].length === 0) {
      setProductAccess((prev) => ({ ...prev, [module]: [...allProducts] }));
    }
  };

  const handleProductToggle = (module: "reports" | "licenses" | "enrollment", product: Product) => {
    setProductAccess((prev) => {
      const current = prev[module];
      const updated = current.includes(product)
        ? current.filter((p) => p !== product)
        : [...current, product];
      return { ...prev, [module]: updated };
    });
  };

  const handleCourseToggle = (courseId: string) => {
    setCourseRestrictions((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const handleCampusToggle = (campus: string) => {
    setCampusAccess((prev) =>
      prev.includes(campus) ? prev.filter((c) => c !== campus) : [...prev, campus]
    );
  };

  const handleSave = () => {
    onSave({
      ...admin,
      permissions,
      productAccess,
      courseRestrictions: courseRestrictions.length > 0 ? courseRestrictions : undefined,
      campusAccess: campusAccess.length === campuses.length ? undefined : campusAccess,
    });
  };

  const filteredCourses = enrollmentCourses.filter(
    (c) =>
      courseSearch === "" ||
      c.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.code.toLowerCase().includes(courseSearch.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Permissions: ${admin.name}`} size="lg">
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
        {/* Admin Info */}
        <div className="flex items-center gap-3 pb-4 border-b border-[var(--border)]">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center text-white text-sm font-bold">
            {admin.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">{admin.name}</p>
            <p className="text-xs text-[var(--muted-foreground)]">{admin.email}</p>
          </div>
        </div>

        {/* Module Permissions */}
        <div>
          <h3 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-4">
            Module Permissions
          </h3>

          <div className="space-y-5">
            {moduleConfig.map((mod) => (
              <div key={mod.key} className="border border-[var(--border)] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <mod.icon className="h-4 w-4 text-[var(--muted-foreground)]" />
                  <span className="text-sm font-medium text-[var(--foreground)]">{mod.label}</span>
                </div>

                {/* Access Level Pills */}
                <div className="flex items-center gap-1 mb-3">
                  {accessLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => handleAccessChange(mod.key, level.value)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                        permissions[mod.key] === level.value
                          ? "bg-[#1E3A8A] text-white shadow-sm"
                          : "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]"
                      )}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>

                {/* Product Checkboxes */}
                {permissions[mod.key] !== "none" && (
                  <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[var(--border)]">
                    {allProducts.map((product) => (
                      <label key={product} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={productAccess[mod.key].includes(product)}
                          onChange={() => handleProductToggle(mod.key, product)}
                          className="w-4 h-4 rounded accent-[#1E3A8A]"
                        />
                        <span className={cn("w-2.5 h-2.5 rounded-full", productDotColors[product])} />
                        <span className="text-sm text-[var(--foreground)]">{product}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="border-t border-[var(--border)] pt-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            {showAdvanced ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            Advanced Settings
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-5">
              {/* Course Restrictions */}
              <div className="border border-[var(--border)] rounded-xl p-4">
                <h4 className="text-sm font-medium text-[var(--foreground)] mb-3">
                  Course Restrictions
                  {courseRestrictions.length === 0 && (
                    <span className="ml-2 text-xs text-[var(--muted-foreground)]">(All Courses)</span>
                  )}
                </h4>

                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-[var(--muted)] border border-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                <div className="max-h-40 overflow-y-auto space-y-1">
                  {filteredCourses.map((course) => (
                    <label
                      key={course.id}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[var(--muted)] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={courseRestrictions.length === 0 || courseRestrictions.includes(course.id)}
                        onChange={() => {
                          if (courseRestrictions.length === 0) {
                            setCourseRestrictions(
                              enrollmentCourses.filter((c) => c.id !== course.id).map((c) => c.id)
                            );
                          } else {
                            handleCourseToggle(course.id);
                          }
                        }}
                        className="w-3.5 h-3.5 rounded accent-[#1E3A8A]"
                      />
                      <span className="text-xs text-[var(--foreground)]">
                        {course.code} - {course.name}
                      </span>
                      <span
                        className={cn(
                          "ml-auto px-1.5 py-0.5 rounded text-[10px] font-medium",
                          productDotColors[course.product]
                            ? "text-white"
                            : "bg-gray-100 text-gray-600"
                        )}
                        style={{
                          backgroundColor:
                            course.product === "Platform 1"
                              ? "#4A3B8A"
                              : course.product === "Platform 2"
                              ? "#E21A23"
                              : course.product === "Platform 3"
                              ? "#10B981"
                              : "#F08080",
                        }}
                      >
                        {course.product}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Campus Access */}
              <div className="border border-[var(--border)] rounded-xl p-4">
                <h4 className="text-sm font-medium text-[var(--foreground)] mb-3">
                  Campus Access
                  {campusAccess.length === campuses.length && (
                    <span className="ml-2 text-xs text-[var(--muted-foreground)]">(All Campuses)</span>
                  )}
                </h4>

                <div className="space-y-1">
                  {campuses.map((campus) => (
                    <label
                      key={campus}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[var(--muted)] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={campusAccess.includes(campus)}
                        onChange={() => handleCampusToggle(campus)}
                        className="w-3.5 h-3.5 rounded accent-[#1E3A8A]"
                      />
                      <span className="text-xs text-[var(--foreground)]">{campus}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border)]">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
