import React from 'react';
import { useExpenseContext } from "../context/ExpenseContext";

// استفاده از ReminderType که قبلاً تعریف شده است
const ManageReminders: React.FC = () => {
  const { reminders, deleteReminder } = useExpenseContext();

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">یادآوری‌ها</h3>
      {reminders.length === 0 ? (
        <p className="text-center text-gray-500">هیچ یادآوری‌ای ثبت نشده است.</p>
      ) : (
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder.id} className="flex justify-between items-center p-2">
              <span>{reminder.title} - {new Date(reminder.date).toLocaleDateString("fa-IR")}</span>
              <button
                onClick={() => deleteReminder(reminder.id)} // حالا `id` باید از نوع `number` باشد
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

export default ManageReminders;
