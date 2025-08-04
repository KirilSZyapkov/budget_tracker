import db from "@/drizzle/db";
import { budgets } from "@/drizzle/schemas/budgets";
import { eq, and } from "drizzle-orm";
import { NotFoundError, ValidationError } from "@/lib/errors";
import { revalidatePath } from "next/cache";


export async function getUserBudget(userId: string) {

  const userBudgets = await db.select().from(budgets).where(eq(budgets.userId, userId));
  
  return userBudgets || [];
}

export async function createBudget(userId: string, year: string) {
  if (!year) {
    throw new ValidationError("Year is required!");
  };

  const [newCreatedBudget] = await db.insert(budgets)
    .values({userId, year})
    .returning()

  if (!newCreatedBudget) {
    throw new ValidationError("Failed to create budget");
  }
  revalidatePath("/dashboard");
  return newCreatedBudget;
}

export async function updateBudget(userId: string, id:string, data: Partial<typeof budgets.$inferInsert>){

  const [newUpdatedBudget] = await db.update(budgets)
  .set(data)
  .where(and(eq(budgets.id, id), eq(budgets.userId, userId)))
  .returning();

  if (!newUpdatedBudget) {
    throw new NotFoundError("Category not found or you do not have permission to update it");
  };
  revalidatePath("/dashboard");

  return newUpdatedBudget;
}

export async function deleteBudget(userId: string, id: string){

  const [deleteCategory] = await db.delete(budgets)
  .where(and(eq(budgets.id, id), eq(budgets.userId, userId)))
  .returning();
  revalidatePath("/dashboard");

  return deleteCategory;
}