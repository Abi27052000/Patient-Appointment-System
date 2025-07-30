import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Book Appointment <br />
              <span className="text-blue-600">With Trusted Doctors</span>
            </h1>

            <div className="flex items-start space-x-4 bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <img
                src={assets.group_profiles}
                alt="Group profiles"
                className="w-16 h-12 object-cover rounded-lg"
              />
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Simply browse through our extensive list of trusted doctors,
                <br className="hidden sm:block" />
                schedule your appointment hassle-free
              </p>
            </div>

            <a
              href="#specialty"
              className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Book Appointment
              <img
                src={assets.arrow_icon}
                alt="Arrow"
                className="ml-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
          </div>

          {/* Right Side */}

          <div className="relative mt-8 md:mt-0">
            <img
              src={assets.header_img}
              alt="Header"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            {/* Decorative blur elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-200 rounded-full opacity-50 blur-2xl -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-200 rounded-full opacity-30 blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
