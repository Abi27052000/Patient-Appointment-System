import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left section */}
          <div className="space-y-6">
            <img
              src={assets.logo}
              alt="Patient Booking System Logo"
              className="h-10 w-auto"
            />
            <p className="text-gray-600 leading-relaxed text-base">
              Patient Booking System is your trusted partner in healthcare,
              connecting patients with the right healthcare providers.
            </p>
          </div>

          {/* Middle section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 uppercase tracking-wider">
              COMPANY
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-base"
                >
                  HOME
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-base"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-base"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-base"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Right section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 uppercase tracking-wider">
              GET IN TOUCH
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-blue-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-600 text-base">
                  support@patientbookingsystem.com
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-blue-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-gray-600 text-base">(123) 456-7890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t border-gray-300 mt-12 pt-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Patient Booking System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
