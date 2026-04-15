"use client";

import { Info } from "lucide-react";

export function DashboardDemoBanner() {
  return (
    <div className="border-b border-sky-500/20 bg-sky-500/10 px-4 py-2.5 text-center">
      <p className="mx-auto flex max-w-3xl items-center justify-center gap-2 text-xs text-sky-100/95 sm:text-sm">
        <Info className="h-4 w-4 shrink-0 text-sky-400" aria-hidden />
        <span>
          <strong className="font-semibold">Demo stock console</strong> — pharmacy inventory,
          replenishment, and availability numbers are mock data in your browser only. No backend
          and no real customer data.
        </span>
      </p>
    </div>
  );
}
