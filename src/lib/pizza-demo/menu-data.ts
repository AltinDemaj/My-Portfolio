export type PizzaSize = "S" | "M" | "L";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  prices: Record<PizzaSize, number>;
  imageSrc: string;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "margherita",
    name: "Margherita",
    description: "Tomato sauce, mozzarella, fresh basil, olive oil.",
    prices: { S: 7.5, M: 11.0, L: 14.5 },
    imageSrc: "/images/pizza-demo/pizzas/margherita.jpg",
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    description: "Classic pepperoni, mozzarella blend, tomato sauce.",
    prices: { S: 8.5, M: 12.5, L: 16.0 },
    imageSrc: "/images/pizza-demo/pizzas/pepperoni.jpg",
  },
  {
    id: "quattro",
    name: "Quattro Formaggi",
    description: "Mozzarella, gorgonzola, fontina, parmesan.",
    prices: { S: 9.0, M: 13.5, L: 17.5 },
    imageSrc: "/images/pizza-demo/pizzas/quattro.jpg",
  },
  {
    id: "veg",
    name: "Garden Veggie",
    description: "Peppers, mushrooms, olives, onions, tomato sauce.",
    prices: { S: 8.0, M: 12.0, L: 15.5 },
    imageSrc: "/images/pizza-demo/pizzas/veg.jpg",
  },
];

export const SIZE_LABELS: Record<PizzaSize, string> = {
  S: "Small (9″)",
  M: "Medium (12″)",
  L: "Large (15″)",
};
