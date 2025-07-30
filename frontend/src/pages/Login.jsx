import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-600">
            {state === "Sign Up"
              ? "Join our platform to book appointments with trusted doctors"
              : "Sign in to access your healthcare app"}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <form className="space-y-6">
            {/* Full Name Field (Sign Up only) */}
            {state === "Sign Up" && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                {state === "Sign Up" ? "Create Account" : "Login"}
              </button>
            </div>

            {/* Toggle State */}
            <div className="text-center pt-4">
              {state === "Sign Up" ? (
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <span
                    onClick={() => setState("Login")}
                    className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors duration-300"
                  >
                    Login
                  </span>
                </p>
              ) : (
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <span
                    onClick={() => setState("Sign Up")}
                    className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors duration-300"
                  >
                    Sign Up
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
