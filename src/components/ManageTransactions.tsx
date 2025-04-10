import React from 'react';
import { useExpenseContext } from "../context/ExpenseContext";
import { Transaction } from "../types";  // نوع Transaction از types

const ManageTransactions: React.FC = () => {
  const { transactions, deleteTransaction, editTransaction } = useExpenseContext();

  // متد برای ویرایش تراکنش
  const handleEdit = (id: number) => {
    const updatedTransaction: Transaction = {
      id,
      title: '',  // عنوان جدید
      amount: 0,  // مبلغ جدید
      type: 'expense',  // مقدار مناسب برای type (می‌تواند 'income' یا 'expense' باشد)
      date: new Date().toISOString(),  // تاریخ (به فرمت مناسب)
      category: '',  // دسته‌بندی تراکنش
      walletId: 1,  // شناسه کیف پول (باید از مقدار صحیح استفاده کنید)
    };
    // ارسال updatedTransaction به متد editTransaction
    editTransaction(id, updatedTransaction);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">مدیریت تراکنش‌ها</h3>
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">هیچ تراکنشی ثبت نشده است.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center p-2">
              <span>{transaction.title} - {transaction.amount} تومان</span>
              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="text-red-500 hover:text-red-700"
              >
                حذف
              </button>
              <button
                onClick={() => handleEdit(transaction.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                ویرایش
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageTransactions;
