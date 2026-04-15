"use client";

import Link from "next/link";
import Image from "next/image";
import { ECOMMERCE_DEMO_BASE } from "@/lib/ecommerce-demo/constants";
import { useEcommerceDemoCart } from "@/components/demo/ecommerce/cart-provider";

export default function CartPage() {
  const { lines, setQty, subtotal, removeLine } = useEcommerceDemoCart();
  const shipping = subtotal > 75 ? 0 : 6.99;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;

  if (lines.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">Your cart</h1>
        <p className="mt-2 text-sm text-zinc-500">Your cart is empty.</p>
        <Link
          href={ECOMMERCE_DEMO_BASE}
          className="mt-6 inline-block rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900">Your cart</h1>
      <ul className="mt-8 space-y-4">
        {lines.map((l) => (
          <li
            key={l.key}
            className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src={l.imageSrc}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-zinc-900">{l.name}</p>
              <p className="text-sm text-zinc-500">
                €{l.unitPrice.toFixed(2)} each
              </p>
              <div className="mt-3 flex items-center gap-3">
                <label className="text-xs text-zinc-500">
                  Qty
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={l.qty}
                    onChange={(e) =>
                      setQty(l.productId, Number(e.target.value) || 1)
                    }
                    className="ml-2 w-16 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm text-zinc-900"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeLine(l.productId)}
                  className="text-xs text-zinc-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-zinc-900">
                €{(l.unitPrice * l.qty).toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-zinc-600">
            <span>Subtotal</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-zinc-600">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `€${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-zinc-600">
            <span>Est. tax</span>
            <span>€{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-zinc-100 pt-2 text-base font-semibold text-zinc-900">
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Free shipping on orders over €75 (demo rule).
        </p>
        <Link
          href={`${ECOMMERCE_DEMO_BASE}/checkout`}
          className="mt-6 block w-full rounded-full bg-zinc-900 py-3 text-center text-sm font-semibold text-white hover:bg-zinc-800"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
