"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { аpiFetch } from "@/hooks/аpiFetch";
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
import { monthZodSchema } from "@/lib/validators";
import { toast } from "sonner";

type Props = {
  budgetId: string;
  revalidate: boolean;
  setRevalidate: (loading: boolean) => void;
}

export default function MonthForm({ budgetId, revalidate, setRevalidate }: Props) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof monthZodSchema>>({
    resolver: zodResolver(monthZodSchema),
    defaultValues: {
      month: "",
      salaryDay: ""
    },
  })

  async function onSubmit(data: z.infer<typeof monthZodSchema>) {
    setLoading(true);
    try {
      const month = data.month;
      const salaryDay = data.salaryDay;
      const response = await аpiFetch("/api/month", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ month, salaryDay, budgetId }),
        cache: "no-store",
      }, "Failed to create month");

      if (!response) {
        throw new Error("Failed to create month");
      } else {
        toast.success("Month added successfully!");
        form.reset();
        setLoading(false);
        setRevalidate(!revalidate); // Trigger revalidation
      }
    } catch (error) {
      console.error("Error creating month:", error);
      toast.error("Failed to create month. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!budgetId) {
    return (
      null
    );
  }

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Month</FormLabel>
              <FormControl>
                <Input placeholder="01" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the month in the format MM (e.g., 01 for January).
              </FormDescription>
              <FormMessage />
            </FormItem>

          )}
        />
        <FormField
          control={form.control}
          name="salaryDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary Day</FormLabel>
              <FormControl>
                <Input placeholder="10.05" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the salary day in the format DD.MM (e.g., 10.05 for 10th of May).
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