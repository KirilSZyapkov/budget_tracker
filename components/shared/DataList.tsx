"use client";

import DataForm from "@/components/forms/DataForm";

export default function DataList() {
  return (
    <div className="w-full max-w-4xl mx-auto px-2 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Income */}
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Incomes</h2>
        <DataForm />
        <div className="space-y-2">
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-700">Заплата</p>
            <p className="font-bold text-green-600">1500lv</p>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-700">Бизнес</p>
            <p className="font-bold text-green-600">500lv</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Други</p>
            <p className="font-bold text-green-600">500lv</p>
          </div>
        </div>
      </div>
      {/* Bills */}
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Сметки</h2>
        <DataForm />
        <div className="space-y-2">
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-700">Ток</p>
            <p className="font-bold text-red-600">1500lv</p>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-700">Вода</p>
            <p className="font-bold text-red-600">500lv</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Кола</p>
            <p className="font-bold text-red-600">500lv</p>
          </div>
        </div>
      </div>
      {/* Expenses */}
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Разходи</h2>
        <DataForm />
        <div className="space-y-2">
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-700">Храна</p>
            <p className="font-bold text-red-600">1500lv</p>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-700">Гориво</p>
            <p className="font-bold text-red-600">500lv</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Дрехи</p>
            <p className="font-bold text-red-600">500lv</p>
          </div>
        </div>
      </div>
      {/* Savings */}
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Спестявания</h2>
        <DataForm />
        <div className="space-y-2">
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-700">За почивки</p>
            <p className="font-bold text-yellow-600">1500lv</p>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-700">За здраве</p>
            <p className="font-bold text-yellow-600">500lv</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Други</p>
            <p className="font-bold text-yellow-600">500lv</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 'income' | 'bills' | 'expenses' | 'saving'