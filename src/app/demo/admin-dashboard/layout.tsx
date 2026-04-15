import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — example microsite",
  description:
    "Generic admin dashboard demo: example pharmacy vertical with imagery, plus a live Recharts console.",
  robots: { index: false, follow: false },
};

export default function AdminDashboardSectionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
