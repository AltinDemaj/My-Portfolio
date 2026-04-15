import type { Metadata } from "next";
import { EcommerceDemoShell } from "@/components/demo/ecommerce/ecommerce-demo-shell";

export const metadata: Metadata = {
  title: "Atlas Market — Demo store",
  description:
    "Front-end e-commerce demo: catalog, cart, checkout. No real payments.",
  robots: { index: false, follow: false },
};

export default function EcommerceDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <EcommerceDemoShell>{children}</EcommerceDemoShell>;
}
