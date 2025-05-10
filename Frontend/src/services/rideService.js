import axios from "axios";
import authService from "./authService";

// Define the base URL for the API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser();
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to get auth token and set authorization header
const setAuthHeader = () => {
  const user = authService.getCurrentUser();
  if (user && user.token) {
    return {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  }
  return {};
};

// Post a new ride
const postRide = async (rideData) => {
  try {
    const response = await api.post("/rides", rideData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Get all rides
const getAllRides = async () => {
  try {
    const response = await api.get("/rides");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Get the logged-in user's rides
const getMyRides = async () => {
  try {
    const response = await api.get("/rides/myrides");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Get rides by filter
const getRidesByFilter = async (filters) => {
  try {
    const response = await api.get("/rides/filter", { params: filters });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Get a ride by ID
const getRideById = async (id) => {
  try {
    const response = await api.get(`/rides/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Update a ride
const updateRide = async (id, rideData) => {
  try {
    const response = await api.put(`/rides/${id}`, rideData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Update ride status
const updateRideStatus = async (id, status) => {
  try {
    const response = await api.put(`/rides/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Delete a ride
const deleteRide = async (id) => {
  try {
    const response = await api.delete(`/rides/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ride:", error);
    throw handleApiError(error);
  }
};

// Admin functions
// Get all rides for admin (including inactive)
const getAdminRides = async () => {
  try {
    const response = await api.get("/rides/admin/all");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Flag a ride
const flagRide = async (id, flagReason) => {
  try {
    console.log("Calling API to flag ride:", id, "with reason:", flagReason);
    const response = await api.put(`/rides/${id}/flag`, { flagReason });
    console.log("Flag ride API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in flagRide service:", error);
    console.error("Error response:", error.response?.data);
    throw handleApiError(error);
  }
};

// Moderate a ride
const moderateRide = async (id, moderationData) => {
  try {
    const response = await api.put(`/rides/${id}/moderate`, moderationData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Admin delete ride
const adminDeleteRide = async (id) => {
  try {
    const response = await api.delete(`/rides/admin/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Helper function to handle API errors
const handleApiError = (error) => {
  const message =
    error.response?.data?.message ||
    error.message ||
    "An unexpected error occurred";

  return new Error(message);
};

const rideService = {
  postRide,
  getAllRides,
  getMyRides,
  getRidesByFilter,
  getRideById,
  updateRide,
  updateRideStatus,
  deleteRide,
  getAdminRides,
  flagRide,
  moderateRide,
  adminDeleteRide,
};

export default rideService;
