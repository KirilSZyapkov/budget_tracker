import { pgTable, uuid, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { months } from "./months";
import { budgets } from "./budgets";

export const savings = pgTable("savings", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),          // от Clerk
  monthId: uuid("month_id").notNull().references(() => months.id, { onDelete: "cascade" }),
  budgetId: uuid("month_id").notNull().references(() => budgets.id, { onDelete: "cascade" }),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),     
  type: text("type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});