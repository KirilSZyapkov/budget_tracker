"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";


type Row = { name: string; value: number };

export default function CategoryStackedBar({ data, title = "Expenses by Category" }: { data: Row[]; title?: string }) {
  return (
    <Card className="p-4 h-80">
      <h3 className="font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
