import { withErrorHandling } from "@/lib/api/handler"
import { getUserIdOrThrow } from "@/lib/auth"
import { createEntry } from "@/lib/services/entriesService"
import { entriesZodSchema } from "@/lib/validators";
import { NextResponse } from "next/server";

// export const GET = withErrorHandling(async () => {
//   //to do: да хвана и monthId, budgetId от query параметрите на url
//   // да използвам new URL(req.url).searchParams.get("monthId") и new URL(req.url).searchParams.get("budgetId")
//   // и да ги подам на getUserIncomes
//   const userId = await getUserIdOrThrow();
//   // const result = await getUserIncomes(userId);

//   // return NextResponse.json(result);
// })

export const POST = withErrorHandling(async (req) => {
  const userId = await getUserIdOrThrow();
  const body = await req.json();
  const { budgetId, monthId } = body;
  const parsed = entriesZodSchema.parse(body);
  const createNewBudget = await createEntry(userId, monthId, budgetId, parsed.name, parsed.amount, parsed.type);

  return NextResponse.json(createNewBudget, {
    status: 201,
  })
})