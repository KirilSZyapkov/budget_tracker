"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useApiFetch } from "@/hooks/useApiFetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { incomeZodSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { incomes } from "@/drizzle/schemas/incomes";


export default function IncomeForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof incomeZodSchema>>({
    resolver: zodResolver(incomeZodSchema),
    defaultValues: {
      name: "",
      amount: "",
    }
  })

  async function onSubmit(data: z.infer<typeof incomeZodSchema>) {

    const parsed = incomeZodSchema.safeParse(data);
    if (!parsed.success) {
      toast.error("Validation failed: " + parsed.error.message);
      return;
    }
    console.log("incomeForm: 53", data);

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 lg:flex-row md:gap-0 items-center justify-evenly w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Label htmlFor="name" className="flex justify-center mb-3">Name</Label>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Example: Salary, Rent"
                  {...field}
                />
              </FormControl>
            </FormItem>

          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Label htmlFor="amount" className="flex justify-center mb-3">Amount</Label>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Example: 1500EUR"
                  {...field}
                />
              </FormControl>
            </FormItem>

          )}
        />

        <Button type="submit" disabled={loading} className="cursor-pointer">
          {loading ? "Loading..." : "Add"}
        </Button>
      </form>
    </Form>
  )
}
