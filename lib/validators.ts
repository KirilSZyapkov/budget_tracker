import z from "zod";

export const budgetZodSchema = z.object({
  year: z.string().min(1, "Year is required!"),
});

export const monthZodSchema = z.object({
  month: z.string().min(1, "Month is required!"),
})