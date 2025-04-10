export type TransactionType = "income" | "expense";

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: TransactionType;
  date: string;
  category: string;
  walletId: number;
}

export interface Wallet {
  id: number;
  name: string;
  balance: number;
}

export interface ReminderType {
  id: number;
  title: string;
  amount: number;
  date: string;
  repeat: "daily" | "weekly" | "monthly";
}

export interface User {
  id: number;
  name: string;
  email: string;
}
