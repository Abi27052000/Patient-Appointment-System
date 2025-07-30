import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialtyMenu = () => {
  return (
    <div id="specialty" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Find by Speciality
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {specialityData.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 overflow-hidden rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300 text-center leading-tight">
                {item.speciality}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialtyMenu;
