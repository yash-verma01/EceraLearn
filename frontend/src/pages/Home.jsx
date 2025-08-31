import React from "react";
import { useNavigate } from "react-router-dom";
import Testimonial from "../components/Testimonial";
import Footer from "../components/footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="h-[75vh] w-full flex flex-col items-center justify-center bg-black px-6 text-center">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
          Welcome to <span className="text-yellow-500">EceraLearn</span>
        </h1>

        {/* Sub Heading */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mb-6">
          Your journey to <span className="text-yellow-500">Knowledge</span> and{" "}
          <span className="text-yellow-500">Growth</span> starts here.  
          Explore curated courses, boost your skills, and achieve excellence.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/courses")}
            className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-400 shadow-lg transition duration-200 text-base sm:text-lg"
          >
            Explore Courses
          </button>

          <button
            onClick={() => navigate("/about")}
            className="border-2 border-yellow-500 text-yellow-500 font-bold py-3 px-6 rounded-full hover:bg-yellow-500 hover:text-black transition duration-200 text-base sm:text-lg"
          >
            Learn More
          </button>
        </div>

        {/* Footer Quote */}
        <p className="mt-8 text-gray-400 italic text-base sm:text-lg max-w-xl">
          "Education is the most powerful weapon which you can use to change the world." – Nelson Mandela
        </p>
      </div>

      {/* Features Section */}
      <div className="bg-black py-16 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
          Why <span className="text-yellow-500">Choose Us?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Expert Courses */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-yellow-500 transition">
            <h3 className="text-xl font-semibold text-white mb-2">Expert Courses</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Learn from industry leaders with real-world experience and insights.
            </p>
          </div>

          {/* Certification */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-yellow-500 transition">
            <h3 className="text-xl font-semibold text-white mb-2">Certification</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Earn recognized certificates to boost your resume and career profile.
            </p>
          </div>

          {/* Community */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-yellow-500 transition">
            <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Join a vibrant community of learners and collaborate on projects.
            </p>
          </div>
        </div>
      </div>
      <Testimonial />
      <Footer />
    </>
  );
};

export default Home;
