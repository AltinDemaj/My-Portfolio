"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Navigation, CheckCircle2 } from "lucide-react";
import { PIZZA_DEMO_BASE } from "@/lib/pizza-demo/constants";
import { usePizzaDemoCart } from "@/components/demo/pizza-house/cart-provider";

export default function PizzaDemoCheckoutPage() {
  const { lines, subtotal, addresses, removeAddress, placeOrder } =
    usePizzaDemoCart();
  const [label, setLabel] = useState("Home");
  const [line1, setLine1] = useState("Rr. Agim Ramadani 12");
  const [city, setCity] = useState("Prishtinë");
  const [notes, setNotes] = useState("Ring the bell twice");
  const [saveAddr, setSaveAddr] = useState(true);
  const [selectedAddrId, setSelectedAddrId] = useState<string | "">("");
  const [done, setDone] = useState(false);

  const deliveryFee = subtotal > 0 ? 2.5 : 0;
  const total = subtotal + deliveryFee;

  const applySaved = (id: string) => {
    const a = addresses.find((x) => x.id === id);
    if (!a) return;
    setSelectedAddrId(id);
    setLabel(a.label);
    setLine1(a.line1);
    setCity(a.city);
    if (a.notes) setNotes(a.notes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    placeOrder({
      addressId: selectedAddrId || undefined,
      line1,
      city,
      label,
      saveAddress: saveAddr,
    });
    setDone(true);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
        <h1 className="mt-4 text-2xl font-bold text-white">Order placed (demo)</h1>
        <p className="mt-2 text-sm text-zinc-400">
          No email is sent — this is a mock checkout. Open{" "}
          <Link
            href={`${PIZZA_DEMO_BASE}/admin`}
            className="text-amber-400 underline"
          >
            Admin
          </Link>{" "}
          to see the order in the local queue.
        </p>
        <Link
          href={PIZZA_DEMO_BASE}
          className="mt-6 inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black"
        >
          Back to menu
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Demo only: delivery map, saved addresses, and totals — no payment or
          server. A real build would use Supabase + Resend (or similar).
        </p>

        <section className="mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
            <Navigation className="h-4 w-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-white">
              Delivery area & map
            </h2>
          </div>
          <div className="relative h-56 bg-zinc-950">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(circle at 42% 38%, rgba(245,158,11,0.25) 0%, transparent 42%), radial-gradient(circle at 58% 55%, rgba(59,130,246,0.12) 0%, transparent 40%), linear-gradient(180deg, #18181b 0%, #0a0a0a 100%)",
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
            <div className="absolute left-[42%] top-[36%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black shadow-lg">
                You
              </span>
              <MapPin
                className="mt-1 h-10 w-10 text-amber-400 drop-shadow-lg"
                aria-hidden
              />
            </div>
            <p className="absolute bottom-3 left-4 right-4 text-center text-xs text-zinc-500">
              Stylized map — production could use Google/Mapbox + delivery zones.
            </p>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-sm font-semibold text-white">Saved addresses</h2>
            {addresses.length === 0 ? (
              <p className="mt-2 text-xs text-zinc-500">
                None yet — fill the form below and check &quot;Save for next
                time&quot;.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {addresses.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-start justify-between gap-2 rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2"
                  >
                    <button
                      type="button"
                      className="min-w-0 text-left text-sm text-zinc-300 hover:text-white"
                      onClick={() => applySaved(a.id)}
                    >
                      <span className="font-medium text-amber-200/90">
                        {a.label}
                      </span>
                      <br />
                      <span className="text-zinc-500">
                        {a.line1}, {a.city}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="shrink-0 text-xs text-zinc-500 hover:text-red-400"
                      onClick={() => removeAddress(a.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-sm font-semibold text-white">
              Delivery details
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-medium text-zinc-500">
                Label
                <input
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </label>
              <label className="block text-xs font-medium text-zinc-500">
                City
                <input
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
              <label className="col-span-full block text-xs font-medium text-zinc-500">
                Street & number
                <input
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50"
                  value={line1}
                  onChange={(e) => setLine1(e.target.value)}
                />
              </label>
              <label className="col-span-full block text-xs font-medium text-zinc-500">
                Notes for driver
                <input
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
            </div>
            <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={saveAddr}
                onChange={(e) => setSaveAddr(e.target.checked)}
                className="rounded border-zinc-600"
              />
              Save this address for next order
            </label>
          </section>

          <button
            type="submit"
            disabled={lines.length === 0}
            className="w-full rounded-xl bg-amber-500 py-3 text-sm font-semibold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Place order — €{total.toFixed(2)}
          </button>
        </form>
      </div>

      <aside className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 lg:sticky lg:top-20">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Summary
        </h2>
        {lines.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">
            <Link
              href={PIZZA_DEMO_BASE}
              className="text-amber-400 underline"
            >
              Add items
            </Link>{" "}
            from the menu first.
          </p>
        ) : (
          <>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {lines.map((l) => (
                <li key={l.key} className="flex justify-between gap-2">
                  <span>
                    {l.name} ({l.size}) ×{l.qty}
                  </span>
                  <span>€{(l.unitPrice * l.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 border-t border-zinc-800 pt-4 text-sm">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Delivery</span>
                <span>€{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-white">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
