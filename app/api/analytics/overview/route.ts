import { withErrorHandling } from "@/lib/api/handler";
import db from "@/drizzle/db";
import { entries } from "@/drizzle/schemas/entries";
import { and, eq, sql } from "drizzle-orm";
import { getUserIdOrThrow } from "@/lib/auth";

export const GET = withErrorHandling(async (req: Request) => {
  const userId = await getUserIdOrThrow();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  };
  const {searchParams} = new URL(req.url);
  const monthId = searchParams.get("monthId");
  const budgetId = searchParams.get("budgetId");
  if (!monthId || !budgetId) return new Response("Bad Request", { status: 400 });

  const rows = await db
    .select({
      type: entries.type,
      total: sql<number>`sum(${entries.amount})`,
    })
    .from(entries)
    .where(and(eq(entries.userId, userId), eq(entries.monthId, monthId), eq(entries.budgetId, budgetId)))
    .groupBy(entries.type);

    const byType = Object.fromEntries(rows.map(r => [r.type, Number(r.total || 0)]));
    const income = byType.income || 0;
    const expensesTotal = byType.expenses || 0;
    const saving = byType.savings || 0;
    const spent = expensesTotal + saving;
    const net = income - spent;
    const savingsRate = income > 0 ? saving / income : 0;
    
    console.log("api/analitics/overview 26", byType);
    return Response.json({ income, expenses: expensesTotal, saving, spent, net, savingsRate });

});