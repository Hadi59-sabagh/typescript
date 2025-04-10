// src/components/AddTransaction.tsx

import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import { Transaction, Wallet } from "../types";

const AddTransaction: React.FC = () => {
  const { addTransaction, wallets } = useExpenseContext();

  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [walletId, setWalletId] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    if (!title || !amount || !date || !category || !walletId) {
      setError("لطفاً همه فیلدها را کامل کنید.");
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      title,
      amount,
      type,
      date,
      category,
      walletId,
    };

    addTransaction(newTransaction);
    setTitle("");
    setAmount(0);
    setDate("");
    setCategory("");
    setWalletId(0);
    setError("");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg mt-6">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <input
        type="text"
        placeholder="عنوان"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <input
        type="number"
        placeholder="مبلغ"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-3 border rounded mb-3"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <input
        type="text"
        placeholder="دسته‌بندی"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value as "income" | "expense")}
        className="w-full p-3 border rounded mb-3"
      >
        <option value="expense">هزینه</option>
        <option value="income">درآمد</option>
      </select>

      <select
        value={walletId}
        onChange={(e) => setWalletId(Number(e.target.value))}
        className="w-full p-3 border rounded mb-4"
      >
        <option value="">انتخاب کیف پول</option>
        {wallets.map((wallet: Wallet) => (
          <option key={wallet.id} value={wallet.id}>
            {wallet.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        افزودن تراکنش
      </button>
    </div>
  );
};

export default AddTransaction;
