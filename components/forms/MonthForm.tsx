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
import { monthZodSchema } from "@/lib/validators";
import { toast } from "sonner";

type Props = {
  budgetId: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function MonthForm({budgetId, loading, setLoading}: Props) {
  
  const form = useForm<z.infer<typeof monthZodSchema>>({
    resolver: zodResolver(monthZodSchema),
    defaultValues: {
      month: undefined, 
      salaryDay: undefined
    },
  })
// да коригирам onSubmit функцията да създава месец вместо бюджет
// в body да се праща month вместо year както и budgetId и деня на заплата
  async function onSubmit(data: z.infer<typeof monthZodSchema>) {
    setLoading(true);
    try {
      const month = data.month;
      const salaryDay = data.salaryDay;
      const response = await fetch("/api/month", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ month, salaryDay, budgetId }),
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