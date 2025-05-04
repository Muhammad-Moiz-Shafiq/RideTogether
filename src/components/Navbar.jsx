import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top fade-in">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-car-side text-primary me-2"></i>
          <strong>RideTogether</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                <i className="fas fa-search me-1"></i> Search Rides
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/post">
                <i className="fas fa-plus-circle me-1"></i> Offer a Ride
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/help">
                <i className="fas fa-question-circle me-1"></i> Help Center
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn" onClick={toggleTheme}>
                <div className="toggle-icons">
                  <i className="fas fa-sun"></i>
                  <i className="fas fa-moon"></i>
                </div>
              </button>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link btn btn-primary text-white px-3"
                to="/login"
              >
                <i className="fas fa-user me-1"></i> Login/Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
