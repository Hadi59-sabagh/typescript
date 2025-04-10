// src/components/TransferWallet.tsx

import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import { Wallet } from "../types";

const TransferWallet: React.FC = () => {
  const { wallets, addTransaction } = useExpenseContext();

  const [fromWallet, setFromWallet] = useState<number>(0);
  const [toWallet, setToWallet] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleTransfer = () => {
    if (fromWallet === toWallet) {
      setError("انتقال بین یک کیف پول امکان‌پذیر نیست.");
      return;
    }

    if (!fromWallet || !toWallet || amount <= 0) {
      setError("لطفاً مقادیر را به درستی وارد کنید.");
      return;
    }

    // ثبت دو تراکنش، یکی منفی یکی مثبت
    const now = new Date().toISOString();

    addTransaction({
      id: Date.now(),
      title: "انتقال وجه - خروج",
      amount: amount,
      type: "expense",
      date: now,
      category: "انتقال",
      walletId: fromWallet,
    });

    addTransaction({
      id: Date.now() + 1,
      title: "انتقال وجه - ورود",
      amount: amount,
      type: "income",
      date: now,
      category: "انتقال",
      walletId: toWallet,
    });

    setAmount(0);
    setFromWallet(0);
    setToWallet(0);
    setError("");
  };

  return (
    <div className="max-w-md mx-auto bg-white mt-10 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">انتقال وجه بین کیف پول‌ها</h2>

      {error && <p className="text-red-500 text-center mb-3">{error}</p>}

      <select
        value={fromWallet}
        onChange={(e) => setFromWallet(Number(e.target.value))}
        className="w-full p-3 border rounded mb-3"
      >
        <option value="">کیف پول مبدا</option>
        {wallets.map((wallet: Wallet) => (
          <option key={wallet.id} value={wallet.id}>
            {wallet.name}
          </option>
        ))}
      </select>

      <select
        value={toWallet}
        onChange={(e) => setToWallet(Number(e.target.value))}
        className="w-full p-3 border rounded mb-3"
      >
        <option value="">کیف پول مقصد</option>
        {wallets.map((wallet: Wallet) => (
          <option key={wallet.id} value={wallet.id}>
            {wallet.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="مبلغ انتقال"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-3 border rounded mb-4"
      />

      <button
        onClick={handleTransfer}
        className="w-full p-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        انجام انتقال
      </button>
    </div>
  );
};

export default TransferWallet;
