import api from '../config/apiConfig';

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
    const response = await api.post("/auth/reset-password", {
      email,
      otp,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Get user profile
const getUserProfile = async () => {
  try {
    const response = await api.get("/auth/profile");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Update user profile
const updateUserProfile = async (userData) => {
  try {
    const response = await api.put("/auth/profile", userData);

    // Update user in localStorage with new info
    const updatedUser = response.data;
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return updatedUser;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Check if user is admin
const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.isAdmin === true;
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
  getUserProfile,
  updateUserProfile,
  isAdmin,
};

export default authService;
