import z from "zod";
import {date, text} from "drizzle-orm/pg-core";

export const budgetZodSchema = z.object({
  year: z.string().min(1, "Year is required!"),
});

export const monthZodSchema = z.object({
  month: z.string().min(1, "Month is required!"),
  salaryDay: z.string().min(1, "Salary day is required!"),
});

export const dataZodSchema = z.object({
  type: z.string().min(1, "Type is required!"),
  name: z.string().min(1, "Enter name of expense!"),
  amount: z.string().min(1, "Enter amount!"),
  entryDate: z.string().optional(),
  note: z.string().optional()
})