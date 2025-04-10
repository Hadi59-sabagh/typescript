// src/components/ExportTransactions.tsx

import React from "react";
import { CSVLink } from "react-csv";
import { useExpenseContext } from "../context/ExpenseContext";
import { Transaction } from "../types";

const ExportTransactions: React.FC = () => {
  const { transactions } = useExpenseContext();

  const headers = [
    { label: "عنوان", key: "title" },
    { label: "مبلغ", key: "amount" },
    { label: "تاریخ", key: "date" },
    { label: "دسته‌بندی", key: "category" },
    { label: "نوع", key: "type" },
  ];

  const data = transactions.map((t: Transaction) => ({
    title: t.title,
    amount: t.amount,
    date: new Date(t.date).toLocaleDateString("fa-IR"),
    category: t.category,
    type: t.type === "income" ? "درآمد" : "هزینه",
  }));

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-lg font-bold mb-4">دانلود تراکنش‌ها (CSV)</h2>
      <p className="text-sm text-gray-600 mb-3">برای گرفتن نسخه پشتیبان از تراکنش‌ها</p>
      <CSVLink
        headers={headers}
        data={data}
        filename="transactions.csv"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        دانلود CSV
      </CSVLink>
    </div>
  );
};

export default ExportTransactions;
