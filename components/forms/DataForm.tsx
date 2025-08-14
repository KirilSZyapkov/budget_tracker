"use client"

import {useState} from "react";
import {z} from "zod";
import {toast} from "sonner";
import {useApiFetch} from "@/hooks/useApiFetch";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
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

export default function DataForm() {
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
    setForm({...form, [e.target.name]: e.target.value})
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
      setForm({name: "", type: ""})
      // Optionally: refresh()
    }
  };

  return (
    <Form {...form}>


      <form onSubmit={handleSubmit} className="grid gap-4 p-4 w-full max-w-md">
        <div>
          <Label htmlFor="name">Име на категория</Label>
          <Input
            id="name"
            name="name"
            placeholder="Пример: Заплата, Наем"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="type">Тип</Label>
          <Select
            value={form.type}
            onValueChange={(val: any) => setForm((prev) => ({...prev, type: val}))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Избери категория"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Приход</SelectItem>
              <SelectItem value="bills">Сметки</SelectItem>
              <SelectItem value="expenses">Разходи</SelectItem>
              <SelectItem value="saving">Спестявания</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Създаване..." : "Създай категория"}
        </Button>
      </form>
    </Form>
  )
}
