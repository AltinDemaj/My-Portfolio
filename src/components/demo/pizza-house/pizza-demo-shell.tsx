"use client";

import { DemoBanner } from "./demo-banner";
import { CartProvider } from "./cart-provider";
import { PizzaDemoSiteHeader } from "./site-header";

export function PizzaDemoShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
        <DemoBanner />
        <PizzaDemoSiteHeader />
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
      </div>
    </CartProvider>
  );
}
