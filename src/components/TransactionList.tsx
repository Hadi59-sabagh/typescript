// src/components/TransactionList.tsx

import React from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import { Transaction, Wallet } from "../types";

const TransactionList: React.FC = () => {
  const { transactions, deleteTransaction, wallets } = useExpenseContext();

  const getWalletName = (walletId: number): string => {
    const wallet = wallets.find((w: Wallet) => w.id === walletId);
    return wallet ? wallet.name : "نامشخص";
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-bold mb-4">لیست تراکنش‌ها</h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-600">تراکنشی ثبت نشده است.</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((transaction: Transaction) => (
            <li
              key={transaction.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-semibold">{transaction.title}</p>
                <p className="text-sm text-gray-500">
                  مبلغ:{" "}
                  <span
                    className={
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {transaction.amount} تومان
                  </span>{" "}
                  - دسته: {transaction.category} -{" "}
                  کیف پول: {getWalletName(transaction.walletId)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  تاریخ: {new Date(transaction.date).toLocaleDateString("fa-IR")}
                </p>
              </div>

              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="text-sm text-red-500 hover:underline"
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
