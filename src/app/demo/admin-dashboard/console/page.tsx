"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  alertRows,
  categoryBars,
  kpiForRange,
  seriesForRange,
  tableRows,
  type AlertRow,
  type RangeKey,
  type TableRow,
} from "@/lib/dashboard-demo/mock-data";

const RANGES: { key: RangeKey; label: string }[] = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
];

function KpiCard({
  label,
  value,
  sub,
  trend,
  invertTrend,
}: {
  label: string;
  value: string;
  sub?: string;
  trend?: "up" | "down";
  invertTrend?: boolean;
}) {
  const goodUp = !invertTrend;
  const isPositive =
    trend === "up" ? goodUp : trend === "down" ? !goodUp : false;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 shadow-lg">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-2xl font-semibold tracking-tight text-white">{value}</p>
        {trend ? (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-medium ${
              isPositive ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {trend === "up" ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            vs prior
          </span>
        ) : null}
      </div>
      {sub ? <p className="mt-1 text-xs text-zinc-500">{sub}</p> : null}
    </div>
  );
}

export default function AdminDashboardConsolePage() {
  const [chartsReady, setChartsReady] = useState(false);
  useEffect(() => {
    setChartsReady(true);
  }, []);

  const [range, setRange] = useState<RangeKey>("30d");
  const [sortKey, setSortKey] = useState<keyof TableRow>("product");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const kpis = useMemo(() => kpiForRange(range), [range]);
  const series = useMemo(() => seriesForRange(range), [range]);
  const categories = useMemo(() => categoryBars(range), [range]);
  const alerts = useMemo(() => alertRows(range), [range]);
  const rows = useMemo(() => tableRows(range), [range]);

  const sortedRows = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      const as = String(av);
      const bs = String(bv);
      return sortDir === "asc" ? as.localeCompare(bs) : bs.localeCompare(as);
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  const toggleSort = (key: keyof TableRow) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Pharmacy inventory overview
          </h1>
          <p className="mt-1 max-w-xl text-sm text-zinc-400">
            Mock stock visibility for a pharmacy team: what is available, what is running low, what
            is out of stock, and what needs action.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {RANGES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setRange(key)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                range === key
                  ? "border-teal-500/60 bg-teal-500/15 text-teal-200"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Available now"
          value={`${kpis.availableNow} SKUs`}
          trend="up"
          sub="Ready to dispense"
        />
        <KpiCard
          label="Low stock"
          value={String(kpis.lowStock)}
          trend="down"
          invertTrend
          sub="Below reorder level"
        />
        <KpiCard
          label="Out of stock"
          value={String(kpis.outOfStock)}
          trend="up"
          invertTrend
          sub="Unavailable right now"
        />
        <KpiCard
          label="Expiring soon"
          value={String(kpis.expiringSoon)}
          trend="up"
          sub="Review in 30 days"
        />
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-5">
        <div className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">Dispensed vs restocked</h2>
          <p className="text-xs text-zinc-500">Unit movement over time — mock data only</p>
          <div className="mt-4 h-[280px] min-h-[280px] w-full min-w-0">
            {chartsReady ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <LineChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="label" tick={{ fill: "#71717a", fontSize: 11 }} />
                  <YAxis
                    tick={{ fill: "#71717a", fontSize: 11 }}
                    tickFormatter={(v) => `${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "1px solid #3f3f46",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "#a1a1aa" }}
                    formatter={(value) =>
                      value != null && typeof value === "number"
                        ? [`${value} units`, "Movement"]
                        : ["—", "Movement"]
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="dispensed"
                    stroke="#2dd4bf"
                    strokeWidth={2}
                    dot={false}
                    name="Dispensed"
                  />
                  <Line
                    type="monotone"
                    dataKey="restocked"
                    stroke="#a78bfa"
                    strokeWidth={2}
                    dot={false}
                    name="Restocked"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-zinc-600">
                Loading chart…
              </div>
            )}
          </div>
        </div>
        <div className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 lg:col-span-2">
          <h2 className="text-sm font-semibold text-white">Low-stock by category</h2>
          <p className="text-xs text-zinc-500">Which sections need replenishment first</p>
          <div className="mt-4 h-[160px] min-h-[160px] w-full min-w-0">
            {chartsReady ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={categories} layout="vertical" margin={{ left: 0, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#71717a", fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={84}
                    tick={{ fill: "#a1a1aa", fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "1px solid #3f3f46",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} name="Low stock" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-zinc-600">
                Loading chart…
              </div>
            )}
          </div>
          <div className="mt-4 space-y-3">
            {alerts.map((item) => (
              <AttentionRow key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
        <h2 className="text-sm font-semibold text-white">Inventory snapshot</h2>
        <p className="text-xs text-zinc-500">
          Click column headers to sort — production would filter by store, supplier, and expiry.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
                <th className="pb-3 pr-4">
                  <button
                    type="button"
                    className="hover:text-zinc-300"
                    onClick={() => toggleSort("sku")}
                  >
                    SKU
                  </button>
                </th>
                <th className="pb-3 pr-4">
                  <button
                    type="button"
                    className="hover:text-zinc-300"
                    onClick={() => toggleSort("product")}
                  >
                    Product
                  </button>
                </th>
                <th className="pb-3 pr-4">
                  <button
                    type="button"
                    className="hover:text-zinc-300"
                    onClick={() => toggleSort("category")}
                  >
                    Category
                  </button>
                </th>
                <th className="pb-3 pr-4">
                  <button
                    type="button"
                    className="hover:text-zinc-300"
                    onClick={() => toggleSort("onHand")}
                  >
                    On hand
                  </button>
                </th>
                <th className="pb-3 pr-4">
                  <button
                    type="button"
                    className="hover:text-zinc-300"
                    onClick={() => toggleSort("reorderAt")}
                  >
                    Reorder at
                  </button>
                </th>
                <th className="pb-3 pr-4">
                  <button
                    type="button"
                    className="hover:text-zinc-300"
                    onClick={() => toggleSort("shelf")}
                  >
                    Shelf
                  </button>
                </th>
                <th className="pb-3">
                  <button
                    type="button"
                    className="hover:text-zinc-300"
                    onClick={() => toggleSort("status")}
                  >
                    Status
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-zinc-800/80 text-zinc-300 last:border-0"
                >
                  <td className="py-3 pr-4 font-mono text-xs text-zinc-400">{row.sku}</td>
                  <td className="py-3 pr-4 font-medium text-white">{row.product}</td>
                  <td className="py-3 pr-4 text-zinc-400">{row.category}</td>
                  <td className="py-3 pr-4 tabular-nums">{row.onHand}</td>
                  <td className="py-3 pr-4 tabular-nums">{row.reorderAt}</td>
                  <td className="py-3 pr-4 text-zinc-400">{row.shelf}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        row.status === "in-stock"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : row.status === "low"
                            ? "bg-amber-500/15 text-amber-200"
                            : "bg-rose-500/15 text-rose-300"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AttentionRow({ item }: { item: AlertRow }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">{item.product}</p>
          <p className="mt-1 text-xs text-zinc-500">
            {item.shelf} · on hand {item.onHand}
          </p>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
            item.status === "out"
              ? "bg-rose-500/15 text-rose-300"
              : "bg-amber-500/15 text-amber-200"
          }`}
        >
          {item.status === "out" ? "out now" : "reorder soon"}
        </span>
      </div>
    </div>
  );
}
