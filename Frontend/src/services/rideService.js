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
  getRidesByFilter,
  getRideById,
  updateRideStatus,
  deleteRide,
};

export default rideService;
