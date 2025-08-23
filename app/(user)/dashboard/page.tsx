"use client";

import BudgetForm from "@/components/forms/BudgetForm";
import MonthForm from "@/components/forms/MonthForm";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { budgets } from "@/drizzle/schemas/budgets";
import { months } from "@/drizzle/schema";
import SelectField from "@/components/shared/SelectField";
import DataList from "@/components/shared/DataList";
import ChartsSection from "@/components/shared/ChartsSection";

type Budget = typeof budgets.$inferSelect;
type Month = typeof months.$inferSelect;

export default function DashboardPage() {
  const [allBudget, setAllBudgets] = useState<Budget[]>([]);
  const [allMonths, setAllMonths] = useState<Month[]>([]);
  const [currentBudget, setCurrentBudget] = useState<Budget>();
  const [currentMonth, setCurrentMonth] = useState<Month>();
  const [revalidate, setRevalidate] = useState(false);
  const { userId, isLoaded } = useAuth();


  useEffect(() => {

    async function fetchData() {
      const responseBudget = await fetch(`/api/budgets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const budgetData = await responseBudget.json();
      const currBudget = budgetData?.[0];
      setCurrentBudget(currBudget);
      setAllBudgets(budgetData);

      const responseMonth = await fetch(`/api/month?budgetId=${currBudget?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const monthData = await responseMonth.json();
      const currMonth = monthData?.[0];

      setCurrentMonth(currMonth);
      setAllMonths(monthData);
    }
    fetchData();
  }, [revalidate]);

  function onChange(e:any, title: string) {
  
    switch (title.toLowerCase()) {
      case "month":
          const selectedMonth = allMonths.find(({month})=> month === e);
          if(selectedMonth){
            setCurrentMonth(selectedMonth);
          }         
        break;
          case "year":
            const selectedYear = allBudget.find(({year})=> year === e);
            if(selectedYear){
              setCurrentBudget(selectedYear);    
            }
          break;
      default:
        break;
    }
    
  };

 
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
    <main className="min-h-screen bg-background px-2 sm:px-4 py-10 sm:py-20 flex flex-col items-center justify-start">
      <section className="w-full max-w-3xl mx-auto mb-8 px-2 sm:px-0 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-blue-700 mb-2">
          Dashboard
        </h1>
        <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-500">
          Welcome to your personal finance dashboard. Here you can manage your budget, track expenses, and monitor savings.
        </p>
      </section>
      <section className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4">
          <BudgetForm revalidate={revalidate} setRevalidate={setRevalidate} />
        </div>
        {currentBudget?.id && <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4">
          <MonthForm budgetId={currentBudget?.id!} revalidate={revalidate} setRevalidate={setRevalidate} />
        </div>}
      </section>
      <section className="w-full max-w-3xl mx-auto mt-8 px-2 sm:px-0">
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Budget Overview</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <span className="text-sm text-gray-500 mb-1">Select Year</span>
            <SelectField dataArr={allBudget} title={"Year"} onChange={onChange} />
          </div>
          <div className="flex-1 bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <span className="text-sm text-gray-500 mb-1">Select Month</span>
            <SelectField dataArr={allMonths} title={"Month"} onChange={onChange} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Year: <span className="font-bold text-blue-600">{currentBudget?.year ?? "—"}</span></h3>
          <h4 className="text-md text-gray-600">Month: <span className="font-bold text-blue-600">{currentMonth?.month ?? "—"}</span></h4>
        </div>
      </section>
      <section className="w-full max-w-3xl mx-auto mt-8 px-2 sm:px-0">
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Data List</h2>
        <DataList currentMonth={currentMonth} currentBudget={currentBudget} userId={userId}/>
      </section>
      <section>
        <ChartsSection budgetId={currentBudget?.id!} monthId={currentMonth?.id!} />
      </section>
    </main>
  );
}
