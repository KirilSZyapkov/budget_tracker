import { pgTable, uuid, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { months } from "./months";
import { budgets } from "./budgets";

export const incomes = pgTable("incomes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),          // от Clerk
  monthId: uuid("month_id").notNull().references(() => months.id, { onDelete: "cascade" }),
  budgetId: uuid("budget_id").notNull().references(()=>budgets.id),    // от Budgets
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),     
  name: text("name").notNull(),               // 'заплата' | 'недвижимуст' | 'втори бизнес'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
})
