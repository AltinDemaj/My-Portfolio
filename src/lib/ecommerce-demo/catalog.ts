import type { Product } from "./types";

export const CATALOG: Product[] = [
  {
    id: "p1",
    slug: "wireless-headphones",
    name: "Wireless headphones",
    category: "Electronics",
    price: 149.99,
    compareAt: 199.99,
    imageSrc: "/images/ecommerce-demo/products/p1.jpg",
    images: [
      "/images/ecommerce-demo/products/p1.jpg",
      "/images/ecommerce-demo/products/p1-b.jpg",
    ],
    description:
      "Noise-cancelling over-ear headphones with 30h battery and USB-C charging.",
    initialStock: 24,
    rating: 4.8,
    reviewCount: 214,
    badge: "sale",
  },
  {
    id: "p2",
    slug: "minimal-watch",
    name: "Minimal watch",
    category: "Accessories",
    price: 189.0,
    imageSrc: "/images/ecommerce-demo/products/p2.jpg",
    images: [
      "/images/ecommerce-demo/products/p2.jpg",
      "/images/ecommerce-demo/products/p2-b.jpg",
    ],
    description:
      "Stainless case, sapphire glass, and interchangeable straps. Water resistant to 50m.",
    initialStock: 12,
    rating: 4.9,
    reviewCount: 89,
    badge: "new",
  },
  {
    id: "p3",
    slug: "ceramic-mug-set",
    name: "Ceramic Green Bottle",
    category: "Home",
    price: 42.5,
    compareAt: 54.0,
    imageSrc: "/images/ecommerce-demo/products/p3.jpg",
    description: "Set of 4 stackable mugs — microwave and dishwasher safe.",
    initialStock: 40,
    rating: 4.6,
    reviewCount: 156,
  },
  {
    id: "p4",
    slug: "Bagpack",
    name: "Bagpack",
    category: "Apparel",
    price: 36.0,
    imageSrc: "/images/ecommerce-demo/products/p4.jpg",
    description: "Heavy cotton tote with inner pocket. Fair-trade certified.",
    initialStock: 60,
    rating: 4.7,
    reviewCount: 72,
  },
  {
    id: "p5",
    slug: "laptop-stand",
    name: "Wireless Mouse",
    category: "Electronics",
    price: 59.99,
    imageSrc: "/images/ecommerce-demo/products/p5.jpg",
    description:
      "Ventilated lift for 13–16\" laptops — reduces neck strain and keeps cables tidy.",
    initialStock: 18,
    rating: 4.5,
    reviewCount: 203,
  },
  {
    id: "p6",
    slug: "linen-bedding",
    name: "Linen bedding",
    category: "Home",
    price: 78.0,
    imageSrc: "/images/ecommerce-demo/products/p6.jpg",
    description:
      "Breathable linen blend bedding — soft drape, Oeko-Tex certified.",
    initialStock: 15,
    rating: 4.8,
    reviewCount: 41,
  },
  {
    id: "p7",
    slug: "performance-sneakers",
    name: "Running shoes",
    category: "Footwear",
    price: 129.0,
    compareAt: 159.0,
    imageSrc: "/images/ecommerce-demo/products/p7.jpg",
    description:
      "Knit upper, cushioned midsole, and grippy rubber outsole for road and gym.",
    initialStock: 22,
    rating: 4.7,
    reviewCount: 512,
    badge: "sale",
  },
  {
    id: "p8",
    slug: "arc-table-lamp",
    name: "Arc table lamp",
    category: "Lighting",
    price: 94.0,
    imageSrc: "/images/ecommerce-demo/products/p8.jpg",
    description:
      "Warm dimmable LED, powder-coated base, and a soft fabric shade.",
    initialStock: 9,
    rating: 4.4,
    reviewCount: 38,
    badge: "new",
  },
];

export const CATEGORIES = [
  "All",
  ...Array.from(new Set(CATALOG.map((p) => p.category))),
] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return CATALOG.find((p) => p.slug === slug);
}

/** Images shown on the product page (primary + gallery). */
export function getProductGallery(product: Product): string[] {
  if (product.images?.length) return product.images;
  return [product.imageSrc];
}
