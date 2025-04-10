// فایل ManageWallets.tsx
import React from "react";
import { useExpenseContext } from "../context/ExpenseContext";

const ManageWallets: React.FC = () => {
  const { wallets, deleteWallet } = useExpenseContext();

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">مدیریت کیف پول‌ها</h3>
      {wallets.length === 0 ? (
        <p className="text-center text-gray-500">هیچ کیف پولی اضافه نشده است.</p>
      ) : (
        <ul>
          {wallets.map((wallet) => (
            <li key={wallet.id} className="flex justify-between items-center p-2">
              <span>{wallet.name} - موجودی: {wallet.balance} تومان</span>
              <button
                onClick={() => deleteWallet(Number(wallet.id))} // تبدیل wallet.id به number
                className="text-red-500 hover:text-red-700"
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

export default ManageWallets;
