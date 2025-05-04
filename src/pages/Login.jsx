// pages/login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import AuthButton from "../components/AuthButton";
// import DarkModeToggle from "../components/DarkModeToggle";
import "../css/logsignstyle.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
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
    if (!formData.username.trim()) {
      errors.username = "Please enter your username";
    }
    if (!formData.password.trim()) {
      errors.password = "Please enter your password";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Login attempt with:", { username: formData.username });

      // This is where you would call your authentication API
      // For demo purposes, we'll just show an alert and redirect
      alert("Login successful! (This is a demo)");
      navigate("/"); // Navigate to home page after successful login
    }
  };

  return (
    <div className="login-signup-body">
      <Navbar />

      <AuthCard>
        <form onSubmit={handleSubmit}>
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
            label="PASSWORD"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
            error={formErrors.password}
          />

          <div className="button-group">
            <AuthButton text="LOGIN" className="login-btn" />
          </div>

          <Link to="/forgot-password" className="forgot-password">
            Forgot password?
          </Link>

          <Link to="/signup" className="create-account">
            Create an account
          </Link>
        </form>
      </AuthCard>

      <Footer />
    </div>
  );
};

export default Login;
