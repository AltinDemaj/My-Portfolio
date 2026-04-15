import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import {
  DASHBOARD_DEMO_BASE,
  DASHBOARD_DEMO_CONSOLE,
} from "@/lib/dashboard-demo/constants";

export function AdminDashboardMarketingHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={DASHBOARD_DEMO_BASE}
          className="flex items-center gap-2 font-semibold tracking-tight text-zinc-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/15 text-teal-700">
            <LayoutDashboard className="h-5 w-5" aria-hidden />
          </span>
          Admin Dashboard
        </Link>
        <Link
          href={DASHBOARD_DEMO_CONSOLE}
          className="rounded-full bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-teal-500"
        >
          Open live console
        </Link>
      </div>
    </header>
  );
}
