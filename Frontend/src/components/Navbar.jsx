import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(authService.getCurrentUser());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const isAdmin = user && user.isAdmin;

  // Subscribe to user changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(authService.getCurrentUser());
    };

    // Check for user updates on window focus
    window.addEventListener("focus", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("focus", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  // Handle post ride navigation based on auth status
  const handlePostRideClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/post");
    } else {
      navigate("/login", {
        state: {
          from: "/post",
          message: "You must be logged in to post a ride",
        },
      });
    }
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
              <a className="nav-link" href="#" onClick={handlePostRideClick}>
                <i className="fas fa-plus-circle me-1"></i> Offer a Ride
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/help">
                <i className="fas fa-question-circle me-1"></i> Help Center
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? (
                  <i className="fas fa-sun" style={{ color: "#fff" }}></i>
                ) : (
                  <i className="fas fa-moon"></i>
                )}
              </button>
            </li>
            {user && (
              <li className="nav-item dropdown" ref={dropdownRef}>
                <button
                  className="btn nav-link d-flex align-items-center"
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                  }}
                  onClick={() => setDropdownOpen((open) => !open)}
                  aria-expanded={dropdownOpen}
                  aria-label="User menu"
                >
                  <span className="me-1">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt=""
                        className="rounded-circle"
                        style={{
                          width: "32px",
                          height: "32px",
                          objectFit: "cover",
                          border: "2px solid #00AEEF",
                        }}
                      />
                    ) : (
                      <i
                        className="fas fa-user-circle fa-lg"
                        style={{ color: "#00AEEF" }}
                      ></i>
                    )}
                  </span>
                  <span className="d-none d-md-inline">
                    {user ? user.firstName : ""}
                  </span>
                  <i
                    className={`fas fa-chevron-${
                      dropdownOpen ? "up" : "down"
                    } ms-1`}
                  ></i>
                </button>
                {dropdownOpen && (
                  <ul
                    className="dropdown-menu dropdown-menu-end show mt-2"
                    style={{ minWidth: 220, right: 0 }}
                  >
                    <li className="dropdown-header text-center">
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt=""
                          className="rounded-circle mb-2"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            border: "3px solid #00AEEF",
                          }}
                        />
                      ) : (
                        <i
                          className="fas fa-user-circle fa-3x mb-2"
                          style={{ color: "#00AEEF" }}
                        ></i>
                      )}
                      <div className="fw-bold">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-muted" style={{ fontSize: "0.9em" }}>
                        {user.email}
                      </div>
                      {isAdmin && (
                        <span className="badge bg-primary mt-1">Admin</span>
                      )}
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate("/profile");
                        }}
                      >
                        <i className="fas fa-user me-2"></i> Profile
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate("/my-rides");
                        }}
                      >
                        <i className="fas fa-car me-2"></i> My Rides
                      </button>
                    </li>
                    {isAdmin && (
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setDropdownOpen(false);
                            navigate("/admin");
                          }}
                        >
                          <i className="fas fa-shield-alt me-2"></i> Admin
                          Dashboard
                        </button>
                      </li>
                    )}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i> Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <button
                  className="btn btn-primary px-3 ms-2"
                  onClick={() => navigate("/login")}
                  style={{ color: "#fff" }}
                >
                  <i className="fas fa-user me-1"></i> Login / Signup
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
