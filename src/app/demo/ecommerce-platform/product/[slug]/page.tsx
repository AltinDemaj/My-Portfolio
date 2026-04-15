"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight, Star } from "lucide-react";
import { getProductBySlug, getProductGallery } from "@/lib/ecommerce-demo/catalog";
import { ECOMMERCE_DEMO_BASE } from "@/lib/ecommerce-demo/constants";
import { useEcommerceDemoCart } from "@/components/demo/ecommerce/cart-provider";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const { stock, addToCart, lines, setQty } = useEcommerceDemoCart();
  const [qty, setQtyPick] = useState(1);
  const gallery = product ? getProductGallery(product) : [];
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSrc = gallery[activeIdx] ?? product?.imageSrc;

  if (!product) {
    return (
      <div className="text-center">
        <p className="text-zinc-600">Product not found.</p>
        <Link
          href={ECOMMERCE_DEMO_BASE}
          className="mt-4 inline-block text-sm font-medium text-zinc-900 underline underline-offset-4"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const avail = stock[product.id] ?? 0;
  const line = lines.find((l) => l.productId === product.id);
  const maxQ = Math.min(10, avail);
  const qtyOptions = maxQ < 1 ? [] : Array.from({ length: maxQ }, (_, i) => i + 1);
  const rating = product.rating ?? 4.5;
  const fullStars = Math.round(rating);

  return (
    <div>
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-zinc-500">
        <Link href={ECOMMERCE_DEMO_BASE} className="hover:text-zinc-800">
          Shop
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <span className="text-zinc-400">{product.category}</span>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <span className="font-medium text-zinc-700">{product.name}</span>
      </nav>

      <Link
        href={ECOMMERCE_DEMO_BASE}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to shop
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100">
            {activeSrc ? (
              <Image
                src={activeSrc}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : null}
          </div>
          {gallery.length > 1 ? (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-[border-color] ${
                    i === activeIdx
                      ? "border-zinc-900 ring-2 ring-zinc-900/10"
                      : "border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
            {product.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="flex text-amber-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i <= fullStars ? "fill-current" : "fill-zinc-200 text-zinc-200"}`}
                  aria-hidden
                />
              ))}
            </div>
            {product.reviewCount != null ? (
              <span className="text-sm text-zinc-500">
                {rating.toFixed(1)} · {product.reviewCount} reviews
              </span>
            ) : null}
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-zinc-900">
              €{product.price.toFixed(2)}
            </span>
            {product.compareAt != null ? (
              <span className="text-lg text-zinc-400 line-through">
                €{product.compareAt.toFixed(2)}
              </span>
            ) : null}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-zinc-600">
            {product.description}
          </p>
          <p className="mt-4 text-sm text-zinc-600">
            {avail > 0 ? (
              <span className="font-medium text-emerald-700">
                {avail} in stock — ships in 2–4 days (demo)
              </span>
            ) : (
              <span className="font-medium text-red-600">Out of stock</span>
            )}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-zinc-600">
              Qty
              <select
                value={qtyOptions.includes(qty) ? qty : qtyOptions[0] ?? 1}
                onChange={(e) => setQtyPick(Number(e.target.value))}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm"
                disabled={qtyOptions.length === 0}
              >
                {qtyOptions.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              disabled={avail < 1}
              onClick={() => addToCart(product.id, qty)}
              className="rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-40"
            >
              Add to cart
            </button>
          </div>

          {line ? (
            <p className="mt-4 text-sm text-zinc-600">
              {line.qty} in cart —{" "}
              <button
                type="button"
                className="font-medium text-zinc-900 underline underline-offset-4"
                onClick={() => setQty(product.id, 0)}
              >
                Remove
              </button>
            </p>
          ) : null}

          <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-xs text-zinc-600">
            <p className="font-medium text-zinc-800">Demo product page</p>
            <p className="mt-1">
              In production, this area would include reviews, size guides, and
              delivery estimates — here it is a static front-end demo only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
