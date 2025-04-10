import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import { ReminderType } from "../types";

const ReminderComponent: React.FC = () => {
  const { addReminder, reminders } = useExpenseContext();

  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [repeat, setRepeat] = useState<ReminderType["repeat"]>("monthly");
  const [amount, setAmount] = useState<number>(0); // اضافه کردن مقدار amount
  const [error, setError] = useState<string>("");

  const handleAddReminder = () => {
    if (!title || !date || !repeat || amount <= 0) {
      setError("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    const newReminder: ReminderType = {
      id: Date.now(), // به صورت عددی
      title,
      amount,
      date,
      repeat,
    };

    addReminder(newReminder);
    setTitle("");
    setDate("");
    setRepeat("monthly");
    setAmount(0); // بازنشانی مقدار amount
    setError("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-center">یادآوری پرداخت</h2>

      {error && <p className="text-red-500 text-center mb-3">{error}</p>}

      <input
        type="text"
        placeholder="عنوان یادآوری"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <select
        value={repeat}
        onChange={(e) => setRepeat(e.target.value as ReminderType["repeat"])}
        className="w-full p-3 border rounded mb-4"
      >
        <option value="daily">روزانه</option>
        <option value="weekly">هفتگی</option>
        <option value="monthly">ماهانه</option>
      </select>

      <input
        type="number"
        placeholder="مقدار پرداخت"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        className="w-full p-3 border rounded mb-3"
      />

      <button
        onClick={handleAddReminder}
        className="w-full p-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        افزودن یادآوری
      </button>

      {reminders.length > 0 && (
        <ul className="mt-6 space-y-2">
          {reminders.map((reminder) => (
            <li key={reminder.id} className="text-sm text-gray-700 border-b pb-1">
              {reminder.title} – {new Date(reminder.date).toLocaleDateString("fa-IR")} – تکرار: {reminder.repeat} – مقدار: {reminder.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReminderComponent;
