"use client";

import Link from "next/link";
import { ShoppingBag, Store } from "lucide-react";
import { ECOMMERCE_DEMO_BASE } from "@/lib/ecommerce-demo/constants";
import { useEcommerceDemoCart } from "./cart-provider";

export function EcommerceDemoSiteHeader() {
  const { cartCount } = useEcommerceDemoCart();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={ECOMMERCE_DEMO_BASE}
          className="flex items-center gap-2 font-semibold tracking-tight text-zinc-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white">
            <Store className="h-5 w-5" aria-hidden />
          </span>
          <span className="hidden sm:inline">Atlas Market</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href={ECOMMERCE_DEMO_BASE}
            className="rounded-lg px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            Shop
          </Link>
          <Link
            href={`${ECOMMERCE_DEMO_BASE}/orders`}
            className="rounded-lg px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            Orders
          </Link>
          <Link
            href={`${ECOMMERCE_DEMO_BASE}/cart`}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-800 transition hover:border-zinc-300 hover:bg-white"
            aria-label={`Cart, ${cartCount} items`}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            ) : null}
          </Link>
        </nav>
      </div>
    </header>
  );
}
