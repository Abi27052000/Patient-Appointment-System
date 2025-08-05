import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      // const response = await axios.get(`${backendUrl}/api/user/all-doctors`);
      const response = await axios.get(`${backendUrl}/api/user/all-doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setDoctors(response.data.doctors || []);
        // toast.success("Doctors loaded successfully!");
      } else {
        setError(response.data.message || "Failed to fetch doctors");
        toast.error(response.data.message || "Failed to fetch doctors");
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

  if (loading) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md border border-gray-100"
                >
                  <div className="aspect-square bg-gray-200 rounded-t-xl"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
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
      </div>
    );
  }

  if (!doctors || doctors.length === 0) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="text-blue-600 text-lg font-medium mb-2">
              No Doctors Available
            </div>
            <p className="text-blue-500 mb-4">
              There are currently no doctors available for booking.
            </p>
            <button
              onClick={fetchDoctors}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          {doctors.slice(0, 10).map((doctor) => (
            <div
              onClick={() => {
                navigate(`/appointment/${doctor._id}`);
                scrollTo(0, 0);
              }}
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

              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate">
                  {doctor.name}
                </h2>
                <p className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
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
                  <p className="text-sm text-gray-600">{doctor.experience}</p>
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
      </div>
    </div>
  );
};

export default TopDoctors;
