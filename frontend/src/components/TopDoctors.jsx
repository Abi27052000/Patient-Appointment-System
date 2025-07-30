import React, { use, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Top Doctors To Book
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Simply browse through our extensive list of trusted doctors
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {doctors.slice(0, 10).map((doctor, index) => (
            <div
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              key={index}
              className="group bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden"
            >
              <div className="aspect-square overflow-hidden bg-blue-50">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate">
                  {doctor.name}
                </h2>
                <p className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
                  {doctor.speciality}
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {doctor.experience} of experience
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDoctors;
