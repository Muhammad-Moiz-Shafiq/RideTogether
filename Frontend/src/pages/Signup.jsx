// pages/signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import AuthButton from "../components/AuthButton";
import authService from "../services/authService";
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
    otp: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSentTo, setOtpSentTo] = useState("");

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
    } else if (!formData.email.endsWith("@seecs.edu.pk")) {
      errors.email = "Only NUST SEECS email addresses (@seecs.edu.pk) are allowed";
    }

    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (otpSent && !formData.otp.trim()) {
      errors.otp = "Please enter the OTP";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Validate all fields before sending OTP
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await authService.sendOTP(formData.email);
      // Redirect to verify email page with user info (except OTP)
      navigate("/verify-email", {
        state: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      });
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (validateForm()) {
      try {
        setIsSubmitting(true);
        const userData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          otp: formData.otp,
        };

        await authService.verifyOTPAndRegister(userData);
        navigate("/login", { 
          state: { message: "Registration successful! Please login." }
        });
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

      <div className="auth-content-wrapper">
        <div className="signup-container">
          <div className="logo text-center">
            <div className="navbar-brand mx-auto">
              <i className="fas fa-car-side text-primary me-2"></i>
              <strong>RideTogether</strong>
            </div>
          </div>

          {submitError && (
            <div className="alert alert-danger" role="alert">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSendOTP}>
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
              placeholder="example@seecs.edu.pk"
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
              <AuthButton 
                text={isSubmitting ? "SENDING OTP..." : "SIGN UP"} 
                className="signup-btn"
                disabled={isSubmitting}
              />
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
