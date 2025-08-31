import React from "react";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Text Section */}
        <p className="text-center md:text-left text-sm">
          &copy; {new Date().getFullYear()} EceraLearn. All rights reserved. <br />
          Made with ❤️ by{" "}
          <a href="#" className="text-yellow-500 hover:underline">
            Yash Verma
          </a>
        </p>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0 text-2xl">
          <a href="#" className="hover:text-yellow-500 transition">
            <AiFillFacebook />
          </a>
          <a href="#" className="hover:text-yellow-500 transition">
            <AiFillTwitterSquare />
          </a>
          <a href="#" className="hover:text-yellow-500 transition">
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
