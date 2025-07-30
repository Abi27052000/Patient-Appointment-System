import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div className="text-center md:text-left space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Book Appointment
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-100">
                With 100+ Trusted Doctors
              </p>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white hover:bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            >
              Create Account
            </button>
          </div>

          {/* Right side */}
          <div className="relative">
            <img
              src={assets.appointment_img}
              alt="Book appointment"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            {/* Decorative blur elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/20 rounded-full opacity-50 blur-2xl -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full opacity-30 blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
