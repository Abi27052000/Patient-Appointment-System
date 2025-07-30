import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ABOUT <span className="text-blue-600">US</span>
          </h1>
        </div>

        {/* Main About Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* About Image */}
            <div className="flex justify-center md:justify-start">
              <div className="w-full max-w-md bg-blue-50 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={assets.about_image}
                  alt="About us"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Welcome to Prescripto, your trusted partner in healthcare. We
                  understand that your health is your most valuable asset, and
                  we are committed to providing exceptional medical care that
                  puts you first.
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                  Prescripto is committed to providing the best medical care and
                  support to our patients. Our platform connects you with
                  qualified healthcare professionals who are dedicated to
                  delivering personalized, compassionate care. We believe that
                  quality healthcare should be accessible, convenient, and
                  tailored to meet your unique needs.
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                  With years of experience in the healthcare industry, we have
                  built a comprehensive network of trusted doctors and
                  specialists who share our commitment to excellence. Our
                  user-friendly platform makes it easy to find the right
                  healthcare provider, schedule appointments, and manage your
                  medical care efficiently.
                </p>
              </div>

              {/* Vision Section */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To be the leading healthcare provider, known for our
                  commitment to excellence and patient-centered care. We
                  envision a future where quality healthcare is accessible to
                  everyone, regardless of their location or circumstances. Our
                  goal is to revolutionize the way people access and experience
                  healthcare services.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              WHY CHOOSE US?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-bold text-blue-600 mb-4">
                EFFICIENCY
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Streamlined appointment scheduling that fits into your busy
                lifestyle. Our intuitive platform allows you to book
                appointments quickly and easily, saving you time and reducing
                the hassle of traditional booking methods. Experience seamless
                healthcare management with our efficient system.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-bold text-blue-600 mb-4">
                CONVENIENCE
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Easy access to healthcare services from the comfort of your
                home. Browse through our extensive network of qualified doctors,
                compare their profiles, and choose the healthcare provider that
                best meets your needs. Schedule appointments at your
                convenience, 24/7.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-bold text-blue-600 mb-4">
                PERSONALIZATION
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Tailored healthcare solutions to meet your individual needs. We
                understand that every patient is unique, and we strive to
                provide personalized care that addresses your specific health
                concerns. Our doctors take the time to understand your medical
                history and provide customized treatment plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
