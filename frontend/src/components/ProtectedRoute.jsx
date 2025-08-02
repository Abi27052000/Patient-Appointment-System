import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, userRole } = useContext(AppContext);

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user role is not in allowed roles, redirect based on their role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    switch (userRole) {
      case "admin":
        return <Navigate to="/admin-dashboard" replace />;
      case "doctor":
        return <Navigate to="/doctor-dashboard" replace />;
      case "user":
        return <Navigate to="/" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
