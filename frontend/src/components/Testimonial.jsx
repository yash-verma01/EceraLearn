import React from "react";

const Testimonial = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Aarav Mehta",
      position: "Computer Science Student",
      message:
        "EceraLearn transformed the way I study! The structured lessons and engaging content make learning so much fun.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Emily Johnson",
      position: "Business Student",
      message:
        "The interactive quizzes and real-world case studies helped me apply what I learned instantly in my projects.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Rahul Sharma",
      position: "Software Engineer",
      message:
        "The certifications boosted my portfolio and gave me the confidence to switch careers successfully.",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
    },
  ];

  return (
    <section className="bg-black py-20 px-6">
      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-16">
        What Our <span className="text-yellow-500">Students Say</span>
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonialsData.map((e) => (
          <div
            key={e.id}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-yellow-500 transition duration-300 shadow-lg"
          >
            {/* Student Image */}
            <div className="flex justify-center mb-4">
              <img
                src={e.image}
                alt={e.name}
                className="w-20 h-20 rounded-full border-2 border-yellow-500 object-cover"
              />
            </div>

            {/* Message */}
            <p className="text-gray-300 italic mb-4">"{e.message}"</p>

            {/* Info */}
            <div>
              <p className="text-lg font-semibold text-white">{e.name}</p>
              <p className="text-yellow-500 text-sm">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
