import BudgetForm from "@/components/forms/BudgetForm";

export default function DashboardPage() {
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
        <BudgetForm/>
      </section>
    </main>
  );
}