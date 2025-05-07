import React, { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import AuthButton from "../components/AuthButton";
import authService from "../services/authService";
import "../css/logsignstyle.css";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, otp } = location.state || {};
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!email || !otp) {
    return <Navigate to="/forgot-password" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsSubmitting(true);
    try {
      await authService.resetPassword(email, otp, password);
      navigate("/login", { state: { message: "Password reset successful! Please login." } });
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
            <h3>Reset Password</h3>
            <form onSubmit={handleSubmit}>
              <FormInput
                label="NEW PASSWORD"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required={true}
                placeholder="Enter new password"
              />
              <FormInput
                label="CONFIRM PASSWORD"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required={true}
                placeholder="Confirm new password"
              />
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="button-group">
                <AuthButton
                  text={isSubmitting ? "RESETTING..." : "RESET PASSWORD"}
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

export default ResetPassword; 