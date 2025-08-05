"use client";

import BudgetForm from "@/components/forms/BudgetForm";
import MonthForm from "@/components/forms/MonthForm";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { budgets } from "@/drizzle/schemas/budgets";

type Budget = typeof budgets.$inferSelect;

export default function DashboardPage() {
  const [allBudget, setAllBudgets] = useState<Budget[] >([]);
  const [loading, setLoading] = useState(false);
  
  const { userId, isLoaded, isSignedIn } = useAuth();
  

  // const budgets = await getUserBudget(userId);
  useEffect(() => {
    async function fetchBudgets() {
      const response = await fetch(`/api/budgets`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const data = await response.json();
      
      setAllBudgets(data);
    }
    fetchBudgets();
  }, [loading]);
  
  const currentBudget = allBudget?.[allBudget.length - 1];
  
  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-b-4 border-gray-200 mb-6"></div>
          <span className="text-lg text-gray-600 font-medium">Loading dashboard...</span>
        </div>
      </main>
    );
  }

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
        <BudgetForm loading={loading} setLoading={setLoading}/>
        <MonthForm budgetId={currentBudget?.id!} loading={loading} setLoading={setLoading}/>
      </section>
    </main>
  );
}