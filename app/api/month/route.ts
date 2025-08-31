import { withErrorHandling } from "@/lib/api/handler"
import { getUserIdOrThrow } from "@/lib/auth"
import { getUserMonths, createMonth } from "@/lib/services/monthService"
import { monthZodSchema } from "@/lib/validators";

export const GET = withErrorHandling(async (req: Request) => {
  
  const { searchParams } = new URL(req.url);
  const budgetId = searchParams.get("budgetId");
  const result = await getUserMonths(budgetId!);

  return Response.json(result);
})

export const POST = withErrorHandling(async (req) => {
  
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