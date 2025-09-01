// 

import { useState, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate()

    // Token check helper function
    const hasValidToken = () => {
        const token = localStorage.getItem("token");
        return token && token.length > 0;
    };

    async function loginUser(email, password, navigate) {
        setBtnLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

            const response = await axios.post(
                `${backendUrl}/api/users/login`,
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Login Response:', response.data);

            if (!response.data.token) {
                throw new Error("No token received");
            }

            toast.success(response.data.message || "Login successful!");
            localStorage.setItem("token", response.data.token);
            setUser(response.data.user);
            setAuth(true);
            setBtnLoading(false);
            if (navigate) navigate("/");
        } catch (error) {
            setBtnLoading(false);
            const errorMessage = error.response?.data?.message || "Login failed";
            toast.error(errorMessage);
            console.error("Login error:", error);
        }
    }

    async function fetchUserProfile() {
        // Don't make API call if no token exists
        if (!hasValidToken()) {
            setLoading(false);
            setAuth(false);
            setUser(null);
            return;
        }

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
            const token = localStorage.getItem("token");

            const { data } = await axios.get(`${backendUrl}/api/users/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Changed token format
                }
            });

            if (data && data.user) {
                setUser(data.user);
                setAuth(true);
            } else {
                // If no user data, clear auth state
                setAuth(false);
                setUser(null);
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.error("Profile fetch error:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            // Clear auth state on error
            setAuth(false);
            setUser(null);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    }

    async function registerUser(name, email, password, navigate) {
        setBtnLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

            const response = await axios.post(
                `${backendUrl}/api/users/register`,
                { name, email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.data.activationToken) {
                throw new Error("No activation token received");
            }

            toast.success(response.data.message || "Registration successful!");
            localStorage.setItem("activationToken", response.data.activationToken);
            setBtnLoading(false);
            if (navigate) navigate("/verify");
        } catch (error) {
            setBtnLoading(false);
            const errorMessage = error.response?.data?.message || "Registration failed";
            toast.error(errorMessage);
            console.error("Registration error:", error);
        }
    }
   async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
        const activationToken = localStorage.getItem("activationToken");

        if (!activationToken) {
            toast.error("Session expired. Please register again.");
            navigate("/register");
            return;
        }

        const response = await axios.post(
            `${backendUrl}/api/users/verify`,
            { activationToken, otp },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Verification Response:', response.data);

        if (response.data.success || response.data.user) {
            toast.success("Account verified successfully!");
            localStorage.removeItem("activationToken"); // Clear the activation token
            if (navigate) navigate("/login");
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Verification failed";
        
        // Handle specific error cases
        if (error.response?.status === 401 && error.response?.data?.message?.includes("expired")) {
            toast.error("Verification session expired. Please register again.");
            localStorage.removeItem("activationToken");
            if (navigate) navigate("/register");
        } else {
            toast.error(errorMessage);
        }
        
        console.error("Verification error:", {
            status: error.response?.status,
            message: error.response?.data?.message || error.message
        });
    } finally {
        setBtnLoading(false);
    }
}

    // Logout function
    const logout = (navigate) => {
        localStorage.removeItem("token");
        setUser(null);
        setAuth(false);
        if (navigate) navigate("/login");
    };

    // Check auth status on mount
    useEffect(() => {
        if (hasValidToken()) {
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider
            value={{ 
                user, 
                auth, 
                btnLoading, 
                loginUser, 
                logout,
                setAuth, 
                setUser, 
                loading, 
                fetchUserProfile, 
                registerUser,
                verifyOtp
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;