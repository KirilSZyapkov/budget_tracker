"use client";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Card } from "@/components/ui/card";

type Point = { month: string; income: number; expenses: number; savings: number };
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

export default function IncomeVsSpentLine({ series }: { series: Point[] }) {
  return (
    <Card className="p-4 h-96 w-full">
      <h3 className="font-semibold mb-2">Status monthly</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke={COLORS[1]} />
          <Line type="monotone" dataKey="expenses" stroke={COLORS[2]} />
          <Line type="monotone" dataKey="savings" stroke={COLORS[3]} />

        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
