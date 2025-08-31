"use client";

import { useEffect, useState } from "react";
import MonthlyBreakdownDonut from "../charts/MonthlyBreackdownDonut";
import { аpiFetch } from "@/hooks/аpiFetch";

type Overview = {
  income: number; bills: number; expenses: number; saving: number;
  spent: number; net: number; savingsRate: number;
};

export default function MonthlyBreakdown({ monthId }: { monthId: string }) {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    async function load() {
      try {
        setLoading(true);
        setErr(null);
        const res = await аpiFetch<any>("/api/analytics/overview?monthId=" + monthId, {
          cache: "no-store"
        }, "Faild to load chart data");
        if (!res.ok) throw new Error(await res.text());
        const data: Overview = await res.json();
        if (!cancel) setOverview(data);
      } catch (error: any) {
        if (!cancel) setErr(error?.message ?? "Faild to load chart data");
      } finally {
        {
          if (!cancel) setLoading(false);
        }
      }
    };
    load();
    return () => { cancel = true }
  }, [monthId]);

  if (err) return <div className="h-80 w-full rounded-2xl border p-4">Error: {err}</div>;
  if (!overview) return null;

  const donutData = [
    { name: "Income", value: overview.income },
    { name: "Bills", value: overview.bills },
    { name: "Expenses", value: overview.expenses },
    { name: "Saving", value: overview.saving },
  ];

  return <MonthlyBreakdownDonut data={donutData} />;
}