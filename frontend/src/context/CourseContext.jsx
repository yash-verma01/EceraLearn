import { createContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Create the context
export const CourseContext = createContext();

// Create the provider
export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAllCourses = async () => {
        setLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
            const response = await axios.get(`${backendUrl}/api/courses/course/all`);
            
            console.log('Courses response:', response.data);
            
            if (response.data.success) {
                setCourses(response.data.courses);
            } else {
                setCourses([]);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
            toast.error("Failed to load courses");
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CourseContext.Provider 
            value={{
                courses,
                loading,
                fetchAllCourses
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};