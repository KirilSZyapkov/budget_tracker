"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { budgetZodSchema } from "@/lib/validators";
import { toast } from "sonner";
import { useState } from "react";

export default function BudgetForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof budgetZodSchema>>({
    resolver: zodResolver(budgetZodSchema),
    defaultValues: {
      year: undefined, // Default value for year, can be adjusted as needed
    },
  })

  async function onSubmit(data: z.infer<typeof budgetZodSchema>) {
    setLoading(true);
    try {
      const year = data.year;
      const response = await fetch("/api/budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ year }),
        cache: "no-store",
      })
      if (!response.ok) {
        throw new Error("Failed to create budget");
      } else {
        toast.success("Budget created successfully!");
        form.reset();
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Error creating budget:", error);
      toast.error(error?.message || "Failed to create budget. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input placeholder="2025" {...field} />
              </FormControl>
              <FormDescription>
                Type the year for your budget. It should be a valid integer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer" disabled={loading}>{loading ? "Creating..." : "Submit"}</Button>
      </form>
    </Form>
  )
}