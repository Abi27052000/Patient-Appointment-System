import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

// User/Patient Pages
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";

// Doctor Pages
import DoctorDashboard from "./pages/DoctorDashboard";

// Components
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import DoctorNavbar from "./components/DoctorNavbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { userRole, token } = useContext(AppContext);
  const location = useLocation();

  // Function to render the appropriate navbar based on user role
  const renderNavbar = () => {
    // Don't show navbar on login page
    if (location.pathname === "/login") return null;

    if (!token) return <Navbar />;

    switch (userRole) {
      case "admin":
        return <AdminNavbar />;
      case "doctor":
        return <DoctorNavbar />;
      default:
        return <Navbar />;
    }
  };

  return (
    <div>
      {renderNavbar()}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* User/Patient Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Doctors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors/:specialty"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Doctors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-appointments"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <MyAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointment/:docId"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Appointment />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Doctor Routes */}
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Only show footer for user/patient routes and not on login page */}
      {(!token || userRole === "user") && location.pathname !== "/login" && (
        <Footer />
      )}
    </div>
  );
}

export default App;
