"use client";

import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { DashboardDemoBanner } from "./demo-banner";
import { DASHBOARD_DEMO_BASE } from "@/lib/dashboard-demo/constants";

export function DashboardDemoShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
      <DashboardDemoBanner />
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href={DASHBOARD_DEMO_BASE}
            className="flex items-center gap-2 font-semibold tracking-tight text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400">
              <LayoutDashboard className="h-5 w-5" aria-hidden />
            </span>
            <span className="hidden sm:inline">Admin Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={`${DASHBOARD_DEMO_BASE}#pharmacy-example`}
              className="hidden text-xs text-zinc-500 hover:text-zinc-300 sm:inline"
            >
              Example: pharmacy
            </Link>
            <span className="text-xs text-zinc-500">Live console · demo</span>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
    </div>
  );
}
