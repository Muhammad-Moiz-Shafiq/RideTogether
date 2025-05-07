import axios from "axios";

// Define the base URL for the API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Send OTP for email verification
const sendOTP = async (email) => {
  try {
    const response = await api.post("/auth/send-otp", { email });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Verify OTP and register user
const verifyOTPAndRegister = async (userData) => {
  try {
    const response = await api.post("/auth/verify-otp", userData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Login user
const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

// Get current user
const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Handle API errors
const handleApiError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || "An error occurred");
  }
  throw new Error("Network error");
};

// Forgot password - send OTP
const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Verify reset OTP
const verifyResetOtp = async (email, otp) => {
  try {
    const response = await api.post("/auth/verify-reset-otp", { email, otp });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Reset password
const resetPassword = async (email, otp, newPassword) => {
  try {
    const response = await api.post("/auth/reset-password", { email, otp, newPassword });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

const authService = {
  sendOTP,
  verifyOTPAndRegister,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
};

export default authService; 