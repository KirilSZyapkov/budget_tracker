"use client";

import { useState, useEffect } from "react";
import { useApiFetch } from "@/hooks/useApiFetch";
import MonthlyBreakdownDonut from "@/components/charts/MonthlyBreackdownDonut";
import CategoryStackedBar from "@/components/charts/CategoryStackedBar";
import IncomeVsSpentLine from "@/components/charts/IncomeVsSpentLine";

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
          useApiFetch(`/api/analytics/monthly-series?budgetId=${budgetId}`),
          useApiFetch(`/api/analytics/category-breakdown?monthId=${monthId}&type=EXPENSES`),
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

  console.log(overview);


  const donutData = [
    { name: "Income", value: overview.income },
    { name: "Bills", value: overview.bills },
    { name: "Expenses", value: overview.expenses },
    { name: "Saving", value: overview.saving },
  ];

  console.log(donutData);


  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <MonthlyBreakdownDonut data={donutData} />
      <IncomeVsSpentLine series={series} />
      <CategoryStackedBar data={expensesByCat} title="Expenses by Category" />
    </section>
  );
}