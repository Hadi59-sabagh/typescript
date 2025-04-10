import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Transaction, Wallet, ReminderType, User } from "../types";

// تعریف نوع state
type StateType = {
  transactions: Transaction[];
  wallets: Wallet[];  // تغییر نوع شناسه به number
  reminders: ReminderType[];
  user: User | null;
  categories: string[];
};

// تعریف action ها
type ActionType =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; payload: number }
  | { type: "EDIT_TRANSACTION"; payload: Transaction }
  | { type: "ADD_WALLET"; payload: Wallet }
  | { type: "ADD_CUSTOM_CATEGORY"; payload: string }
  | { type: "SET_USER"; payload: User }
  | { type: "ADD_REMINDER"; payload: ReminderType }
  | { type: "DELETE_REMINDER"; payload: number }
  | { type: "DELETE_WALLET"; payload: number };  // تغییر نوع شناسه برای حذف کیف پول به number

// وضعیت اولیه
const initialState: StateType = {
  transactions: JSON.parse(localStorage.getItem("transactions") || "[]"),
  wallets: JSON.parse(localStorage.getItem("wallets") || "[]") || [
    { id: 1, name: "کیف پول اصلی", balance: 0 }, // شناسه به عنوان number
  ],
  reminders: JSON.parse(localStorage.getItem("reminders") || "[]"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  categories: ["خوراک", "حمل و نقل", "قبوض", "تفریح"],
};

// کاهش‌دهنده (Reducer) برای مدیریت state
const expenseReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "ADD_TRANSACTION": {
      const updated = [...state.transactions, action.payload];
      localStorage.setItem("transactions", JSON.stringify(updated));
      return { ...state, transactions: updated };
    }
    case "DELETE_TRANSACTION": {
      const filtered = state.transactions.filter(
        (t) => t.id !== action.payload
      );
      localStorage.setItem("transactions", JSON.stringify(filtered));
      return { ...state, transactions: filtered };
    }
    case "EDIT_TRANSACTION": {
      const updatedTransactions = state.transactions.map((transaction) =>
        transaction.id === action.payload.id ? action.payload : transaction
      );
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      return { ...state, transactions: updatedTransactions };
    }
    case "ADD_WALLET": {
      const updated = [...state.wallets, action.payload];
      localStorage.setItem("wallets", JSON.stringify(updated));
      return { ...state, wallets: updated };
    }
    case "DELETE_WALLET": {
      const filtered = state.wallets.filter(
        (wallet) => wallet.id !== action.payload // استفاده از number برای حذف کیف پول
      );
      localStorage.setItem("wallets", JSON.stringify(filtered));
      return { ...state, wallets: filtered };
    }
    case "ADD_CUSTOM_CATEGORY": {
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    }
    case "SET_USER": {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    }
    case "ADD_REMINDER": {
      const updated = [...state.reminders, action.payload];
      localStorage.setItem("reminders", JSON.stringify(updated));
      return { ...state, reminders: updated };
    }
    case "DELETE_REMINDER": {
      const filtered = state.reminders.filter(
        (reminder) => reminder.id !== action.payload
      );
      localStorage.setItem("reminders", JSON.stringify(filtered));
      return { ...state, reminders: filtered };
    }
    default:
      return state;
  }
};

// تعریف نوع context
interface ExpenseContextProps extends StateType {
  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: number) => void;
  editTransaction: (id: number, updatedTransaction: Transaction) => void;
  addWallet: (w: Wallet) => void;
  addCustomCategory: (cat: string) => void;
  setUser: (u: User) => void;
  addReminder: (r: ReminderType) => void;
  deleteReminder: (id: number) => void;
  deleteWallet: (id: number) => void;  // تغییر نوع شناسه به number
}

// ایجاد context
const ExpenseContext = createContext<ExpenseContextProps | undefined>(undefined);

// فراهم کردن context برای استفاده در کامپوننت‌ها
export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  const value: ExpenseContextProps = {
    ...state,
    addTransaction: (t) => dispatch({ type: "ADD_TRANSACTION", payload: t }),
    deleteTransaction: (id) =>
      dispatch({ type: "DELETE_TRANSACTION", payload: id }),
    editTransaction: (id, updatedTransaction) =>
      dispatch({ type: "EDIT_TRANSACTION", payload: updatedTransaction }),
    addWallet: (w) => dispatch({ type: "ADD_WALLET", payload: w }),
    addCustomCategory: (c) =>
      dispatch({ type: "ADD_CUSTOM_CATEGORY", payload: c }),
    setUser: (u) => dispatch({ type: "SET_USER", payload: u }),
    addReminder: (r) => dispatch({ type: "ADD_REMINDER", payload: r }),
    deleteReminder: (id) => dispatch({ type: "DELETE_REMINDER", payload: id }),
    deleteWallet: (id) => dispatch({ type: "DELETE_WALLET", payload: id }), // حذف کیف پول با شناسه از نوع number
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

// hook برای دسترسی به context
export const useExpenseContext = (): ExpenseContextProps => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext باید درون ExpenseProvider استفاده شود.");
  }
  return context;
};
