// 


import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import toast from "react-hot-toast";

const VerifyForm = () => {
  const [otp, setOtp] = useState("");
  const { verifyOtp, btnLoading } = useContext(UserContext);
  const navigate = useNavigate();

  // Check for activation token on mount
  useEffect(() => {
    const token = localStorage.getItem("activationToken");
    if (!token) {
      toast.error("Please register first");
      navigate("/register");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    await verifyOtp(otp, navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-yellow-500 mb-6">
          Verify Your Account
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Enter the 6-digit OTP sent to your registered email.
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-300 mb-2 text-left"
            >
              Enter OTP
            </label>
            <input
              type="number"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength="6"
              className="w-full px-4 py-3 bg-black text-white border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="6-digit OTP"
            />
          </div>

          <button
            type="submit"
            disabled={btnLoading}
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded-full hover:bg-yellow-400 transition duration-200 disabled:opacity-50"
          >
            {btnLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Didn’t receive OTP?{" "}
          <Link
            to="/register"
            className="text-yellow-500 font-semibold hover:underline"
          >
            Register Again
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyForm;
