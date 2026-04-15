"use client";

import Link from "next/link";
import { Pizza, ShoppingBag } from "lucide-react";
import { PIZZA_DEMO_BASE } from "@/lib/pizza-demo/constants";
import { usePizzaDemoCart } from "./cart-provider";

export function PizzaDemoSiteHeader() {
  const { cartCount } = usePizzaDemoCart();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={PIZZA_DEMO_BASE}
          className="flex items-center gap-2 font-semibold tracking-tight text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
            <Pizza className="h-5 w-5" aria-hidden />
          </span>
          <span className="hidden sm:inline">Pizza House</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href={PIZZA_DEMO_BASE}
            className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            Menu
          </Link>
          <Link
            href={`${PIZZA_DEMO_BASE}/checkout`}
            className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            Checkout
          </Link>
          <Link
            href={`${PIZZA_DEMO_BASE}/admin`}
            className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            Admin
          </Link>
          <Link
            href={`${PIZZA_DEMO_BASE}/checkout`}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-200 transition hover:border-amber-500/50 hover:text-amber-200"
            aria-label={`Cart, ${cartCount} items`}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-black">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            ) : null}
          </Link>
        </nav>
      </div>
    </header>
  );
}
