"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShieldCheck, Truck, RotateCcw, Star } from "lucide-react";
import { CATALOG, CATEGORIES } from "@/lib/ecommerce-demo/catalog";
import type { Product } from "@/lib/ecommerce-demo/types";
import { ECOMMERCE_DEMO_BASE } from "@/lib/ecommerce-demo/constants";
import { useEcommerceDemoCart } from "@/components/demo/ecommerce/cart-provider";

function ProductRating({ product }: { product: Product }) {
  const r = product.rating ?? 4.5;
  const full = Math.round(r);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex text-amber-500">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i <= full ? "fill-current" : "fill-zinc-200 text-zinc-200"}`}
            aria-hidden
          />
        ))}
      </div>
      {product.reviewCount != null ? (
        <span className="text-xs text-zinc-500">({product.reviewCount})</span>
      ) : null}
    </div>
  );
}

export default function EcommerceDemoShopPage() {
  const { addToCart, stock } = useEcommerceDemoCart();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const filtered = useMemo(() => {
    return CATALOG.filter((p) => {
      const catOk = cat === "All" || p.category === cat;
      const qOk =
        !q.trim() ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase());
      return catOk && qOk;
    });
  }, [q, cat]);

  return (
    <div>
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="relative aspect-[21/9] min-h-[220px] sm:aspect-[2.35/1]">
          <Image
            src="/images/ecommerce-demo/hero.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1152px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20 sm:from-white sm:via-white/75 sm:to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-4 py-6 sm:px-12 sm:py-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              New collection
            </p>
            <h1 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-zinc-900 text-balance sm:text-4xl sm:leading-[1.08] md:text-5xl md:leading-[1.05]">
              Essentials for calm, everyday living
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-600 text-pretty">
              Curated home, tech, and accessories. Free shipping over €75 · Easy
              returns · Checkout is simulated in this demo (no Stripe).
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800"
              >
                Shop the collection
              </a>
              <Link
                href={`${ECOMMERCE_DEMO_BASE}/orders`}
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white/80 px-6 py-3 text-sm font-medium text-zinc-800 backdrop-blur-sm transition hover:border-zinc-400 hover:bg-white"
              >
                Track an order
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-4 sm:grid-cols-3 sm:divide-x sm:divide-zinc-100 sm:px-6">
        <div className="flex items-center gap-3 py-2 sm:py-0 sm:pr-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
            <Truck className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-medium text-zinc-900">Free shipping</p>
            <p className="text-xs text-zinc-500">On orders over €75</p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t border-zinc-100 py-2 sm:border-t-0 sm:px-4 sm:py-0">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
            <RotateCcw className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-medium text-zinc-900">30-day returns</p>
            <p className="text-xs text-zinc-500">Hassle-free policy</p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t border-zinc-100 py-2 sm:border-t-0 sm:pl-4 sm:py-0">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
            <ShieldCheck className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-medium text-zinc-900">Secure checkout</p>
            <p className="text-xs text-zinc-500">Demo — no real payment</p>
          </div>
        </div>
      </div>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <Link
          href="#catalog"
          className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
        >
          <div className="relative aspect-[16/10] sm:aspect-[2/1]">
            <Image
              src="/images/ecommerce-demo/editorial/story-1.jpg"
              alt=""
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                Wardrobe & carry
              </p>
              <p className="mt-1 text-lg font-semibold">Light layers & totes</p>
            </div>
          </div>
        </Link>
        <Link
          href="#catalog"
          className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
        >
          <div className="relative aspect-[16/10] sm:aspect-[2/1]">
            <Image
              src="/images/ecommerce-demo/editorial/story-2.jpg"
              alt=""
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                Home & light
              </p>
              <p className="mt-1 text-lg font-semibold">Textures & warm light</p>
            </div>
          </div>
        </Link>
      </section>

      <div id="catalog" className="mt-14 scroll-mt-24">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Shop
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">
              Featured products
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Search and filter — stock updates when you complete checkout.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="search"
              placeholder="Search products…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                  cat === c
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const avail = stock[p.id] ?? 0;
          return (
            <li
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <Link
                href={`${ECOMMERCE_DEMO_BASE}/product/${p.slug}`}
                className="block"
              >
                <div className="relative aspect-[4/3] bg-zinc-100">
                  <Image
                    src={p.imageSrc}
                    alt={p.name}
                    fill
                    className={`object-cover transition duration-300 group-hover:scale-[1.02] ${p.imageObjectPosition ?? ""}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {p.badge ? (
                    <span
                      className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        p.badge === "sale"
                          ? "bg-rose-600 text-white"
                          : "bg-zinc-900 text-white"
                      }`}
                    >
                      {p.badge === "sale" ? "Sale" : "New"}
                    </span>
                  ) : null}
                </div>
              </Link>
              <div className="space-y-2 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  {p.category}
                </p>
                <ProductRating product={p} />
                <Link
                  href={`${ECOMMERCE_DEMO_BASE}/product/${p.slug}`}
                  className="block text-lg font-semibold text-zinc-900 group-hover:text-zinc-700"
                >
                  {p.name}
                </Link>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-zinc-900">
                    €{p.price.toFixed(2)}
                  </span>
                  {p.compareAt != null ? (
                    <span className="text-sm text-zinc-400 line-through">
                      €{p.compareAt.toFixed(2)}
                    </span>
                  ) : null}
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500">
                  {p.description}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-zinc-500">
                    {avail > 0 ? `${avail} in stock` : "Out of stock"}
                  </span>
                  <button
                    type="button"
                    disabled={avail < 1}
                    onClick={() => addToCart(p.id, 1)}
                    className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-zinc-500">
          No products match your filters.
        </p>
      ) : null}
    </div>
  );
}
