import z from "zod";
import {date, text} from "drizzle-orm/pg-core";

export const budgetZodSchema = z.object({
  year: z.string().min(1, "Year is required!"),
});

export const monthZodSchema = z.object({
  month: z.string().min(1, "Month is required!"),
  salaryDay: z.string().min(1, "Salary day is required!"),
});

export const incomeZodSchema = z.object({
  name: z.string().min(1, "Enter name of income!"),
  amount: z.string().min(1, "Enter amount!"),
})