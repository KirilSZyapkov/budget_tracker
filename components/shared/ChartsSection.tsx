"use client";

import { useState, useEffect, use } from "react";
import MonthlyBreakdownDonut from "@/components/charts/MonthlyBreackdownDonut";
import { useApiFetch } from "@/hooks/useApiFetch";

type OverviewResponse = {
  income: number;
  bills: number;
  expenses: number; // total expenses excluding bills and saving
  saving: number;
  spent: number; // bills + expenses + saving
  net: number; // income - spent
  savingsRate: number; // saving / income
};

export default function ChartsSection({ budgetId, monthId }: { budgetId: string, monthId: string }) {
  const [overview, setOverview] = useState<{ income: number, bills: number, expenses: number, saving: number, spent: number, net: number, savingsRate: number } | null>(null);
  const [series, setSeries] = useState<{ label: string; income: number; spent: number; net: number }[]>([]);
  const [expensesByCat, setExpensesByCat] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    async function load() {
      try {
        setLoading(true);
        const [ov] = await Promise.all([
          useApiFetch<OverviewResponse>(`/api/analytics/overview?monthId=${monthId}&budgetId=${budgetId}`, { cache: "no-store" }, "Failed to load overview data"),
        ]);
        if (!cancel) {
          setOverview(ov)
        }
      } catch (error: any) {
        console.log(error.message);

      } finally {
        if (!cancel) setLoading(false);
      }
    };
    if (budgetId && monthId) load();
    return () => { cancel = true };
  }, [budgetId, monthId]);

  if (loading) return <div className="grid gap-4 md:grid-cols-3"><div className="h-80 rounded-xl bg-muted animate-pulse"></div><div className="h-80 rounded-xl bg-muted animate-pulse"></div><div className="h-80 rounded-xl bg-muted animate-pulse"></div></div>;
  if (!overview) return null;

  const donutData = [
    { name: "Income", value: overview.income },
    { name: "Bills", value: overview.bills },
    { name: "Expenses", value: overview.expenses },
    { name: "Saving", value: overview.saving },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <MonthlyBreakdownDonut data={donutData} />
    </section>
  );
}