const express = require("express");
const router = express.Router();
const {
  createRide,
  getRides,
  getMyRides,
  getRide,
  updateRide,
  deleteRide,
} = require("../controllers/rideController");
const { protect, isRideOwner } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getRides);
router.get("/filter", getRides);

// Protected routes
router.post("/", protect, createRide);
router.get("/myrides", protect, getMyRides);

// Routes with ride owner check
router.delete("/:id", protect, isRideOwner, deleteRide);

// Route with parameter (must be last to avoid conflicts)
router.get("/:id", getRide);
router.put("/:id", protect, isRideOwner, updateRide);

module.exports = router;
