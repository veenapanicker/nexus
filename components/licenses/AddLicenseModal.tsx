"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { X, Upload, User, Users, Check, Loader2, FileSpreadsheet, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/mock-data";

interface AddLicenseModalProps {
  open: boolean;
  onClose: () => void;
}

type AddMode = "single" | "bulk";

export function AddLicenseModal({ open, onClose }: AddLicenseModalProps) {
  const [mode, setMode] = useState<AddMode>("single");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Single add form state
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product>("Platform 1");
  const [selectedCourse, setSelectedCourse] = useState("");

  // Bulk upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<{ count: number; product: string } | null>(null);

  const resetForm = () => {
    setStudentEmail("");
    setStudentName("");
    setSelectedProduct("Platform 1");
    setSelectedCourse("");
    setUploadedFile(null);
    setPreviewData(null);
    setShowSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Show toast and close after delay
    toast.success("License assigned successfully", {
      description: `${studentName} has been assigned a ${selectedProduct} license.`,
    });

    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleBulkUpload = async () => {
    if (!uploadedFile) return;

    setIsSubmitting(true);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    toast.success("Bulk import completed", {
      description: `${previewData?.count || 0} licenses have been assigned.`,
    });

    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate parsing file
      setPreviewData({
        count: Math.floor(Math.random() * 50) + 10,
        product: "Platform 1",
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-[var(--card)] rounded-2xl shadow-xl animate-scaleUp overflow-hidden">
        {showSuccess ? (
          // Success State
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 animate-scaleUp">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-display font-bold text-[var(--foreground)] mb-2">
              {mode === "single" ? "License Assigned!" : "Import Complete!"}
            </h3>
            <p className="text-[var(--muted-foreground)]">
              {mode === "single"
                ? `${studentName} now has access to ${selectedProduct}.`
                : `${previewData?.count} licenses have been assigned successfully.`}
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
              <div>
                <h2 className="text-lg font-display font-semibold text-[var(--foreground)]">
                  Add License
                </h2>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Assign a license to one or more students
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mode Selector */}
            <div className="p-5 border-b border-[var(--border)]">
              <div className="flex gap-3">
                <button
                  onClick={() => setMode("single")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all",
                    mode === "single"
                      ? "border-[#E21A23] bg-[#E21A23]/5 text-[#E21A23]"
                      : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--muted-foreground)]"
                  )}
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Single Student</span>
                </button>
                <button
                  onClick={() => setMode("bulk")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all",
                    mode === "bulk"
                      ? "border-[#E21A23] bg-[#E21A23]/5 text-[#E21A23]"
                      : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--muted-foreground)]"
                  )}
                >
                  <Users className="h-5 w-5" />
                  <span className="font-medium">Bulk Import</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {mode === "single" ? (
                <form onSubmit={handleSingleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                      Student Email
                    </label>
                    <input
                      type="email"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="student@university.edu"
                      required
                      className="w-full px-4 py-3 rounded-lg text-sm bg-[var(--muted)] border border-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[#E21A23] focus:ring-2 focus:ring-[#E21A23]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                      Student Name
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 rounded-lg text-sm bg-[var(--muted)] border border-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[#E21A23] focus:ring-2 focus:ring-[#E21A23]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                      Product
                    </label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value as Product)}
                      className="w-full px-4 py-3 rounded-lg text-sm bg-[var(--muted)] border border-transparent text-[var(--foreground)] focus:outline-none focus:border-[#E21A23] cursor-pointer"
                    >
                      <option value="Platform 1">Platform 1 (77 available)</option>
                      <option value="Platform 2">Platform 2 (13 available)</option>
                      <option value="Platform 3">Platform 3 (8 available)</option>
                      <option value="Platform 4">Platform 4 (44 available)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                      Course (Optional)
                    </label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg text-sm bg-[var(--muted)] border border-transparent text-[var(--foreground)] focus:outline-none focus:border-[#E21A23] cursor-pointer"
                    >
                      <option value="">Select a course...</option>
                      <option value="ECON 101">ECON 101 - Introduction to Economics</option>
                      <option value="BIO 201">BIO 201 - Cell Biology</option>
                      <option value="MATH 150">MATH 150 - Calculus I</option>
                      <option value="CIS 110">CIS 110 - Computer Applications</option>
                      <option value="CHEM 101">CHEM 101 - General Chemistry</option>
                    </select>
                  </div>

                  <Button
                    variant="primary"
                    fullWidth
                    type="submit"
                    disabled={!studentEmail || !studentName}
                    isLoading={isSubmitting}
                  >
                    Assign License
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  {!uploadedFile ? (
                    <label className="block">
                      <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center cursor-pointer hover:border-[var(--foreground)]/30 hover:bg-[var(--muted)] transition-all">
                        <Upload className="h-10 w-10 text-[var(--muted-foreground)] mx-auto mb-3" />
                        <p className="text-sm font-medium text-[var(--foreground)] mb-1">
                          Drop your file here or click to browse
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          Supports CSV and XLSX files
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="space-y-4">
                      {/* File Preview */}
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--muted)]">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <FileSpreadsheet className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--foreground)] truncate">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            {(uploadedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setUploadedFile(null);
                            setPreviewData(null);
                          }}
                          className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--card)] transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Preview Stats */}
                      {previewData && (
                        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                          <h4 className="text-sm font-medium text-[var(--foreground)] mb-3">
                            Import Preview
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-2xl font-bold text-[var(--foreground)]">
                                {previewData.count}
                              </p>
                              <p className="text-xs text-[var(--muted-foreground)]">Students found</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-[#E21A23]">
                                {previewData.count}
                              </p>
                              <p className="text-xs text-[var(--muted-foreground)]">Licenses to assign</p>
                            </div>
                          </div>

                          <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-amber-700">
                                This will assign {previewData.count} Platform 1 licenses. Make sure you have enough available seats.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button
                        variant="primary"
                        fullWidth
                        onClick={handleBulkUpload}
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                      >
                        Import {previewData?.count || 0} Licenses
                      </Button>
                    </div>
                  )}

                  {/* Template Download */}
                  <div className="text-center">
                    <button className="text-sm text-[#E21A23] hover:underline">
                      Download template file
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
