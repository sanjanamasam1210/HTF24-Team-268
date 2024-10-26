// src/app/login/page.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

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

    if (res.ok) {
      if (data.role === 1) {
        router.push("/dashboard/organization");
      } else {
        router.push("/dashboard/student");
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="box-container bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">

   
        <form onSubmit={handleSubmit} className="space-y-8">
          <h2 className="text-3xl font-semibold text-center text-gray-800">Welcome Back!</h2>

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

          <button type="submit" className="submit-button">Log In</button>

          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?
            <Link href="/signup" className="text-blue-600 hover:underline ml-2">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      <style jsx>{`
        /* Input Fields */
        .box-container {
          padding: 2rem;
          background-color: #ffffff;
          border-radius: 1rem;
          box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1); /* Soft shadow */
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
  );
}
