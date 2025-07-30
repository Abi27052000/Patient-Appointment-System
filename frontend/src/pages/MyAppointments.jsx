import React, { use, useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-blue-600">Appointments</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your upcoming appointments and view appointment history
          </p>
        </div>

        {/* Appointments Container */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            {doctors.slice(0, 3).length > 0 ? (
              <div className="space-y-6">
                {doctors.slice(0, 3).map((doctor, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Doctor Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-blue-100 rounded-full overflow-hidden shadow-md">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Doctor Info */}
                      <div className="flex-grow space-y-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {doctor.name}
                          </h3>
                          <p className="text-blue-600 font-semibold">
                            {doctor.speciality}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Address */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">
                              Address:
                            </h4>
                            <p className="text-gray-700 text-sm">
                              {doctor.address.line1}
                            </p>
                            <p className="text-gray-700 text-sm">
                              {doctor.address.line2}
                            </p>
                          </div>

                          {/* Date & Time */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">
                              Date & Time:
                            </h4>
                            <p className="text-gray-700 text-sm font-medium">
                              25, July, 2025 | 8:30 PM
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:w-52">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 whitespace-nowrap">
                          Pay Online
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 whitespace-nowrap">
                          Cancel Appointment
                        </button>
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Appointments
                </h3>
                <p className="text-gray-600">
                  You don't have any upcoming appointments.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
