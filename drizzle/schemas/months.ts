import { pgTable, uuid, text, timestamp,} from "drizzle-orm/pg-core"
import { budgets } from "./budgets"

export const months = pgTable("months", {
  id: uuid("id").defaultRandom().primaryKey(),
  budgetId: uuid("budget_id").notNull().references(() => budgets.id, { onDelete: "cascade" }),
  month: text("month").notNull(), // 1 - 12
  salaryDay: text("salary_day"), // напр. 25 → генерира се нов месец от тази дата нататък
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})
