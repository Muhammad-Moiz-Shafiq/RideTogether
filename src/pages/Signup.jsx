// pages/signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import AuthButton from "../components/AuthButton";
// import DarkModeToggle from "../components/DarkModeToggle";
import "../css/logsignstyle.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "Please enter your first name";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Please enter your last name";
    }

    if (!formData.username.trim()) {
      errors.username = "Please enter a username";
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter an email";
    } else if (!formData.email.includes("@")) {
      errors.email = "Please enter a valid email";
    }

    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Sign up attempt with:", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
      });

      // This is where you would call your registration API
      // For demo purposes, we'll just show an alert and redirect
      alert("Signup successful! (This is a demo)");
      navigate("/login"); // Navigate to login page after successful signup
    }
  };

  return (
    <div className="login-signup-body">
      <Navbar />

      <div className="auth-content-wrapper">
        <div className="signup-container">
          <div className="logo text-center">
            <div className="navbar-brand mx-auto">
              <i className="fas fa-car-side text-primary me-2"></i>
              <strong>RideTogether</strong>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="name-fields">
              <FormInput
                label="FIRST NAME"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required={true}
                error={formErrors.firstName}
                halfWidth={true}
              />

              <FormInput
                label="LAST NAME"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required={true}
                error={formErrors.lastName}
                halfWidth={true}
              />
            </div>

            <FormInput
              label="USERNAME"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required={true}
              error={formErrors.username}
            />

            <FormInput
              label="EMAIL"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required={true}
              error={formErrors.email}
            />

            <FormInput
              label="PASSWORD"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={true}
              error={formErrors.password}
            />

            <FormInput
              label="CONFIRM PASSWORD"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required={true}
              error={formErrors.confirmPassword}
            />

            <div className="button-group">
              <AuthButton text="SIGN UP" className="signup-btn" />
              {/* <DarkModeToggle /> */}
            </div>

            <Link to="/login" className="create-account">
              Already have an account?
            </Link>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
