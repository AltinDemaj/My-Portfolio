import Image from "next/image";
import Link from "next/link";
import { AdminDashboardMarketingHeader } from "@/components/demo/dashboard/admin-dashboard-marketing-header";
import { DASHBOARD_DEMO_CONSOLE } from "@/lib/dashboard-demo/constants";
import { PHARMACY_EXAMPLE_IMAGES } from "@/lib/dashboard-demo/pharmacy-example-gallery";

export default function AdminDashboardMicrositePage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
      <AdminDashboardMarketingHeader />

      <main>
        <section className="border-b border-zinc-200 bg-gradient-to-b from-white to-zinc-50 px-4 py-14 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">
                Portfolio demo
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                A reusable admin shell for operations teams. This example is shaped around a{" "}
                <strong className="font-medium text-zinc-800">pharmacy inventory workflow</strong>:
                staff can quickly see what is in stock, what is low, what is out, and what needs a
                reorder.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  href={DASHBOARD_DEMO_CONSOLE}
                  className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500"
                >
                  Open live stock dashboard
                </Link>
                <a
                  href="#pharmacy-example"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-800 transition hover:border-zinc-400"
                >
                  View pharmacy example
                </a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <FeatureCard title="Low stock alerts" copy="See products under reorder level at a glance." />
                <FeatureCard title="Out of stock list" copy="Spot unavailable items before the counter does." />
                <FeatureCard title="Shelf visibility" copy="Keep SKU, shelf, and reorder targets in one place." />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-xl">
              <div className="relative aspect-[5/4] w-full">
                <Image
                  src="/images/dashboard-demo/pharmacy/cover.jpg"
                  alt="Modern pharmacy shelves and product displays"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 44vw"
                />
              </div>
              <div className="border-t border-zinc-200 bg-white p-4">
                <p className="text-sm font-semibold text-zinc-900">Pharmacy stock visibility</p>
                <p className="mt-1 text-sm text-zinc-600">
                  Example vertical only. The product title stays generic as <strong>Admin Dashboard</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="pharmacy-example"
          className="scroll-mt-16 border-b border-zinc-200 bg-white px-4 py-12 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-xl font-semibold text-zinc-900">Example vertical: community pharmacy</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-600">
              This page gives the dashboard a believable pharmacy context: merchandising, counter
              service, packaging, and back-office handling. The live console focuses on stock
              visibility so staff can check availability before assisting customers.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PHARMACY_EXAMPLE_IMAGES.map((item, i) => (
                <li
                  key={item.src}
                  className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority={i === 0}
                    />
                  </div>
                  <p className="border-t border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-600">
                    {item.caption}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">Try the stock dashboard</h2>
            <p className="mt-2 text-sm text-zinc-600">
              The live demo shows available items, low-stock counts, out-of-stock SKUs, category
              pressure, and a sortable inventory table.
            </p>
            <Link
              href={DASHBOARD_DEMO_CONSOLE}
              className="mt-6 inline-flex rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Go to stock dashboard
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-zinc-50 py-6 text-center text-xs text-zinc-500">
        Demo microsite — local reference photos for a pharmacy example vertical. No affiliation with
        pictured locations.
      </footer>
    </div>
  );
}

function FeatureCard({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-left shadow-sm">
      <p className="text-sm font-semibold text-zinc-900">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-zinc-600">{copy}</p>
    </div>
  );
}
