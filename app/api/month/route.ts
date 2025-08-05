// да коригрирам сървисите и да импортна monthService

import { withErrorHandling } from "@/lib/api/handler"
import { getUserIdOrThrow } from "@/lib/auth"
import { getUserMonths, createMonth } from "@/lib/services/monthService"
import { monthZodSchema } from "@/lib/validators";

export const GET = withErrorHandling(async (req: Request) => {
  const userId = await getUserIdOrThrow();
  const { searchParams } = new URL(req.url);
  const budgetId = searchParams.get("budgetId");
  const result = await getUserMonths(budgetId!);

  return Response.json(result);
})

export const POST = withErrorHandling(async (req) => {
  const userId = await getUserIdOrThrow();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { budgetId } = body;
  if (!budgetId) {
    return Response.json({ error: "Budget ID is required" }, { status: 400 });
  }
  const parsed = monthZodSchema.parse(body);
  const createNewBudget = await createMonth(budgetId, parsed.month, parsed.salaryDay);

  return Response.json(createNewBudget, {
    status: 201,
  })
})