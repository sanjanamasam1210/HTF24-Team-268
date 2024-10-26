// src/app/login/page.js
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-xl w-full max-w-lg space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Welcome Back!</h2>

        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input-field" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input-field" />

        <button type="submit" className="submit-button">Log In</button>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?
          <Link href="/signup" className="text-blue-600 hover:underline ml-2">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
