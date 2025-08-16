import db from "@/drizzle/db";
import { entries } from "@/drizzle/schemas/entries";
import { eq, and } from "drizzle-orm";
import { NotFoundError, ValidationError } from "@/lib/errors";
import { revalidatePath } from "next/cache";

export async function getUserEntries(userId: string, monthId: string, budgetId: string) {

  const userIncomes = await db.select()
    .from(entries)
    .where(and(eq(entries.userId, userId), eq(entries.monthId, monthId), eq(entries.budgetId, budgetId)));

  if (userIncomes.length === 0) {
    throw new NotFoundError("No incomes were found for this user");
  }

  return userIncomes;
}

export async function createEntry(userId: string, monthId: string, budgetId: string, name: string, amount: string, type: string) {
  if (!name || !amount) {
    throw new ValidationError("Name and type are required");
  };

  if (!userId || !monthId || !budgetId) {
    throw new ValidationError("Unauthorized access, something went wrong!");
  };

  const [newCreatedIncome] = await db.insert(entries)
    .values({ userId, name, amount, monthId, budgetId, type })
    .returning();

  if (!newCreatedIncome) {
    throw new ValidationError("Failed to create category");
  }
  revalidatePath("/dashboard");

  return newCreatedIncome;
}

// export async function updateIncome(userId: string, id: string, data: Partial<typeof categories.$inferInsert>) {

//   const [newUpdatedCategory] = await db.update(categories)
//     .set(data)
//     .where(and(eq(categories.id, id), eq(categories.userId, userId)))
//     .returning();

//   if (!newUpdatedCategory) {
//     throw new NotFoundError("Category not found or you do not have permission to update it");
//   };
//   revalidatePath("/dashboard");

//   return newUpdatedCategory;
// }

// export async function deleteIncome(userId: string, id: string) {

//   const [deleteCategory] = await db.delete(categories)
//     .where(and(eq(categories.id, id), eq(categories.userId, userId)))
//     .returning();
//   revalidatePath("/dashboard");

//   return deleteCategory;
// }