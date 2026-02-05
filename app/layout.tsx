import type { Metadata } from "next";
import "./globals.css";
import { ReportProvider } from "@/lib/context";
import { Toaster } from "sonner";
import { ClientLayout } from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "Nexus - Institutional Administrator Dashboard",
  description: "Centralized administrative dashboard for EduTech products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReportProvider>
          <ClientLayout>{children}</ClientLayout>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--card)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              },
            }}
          />
        </ReportProvider>
      </body>
    </html>
  );
}
