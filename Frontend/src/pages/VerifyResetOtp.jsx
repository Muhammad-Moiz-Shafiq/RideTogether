import React, { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import AuthButton from "../components/AuthButton";
import authService from "../services/authService";
import "../css/logsignstyle.css";

const VerifyResetOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!email) {
    return <Navigate to="/forgot-password" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await authService.verifyResetOtp(email, otp);
      navigate("/reset-password", { state: { email, otp } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-signup-body">
      <Navbar />
      <div className="auth-content-wrapper">
        <div className="signup-container">
          <AuthCard>
            <h3>Verify OTP</h3>
            <p>
              An OTP has been sent to <strong>{email}</strong>.<br />
              Please enter it below to continue.
            </p>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <FormInput
                label="OTP"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required={true}
                placeholder="Enter 6-digit OTP"
              />
              <div className="button-group">
                <AuthButton
                  text={isSubmitting ? "VERIFYING..." : "VERIFY OTP"}
                  className="signup-btn"
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </AuthCard>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyResetOtp; 