import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Doctors = () => {
  const { specialty } = useParams();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${backendUrl}/api/user/doctors-by-query`;
      if (specialty) {
        url += `?speciality=${encodeURIComponent(specialty)}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setFilteredDoctors(response.data.doctors || []);
      } else {
        const errorMessage = response.data.message || "Failed to fetch doctors";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error fetching doctors";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [specialty]);

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
            {loading ? (
              // Loading state
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md animate-pulse"
                  >
                    <div className="aspect-square bg-gray-200 rounded-t-xl"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              // Error state
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="text-red-600 text-lg font-medium mb-2">
                    Error Loading Doctors
                  </div>
                  <p className="text-red-500 mb-4">{error}</p>
                  <button
                    onClick={fetchDoctors}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : filteredDoctors.length === 0 ? (
              // No doctors found
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="text-blue-600 text-lg font-medium mb-2">
                    No Doctors Found
                  </div>
                  <p className="text-blue-500 mb-4">
                    {specialty
                      ? `No doctors found for ${specialty}`
                      : "No doctors available at the moment"}
                  </p>
                  <button
                    onClick={fetchDoctors}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            ) : (
              // Success state
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDoctors.map((doctor) => (
                  <div
                    onClick={() => navigate(`/appointment/${doctor._id}`)}
                    key={doctor._id}
                    className="group bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden cursor-pointer"
                  >
                    <div className="aspect-square overflow-hidden bg-blue-50">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = "/default-doctor.png";
                        }}
                      />
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {doctor.name}
                      </h3>
                      <p className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                        {doctor.speciality}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 flex items-center">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              doctor.available ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></span>
                          {doctor.available ? "Available" : "Unavailable"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {doctor.experience}
                        </p>
                      </div>
                      {doctor.fees && (
                        <p className="text-sm font-medium text-gray-900">
                          ${doctor.fees}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
