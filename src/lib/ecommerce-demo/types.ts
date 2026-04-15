export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  imageSrc: string;
  /** Extra gallery images (primary is always `imageSrc`). */
  images?: string[];
  /**
   * Tailwind classes for `object-position` when using `object-cover` (e.g. tight
   * card crops vs. square detail). Use when the default center crop hides the subject.
   */
  imageObjectPosition?: string;
  description: string;
  initialStock: number;
  rating?: number;
  reviewCount?: number;
  badge?: "new" | "sale";
};

export type CartLine = {
  key: string;
  productId: string;
  name: string;
  unitPrice: number;
  qty: number;
  imageSrc: string;
};

export type OrderRecord = {
  id: string;
  createdAt: string;
  lines: {
    name: string;
    qty: number;
    unitPrice: number;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  email: string;
  shipSummary: string;
  status: "paid" | "processing" | "shipped";
};
