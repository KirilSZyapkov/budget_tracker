"use client"

import {useState} from "react";
import {z} from "zod";
import {toast} from "sonner";
import {useApiFetch} from "@/hooks/useApiFetch";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import { dataZodSchema } from "@/lib/validators";
import {zodResolver} from "@hookform/resolvers/zod";


const schema = z.object({
  name: z.string().min(1, "Името е задължително"),
  // type: z.enum(["income", "bills", "expenses", "saving"], {
  //   errorMap: () => ({ message: "Избери тип" }),
  // }),
});

export default function IncomeForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof dataZodSchema>>({
    resolver: zodResolver(dataZodSchema),
    defaultValues: {
      type: "",
      name: "",
      amount: "",
      entryDate: "",
      note: ""
    }
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);

    if (!parsed.success) {
      toast.error(parsed.error.message)
      return
    }
    ;

    setLoading(true);

    const result = await useApiFetch("/api/categories", {
      method: "POST",
      body: JSON.stringify(parsed.data),
    }, "Неуспешно създаване на категория")

    setLoading(false)

    if (result) {
      toast.success("Категория създадена успешно 🎉")
      form.reset();
      // Optionally: refresh()
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:flex-row md:gap-0 items-center justify-evenly w-full">
        <div>
          <Label htmlFor="name" className="flex justify-center mb-3">Име на категория</Label>
          <Input
            id="name"
            name="name"
            placeholder="Пример: Заплата, Наем"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="type" className="flex justify-center mb-3">Тип</Label>
           <Input
            id="name"
            name="name"
            placeholder="Пример: Заплата, Наем"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" disabled={loading} className="cursor-pointer">
          {loading ? "Loading..." : "Add"}
        </Button>
      </form>
    </Form>
  )
}
