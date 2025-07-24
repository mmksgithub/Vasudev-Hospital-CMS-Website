// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../../env";

// Create authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  const checkAuthentication = async () => {
    try {
      const response = await axios.get(`${config.PROJECT_URL}/api/users/verify`, {
        withCredentials: true,
      });
      setIsAuthenticated(response.data.status); // Only set when status changes
    } catch (error) {
      setIsAuthenticated(false);
    }
  };
  checkAuthentication();
}, []);
const login = async (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };


  const logout = async () => {
    try {
      await axios.get(`${config.PROJECT_URL}/api/users/logout`, { withCredentials: true });
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
