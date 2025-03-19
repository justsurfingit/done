import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ExploreProperties from "./pages/ExploreProperties/ExploreProperties";
import LandingPage from "./pages/LandingPage/LandingPage";
import CustomerLogin from "./pages/Login/CustomerLogin";
import DealerLogin from "./pages/Login/DealerLogin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AddPropertyForm from "./pages/AddPropertyForm/AddPropertyForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("userRole");

    setIsLoggedIn(loggedIn);
    setUserRole(role);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <Router>
      <div className={darkMode ? "dark-theme" : "light-theme"}>
        <Routes>
          <Route path="/" element={<LandingPage darkMode={darkMode} />} />

          <Route
            path="/customer-login"
            element={
              <CustomerLogin
                darkMode={darkMode}
                setIsLoggedIn={setIsLoggedIn}
                setUserRole={setUserRole}
              />
            }
          />

          <Route
            path="/dealer-login"
            element={
              <DealerLogin
                darkMode={darkMode}
                setIsLoggedIn={setIsLoggedIn}
                setUserRole={setUserRole}
              />
            }
          />

          <Route
            path="/explore"
            element={
              <ProtectedRoute allowedRoles={["Customer"]}>
                <ExploreProperties
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminDashboard
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-property"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AddPropertyForm
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
