const express = require("express");
const router = express.Router();
const {
  createRide,
  getRides,
  getRidesByFilter,
  getRideById,
  updateRideStatus,
  deleteRide,
} = require("../controllers/rideController");
const { protect } = require("../middleware/authMiddleware");

// Create a new ride - Protected route
router.post("/", protect, createRide);

// Get all rides
router.get("/", getRides);

// Get rides by filter
router.get("/filter", getRidesByFilter);

// Get ride by ID
router.get("/:id", getRideById);

// Update ride status
router.put("/:id/status", updateRideStatus);

// Delete a ride
router.delete("/:id", deleteRide);

module.exports = router;
