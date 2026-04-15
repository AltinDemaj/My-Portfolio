"use client";

import Link from "next/link";
import { ECOMMERCE_DEMO_BASE } from "@/lib/ecommerce-demo/constants";
import { useEcommerceDemoCart } from "@/components/demo/ecommerce/cart-provider";

export default function OrdersPage() {
  const { orders } = useEcommerceDemoCart();

  return (
    <div>
      <h1 className="text-3xl font-semibold text-zinc-900">Your orders</h1>
      <p className="mt-2 text-sm text-zinc-500">
        Demo queue — orders exist only in this browser.
      </p>

      {orders.length === 0 ? (
        <p className="mt-10 text-center text-sm text-zinc-500">
          No orders yet.{" "}
          <Link
            href={ECOMMERCE_DEMO_BASE}
            className="font-medium text-zinc-900 underline underline-offset-4"
          >
            Shop something
          </Link>{" "}
          and complete checkout.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {orders.map((o) => (
            <li
              key={o.id}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {new Date(o.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <p className="mt-1 font-mono text-sm text-zinc-800">{o.id}</p>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-medium text-emerald-800">
                  {o.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-zinc-600">{o.email}</p>
              <p className="mt-1 text-xs text-zinc-500">{o.shipSummary}</p>
              <ul className="mt-4 space-y-1 border-t border-zinc-100 pt-4 text-sm text-zinc-700">
                {o.lines.map((l, i) => (
                  <li key={i} className="flex justify-between">
                    <span>
                      {l.name} ×{l.qty}
                    </span>
                    <span>€{(l.unitPrice * l.qty).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between border-t border-zinc-100 pt-3 text-sm font-semibold text-zinc-900">
                <span>Total</span>
                <span>€{o.total.toFixed(2)}</span>
              </div>
              <p className="mt-3 text-xs text-zinc-500">
                Fulfillment view — in production, webhooks would update status
                and notify the warehouse.
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
