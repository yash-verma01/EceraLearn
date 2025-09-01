import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../context/UserContext";  // Fix import
import { CourseContext } from "../context/CourseContext";  // Fix import

const CourseTemplate = ({ course }) => {
  const navigate = useNavigate();
  const { user, auth } = useContext(UserContext);  // Changed isAuth to auth
  const { fetchAllCourses } = useContext(CourseContext);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  if (!course) return null;

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const { data } = await axios.delete(`${backendUrl}/api/courses/course/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        toast.success(data.message || "Course deleted");
        fetchAllCourses();
      } catch (error) {
        console.error("Delete error:", error);
        toast.error(error.response?.data?.message || "Failed to delete course");
      }
    }
  };

  return (
    <div className="course-card bg-black text-white rounded-2xl shadow-lg overflow-hidden border border-yellow-500 hover:shadow-yellow-500/40 hover:scale-105 transition-transform duration-300 p-5">
      {course.image && (
        <img
          src={`${backendUrl}/${course.image}`}
          alt={course.title}
          className="w-full h-48 object-cover rounded-xl mb-4"
          onError={(e) => {
            e.target.src = "/placeholder-course.jpg";
          }}
        />
      )}

      <h3 className="text-xl font-bold text-yellow-400 mb-2">
        {course.title || "Untitled Course"}
      </h3>
      <p className="text-sm text-gray-300 mb-1">
        Instructor: <span className="text-white">{course.createdBy || "Unknown"}</span>
      </p>
      <p className="text-sm text-gray-300 mb-1">
        Duration: <span className="text-white">{course.duration || "N/A"} weeks</span>
      </p>
      <p className="text-lg font-semibold text-yellow-400 mb-4">
        ₹ {course.price || "0"}
      </p>

      {auth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {Array.isArray(user.subscription) &&
              user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl hover:bg-yellow-400 transition-colors"
                >
                  Study Now
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl hover:bg-yellow-400 transition-colors"
                >
                  Enroll Now
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl hover:bg-yellow-400 transition-colors"
            >
              View Course
            </button>
          )}
        </>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl hover:bg-yellow-400 transition-colors"
        >
          Login to Enroll
        </button>
      )}

      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-500 transition-colors mt-2"
        >
          Delete Course
        </button>
      )}
    </div>
  );
};

export default CourseTemplate;