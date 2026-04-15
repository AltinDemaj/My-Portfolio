"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CATALOG } from "@/lib/ecommerce-demo/catalog";
import type { CartLine, OrderRecord } from "@/lib/ecommerce-demo/types";

const CART_KEY = "ec_demo_cart_v1";
const STOCK_KEY = "ec_demo_stock_v1";
const ORDERS_KEY = "ec_demo_orders_v1";

type Ctx = {
  lines: CartLine[];
  stock: Record<string, number>;
  orders: OrderRecord[];
  addToCart: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  removeLine: (productId: string) => void;
  subtotal: number;
  cartCount: number;
  placeOrder: (input: {
    email: string;
    fullName: string;
    address: string;
    city: string;
    postal: string;
  }) => OrderRecord | null;
};

const CartContext = createContext<Ctx | null>(null);

function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function initialStock(): Record<string, number> {
  return Object.fromEntries(CATALOG.map((p) => [p.id, p.initialStock]));
}

export function EcommerceDemoCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [stock, setStock] = useState<Record<string, number>>({});
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(loadJson(CART_KEY, []));
    const s = loadJson<Record<string, number> | null>(STOCK_KEY, null);
    setStock(
      s && Object.keys(s).length
        ? { ...initialStock(), ...s }
        : initialStock(),
    );
    setOrders(loadJson(ORDERS_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STOCK_KEY, JSON.stringify(stock));
  }, [stock, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, ready]);

  const availableStock = useCallback(
    (productId: string) => stock[productId] ?? 0,
    [stock],
  );

  const addToCart = useCallback(
    (productId: string, qty = 1) => {
      const product = CATALOG.find((p) => p.id === productId);
      if (!product) return;
      const avail = availableStock(productId);
      setLines((prev) => {
        const existing = prev.find((l) => l.productId === productId);
        const nextQty = (existing?.qty ?? 0) + qty;
        if (nextQty > avail) return prev;
        if (existing) {
          return prev.map((l) =>
            l.productId === productId
              ? { ...l, qty: Math.min(nextQty, avail) }
              : l,
          );
        }
        return [
          ...prev,
          {
            key: productId,
            productId,
            name: product.name,
            unitPrice: product.price,
            qty: Math.min(qty, avail),
            imageSrc: product.imageSrc,
          },
        ];
      });
    },
    [availableStock],
  );

  const setQty = useCallback(
    (productId: string, qty: number) => {
      const avail = availableStock(productId);
      if (qty <= 0) {
        setLines((prev) => prev.filter((l) => l.productId !== productId));
        return;
      }
      setLines((prev) =>
        prev.map((l) =>
          l.productId === productId
            ? { ...l, qty: Math.min(qty, avail) }
            : l,
        ),
      );
    },
    [availableStock],
  );

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const placeOrder = useCallback(
    (input: {
      email: string;
      fullName: string;
      address: string;
      city: string;
      postal: string;
    }) => {
      if (lines.length === 0) return null;
      for (const l of lines) {
        if (l.qty > (stock[l.productId] ?? 0)) return null;
      }

      const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
      const shipping = subtotal > 75 ? 0 : 6.99;
      const tax = Math.round(subtotal * 0.08 * 100) / 100;
      const total = Math.round((subtotal + shipping + tax) * 100) / 100;

      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `ord-${Date.now()}`;

      const shipSummary = `${input.fullName} — ${input.address}, ${input.postal} ${input.city}`;

      const order: OrderRecord = {
        id,
        createdAt: new Date().toISOString(),
        lines: lines.map((l) => ({
          name: l.name,
          qty: l.qty,
          unitPrice: l.unitPrice,
        })),
        subtotal,
        shipping,
        tax,
        total,
        email: input.email,
        shipSummary,
        status: "processing",
      };

      setStock((prev) => {
        const next = { ...prev };
        for (const l of lines) {
          next[l.productId] = Math.max(
            0,
            (next[l.productId] ?? 0) - l.qty,
          );
        }
        return next;
      });
      setOrders((o) => [order, ...o]);
      setLines([]);
      return order;
    },
    [lines, stock],
  );

  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.unitPrice * l.qty, 0),
    [lines],
  );

  const cartCount = useMemo(
    () => lines.reduce((n, l) => n + l.qty, 0),
    [lines],
  );

  const value = useMemo<Ctx>(
    () => ({
      lines,
      stock,
      orders,
      addToCart,
      setQty,
      removeLine,
      subtotal,
      cartCount,
      placeOrder,
    }),
    [
      lines,
      stock,
      orders,
      addToCart,
      setQty,
      removeLine,
      subtotal,
      cartCount,
      placeOrder,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useEcommerceDemoCart() {
  const ctx = useContext(CartContext);
  if (!ctx)
    throw new Error("useEcommerceDemoCart must be used within provider");
  return ctx;
}
