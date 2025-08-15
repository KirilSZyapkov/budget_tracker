import { pgTable, uuid, numeric, date, timestamp, text } from "drizzle-orm/pg-core"
import { months } from "./months"

export const entries = pgTable("entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(), // Clerk userId
  monthId: uuid("month_id").notNull().references(() => months.id, { onDelete: "cascade" }),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  entryDate: date("entry_date"),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
})
