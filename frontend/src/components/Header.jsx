import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons for hamburger

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          E-Learning
        </div>

        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/courses" className="hover:text-blue-600">Courses</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/account" className="hover:text-blue-600">Account</Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <nav className="flex flex-col space-y-4 px-6 py-4 text-gray-700 font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Home</Link>
            <Link to="/courses" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Courses</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">About</Link>
            <Link to="/account" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Account</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Login</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
