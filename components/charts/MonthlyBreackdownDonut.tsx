"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { fmtCurrency } from "@/lib/helpers";

type Props = {
  data: { name: string; value: number }[];
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

export default function MonthlyBreakdownDonut({ data }: Props) {
  return (
    <Card className="p-4 h-80">
      <h3 className="font-semibold mb-2">Monthly Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={730} height={250}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={50} label/>

          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index]} // различен цвят за всеки сектор
            />
          ))}
          <Tooltip formatter={(v: number) => fmtCurrency(v)} />
          <Legend />
          {/* Recharts ще ползва автоматични цветове; можеш да зададеш Cell-и ако искаш постоянна палитра */}
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
