import { createContext, useState, useEffect } from "react";
import { doctors } from "../assets/assets";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || ""
  );
  const [userData, setUserData] = useState(null);

  // Login function for all roles
  const login = async (email, password, role) => {
    try {
      let endpoint = "";
      switch (role) {
        case "user":
          endpoint = "/api/user/login";
          break;
        case "doctor":
          endpoint = "/api/doctor/login";
          break;
        case "admin":
          endpoint = "/api/admin/login";
          break;
        default:
          throw new Error("Invalid role");
      }

      const response = await axios.post(`${backendUrl}${endpoint}`, {
        email,
        password,
      });

      if (response.data.token) {
        const newToken = response.data.token;
        setToken(newToken);
        setUserRole(role);
        localStorage.setItem("token", newToken);
        localStorage.setItem("userRole", role);

        // Set user data based on role
        if (role === "user") {
          setUserData(response.data.user);
        } else if (role === "doctor") {
          setUserData(response.data.doctor);
        } else if (role === "admin") {
          setUserData(response.data.admin);
        }

        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.error || "Login failed",
      };
    }
  };

  // Register function for users
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
      });

      if (response.data.token) {
        const newToken = response.data.token;
        setToken(newToken);
        setUserRole("user");
        setUserData(response.data.user);
        localStorage.setItem("token", newToken);
        localStorage.setItem("userRole", "user");

        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error.response?.data?.error || "Registration failed",
      };
    }
  };

  // Logout function
  const logout = () => {
    setToken("");
    setUserRole("");
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return token && userRole;
  };

  const value = {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    userRole,
    userData,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
