import { withErrorHandling } from "@/lib/api/handler";
import { getUserIdOrThrow } from "@/lib/auth";
import db from "@/drizzle/db";
import { entries } from "@/drizzle/schemas/entries";
import { months } from "@/drizzle/schemas/months";
import { and, eq, sql } from "drizzle-orm";

export const GET = withErrorHandling(async (req: Request) => {
  const userId = await getUserIdOrThrow();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const budgetId = searchParams.get("budgetId");
  const monthId = searchParams.get("monthId");
  if (!budgetId || !monthId) return new Response("Bad Request", { status: 400 });

  const rows = await db
    .select({
      month: months.month,
      income: sql<number>`sum(case when ${entries.type} = 'income' then ${entries.amount} else 0 end)`,
      expenses: sql<number>`sum(case when ${entries.type}= 'expenses' then ${entries.amount} else 0 end)`,
      savings: sql<number>`sum(case when ${entries.type} = 'savings' then ${entries.amount} else 0 end)`,
    })
    .from(entries)
    .innerJoin(months, and(eq(entries.monthId, monthId), eq(entries.budgetId, budgetId)))
    .where(and(eq(entries.monthId, monthId), eq(entries.budgetId, budgetId)))
    .groupBy(months.month)
    .orderBy(months.month);

  const data = rows.map(r => {
    const spent = Number(r.expenses || 0) + Number(r.savings || 0);
    const net = Number(r.income || 0) - spent;
    return { lable: `${String(r.month).padStart(2, "0")}`, income: Number(r.income || 0), spent, net };
  });

  console.log("api/analytics/monthly-series 36", data);
  

  return Response.json(data);
});