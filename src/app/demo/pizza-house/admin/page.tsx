"use client";

import { useMemo } from "react";
import Link from "next/link";
import { PIZZA_DEMO_BASE } from "@/lib/pizza-demo/constants";
import { usePizzaDemoCart } from "@/components/demo/pizza-house/cart-provider";
import type { OrderRecord } from "@/lib/pizza-demo/types";

const STATUS_OPTIONS: { value: OrderRecord["status"]; label: string }[] = [
  { value: "new", label: "New" },
  { value: "preparing", label: "Preparing" },
  { value: "out", label: "Out for delivery" },
  { value: "done", label: "Done" },
];

export default function PizzaDemoAdminPage() {
  const { orders, updateOrderStatus } = usePizzaDemoCart();

  const sorted = useMemo(
    () =>
      [...orders].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [orders],
  );

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-amber-500/90">
            Shop (demo)
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Admin — orders
          </h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            Queue is stored in{" "}
            <code className="rounded bg-zinc-800 px-1 text-xs">localStorage</code>{" "}
            for this browser only — no database.
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
        <div className="hidden border-b border-zinc-800 bg-zinc-950/80 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_80px_140px] sm:gap-3">
          <span>When</span>
          <span>Location</span>
          <span>Qty</span>
          <span>Status</span>
        </div>
        {sorted.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-zinc-500">
            No orders yet. Place one from{" "}
            <Link
              href={`${PIZZA_DEMO_BASE}/checkout`}
              className="text-amber-400 underline"
            >
              Checkout
            </Link>
            .
          </p>
        ) : (
          <ul>
            {sorted.map((o) => (
              <li
                key={o.id}
                className="border-b border-zinc-800/80 px-4 py-4 last:border-0 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_80px_140px] sm:items-center sm:gap-3 sm:px-5"
              >
                <div className="text-sm text-zinc-300">
                  {new Date(o.createdAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
                <div className="mt-2 min-w-0 text-sm sm:mt-0">
                  <p className="font-medium text-amber-200/90">
                    {o.addressLabel}
                  </p>
                  <p className="truncate text-zinc-500">
                    {o.addressLine1}, {o.city}
                  </p>
                  <p className="mt-1 text-xs text-zinc-600 sm:hidden">
                    {o.lines.map((l) => (
                      <span key={`${o.id}-${l.name}-${l.size}`} className="mr-2">
                        {l.name} ({l.size}) ×{l.qty}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="mt-2 text-sm text-zinc-400 sm:mt-0">
                  {o.lines.reduce((n, l) => n + l.qty, 0)} pcs
                </div>
                <div className="mt-3 sm:mt-0">
                  <select
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-2 py-2 text-sm text-white outline-none focus:border-amber-500/50"
                    value={o.status}
                    onChange={(e) =>
                      updateOrderStatus(
                        o.id,
                        e.target.value as OrderRecord["status"],
                      )
                    }
                    aria-label={`Status for order ${o.id}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
