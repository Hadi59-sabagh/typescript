// src/components/ExpenseChart.tsx

import React from "react";
import { Pie, Line } from "react-chartjs-2";
import { useExpenseContext } from "../context/ExpenseContext";
import { Transaction } from "../types";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const ExpenseChart: React.FC = () => {
  const { transactions } = useExpenseContext();

  const categories = Array.from(new Set(transactions.map((t) => t.category)));

  const categorySums = categories.map((category) => {
    return transactions
      .filter((t) => t.category === category && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const pieData = {
    labels: categories,
    datasets: [
      {
        label: "هزینه‌ها",
        data: categorySums,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#E7E9ED"],
      },
    ],
  };

  const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const lineData = {
    labels: sorted.map((t) => new Date(t.date).toLocaleDateString("fa-IR")),
    datasets: [
      {
        label: "درآمد",
        data: sorted.filter((t) => t.type === "income").map((t) => t.amount),
        borderColor: "green",
        fill: false,
      },
      {
        label: "هزینه",
        data: sorted.filter((t) => t.type === "expense").map((t) => t.amount),
        borderColor: "red",
        fill: false,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-center mb-4">نمودار دایره‌ای هزینه‌ها بر اساس دسته‌بندی</h3>
        <Pie data={pieData} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-center mb-4">روند درآمد / هزینه در طول زمان</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default ExpenseChart;
