import type { PizzaSize } from "./menu-data";

export type CartLine = {
  key: string;
  itemId: string;
  name: string;
  size: PizzaSize;
  unitPrice: number;
  qty: number;
};

export type SavedAddress = {
  id: string;
  label: string;
  line1: string;
  city: string;
  notes?: string;
};

export type OrderRecord = {
  id: string;
  createdAt: string;
  lines: { name: string; size: PizzaSize; qty: number; unitPrice: number }[];
  subtotal: number;
  deliveryFee: number;
  addressLabel: string;
  addressLine1: string;
  city: string;
  status: "new" | "preparing" | "out" | "done";
};
