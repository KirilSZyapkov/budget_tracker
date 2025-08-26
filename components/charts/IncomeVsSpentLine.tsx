"use client";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

type Point = { label: string; income: number; spent: number; net: number; };

export default function IncomeVsSpentLine({ series }: { series: Point[] }) {
  return (
    <Card className="p-4 h-80">
      <h3 className="font-semibold mb-2">Income vs Spent (Monthly)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis  />
          <Tooltip  />
          <Legend />
          <Line type="monotone" dataKey="income" />
          <Line type="monotone" dataKey="spent" />
          <Line type="monotone" dataKey="net" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
