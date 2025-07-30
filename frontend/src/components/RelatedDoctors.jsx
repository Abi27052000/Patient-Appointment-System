import React, { use, useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const related = doctors.filter(
        (doctor) => doctor.speciality === speciality && doctor._id !== docId
      );
      setRelDoc(related);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Doctors</h2>

      <div className="flex space-x-6 overflow-x-auto pb-4">
        {relDoc.length > 0 &&
          relDoc.map((doctor, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${doctor._id}`);
                scrollTo(0, 0);
              }}
              key={index}
              className="flex-shrink-0 w-64 group bg-gray-50 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden cursor-pointer"
            >
              <div className="aspect-square overflow-hidden bg-blue-50">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 space-y-2">
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate">
                  {doctor.name}
                </h4>
                <p className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
                  {doctor.speciality}
                </p>
                <p className="text-sm text-gray-500 flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {doctor.experience} years of experience
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
