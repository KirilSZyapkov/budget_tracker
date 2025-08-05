import db from "@/drizzle/db";
import { months } from "@/drizzle/schemas/months";
import { eq, and } from "drizzle-orm";
import { NotFoundError, ValidationError } from "@/lib/errors";
import { revalidatePath } from "next/cache";

export async function getUserMonths(budgetId: string){
  const userMonths = await db.select().from(months)
  .where(eq(months.budgetId, budgetId));

  return userMonths || [];
}

export async function createMonth(budgetId: string, month: string, salaryDay: string) {
  if(!month || !salaryDay){
    throw new ValidationError("Month and salary day are required!");
  }

  const [newCreatedMonth] = await db.insert(months)
  .values({budgetId, month, salaryDay})
  .returning();

  if(!newCreatedMonth){
    throw new ValidationError("Failed to create month");
  }
  revalidatePath("/dashboard");
  return newCreatedMonth;
}

export async function updateMonth(budgetId: string, id: string, data: Partial<typeof months.$inferInsert>) {
  const [newUpdatedMonth] = await db.update(months)
  .set(data)
  .where(and(eq(months.id, id), eq(months.budgetId, budgetId)))
  .returning();

  if(!newUpdatedMonth) {
    throw new NotFoundError("Month not found or you do not have permission to update it");
  }
  revalidatePath("/dashboard");
  return newUpdatedMonth;
}

export async function deleteMonth(budgetId: string, id: string) {
  const [deleteMonth] = await db.delete(months)
  .where(and(eq(months.id, id), eq(months.budgetId, budgetId)))
  .returning();
  
  revalidatePath("/dashboard");
  return deleteMonth;
}