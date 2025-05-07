// pages/forgotPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FormInput from "../components/FormInput";
import AuthButton from "../components/AuthButton";
// import DarkModeToggle from "../components/DarkModeToggle";
import authService from "../services/authService";
import "../css/logsignstyle.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    setSubmitError("");
  };

  const validateForm = () => {
    if (!email.trim()) {
      setEmailError("Please enter an email");
      return false;
    } else if (!email.includes("@")) {
      setEmailError("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        await authService.forgotPassword(email);
        navigate("/verify-reset-otp", { state: { email } });
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
        <div className="forgot-password-container">
          <div className="logo text-center">
            <div className="navbar-brand mx-auto">
              <i className="fas fa-car-side text-primary me-2"></i>
              <strong>RideTogether</strong>
            </div>
          </div>

          <form onSubmit={handleSubmit} id="forgotPasswordForm">
            <FormInput
              label="EMAIL"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required={true}
              error={emailError}
            />
            {submitError && (
              <div className="alert alert-danger" role="alert">
                {submitError}
              </div>
            )}
            <div className="button-group">
              <AuthButton text={isSubmitting ? "SENDING..." : "RESET PASSWORD"} className="reset-btn" />
              {/* <DarkModeToggle /> */}
            </div>

            <div className="links">
              <Link to="/login" className="back-to-login">
                Back to Login
              </Link>
              <Link to="/signup" className="create-account">
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
