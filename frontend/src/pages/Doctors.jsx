import React, { use, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { specialty } = useParams();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (specialty) {
      setFilteredDoctors(
        doctors.filter((doctor) => doctor.speciality === specialty)
      );
    } else {
      setFilteredDoctors(doctors);
    }
  }, [doctors, specialty]);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Browse through the doctors specialist
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Filter by Specialty
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    specialty === "General physician"
                      ? navigate("/doctors")
                      : navigate("/doctors/General physician");
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    specialty === "General physician"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  General physician
                </button>
                <button
                  onClick={() => {
                    specialty === "Gynecologist"
                      ? navigate("/doctors")
                      : navigate("/doctors/Gynecologist");
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    specialty === "Gynecologist"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  Gynecologist
                </button>
                <button
                  onClick={() => {
                    specialty === "Dermatologist"
                      ? navigate("/doctors")
                      : navigate("/doctors/Dermatologist");
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    specialty === "Dermatologist"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  Dermatologist
                </button>
                <button
                  onClick={() => {
                    specialty === "Pediatricians"
                      ? navigate("/doctors")
                      : navigate("/doctors/Pediatricians");
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    specialty === "Pediatricians"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  Pediatrician
                </button>
                <button
                  onClick={() => {
                    specialty === "Neurologist"
                      ? navigate("/doctors")
                      : navigate("/doctors/Neurologist");
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    specialty === "Neurologist"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  Neurologist
                </button>
                <button
                  onClick={() => {
                    specialty === "Gastroenterologist"
                      ? navigate("/doctors")
                      : navigate("/doctors/Gastroenterologist");
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    specialty === "Gastroenterologist"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  Gastroenterologist
                </button>
              </div>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDoctors.map((doctor, index) => (
                <div
                  onClick={() => navigate(`/appointment/${doctor._id}`)}
                  key={index}
                  className="group bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden bg-blue-50">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {doctor.name}
                    </h3>
                    <p className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                      {doctor.speciality}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {doctor.experience} of experience
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
