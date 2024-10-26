// src/app/page.js
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Our Platform</h1>
        <p className="text-gray-600">Please select an option to continue.</p>

        <div className="flex flex-col space-y-4">
          <Link href="/login" className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold transition duration-300 hover:bg-blue-700">
            Login
          </Link>
          
          <Link href="/signup" className="w-full py-3 rounded-md bg-green-600 text-white font-semibold transition duration-300 hover:bg-green-700">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
