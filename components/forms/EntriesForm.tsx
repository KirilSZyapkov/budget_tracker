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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { entriesZodSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";

type Props={
  userId?: string | null;
  budgetId?: string;
  monthId?: string;
  type?: string; // "income" or "expense"
}

export default function EntriesForm({ userId, budgetId, monthId, type }: Props) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof entriesZodSchema>>({
    resolver: zodResolver(entriesZodSchema),
    defaultValues: {
      name: "",
      amount: "",
      type: ""
    }
  })

  async function onSubmit(data: z.infer<typeof entriesZodSchema>) {
    setLoading(true);
    try {
      const parsed = entriesZodSchema.safeParse(data);
      if (!parsed.success) {
        toast.error("Validation failed: " + parsed.error.message);
        return;
      };
      const name = data.name.trim();
      const amount = data.amount.trim();

      if (!name || !amount) {
        toast.error("Name and amount are required");
        setLoading(false);
        throw new Error("Name and amount are required");
      };

      const response = await useApiFetch("/api/entries",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, amount, monthId, budgetId, userId, type }),
        cache: "no-store",
      }, "Failed to create income");

      if(!response){
        throw new Error("Failed to create income");
      } else {
        toast.success("Income added successfully!");
        form.reset();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating income:", error);
      toast.error("Failed to create income");
    }
    setLoading(false);
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
              <FormMessage />
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
                  placeholder="Example: 1500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
