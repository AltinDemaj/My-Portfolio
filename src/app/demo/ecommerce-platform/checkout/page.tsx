"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ECOMMERCE_DEMO_BASE } from "@/lib/ecommerce-demo/constants";
import { useEcommerceDemoCart } from "@/components/demo/ecommerce/cart-provider";
import type { OrderRecord } from "@/lib/ecommerce-demo/types";

export default function CheckoutPage() {
  const { lines, subtotal, placeOrder } = useEcommerceDemoCart();
  const [email, setEmail] = useState("you@example.com");
  const [fullName, setFullName] = useState("Alex Demo");
  const [address, setAddress] = useState("Rr. Example 10");
  const [city, setCity] = useState("Prishtinë");
  const [postal, setPostal] = useState("10000");
  const [done, setDone] = useState<OrderRecord | null>(null);

  const shipping = subtotal > 75 ? 0 : 6.99;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    const order = placeOrder({ email, fullName, address, city, postal });
    if (order) setDone(order);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
        <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
          Order confirmed (demo)
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          No card was charged — this is a mock checkout. Order ID:{" "}
          <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-800">
            {done.id.slice(0, 8)}…
          </code>
        </p>
        <p className="mt-4 text-sm text-zinc-500">
          Total paid (simulated):{" "}
          <span className="font-medium text-zinc-900">€{done.total.toFixed(2)}</span>
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`${ECOMMERCE_DEMO_BASE}/orders`}
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
          >
            View orders
          </Link>
          <Link
            href={ECOMMERCE_DEMO_BASE}
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">Checkout</h1>
        <p className="mt-2 text-sm text-zinc-500">Your cart is empty.</p>
        <Link
          href={ECOMMERCE_DEMO_BASE}
          className="mt-6 inline-block text-sm font-medium text-zinc-900 underline underline-offset-4"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="text-3xl font-semibold text-zinc-900">Checkout</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Demo only — fill the form and click pay. No Stripe or real processor.
        </p>

        <form onSubmit={handlePay} className="mt-8 space-y-6">
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-zinc-900">Contact</h2>
            <label className="mt-4 block text-xs text-zinc-500">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
              />
            </label>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-zinc-900">Shipping</h2>
            <div className="mt-4 grid gap-4">
              <label className="block text-xs text-zinc-500">
                Full name
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
                />
              </label>
              <label className="block text-xs text-zinc-500">
                Address
                <input
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs text-zinc-500">
                  City
                  <input
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
                  />
                </label>
                <label className="block text-xs text-zinc-500">
                  Postal code
                  <input
                    required
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
                  />
                </label>
              </div>
            </div>
          </section>

          <button
            type="submit"
            className="w-full rounded-full bg-zinc-900 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Pay €{total.toFixed(2)} (demo)
          </button>
        </form>
      </div>

      <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Order summary
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-zinc-700">
          {lines.map((l) => (
            <li key={l.key} className="flex justify-between gap-2">
              <span>
                {l.name} ×{l.qty}
              </span>
              <span>€{(l.unitPrice * l.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2 border-t border-zinc-100 pt-4 text-sm">
          <div className="flex justify-between text-zinc-600">
            <span>Subtotal</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-zinc-600">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `€${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-zinc-600">
            <span>Tax (est.)</span>
            <span>€{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-zinc-900">
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </div>
        <p className="mt-4 text-xs text-zinc-500">
          In production, this step would redirect to Stripe Checkout or another
          PSP — here it only saves a mock order locally.
        </p>
      </aside>
    </div>
  );
}
