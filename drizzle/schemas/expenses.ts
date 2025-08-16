import { pgTable, uuid, numeric, timestamp, text } from "drizzle-orm/pg-core"
import { months } from "./months"

export const expenses = pgTable("expenses", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(), // Clerk userId
  monthId: uuid("month_id").notNull().references(() => months.id, { onDelete: "cascade" }),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  entryDate: text("entry_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
})
