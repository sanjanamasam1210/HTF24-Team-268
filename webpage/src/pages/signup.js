// src/app/signup/page.js
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", rollNo: "", year: "1", gender: "Female", branch: "CSE"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/signup", {
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
        <h2 className="text-3xl font-semibold text-center text-gray-800">Create an Account</h2>
        
        <input name="name" placeholder="Full Name" onChange={handleChange} className="input-field" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input-field" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input-field" />
        <input name="rollNo" placeholder="Roll Number" onChange={handleChange} className="input-field" />

        <div className="flex gap-4">
          <select name="year" onChange={handleChange} value={formData.year} className="input-field">
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>

          <select name="gender" onChange={handleChange} value={formData.gender} className="input-field">
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>

          <select name="branch" onChange={handleChange} value={formData.branch} className="input-field">
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Sign Up</button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?
          <Link href="/login" className="text-blue-600 hover:underline ml-2">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
