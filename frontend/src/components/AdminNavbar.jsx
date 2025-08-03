import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { token, logout } = useContext(AppContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300 bg-white shadow-sm">
      <img
        onClick={() => navigate("/admin-dashboard")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      <div className="flex items-center gap-4">
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Admin Login
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
