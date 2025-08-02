import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const DoctorNavbar = () => {
  const navigate = useNavigate();
  const { token, logout } = useContext(AppContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300">
      <img
        onClick={() => navigate("/doctor-dashboard")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/doctor-dashboard">
          <li className="py-1">DASHBOARD</li>
          <hr className="border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctor/appointments">
          <li className="py-1">APPOINTMENTS</li>
          <hr className="border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctor/patients">
          <li className="py-1">PATIENTS</li>
          <hr className="border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctor/profile">
          <li className="py-1">PROFILE</li>
          <hr className="border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-white rounded shadow-lg border">
                <p
                  onClick={() => navigate("/doctor/profile")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-t"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Doctor Login
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorNavbar;
