import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center py-16 px-6">
      {/* Title */}
      <h2 className="text-4xl font-bold mb-6 border-b-4 border-yellow-500 pb-2">
        About Us
      </h2>

      {/* Main Description */}
      <p className="max-w-3xl text-lg text-gray-300 text-center leading-relaxed mb-12">
        At <span className="text-yellow-500 font-semibold">EceraLearn</span>, we are passionate 
        about empowering learners with high-quality online courses designed to 
        build <span className="text-yellow-500">real-world skills</span>.  
        With expert instructors, interactive lessons, and practical projects, 
        we ensure every learner gains both <span className="text-yellow-500">knowledge</span> and 
        <span className="text-yellow-500"> confidence</span> to succeed.
      </p>

      {/* Mission, Vision, Why Choose Us Section */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl w-full">
        {/* Mission */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 hover:border-yellow-500 transition">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-3">
            🎯 Our Mission
          </h3>
          <p className="text-gray-300">
            To provide accessible and effective online education that equips
            learners with skills for their personal and professional growth.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 hover:border-yellow-500 transition">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-3">
            👁 Our Vision
          </h3>
          <p className="text-gray-300">
            To become a trusted global platform for learning, where students and
            professionals can explore, learn, and thrive together.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 hover:border-yellow-500 transition">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-3">
            🚀 Why Choose Us
          </h3>
          <ul className="text-gray-300 list-disc pl-5 space-y-2 text-left">
            <li>Expert & certified instructors</li>
            <li>Hands-on projects & case studies</li>
            <li>Flexible learning experience</li>
            <li>Supportive learning community</li>
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold mb-4">
          Ready to start your learning journey?
        </h3>
        <button
          onClick={() => navigate("/courses")}
          className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-400 transition"
        >
          Explore Courses
        </button>
      </div>
    </div>
  );
};

export default About;
