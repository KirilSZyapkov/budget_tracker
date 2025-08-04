import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),          // от Clerk
  name: text("name").notNull(),               // напр. "Заплата", "Наем", "Храна"
  type: text("type").notNull(),               // 'income' | 'bills' | 'expenses' | 'saving'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
})
