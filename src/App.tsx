// src/App.tsx
import React from "react";
import { ExpenseProvider } from "./context/ExpenseContext";
import AddWallet from "./components/AddWallet";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import Reminder from "./components/Reminder";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import "./styles.css";

const App: React.FC = () => {
  return (
    <ExpenseProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">مدیریت هزینه‌ها</h1>
        <Login />
        <AddWallet />
        <AddTransaction />
        <TransactionList />
        <Reminder />
        <AdminDashboard />
      </div>
    </ExpenseProvider>
  );
};

export default App;
