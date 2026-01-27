"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  Report,
  ScheduledReport,
  GeneratedReport,
  reports as initialReports,
  scheduledReports as initialScheduledReports,
  generatedReports as initialGeneratedReports,
  ReportFormat,
  Frequency,
  DeliveryMethod,
} from "./mock-data";

interface ReportContextType {
  // Data
  reports: Report[];
  scheduledReports: ScheduledReport[];
  generatedReports: GeneratedReport[];

  // Actions
  generateReport: (
    reportId: string,
    format: ReportFormat,
    dateRange?: { from: Date; to: Date }
  ) => Promise<GeneratedReport>;
  scheduleReport: (
    reportId: string,
    config: {
      frequency: Frequency;
      dayOfWeek?: number;
      dayOfMonth?: number;
      format: ReportFormat;
      deliveryMethod: DeliveryMethod;
      email?: string;
    }
  ) => void;
  deleteScheduledReport: (scheduleId: string) => void;
  toggleScheduledReport: (scheduleId: string) => void;
  deleteGeneratedReport: (generatedId: string) => void;

  // UI State
  isGenerating: boolean;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export function ReportProvider({ children }: { children: React.ReactNode }) {
  const [reports] = useState<Report[]>(initialReports);
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>(
    initialScheduledReports
  );
  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>(
    initialGeneratedReports
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = useCallback(
    async (
      reportId: string,
      format: ReportFormat,
      _dateRange?: { from: Date; to: Date }
    ): Promise<GeneratedReport> => {
      setIsGenerating(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const report = reports.find((r) => r.id === reportId);
      if (!report) throw new Error("Report not found");

      const newGenerated: GeneratedReport = {
        id: `gen-${Date.now()}`,
        reportId,
        reportName: report.name,
        product: report.product,
        generatedAt: new Date(),
        format,
        fileSize: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
        downloadUrl: "#",
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      };

      setGeneratedReports((prev) => [newGenerated, ...prev]);
      setIsGenerating(false);

      return newGenerated;
    },
    [reports]
  );

  const scheduleReport = useCallback(
    (
      reportId: string,
      config: {
        frequency: Frequency;
        dayOfWeek?: number;
        dayOfMonth?: number;
        format: ReportFormat;
        deliveryMethod: DeliveryMethod;
        email?: string;
      }
    ) => {
      const report = reports.find((r) => r.id === reportId);
      if (!report) throw new Error("Report not found");

      // Calculate next run date
      const nextRun = new Date();
      switch (config.frequency) {
        case "daily":
          nextRun.setDate(nextRun.getDate() + 1);
          break;
        case "weekly":
          const daysUntilNext = ((config.dayOfWeek || 0) - nextRun.getDay() + 7) % 7 || 7;
          nextRun.setDate(nextRun.getDate() + daysUntilNext);
          break;
        case "monthly":
          nextRun.setMonth(nextRun.getMonth() + 1);
          nextRun.setDate(config.dayOfMonth || 1);
          break;
        case "term-end":
          nextRun.setMonth(4); // May
          nextRun.setDate(15);
          if (nextRun < new Date()) {
            nextRun.setFullYear(nextRun.getFullYear() + 1);
          }
          break;
      }

      const newSchedule: ScheduledReport = {
        id: `sched-${Date.now()}`,
        reportId,
        reportName: report.name,
        product: report.product,
        frequency: config.frequency,
        dayOfWeek: config.dayOfWeek,
        dayOfMonth: config.dayOfMonth,
        format: config.format,
        deliveryMethod: config.deliveryMethod,
        email: config.email,
        nextRun,
        isActive: true,
        createdAt: new Date(),
      };

      setScheduledReports((prev) => [...prev, newSchedule]);
    },
    [reports]
  );

  const deleteScheduledReport = useCallback((scheduleId: string) => {
    setScheduledReports((prev) => prev.filter((s) => s.id !== scheduleId));
  }, []);

  const toggleScheduledReport = useCallback((scheduleId: string) => {
    setScheduledReports((prev) =>
      prev.map((s) =>
        s.id === scheduleId ? { ...s, isActive: !s.isActive } : s
      )
    );
  }, []);

  const deleteGeneratedReport = useCallback((generatedId: string) => {
    setGeneratedReports((prev) => prev.filter((g) => g.id !== generatedId));
  }, []);

  return (
    <ReportContext.Provider
      value={{
        reports,
        scheduledReports,
        generatedReports,
        generateReport,
        scheduleReport,
        deleteScheduledReport,
        toggleScheduledReport,
        deleteGeneratedReport,
        isGenerating,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error("useReports must be used within a ReportProvider");
  }
  return context;
}
