import React, { use, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const getAvailableSlots = () => {
    setDocSlots([]);

    //getting current date
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting end time of date with index
      let endtime = new Date();

      endtime.setDate(today.getDate() + i);
      endtime.setHours(21, 0, 0, 0);

      //setting hours

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endtime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        //add  slot to array
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        // increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const fetchDoctorDetails = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
  };

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    fetchDoctorDetails();
  }, [docId, doctors]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

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

                {/* Appointment Fee */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-lg font-semibold text-gray-900">
                    Appointment Fee:{" "}
                    <span className="text-blue-600 font-bold">
                      {currencySymbol}
                      {docInfo.fees}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Slots */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Booking Slots
            </h2>

            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Select Date
              </h3>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {docSlots.length &&
                  docSlots.map((item, index) => (
                    <div
                      onClick={() => {
                        setSlotIndex(index);
                      }}
                      key={index}
                      className={`flex-shrink-0 text-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        slotIndex === index
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      <p className="text-sm font-medium">
                        {item[0] && daysOfWeek[item[0].dateTime.getDay()]}
                      </p>
                      <p className="text-lg font-semibold">
                        {item[0] && item[0].dateTime.getDate()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Select Time
              </h3>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {docSlots.length &&
                  docSlots[slotIndex].map((item, index) => (
                    <button
                      onClick={() => {
                        setSlotTime(item.time);
                      }}
                      key={index}
                      className={`flex-shrink-0 px-4 py-3 rounded-lg border-2 font-medium transition-all duration-300 ${
                        slotTime === item.time
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      {item.time.toLowerCase()}
                    </button>
                  ))}
              </div>
            </div>

            {/* Book Appointment Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
              Book an Appointment
            </button>
          </div>
        </div>
        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
