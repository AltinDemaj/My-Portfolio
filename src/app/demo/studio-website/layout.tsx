import type { Metadata } from "next";
import { StudioDemoShell } from "@/components/demo/studio/studio-demo-shell";

export const metadata: Metadata = {
  title: "North Studio — Demo",
  description:
    "Creative studio marketing demo: hero, services, work, and contact. No backend.",
  robots: { index: false, follow: false },
};

export default function StudioWebsiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <StudioDemoShell>{children}</StudioDemoShell>;
}
