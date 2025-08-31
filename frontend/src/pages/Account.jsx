import React from "react";

const Account = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="profile bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-yellow-500 mb-6">My Profile</h2>
        <div className="profile-info space-y-4">
          <p className="text-gray-300 text-lg">
            <strong className="text-white">Name:</strong> Prashant
          </p>
          <p className="text-gray-300 text-lg">
            <strong className="text-white">Email:</strong> Prashant@gmail.com
          </p>
          <button className="mt-6 w-full bg-yellow-500 text-black font-bold py-3 rounded-full hover:bg-yellow-400 transition duration-200">
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
