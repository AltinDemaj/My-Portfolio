"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import {
  MENU_ITEMS,
  SIZE_LABELS,
  type PizzaSize,
} from "@/lib/pizza-demo/menu-data";
import { PIZZA_DEMO_BASE } from "@/lib/pizza-demo/constants";
import { usePizzaDemoCart } from "@/components/demo/pizza-house/cart-provider";

export default function PizzaDemoMenuPage() {
  const { lines, addToCart, setQty, subtotal } = usePizzaDemoCart();
  const [sizePick, setSizePick] = useState<Record<string, PizzaSize>>(() =>
    Object.fromEntries(MENU_ITEMS.map((m) => [m.id, "M" as PizzaSize])),
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Menu
        </h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-400">
          Pick a size, add to cart, then head to checkout for delivery details
          and saved locations.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {MENU_ITEMS.map((item) => {
            const size = sizePick[item.id] ?? "M";
            const price = item.prices[size];
            const lineKey = `${item.id}-${size}`;
            const line = lines.find((l) => l.key === lineKey);

            return (
              <li
                key={item.id}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-lg"
              >
                <div className="relative h-36 overflow-hidden bg-zinc-900">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/10 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="space-y-3 p-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(["S", "M", "L"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() =>
                          setSizePick((p) => ({ ...p, [item.id]: s }))
                        }
                        className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                          size === s
                            ? "border-amber-500/60 bg-amber-500/15 text-amber-200"
                            : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                        }`}
                      >
                        {SIZE_LABELS[s]} — €{item.prices[s].toFixed(2)}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-zinc-800/80 pt-3">
                    <span className="text-sm font-semibold text-amber-200">
                      €{price.toFixed(2)}
                    </span>
                    {line ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                          onClick={() => setQty(lineKey, line.qty - 1)}
                          aria-label="Decrease"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                          onClick={() => setQty(lineKey, line.qty + 1)}
                          aria-label="Increase"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
                        onClick={() => addToCart(item.id, size)}
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 lg:sticky lg:top-20">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Your order
        </h2>
        {lines.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">
            Cart is empty. Add pizzas from the menu.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {lines.map((l) => (
              <li
                key={l.key}
                className="flex justify-between gap-2 text-sm text-zinc-300"
              >
                <span>
                  {l.name}{" "}
                  <span className="text-zinc-500">({l.size})</span> ×{l.qty}
                </span>
                <span className="shrink-0 text-zinc-400">
                  €{(l.unitPrice * l.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex justify-between border-t border-zinc-800 pt-4 text-sm">
          <span className="text-zinc-500">Subtotal</span>
          <span className="font-semibold text-white">
            €{subtotal.toFixed(2)}
          </span>
        </div>
        <Link
          href={`${PIZZA_DEMO_BASE}/checkout`}
          className={`mt-4 block w-full rounded-xl py-3 text-center text-sm font-semibold transition ${
            lines.length
              ? "bg-white text-black hover:bg-zinc-200"
              : "cursor-not-allowed bg-zinc-800 text-zinc-500"
          }`}
          aria-disabled={lines.length === 0}
          onClick={(e) => {
            if (lines.length === 0) e.preventDefault();
          }}
        >
          Continue to checkout
        </Link>
      </aside>
    </div>
  );
}
