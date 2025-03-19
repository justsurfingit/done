import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ExploreProperties from "./ExploreProperties";
import LandingPage from "./LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

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
            path="/explore"
            element={
              <ExploreProperties
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
