import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import { User } from "../types";

const Login: React.FC = () => {
  const { setUser } = useExpenseContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("لطفاً ایمیل و رمز عبور را وارد کنید.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("ایمیل وارد شده معتبر نیست.");
      return;
    }

    // حذف password از user و فقط استفاده از email
    const user: User = { id: Date.now(), name: "نام کاربری", email }; // از id به طور تصادفی با Date.now() استفاده کرده‌ایم
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("password", password); // در صورت نیاز می‌توانید password را در localStorage ذخیره کنید
    setUser(user);
    setError("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">ورود / ثبت‌نام</h2>

      {error && <p className="text-red-500 text-center mb-3">{error}</p>}

      <input
        type="email"
        placeholder="ایمیل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <input
        type="password"
        placeholder="رمز عبور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />

      <button
        onClick={handleLogin}
        className="w-full p-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
      >
        ورود / ثبت‌نام
      </button>
    </div>
  );
};

export default Login;
