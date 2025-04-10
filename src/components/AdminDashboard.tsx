// src/components/AdminDashboard.tsx

import React from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import { Transaction } from "../types";

const AdminDashboard: React.FC = () => {
  const { transactions, wallets, reminders, user } = useExpenseContext();

  const totalIncome = transactions
    .filter((t: Transaction) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t: Transaction) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        داشبورد مدیریتی
      </h2>

      {user && (
        <p className="text-center text-sm text-gray-600 mb-4">
          کاربر فعال: <span className="font-semibold">{user.email}</span>
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-gray-700 font-medium">
        <div className="bg-gray-100 p-4 rounded shadow">
          <p>تعداد تراکنش‌ها</p>
          <h4 className="text-xl font-bold">{transactions.length}</h4>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow">
          <p>تعداد کیف پول‌ها</p>
          <h4 className="text-xl font-bold">{wallets.length}</h4>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow">
          <p>یادآوری‌ها</p>
          <h4 className="text-xl font-bold">{reminders.length}</h4>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow">
          <p>درآمد کل</p>
          <h4 className="text-green-600 text-xl font-bold">{totalIncome} تومان</h4>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow col-span-2 md:col-span-4">
          <p>هزینه کل</p>
          <h4 className="text-red-600 text-xl font-bold">{totalExpense} تومان</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
