// от api/budgets/route.ts
// import { withErrorHandling } from "@/lib/api/handler"
// import { getUserIdOrThrow } from "@/lib/auth"
// import db from "@/drizzle/db";
// import { eq } from "drizzle-orm";
// import { budgets } from "@/drizzle/schemas/budgets";
// import { budgetZodSchema } from "@/lib/validators";
// import { ValidationError } from "@/lib/errors";


// export const GET = withErrorHandling(async () => {
//   const userId = await getUserIdOrThrow();
//   const result = await db.select().from(budgets).where(eq(budgets.userId, userId));
  
//   return Response.json(result);
// })

// export const POST = withErrorHandling(async (req) => {
//   const userId = await getUserIdOrThrow();
//   const body = await req.json();
//   const parsed = budgetZodSchema.parse(body);
//   const year = parsed.year;
//   const [newCreatedBudget] = await db.insert(budgets)
//     .values({userId, year})
//     .returning()

//   if (!newCreatedBudget) {
//     throw new ValidationError("Failed to create budget");
//   }

//   return Response.json(newCreatedBudget, {
//     status: 201,
//   })
// })