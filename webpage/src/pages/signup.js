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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 ">
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md space-y-6 text-center">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-xl w-full max-w-lg space-y-8">
        
        <h2 className="text-3xl font-semibold text-center justify-center text-gray-800 mb-8">Create an Account</h2>
        
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="input-field"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="input-field"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="input-field"
        />
        <input
          name="rollNo"
          placeholder="Roll Number"
          onChange={handleChange}
          className="input-field"
        />

        <div className="flex flex-col space-y-4">
          <select
            name="year"
            onChange={handleChange}
            value={formData.year}
            className="input-field"
          >
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>

          <select
            name="gender"
            onChange={handleChange}
            value={formData.gender}
            className="input-field"
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>

          <select
            name="branch"
            onChange={handleChange}
            value={formData.branch}
            className="input-field"
          >
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
  

      <style jsx>{`
        /* Input Fields */
        .input-field {
          width: 80%; /* Limit width to a fixed size */
          max-width: 300px; /* Prevent excessive stretching */
          margin: 0 auto; /* Center-align fields */
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #d1d5db; /* Light gray border */
          border-radius: 0.5rem;
          outline: none;
          transition: box-shadow 0.2s;
          background-color: #f9fafb; /* Light background for a soft look */
        }
        .input-field:focus {
          border-color: #3b82f6; /* Blue border on focus */
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2); /* Blue focus shadow */
        }

        /* Submit Button */
        .submit-button {
          width: 80%; /* Limit width to a fixed size */
          max-width: 300px; /* Prevent excessive stretching */
          margin: 0 auto; /* Center-align button */
          padding: 0.75rem;
          font-size: 1rem;
          font-weight: bold;
          color: #ffffff;
          background-color: #10b981; /* Green background */
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }
        .submit-button:hover {
          background-color: #2563eb; /* Blue on hover */
          transform: translateY(-2px); /* Subtle lift effect */
        }
      `}</style>
    </div>
    </div>
  );
}
