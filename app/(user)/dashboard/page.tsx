import BudgetForm from "@/components/forms/BudgetForm";
import MonthForm from "@/components/forms/MonthForm";
import { getUserBudget } from "@/lib/services/budgetService";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <main className="min-h-screen bg-background px-4 py-20 flex flex-col items-center justify-start text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Please log in to access your dashboard
        </h1>
      </main>
    );
  }
  const budgets = await getUserBudget(userId);
  const currentBudget = budgets.pop();
  return (
    <main className="min-h-screen bg-background px-4 py-20 flex flex-col items-center justify-start text-center">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Welcome to your personal finance dashboard. Here you can manage your budget, track expenses, and monitor savings.
        </p>
      </section>
      <section>
        <BudgetForm />
        <MonthForm budgetId={currentBudget?.id!} />
      </section>
    </main>
  );
}