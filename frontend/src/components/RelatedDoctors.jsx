import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RelatedDoctors = ({ docId, speciality }) => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [relDoc, setRelDoc] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRelatedDoctors = async () => {
    if (!speciality) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${backendUrl}/api/user/doctors-by-query?speciality=${speciality}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Filter out the current doctor and get related doctors
        const related = response.data.doctors
          ? response.data.doctors.filter((doctor) => doctor._id !== docId)
          : [];
        setRelDoc(related.slice(0, 5)); // Limit to 5 related doctors
      } else {
        const errorMessage =
          response.data.message || "Failed to fetch related doctors";
        setError(errorMessage);
        console.error("Failed to fetch related doctors:", errorMessage);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error fetching related doctors";
      setError(errorMessage);
      console.error("Error fetching related doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (speciality && docId) {
      fetchRelatedDoctors();
    }
  }, [speciality, docId]);

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Doctors</h2>

      {loading ? (
        // Loading state
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 bg-gray-50 rounded-xl shadow-md animate-pulse"
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
      ) : error ? (
        // Error state
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600 mb-2">Failed to load related doctors</p>
          <button
            onClick={fetchRelatedDoctors}
            className="text-red-600 underline hover:text-red-700 text-sm"
          >
            Try again
          </button>
        </div>
      ) : relDoc.length > 0 ? (
        // Success state with doctors
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {relDoc.map((doctor) => (
            <div
              onClick={() => {
                navigate(`/appointment/${doctor._id}`);
                scrollTo(0, 0);
              }}
              key={doctor._id}
              className="flex-shrink-0 w-64 group bg-gray-50 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden cursor-pointer"
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
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate">
                  {doctor.name}
                </h4>
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
      ) : (
        // No related doctors found
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-blue-600 mb-2">No related doctors found</p>
          <p className="text-blue-500 text-sm">
            Try browsing other specialities
          </p>
        </div>
      )}
    </div>
  );
};

export default RelatedDoctors;
