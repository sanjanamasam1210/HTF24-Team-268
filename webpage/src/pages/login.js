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
    <div className="outer-container">
      <div className="box-container">
        <form onSubmit={handleSubmit} className="form-container space-y-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome Back!</h2>

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
            <button type="submit" className="submit-button">Log In</button>
          </div>

          <p className="text-gray-600">
            Don’t have an account?
            <Link href="/signup" className="text-blue-600 hover:underline ml-2">
              Sign Up
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
          max-width: 300px;
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
          margin-bottom: 0.6rem;
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
