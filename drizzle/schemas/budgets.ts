import { pgTable, uuid, text, integer, timestamp, primaryKey } from "drizzle-orm/pg-core"

export const budgets = pgTable("budgets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(), // Clerk userId
  year: text("year").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
})
