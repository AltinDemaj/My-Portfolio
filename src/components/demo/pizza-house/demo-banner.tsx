"use client";

import { Info } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="border-b border-amber-500/25 bg-amber-500/10 px-4 py-2.5 text-center">
      <p className="mx-auto flex max-w-3xl items-center justify-center gap-2 text-xs text-amber-100/95 sm:text-sm">
        <Info className="h-4 w-4 shrink-0 text-amber-400" aria-hidden />
        <span>
          <strong className="font-semibold">Demo only</strong> — no real orders,
          payments, or server. Menu, cart, checkout, and admin are simulated; data
          stays in this browser (localStorage).
        </span>
      </p>
    </div>
  );
}
