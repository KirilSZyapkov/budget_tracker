import db from "@/drizzle/db";
import { categories } from "@/drizzle/schemas/incomes";
import { eq, and } from "drizzle-orm";
import { NotFoundError, ValidationError } from "@/lib/errors";
import { revalidatePath } from "next/cache";

export async function getUserCategories(userId: string) {

  const userCategories = await db.select().from(categories).where(eq(categories.userId, userId));

  if (userCategories.length === 0) {
    throw new NotFoundError("No categories found for this user");
  }

  return userCategories;
}

export async function createCategory(userId: string, name: string, type: string) {
  if (!name || !type) {
    throw new ValidationError("Name and type are required");
  };

  const [newCreatedCategory] = await db.insert(categories)
    .values({ userId, name, type })
    .returning();

  if (!newCreatedCategory) {
    throw new ValidationError("Failed to create category");
  }
  revalidatePath("/dashboard");

  return newCreatedCategory;
}

export async function updateCategory(userId: string, id: string, data: Partial<typeof categories.$inferInsert>) {

  const [newUpdatedCategory] = await db.update(categories)
    .set(data)
    .where(and(eq(categories.id, id), eq(categories.userId, userId)))
    .returning();

  if (!newUpdatedCategory) {
    throw new NotFoundError("Category not found or you do not have permission to update it");
  };
  revalidatePath("/dashboard");

  return newUpdatedCategory;
}

export async function deleteCategory(userId: string, id: string) {

  const [deleteCategory] = await db.delete(categories)
    .where(and(eq(categories.id, id), eq(categories.userId, userId)))
    .returning();
  revalidatePath("/dashboard");

  return deleteCategory;
}