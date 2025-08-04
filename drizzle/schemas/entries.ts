import { pgTable, uuid, numeric, date, timestamp,text } from "drizzle-orm/pg-core"
import { months } from "./months"
import { categories } from "./categories"

export const entries = pgTable("entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  monthId: uuid("month_id").notNull().references(() => months.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id").notNull().references(() => categories.id, { onDelete: "restrict" }),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  entryDate: date("entry_date"),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
})
