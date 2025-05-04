// pages/forgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FormInput from "../components/FormInput";
import AuthButton from "../components/AuthButton";
// import DarkModeToggle from "../components/DarkModeToggle";
import "../css/logsignstyle.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Password reset requested for:", email);

      // This is where you would call your password reset API
      // For demo purposes, we'll just show a success message
      setIsSubmitted(true);
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

          {!isSubmitted ? (
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

              <div className="button-group">
                <AuthButton text="RESET PASSWORD" className="reset-btn" />
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
          ) : (
            <div className="success-message">
              <i
                className="fas fa-check-circle text-success mb-3"
                style={{ fontSize: "48px" }}
              ></i>
              <h4>Reset Link Sent!</h4>
              <p className="mb-4">
                We've sent a password reset link to <strong>{email}</strong>.
                Please check your inbox and follow the instructions.
              </p>
              <div className="button-group">
                <Link to="/login" className="login-btn">
                  BACK TO LOGIN
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
