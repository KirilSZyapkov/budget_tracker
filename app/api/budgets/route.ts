import { withErrorHandling } from "@/lib/api/handler"
import { getUserIdOrThrow } from "@/lib/auth"
import { getUserBudget, createBudget } from "@/lib/services/budgetService"
import { budgetZodSchema } from "@/lib/validators";
import { NextResponse } from "next/server";

export const GET = withErrorHandling(async () => {
  const userId = await getUserIdOrThrow();
  const result = await getUserBudget(userId);

  return NextResponse.json(result);
})

export const POST = withErrorHandling(async (req) => {
  const userId = await getUserIdOrThrow();
  const body = await req.json();
  const parsed = budgetZodSchema.parse(body);
  const createNewBudget = await createBudget(userId, parsed.year);

  return NextResponse.json(createNewBudget, {
    status: 201,
  })
})