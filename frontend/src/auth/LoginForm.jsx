// 


import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser, btnLoading } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting login...");
    await loginUser(email, password, navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center text-sm mb-8">
          Login to your{" "}
          <span className="text-yellow-500 font-semibold">EceraLearn</span>{" "}
          account and continue your journey.
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-black text-white border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-black text-white border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={btnLoading}
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded-full hover:bg-yellow-400 transition duration-200 disabled:opacity-50"
          >
            {btnLoading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Switch to Register */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
