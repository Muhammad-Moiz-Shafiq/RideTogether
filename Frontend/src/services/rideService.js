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
    const config = setAuthHeader();
    const response = await api.post("/rides", rideData, config);
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
    const config = setAuthHeader();
    const response = await api.get("/rides/myrides", config);
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
    const config = setAuthHeader();
    const response = await api.put(`/rides/${id}`, rideData, config);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Update ride status
const updateRideStatus = async (id, status) => {
  try {
    const config = setAuthHeader();
    const response = await api.put(`/rides/${id}/status`, { status }, config);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Delete a ride
const deleteRide = async (id) => {
  try {
    const user = authService.getCurrentUser();
    if (!user || !user.token) {
      throw new Error("Authentication required");
    }

    // Use direct headers object instead of config
    const headers = {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.delete(`${API_URL}/rides/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error deleting ride:", error);
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
};

export default rideService;
