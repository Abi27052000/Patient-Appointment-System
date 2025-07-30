import React, { use, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  const fetchDoctorDetails = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, [docId, doctors]);

  return (
    docInfo && (
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Doctor Details */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Doctor Image */}
              <div className="flex justify-center md:justify-start">
                <div className="w-80 h-80 bg-blue-50 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={docInfo.image}
                    alt={docInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Doctor Information */}
              <div className="space-y-6">
                {/* Doctor Name & Verification */}
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    {docInfo.name}
                  </h1>
                  <img
                    src={assets.verified_icon}
                    alt="Verified"
                    className="w-6 h-6"
                  />
                </div>

                {/* Doctor Credentials */}
                <div className="space-y-2">
                  <p className="text-lg font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg inline-block">
                    {docInfo.degree} - {docInfo.speciality}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {docInfo.experience} years of experience
                  </p>
                </div>

                {/* Doctor About Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      About
                    </h2>
                    <img
                      src={assets.info_icon}
                      alt="Info"
                      className="w-5 h-5"
                    />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {docInfo.about}
                  </p>
                </div>
                <div>
                  <p>
                    Appointment Fee:{" "}
                    <span>
                      {currencySymbol}

                      {docInfo.fees}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
