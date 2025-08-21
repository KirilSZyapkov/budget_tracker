"use client";

import EntriesForm from "@/components/forms/EntriesForm";
import { entries } from "@/drizzle/schemas/entries";
import { budgets } from "@/drizzle/schemas/budgets";
import { months } from "@/drizzle/schemas/months";
import { useState, useEffect } from "react";
import { useApiFetch } from "@/hooks/useApiFetch";
import { transformArray } from "@/lib/helpers";

type Budget = typeof budgets.$inferSelect;
type Month = typeof months.$inferSelect;
type Entries = typeof entries.$inferSelect;
type Result = {
  data: { name: string; amount: string }[];
  type: string;
};


export default function DataList({ currentBudget, currentMonth, userId }: { currentBudget?: Budget, currentMonth?: Month, userId?: string | null }) {
  const [allEntries, setAllEntries] = useState<Result[]>([]);
  const [revalidate, setRevalidate] = useState(false);


  useEffect(() => {
    async function fetchData() {
      if (!currentBudget?.id || !currentMonth?.id) return;

      const responseEntries = await useApiFetch(`/api/entries?budgetId=${currentBudget?.id}&monthId=${currentMonth?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }, "Faild to fetch data!") as Entries[];



      if (responseEntries) {
        setAllEntries(transformArray(responseEntries));
      };
    }
    fetchData();
  }, [currentBudget, currentMonth]);

  console.log(allEntries);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 py-6 grid grid-cols-1 gap-6">
      {/* Income */}
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4 border-2">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Income</h2>
        <EntriesForm userId={userId} budgetId={currentBudget?.id} monthId={currentMonth?.id} type="income" setAllEntries={setAllEntries}/>
        <div className="space-y-2">
          {allEntries.map(({ type, data }, index) => (
            type === "income" &&
            data.map(({name, amount}, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <p className="text-gray-700">{name}</p>
                <p className="font-bold text-green-600">{amount}lv</p>
              </div>)
            )))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4 border-2">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Expenses</h2>
        <EntriesForm userId={userId} budgetId={currentBudget?.id} monthId={currentMonth?.id} type="expenses" setAllEntries={setAllEntries}/>
        <div className="space-y-2">
          {allEntries.map(({ type, data }, index) => (
            type === "expenses" &&
            data.map(({name, amount}, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <p className="text-gray-700">{name}</p>
                <p className="font-bold text-green-600">{amount}lv</p>
              </div>)
            )))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4 border-2">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Savings</h2>
        <EntriesForm userId={userId} budgetId={currentBudget?.id} monthId={currentMonth?.id} type="savings" setAllEntries={setAllEntries}/>
        <div className="space-y-2">
          {allEntries.map(({ type, data }, index) => (
            type === "savings" &&
            data.map(({name, amount}, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <p className="text-gray-700">{name}</p>
                <p className="font-bold text-green-600">{amount}lv</p>
              </div>)
            )))}
        </div>
      </div>
    </div>
  );
}

// 'income' | 'bills' | 'expenses' | 'saving'

<div className="space-y-2">

</div> 