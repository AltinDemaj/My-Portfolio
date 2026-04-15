"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { PizzaSize } from "@/lib/pizza-demo/menu-data";
import { MENU_ITEMS } from "@/lib/pizza-demo/menu-data";
import type { CartLine, OrderRecord, SavedAddress } from "@/lib/pizza-demo/types";

const CART_KEY = "ph_demo_cart_v1";
const ADDR_KEY = "ph_demo_addresses_v1";
const ORDERS_KEY = "ph_demo_orders_v1";

type CartContextValue = {
  lines: CartLine[];
  addresses: SavedAddress[];
  addToCart: (itemId: string, size: PizzaSize) => void;
  setQty: (lineKey: string, qty: number) => void;
  removeLine: (lineKey: string) => void;
  cartCount: number;
  subtotal: number;
  saveAddress: (a: Omit<SavedAddress, "id">) => void;
  removeAddress: (id: string) => void;
  placeOrder: (input: {
    addressId?: string;
    line1: string;
    city: string;
    label: string;
    saveAddress: boolean;
  }) => OrderRecord;
  orders: OrderRecord[];
  updateOrderStatus: (id: string, status: OrderRecord["status"]) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(loadJson(CART_KEY, []));
    setAddresses(loadJson(ADDR_KEY, []));
    setOrders(loadJson(ORDERS_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(ADDR_KEY, JSON.stringify(addresses));
  }, [addresses, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, ready]);

  const addToCart = useCallback((itemId: string, size: PizzaSize) => {
    const item = MENU_ITEMS.find((m) => m.id === itemId);
    if (!item) return;
    const unitPrice = item.prices[size];
    const key = `${itemId}-${size}`;
    setLines((prev) => {
      const i = prev.findIndex((l) => l.key === key);
      if (i === -1) {
        return [
          ...prev,
          {
            key,
            itemId,
            name: item.name,
            size,
            unitPrice,
            qty: 1,
          },
        ];
      }
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + 1 };
      return next;
    });
  }, []);

  const setQty = useCallback((lineKey: string, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => l.key !== lineKey);
      return prev.map((l) =>
        l.key === lineKey ? { ...l, qty: Math.min(99, qty) } : l,
      );
    });
  }, []);

  const removeLine = useCallback((lineKey: string) => {
    setLines((prev) => prev.filter((l) => l.key !== lineKey));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const saveAddress = useCallback((a: Omit<SavedAddress, "id">) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `addr-${Date.now()}`;
    setAddresses((prev) => [...prev, { ...a, id }]);
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const placeOrder = useCallback(
    (input: {
      addressId?: string;
      line1: string;
      city: string;
      label: string;
      saveAddress: boolean;
    }) => {
      const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
      const deliveryFee = subtotal > 0 ? 2.5 : 0;
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `ord-${Date.now()}`;
      const order: OrderRecord = {
        id,
        createdAt: new Date().toISOString(),
        lines: lines.map((l) => ({
          name: l.name,
          size: l.size,
          qty: l.qty,
          unitPrice: l.unitPrice,
        })),
        subtotal,
        deliveryFee,
        addressLabel: input.label,
        addressLine1: input.line1,
        city: input.city,
        status: "new",
      };
      setOrders((o) => [order, ...o]);
      if (input.saveAddress && input.line1.trim()) {
        saveAddress({
          label: input.label || "Home",
          line1: input.line1,
          city: input.city,
        });
      }
      setLines([]);
      return order;
    },
    [lines, saveAddress],
  );

  const updateOrderStatus = useCallback(
    (id: string, status: OrderRecord["status"]) => {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o)),
      );
    },
    [],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      addresses,
      addToCart,
      setQty,
      removeLine,
      cartCount: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.unitPrice * l.qty, 0),
      saveAddress,
      removeAddress,
      placeOrder,
      orders,
      updateOrderStatus,
      clearCart,
    }),
    [
      lines,
      addresses,
      addToCart,
      setQty,
      removeLine,
      saveAddress,
      removeAddress,
      placeOrder,
      orders,
      updateOrderStatus,
      clearCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function usePizzaDemoCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("usePizzaDemoCart must be used within CartProvider");
  return ctx;
}
