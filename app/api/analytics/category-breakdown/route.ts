import { withErrorHandling } from "@/lib/api/handler";
import { getUserIdOrThrow } from "@/lib/auth";
import db from "@/drizzle/db";
import { entries } from "@/drizzle/schemas/entries";
import { and, eq, sql } from "drizzle-orm";
import { months } from "@/drizzle/schemas/months";

export const GET = withErrorHandling(async (req: Request) => {
  const userId = await getUserIdOrThrow();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const monthId = searchParams.get("monthId");
  const budgetId = searchParams.get("budgetId");
  const type = searchParams.get("type");
  if (!monthId || !budgetId || !type) return new Response("Bad Request", { status: 400 });

  const rows = await db
    .select({
      month: months.month,
      income: sql<number>`sum(case when ${entries.type}= 'income' then ${entries.amount} else 0 end)`,
      expenses: sql<number>`sum(case when ${entries.type}= 'expenses' then ${entries.amount} else 0 end)`,
      savings: sql<number>`sum(case when ${entries.type}= 'savings' then ${entries.amount} else 0 end)`,
    })
    .from(entries)
    .innerJoin(months, eq(entries.monthId, months.id))
    .where(and(eq(entries.budgetId, budgetId), eq(entries.userId, userId)))
    .groupBy(months.month)
    .orderBy(months.month)
    .limit(3);

  const data = rows.map(r => ({ 
    month: `Month ${r.month}`,
    income: r.income || 0,
    expenses: r.expenses || 0,
    savings: r.savings || 0,
  }));


console.log("api/category-breakdown 28", data);

  return Response.json(data);
})