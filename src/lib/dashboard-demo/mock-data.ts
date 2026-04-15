export type RangeKey = "7d" | "30d" | "90d";

const mult: Record<RangeKey, number> = {
  "7d": 1,
  "30d": 1.12,
  "90d": 1.28,
};

export function kpiForRange(range: RangeKey) {
  const m = mult[range];
  return {
    availableNow: Math.round(248 * m),
    lowStock: Math.round(8 + (range === "90d" ? 4 : range === "7d" ? -1 : 0)),
    outOfStock: Math.round(3 + (range === "90d" ? 1 : 0)),
    expiringSoon: Math.round(6 + (range === "90d" ? 2 : range === "7d" ? -1 : 0)),
  };
}

export function seriesForRange(range: RangeKey) {
  const points = range === "7d" ? 7 : range === "30d" ? 10 : 12;
  const m = mult[range];
  const dispensedBase = 92 * m;
  const restockedBase = 64 * m;
  return Array.from({ length: points }, (_, i) => {
    const noise = Math.sin(i * 0.72) * 12 + Math.cos(i * 0.38) * 6;
    return {
      label: range === "7d" ? `D${i + 1}` : `W${i + 1}`,
      dispensed: Math.round(dispensedBase + noise + i * 2.2),
      restocked: Math.round(restockedBase + noise * 0.65 + i * 1.6),
    };
  });
}

export function categoryBars(range: RangeKey) {
  const bump = range === "90d" ? 1 : 0;
  return [
    { name: "Rx", value: 6 + bump },
    { name: "OTC", value: 4 + bump },
    { name: "Supplements", value: 3 + bump },
    { name: "Cold & flu", value: 5 + bump },
  ];
}

export type AlertRow = {
  id: string;
  product: string;
  status: "low" | "out";
  shelf: string;
  onHand: number;
};

export type TableRow = {
  id: string;
  sku: string;
  product: string;
  category: string;
  onHand: number;
  reorderAt: number;
  shelf: string;
  status: "in-stock" | "low" | "out";
};

export function alertRows(range: RangeKey): AlertRow[] {
  const m = range === "90d" ? 0 : range === "7d" ? 1 : 0.5;
  return [
    {
      id: "a1",
      product: "Salbutamol inhaler",
      status: "out",
      shelf: "Resp. A2",
      onHand: 0,
    },
    {
      id: "a2",
      product: "Paracetamol 500 mg",
      status: "low",
      shelf: "Pain B4",
      onHand: Math.max(2, Math.round(5 - m)),
    },
    {
      id: "a3",
      product: "Vitamin D3 1000 IU",
      status: "low",
      shelf: "Wellness C1",
      onHand: Math.max(3, Math.round(8 - m)),
    },
    {
      id: "a4",
      product: "Cetirizine 10 mg",
      status: "out",
      shelf: "Allergy B2",
      onHand: 0,
    },
  ];
}

export function tableRows(range: RangeKey): TableRow[] {
  const w = range === "7d" ? 1 : range === "90d" ? 0.86 : 0.94;
  const count = (n: number) => Math.max(0, Math.round(n * w));

  return [
    {
      id: "1",
      sku: "RX-1042",
      product: "Amoxicillin 500 mg",
      category: "Rx",
      onHand: count(42),
      reorderAt: 20,
      shelf: "Rx A3",
      status: "in-stock",
    },
    {
      id: "2",
      sku: "OTC-2208",
      product: "Paracetamol 500 mg",
      category: "OTC",
      onHand: count(6),
      reorderAt: 12,
      shelf: "Pain B4",
      status: "low",
    },
    {
      id: "3",
      sku: "RX-1181",
      product: "Salbutamol inhaler",
      category: "Rx",
      onHand: 0,
      reorderAt: 10,
      shelf: "Resp. A2",
      status: "out",
    },
    {
      id: "4",
      sku: "SUP-3044",
      product: "Vitamin D3 1000 IU",
      category: "Supplements",
      onHand: count(8),
      reorderAt: 15,
      shelf: "Wellness C1",
      status: "low",
    },
    {
      id: "5",
      sku: "OTC-2417",
      product: "Cetirizine 10 mg",
      category: "Cold & flu",
      onHand: 0,
      reorderAt: 8,
      shelf: "Allergy B2",
      status: "out",
    },
    {
      id: "6",
      sku: "RX-1510",
      product: "Metformin 500 mg",
      category: "Rx",
      onHand: count(28),
      reorderAt: 18,
      shelf: "Rx A1",
      status: "in-stock",
    },
    {
      id: "7",
      sku: "OTC-2672",
      product: "Ibuprofen 200 mg",
      category: "OTC",
      onHand: count(18),
      reorderAt: 12,
      shelf: "Pain B3",
      status: "in-stock",
    },
    {
      id: "8",
      sku: "RX-1619",
      product: "Insulin pen needles",
      category: "Rx",
      onHand: count(9),
      reorderAt: 14,
      shelf: "Cold D1",
      status: "low",
    },
  ];
}
