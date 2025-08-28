"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

type Props = {
  data: { name: string; value: number }[];
};

const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (!percent || percent === 0) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function MonthlyBreakdownDonut({ data }: Props) {
  return (
    <Card className="p-4 h-96 w-full border-2 border-red-500">
      <h3 className="font-semibold mb-2">Monthly Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          innerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          <Tooltip/>
          <Legend/>
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
