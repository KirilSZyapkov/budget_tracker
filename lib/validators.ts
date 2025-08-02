import z from "zod";

export const budgetZodSchema = z.object({
  year: z.number().int().min(1, "Year is required!"),
});