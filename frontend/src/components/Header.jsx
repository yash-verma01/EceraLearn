import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger icons

const Header = ({ auth }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-yellow-500 cursor-pointer"
        >
          EceraLearn
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-white font-medium">
          <Link to="/" className="hover:text-yellow-500 transition">Home</Link>
          <Link to="/courses" className="hover:text-yellow-500 transition">Courses</Link>
          <Link to="/about" className="hover:text-yellow-500 transition">About</Link>
          {
            auth?<Link to="/account" className="hover:text-yellow-500 transition">Account</Link>:
            <Link to="/login" className="hover:text-yellow-500 transition">Login</Link>
          }
          
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg border-t border-gray-800 transition-all duration-300">
          <nav className="flex flex-col space-y-4 px-6 py-4 text-white font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-yellow-500 transition">Home</Link>
            <Link to="/courses" onClick={() => setMenuOpen(false)} className="hover:text-yellow-500 transition">Courses</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-yellow-500 transition">About</Link>
            {
                auth ? (
                    <Link to="/account" onClick={() => setMenuOpen(false)} className="hover:text-yellow-500 transition">Account</Link>
                ) : (
                    <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-yellow-500 transition">Login</Link>
                )
            }
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
