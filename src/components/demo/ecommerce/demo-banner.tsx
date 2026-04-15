"use client";

import { Info } from "lucide-react";

export function EcommerceDemoBanner() {
  return (
    <div className="border-b border-zinc-200 bg-white px-4 py-2.5 text-center">
      <p className="mx-auto flex max-w-3xl items-center justify-center gap-2 text-xs text-zinc-600 sm:text-sm">
        <Info className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden />
        <span>
          <strong className="font-medium text-zinc-800">Demo store</strong> —
          no real payments. Cart and orders are{" "}
          <span className="whitespace-nowrap">simulated in this browser only.</span>
        </span>
      </p>
    </div>
  );
}
