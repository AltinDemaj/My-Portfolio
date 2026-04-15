import type { Metadata } from "next";
import { DashboardDemoShell } from "@/components/demo/dashboard/dashboard-demo-shell";

export const metadata: Metadata = {
  title: "Admin Dashboard — live console",
  description:
    "Mock operations console: revenue trend, category mix, and work queue. Client-only demo.",
  robots: { index: false, follow: false },
};

export default function AdminDashboardConsoleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardDemoShell>{children}</DashboardDemoShell>;
}
