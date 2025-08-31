"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Rectangle } from "recharts";
import { Card } from "@/components/ui/card";


type Row = {month: string; income: number; expenses: number; savings: number};
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

export default function CategoryStackedBar({ data, title = "Expenses by Category" }: { data: Row[]; title?: string }) {
  return (
    <Card className="p-4 h-96 w-full">
      <h3 className="font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#0088FE" />
          <Bar dataKey="expenses" fill="#00C49F" />
          <Bar dataKey="savings" fill="#FFBB28" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
