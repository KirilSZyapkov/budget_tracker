"use client";

import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fmtCurrency } from "@/lib/helpers";

type Slice = { name: "Income" | "Bills" | "Expenses" | "Saving"; value: number };

export default function MonthlyBreakdownDonut({ data }: { data: Slice[] }) {
  return (
    <div className="h-80 w-full rounded-2xl border p-4">
      <h3 className="font-semibold mb-2">Monthly Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie dataKey="value" nameKey="name" data={data} innerRadius={60} outerRadius={100} />
          <Tooltip formatter={(v: string) => fmtCurrency(v)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
