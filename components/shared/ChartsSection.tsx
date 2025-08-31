"use client";

import { useState, useEffect } from "react";
import { аpiFetch } from "@/hooks/аpiFetch";
import MonthlyBreakdownDonut from "@/components/charts/MonthlyBreackdownDonut";
import CategoryStackedBar from "@/components/charts/CategoryStackedBar";
import IncomeVsSpentLine from "@/components/charts/IncomeVsSpentLine";

type OverviewResponse = {
  income: number;
  expenses: number; // total expenses excluding bills and saving
  saving: number;
  spent: number; // bills + expenses + saving
  net: number; // income - spent
  savingsRate: number; // saving / income
};

type SeriesResponse = { month: string; income: number; expenses: number; savings: number };
type CategoryBreakdownResponse = { month: string; income: number; expenses: number; savings: number };

export default function ChartsSection({ budgetId, monthId, allEntries }: { budgetId: string, monthId: string, allEntries: number }) {
  const [overview, setOverview] = useState<{ income: number, expenses: number, saving: number, spent: number, net: number, savingsRate: number } | null>(null);
  const [series, setSeries] = useState<SeriesResponse[]>([]);
  const [expensesByCat, setExpensesByCat] = useState<CategoryBreakdownResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    async function load() {
      try {
        setLoading(true);
        const [ov, ser, exp] = await Promise.all([
          аpiFetch<OverviewResponse>(`/api/analytics/overview?monthId=${monthId}&budgetId=${budgetId}`, { cache: "no-store" }, "Failed to load overview data"),
          аpiFetch<SeriesResponse[]>(`/api/analytics/monthly-series?monthId=${monthId}&budgetId=${budgetId}`, { cache: "no-store" }, "Failed to load monthly series"),
          аpiFetch<CategoryBreakdownResponse[]>(`/api/analytics/category-breakdown?monthId=${monthId}&budgetId=${budgetId}&type=expenses`, { cache: "no-store" }, "Failed to load category breakdown"),
        ]);
        if (!cancel) {
          setOverview(ov);
          if (ser) setSeries(ser);
          if (exp) setExpensesByCat(exp);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (!cancel) setLoading(false);
      }
    };
    if (budgetId && monthId) load();
    return () => { cancel = true };
  }, [budgetId, monthId, allEntries]);

  if (loading) return <div className="grid gap-4 md:grid-cols-3"><div className="h-80 rounded-xl bg-muted animate-pulse"></div><div className="h-80 rounded-xl bg-muted animate-pulse"></div><div className="h-80 rounded-xl bg-muted animate-pulse"></div></div>;
  if (!overview) return null;

  const donutData = [
    { name: "Income", value: overview.income },
    { name: "Expenses", value: overview.expenses },
    { name: "Saving", value: overview.saving },
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <MonthlyBreakdownDonut data={donutData} />
      <IncomeVsSpentLine series={series} />
      <CategoryStackedBar data={expensesByCat} title="Expenses by Category" />
    </section>
  );
}