import React, { useState } from "react";
import { assets } from "../../assets/admin/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [docImg, setDocImg] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    experience: "1 Year",
    fees: "",
    speciality: "General physician",
    education: "",
    address1: "",
    address2: "",
    about: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();

      // Append all form fields
      // Object.keys(formData).forEach((key) => {
      //   submitData.append(key, formData[key]);
      // });

      // Combine address1 and address2 into a single object and stringify it
      const formattedData = {
        ...formData,
        address: JSON.stringify({
          line1: formData.address1,
          line2: formData.address2,
        }),
      };

      // Remove address1 and address2 before appending
      delete formattedData.address1;
      delete formattedData.address2;

      // Append all form fields to FormData
      Object.keys(formattedData).forEach((key) => {
        submitData.append(key, formattedData[key]);
      });

      // Append image if selected
      if (docImg) {
        submitData.append("image", docImg);
      }

      // const response = await axios.post(
      //   `${backendUrl}/api/admin/add-doctor`,
      //   submitData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const response = await axios.post(
        `http://localhost:4000/api/admin/add-doctor`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Doctor added successfully!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          experience: "1 Year",
          fees: "",
          speciality: "General physician",
          education: "",
          address1: "",
          address2: "",
          about: "",
        });
        setDocImg(null);
      } else {
        toast.error(response.data.message || "Failed to add doctor");
      }
    } catch (error) {
      console.log("Error adding doctor:", error);
      toast.error("Failed to add doctor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Add <span className="text-blue-600">Doctor</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Add a new doctor to the platform
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Doctor Photo
              </h2>
              <div className="flex flex-col items-center">
                <label htmlFor="doc-img" className="cursor-pointer">
                  <div className="w-32 h-32 border-2 border-dashed border-blue-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-colors duration-300">
                    {docImg ? (
                      <img
                        src={URL.createObjectURL(docImg)}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <img
                          src={assets.upload_area}
                          alt="Upload"
                          className="w-12 h-12 mb-2"
                        />
                        <p className="text-sm text-gray-600 text-center">
                          Upload doctor
                          <br />
                          picture
                        </p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="doc-img"
                  hidden
                  accept="image/*"
                  onChange={(e) => setDocImg(e.target.files[0])}
                />
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Doctor Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter doctor's full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="doctor@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create secure password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Education
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    placeholder="e.g., MBBS, MD"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Professional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                  >
                    <option value="1 Year">1 year</option>
                    <option value="2 Years">2 years</option>
                    <option value="3 Years">3 years</option>
                    <option value="4 Years">4 years</option>
                    <option value="5 Years">5 years</option>
                    <option value="6 Years">6 years</option>
                    <option value="7 Years">7 years</option>
                    <option value="8 Years">8 years</option>
                    <option value="9 Years">9 years</option>
                    <option value="10+ Years">10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Consultation Fees ($)
                  </label>
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleInputChange}
                    placeholder="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Speciality
                  </label>
                  <select
                    name="speciality"
                    value={formData.speciality}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                  >
                    <option value="General physician">General physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">
                      Gastroenterologist
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Address Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleInputChange}
                    placeholder="Street address, building"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    placeholder="City, State, ZIP"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                    required
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                About Doctor
              </h2>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Doctor Description
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  placeholder="Write a brief description about the doctor's expertise and background..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                {loading ? "Adding Doctor..." : "Add Doctor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
