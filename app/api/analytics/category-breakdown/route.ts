import { withErrorHandling } from "@/lib/api/handler";
import { getUserIdOrThrow } from "@/lib/auth";
import db from "@/drizzle/db";
import { entries } from "@/drizzle/schemas/entries";
import { and, eq, sql } from "drizzle-orm";

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
      name: entries.name,
      total: sql<number>`sum(${entries.amount})`,
    })
    .from(entries)
    .where(and(eq(entries.budgetId, budgetId), eq(entries.monthId, monthId), eq(entries.type, type)))
    .groupBy(entries.name)
    .orderBy(sql`sum(${entries.amount}) desc`);

  const data = rows.map(r => ({ name: r.name, value: Number(r.total || 0) }));

  return Response.json(data);
})