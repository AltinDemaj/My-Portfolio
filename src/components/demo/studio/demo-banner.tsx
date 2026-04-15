"use client";

import { Info } from "lucide-react";

export function StudioDemoBanner() {
  return (
    <div className="border-b border-white/10 bg-black/40 px-4 py-2 text-center">
      <p className="mx-auto text-xs text-zinc-500 sm:text-sm">
        <Info className="mr-1.5 inline h-4 w-4 -translate-y-0.5 text-zinc-600" aria-hidden />
        <span className="font-medium text-zinc-400">Demo</span>
        <span className="text-zinc-600"> — preview only.</span>
      </p>
    </div>
  );
}
