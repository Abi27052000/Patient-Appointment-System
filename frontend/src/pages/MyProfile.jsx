import React, { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    image: assets.profile_pic,
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: {
      line1: "123 Main St",
      line2: "Apt 4B",
    },
    gender: "Male",
    dateOfBirth: "1990-01-01",
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-blue-600">Profile</span>
          </h1>
        </div>

        {/* Profile Container */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            {/* Profile Image Section */}
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-blue-50 rounded-full overflow-hidden shadow-lg">
                <img
                  src={userData.image}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              {/* Personal Information Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700">
                        {userData.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700">
                        {userData.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) =>
                          setUserData({ ...userData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700">
                        {userData.phone}
                      </p>
                    )}
                  </div>

                  {/* Gender Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Gender
                    </label>
                    {isEditing ? (
                      <select
                        value={userData.gender}
                        onChange={(e) =>
                          setUserData({ ...userData, gender: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700">
                        {userData.gender}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth Field */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={userData.dateOfBirth}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            dateOfBirth: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700">
                        {userData.dateOfBirth}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Information Section */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Address Information
                </h2>
                <div className="space-y-4">
                  {/* Address Line 1 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Address Line 1
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.address.line1}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            address: {
                              ...userData.address,
                              line1: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700">
                        {userData.address.line1}
                      </p>
                    )}
                  </div>

                  {/* Address Line 2 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Address Line 2
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.address.line2}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            address: {
                              ...userData.address,
                              line2: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700">
                        {userData.address.line2}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
