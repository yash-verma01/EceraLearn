import React, { useContext, useEffect } from 'react';
import { CourseContext } from '../context/CourseContext';  // Fix import
import CourseTemplate from '../components/CourseTemplate';

const Course = () => {
  const { courses, loading, fetchAllCourses } = useContext(CourseContext);

  useEffect(() => {
    fetchAllCourses();
  }, []); 

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">All Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map(course => (
            <CourseTemplate key={course._id} course={course} />
          ))
        ) : (
          <div className="col-span-3 text-center text-yellow-400">
            No courses available
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;