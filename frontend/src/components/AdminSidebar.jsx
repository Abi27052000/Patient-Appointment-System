import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin/assets";

const AdminSidebar = () => {
  const { token } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-white shadow-lg border-r border-gray-200">
      <div className="w-64 p-6">
        {/* Sidebar Header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Admin Panel</h2>
          <p className="text-sm text-gray-600">Manage your platform</p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <img
                src={assets.home_icon}
                alt="Dashboard"
                className="w-5 h-5 filter transition-all duration-300"
              />
            </div>
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <img
                src={assets.appointment_icon}
                alt="Appointments"
                className="w-5 h-5 filter transition-all duration-300"
              />
            </div>
            <span className="font-medium">Appointments</span>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <img
                src={assets.add_icon}
                alt="Add Doctor"
                className="w-5 h-5 filter transition-all duration-300"
              />
            </div>
            <span className="font-medium">Add Doctor</span>
          </NavLink>

          <NavLink
            to="/doctors-list"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <img
                src={assets.people_icon}
                alt="Doctors List"
                className="w-5 h-5 filter transition-all duration-300"
              />
            </div>
            <span className="font-medium">Doctors List</span>
          </NavLink>
        </nav>

        {/* Bottom Section */}
        <div className="mt-12 p-4 bg-blue-50 rounded-lg">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Admin Tools
            </h3>
            <p className="text-xs text-gray-600">
              Manage doctors, appointments, and platform settings efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
