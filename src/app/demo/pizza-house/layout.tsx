import type { Metadata } from "next";
import { PizzaDemoShell } from "@/components/demo/pizza-house/pizza-demo-shell";

export const metadata: Metadata = {
  title: "Pizza House — Demo",
  description:
    "Front-end demo: menu, cart, checkout, and admin. No backend — data stays in your browser.",
  robots: { index: false, follow: false },
};

export default function PizzaDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PizzaDemoShell>{children}</PizzaDemoShell>;
}
