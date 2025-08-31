import { useState, createContext ,useEffect} from "react";
import toast from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

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

      console.log('Response:', response.data);

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
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
    }
  }

  async function fetchUserProfile() {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

      const {data} = await axios.get(`${backendUrl}/api/users/profile`, {
        headers: {
          token: localStorage.getItem("token")
        }
      });

      if (data) {
        setUser(data.user);
        setAuth(true);
        setLoading(false);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch user profile";
      toast.error(errorMessage);
      setLoading(false);
      console.error("Fetch user profile error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
    }
  } 

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, auth, btnLoading, loginUser, setAuth, setUser ,setLoading, loading ,fetchUserProfile}}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;