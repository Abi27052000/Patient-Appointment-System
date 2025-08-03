import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DoctorsList = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingAvailability, setUpdatingAvailability] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/admin/all-doctors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const toggleAvailability = async (doctorEmail, doctorId) => {
    setUpdatingAvailability((prev) => ({ ...prev, [doctorId]: true }));

    try {
      const response = await axios.put(
        `${backendUrl}/api/admin/doctor-availability`,
        { email: doctorEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Update the local state
        setDoctors((prevDoctors) =>
          prevDoctors.map((doctor) =>
            doctor._id === doctorId
              ? { ...doctor, available: response.data.available }
              : doctor
          )
        );
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to update availability");
      }
    } catch (error) {
      console.error("Error updating doctor availability:", error);
      toast.error("Failed to update doctor availability");
    } finally {
      setUpdatingAvailability((prev) => ({ ...prev, [doctorId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Doctors <span className="text-blue-600">Management</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage all registered doctors and their availability status
          </p>
        </div>

        {/* Doctors Container */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            {doctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <div
                    key={doctor._id}
                    className="bg-gradient-to-r from-blue-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Doctor Image */}
                    <div className="flex justify-center mb-4">
                      <div className="w-24 h-24 bg-blue-100 rounded-full overflow-hidden shadow-md">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="text-center space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {doctor.name}
                        </h3>
                        <p className="text-blue-600 font-semibold">
                          {doctor.speciality}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Experience:</span>
                          <span className="font-medium text-gray-900">
                            {doctor.experience}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Fees:</span>
                          <span className="font-medium text-gray-900">
                            ${doctor.fees}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          {/* <span className="text-gray-600">Education:</span>
                          <span className="font-medium text-gray-900">
                            {doctor.education}
                          </span> */}
                        </div>
                      </div>

                      {/* Address */}
                      <div className="text-sm text-gray-600">
                        <p className="font-medium text-gray-900 mb-1">
                          Address:
                        </p>
                        <p>{doctor.address?.line1}</p>
                        <p>{doctor.address?.line2}</p>
                      </div>

                      {/* Availability Toggle */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">
                            Availability Status:
                          </span>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`text-sm font-medium ${
                                doctor.available
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {doctor.available ? "Available" : "Unavailable"}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={doctor.available || false}
                                onChange={() =>
                                  toggleAvailability(doctor.email, doctor._id)
                                }
                                disabled={updatingAvailability[doctor._id]}
                                className="sr-only peer"
                              />
                              <div
                                className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${
                                  updatingAvailability[doctor._id]
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                              ></div>
                            </label>
                          </div>
                        </div>
                        {updatingAvailability[doctor._id] && (
                          <div className="flex items-center justify-center mt-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="ml-2 text-sm text-gray-600">
                              Updating...
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Contact Info */}
                      <div className="pt-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Email:</span>{" "}
                          {doctor.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Doctors Found
                </h3>
                <p className="text-gray-600">
                  No doctors have been added to the platform yet.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        {doctors.length > 0 && (
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {doctors.length}
                </p>
                <p className="text-gray-600">Total Doctors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {doctors.filter((doctor) => doctor.available).length}
                </p>
                <p className="text-gray-600">Available Doctors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {doctors.filter((doctor) => !doctor.available).length}
                </p>
                <p className="text-gray-600">Unavailable Doctors</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
