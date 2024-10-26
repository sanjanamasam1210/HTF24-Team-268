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
    <div className="outer-container">
      <div className="box-container">
        <form onSubmit={handleSubmit} className="form-container space-y-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Create an Account</h2>

          <div className="input-group">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <input
              name="rollNo"
              placeholder="Roll Number"
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-group">
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
          </div>

          <div className="input-group">
            <select
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              className="input-field"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>

          <div className="input-group">
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

          <div className="input-group">
            <button type="submit" className="submit-button">Sign Up</button>
          </div>

          <p className="text-gray-600">
            Already have an account?
            <Link href="/login" className="text-blue-600 hover:underline ml-2">
              Log In
            </Link>
          </p>
        </form>
      </div>

      <style jsx>{`
        .outer-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f3f4f6;
          padding: 0 1rem;
        }
        .box-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #D3D3D3;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
          max-width: 400px;
          width: 100%;
        }
        .form-container {
          width: 100%;
          max-width: 300px; /* Limit form width to prevent stretching */
          text-align: center;
        }
        .input-field {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          background-color: #f9fafb;
        }
        .input-group {
          display: flex;
          justify-content: center;
          margin-bottom:0.6rem;
        }
        .submit-button {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          font-weight: bold;
          color: #ffffff;
          background-color: #10b981;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }
        .submit-button:hover {
          background-color: #2563eb;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
