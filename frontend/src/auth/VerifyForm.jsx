import React from "react";
import { Link } from "react-router-dom";

const Verify = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify Account
        </h2>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              OTP
            </label>
            <input
              type="number"
              id="otp"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition"
          >
            Verify
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Go to{" "}
          <Link
            to="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Verify;
