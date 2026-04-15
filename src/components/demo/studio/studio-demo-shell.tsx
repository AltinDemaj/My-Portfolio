"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { StudioDemoBanner } from "./demo-banner";
import { STUDIO_DEMO_BASE } from "@/lib/studio-demo/constants";

const nav = [
  { href: `${STUDIO_DEMO_BASE}#work`, label: "Work" },
  { href: `${STUDIO_DEMO_BASE}#services`, label: "Services" },
  { href: `${STUDIO_DEMO_BASE}#contact`, label: "Contact" },
];

export function StudioDemoShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
      <StudioDemoBanner />
      <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href={STUDIO_DEMO_BASE}
            className="flex items-center gap-2 font-semibold tracking-tight text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25">
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
            <span className="hidden sm:inline">North Studio</span>
          </Link>
          <nav className="flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-white/5 py-10 text-center text-xs text-zinc-500">
        <p>North Studio — demo marketing site · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
