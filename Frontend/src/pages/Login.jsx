// pages/login.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import AuthButton from "../components/AuthButton";
import authService from "../services/authService";
// import DarkModeToggle from "../components/DarkModeToggle";
import "../css/logsignstyle.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Check for success message from registration
  useEffect(() => {
    if (location.state?.message) {
      setSubmitError(location.state.message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (validateForm()) {
      try {
        setIsSubmitting(true);
        await authService.login(formData);
        navigate("/"); // Navigate to home page after successful login
      } catch (error) {
        setSubmitError(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="login-signup-body">
      <Navbar />

      <AuthCard>
        {submitError && (
          <div className={`alert ${submitError.includes("successful") ? "alert-success" : "alert-danger"}`} role="alert">
            {submitError}
          </div>
        )}

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
            <AuthButton 
              text={isSubmitting ? "LOGGING IN..." : "LOGIN"} 
              className="login-btn"
              disabled={isSubmitting}
            />
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
