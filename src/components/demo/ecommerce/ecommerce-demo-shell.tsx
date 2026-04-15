"use client";

import Link from "next/link";
import { EcommerceDemoBanner } from "./demo-banner";
import { EcommerceDemoCartProvider } from "./cart-provider";
import { EcommerceDemoSiteHeader } from "./site-header";
import { ECOMMERCE_DEMO_BASE } from "@/lib/ecommerce-demo/constants";

export function EcommerceDemoShell({ children }: { children: React.ReactNode }) {
  return (
    <EcommerceDemoCartProvider>
      <div className="min-h-screen bg-zinc-100 font-sans text-zinc-900 antialiased">
        <EcommerceDemoBanner />
        <EcommerceDemoSiteHeader />
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
        <footer className="border-t border-zinc-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-xs text-zinc-500 sm:flex-row sm:px-6">
            <p>© {new Date().getFullYear()} Atlas Market — demo storefront</p>
            <div className="flex gap-6">
              <Link
                href={ECOMMERCE_DEMO_BASE}
                className="hover:text-zinc-800"
              >
                Shop
              </Link>
              <Link
                href={`${ECOMMERCE_DEMO_BASE}/orders`}
                className="hover:text-zinc-800"
              >
                Orders
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </EcommerceDemoCartProvider>
  );
}
