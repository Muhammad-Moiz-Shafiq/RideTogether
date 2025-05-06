const asyncHandler = require("express-async-handler");
const Ride = require("../models/Ride");

// @desc    Create a new ride
// @route   POST /api/rides
// @access  Public
const createRide = asyncHandler(async (req, res) => {
  const {
    startingPoint,
    destination,
    isNustStart,
    isNustDest,
    stops,
    rideFrequency,
    daysAvailable,
    tripType,
    departureTime,
    returnTime,
    price,
    vehicleType,
    vehicleDetails,
    passengerCapacity,
    preferences,
    additionalInfo,
    userName,
    studentId,
    phoneNumber,
    isPrimaryWhatsapp,
    email,
    preferredContactMethod,
    shareContactConsent,
  } = req.body;

  // Validation
  if (!startingPoint || !destination) {
    res.status(400);
    throw new Error("Please provide both starting point and destination");
  }

  if (!isNustStart && !isNustDest) {
    res.status(400);
    throw new Error("At least one location must be NUST campus");
  }

  if (!daysAvailable || daysAvailable.length === 0) {
    res.status(400);
    throw new Error("Please select at least one day");
  }

  if (tripType === "round-trip" && !returnTime) {
    res.status(400);
    throw new Error("Return time is required for round trips");
  }

  if (!shareContactConsent) {
    res.status(400);
    throw new Error("Contact sharing consent is required");
  }

  if (!userName || !studentId || !phoneNumber) {
    res.status(400);
    throw new Error("Please provide your name, student ID, and phone number");
  }

  // Create ride
  const ride = await Ride.create({
    startingPoint,
    destination,
    isNustStart,
    isNustDest,
    stops,
    rideFrequency,
    daysAvailable,
    tripType,
    departureTime,
    returnTime,
    price,
    vehicleType,
    vehicleDetails,
    passengerCapacity,
    preferences,
    additionalInfo,
    userName,
    studentId,
    phoneNumber,
    isPrimaryWhatsapp,
    email,
    preferredContactMethod,
    shareContactConsent,
  });

  if (ride) {
    res.status(201).json({
      success: true,
      ride,
    });
  } else {
    res.status(400);
    throw new Error("Invalid ride data");
  }
});

// @desc    Get all rides
// @route   GET /api/rides
// @access  Public
const getRides = asyncHandler(async (req, res) => {
  const rides = await Ride.find({ status: "active" })
    .sort({ createdAt: -1 })
    .limit(50);
  res.status(200).json(rides);
});

// @desc    Get rides by filter
// @route   GET /api/rides/filter
// @access  Public
const getRidesByFilter = asyncHandler(async (req, res) => {
  const {
    startingPoint,
    destination,
    isNustStart,
    isNustDest,
    daysAvailable,
    departureTime,
    vehicleType,
  } = req.query;

  const filter = { status: "active" };

  if (startingPoint) {
    filter.startingPoint = { $regex: startingPoint, $options: "i" };
  }

  if (destination) {
    filter.destination = { $regex: destination, $options: "i" };
  }

  if (isNustStart === "true") {
    filter.isNustStart = true;
  }

  if (isNustDest === "true") {
    filter.isNustDest = true;
  }

  if (daysAvailable) {
    filter.daysAvailable = { $in: daysAvailable.split(",") };
  }

  if (vehicleType) {
    filter.vehicleType = vehicleType;
  }

  const rides = await Ride.find(filter).sort({ createdAt: -1 });
  res.status(200).json(rides);
});

// @desc    Get ride by ID
// @route   GET /api/rides/:id
// @access  Public
const getRideById = asyncHandler(async (req, res) => {
  const ride = await Ride.findById(req.params.id);

  if (ride) {
    res.status(200).json(ride);
  } else {
    res.status(404);
    throw new Error("Ride not found");
  }
});

// @desc    Update ride status
// @route   PUT /api/rides/:id/status
// @access  Public
const updateRideStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const ride = await Ride.findById(req.params.id);

  if (!ride) {
    res.status(404);
    throw new Error("Ride not found");
  }

  if (!["active", "completed", "cancelled"].includes(status)) {
    res.status(400);
    throw new Error("Invalid status value");
  }

  ride.status = status;
  const updatedRide = await ride.save();

  res.status(200).json(updatedRide);
});

// @desc    Delete a ride
// @route   DELETE /api/rides/:id
// @access  Public
const deleteRide = asyncHandler(async (req, res) => {
  const ride = await Ride.findById(req.params.id);

  if (!ride) {
    res.status(404);
    throw new Error("Ride not found");
  }

  await ride.deleteOne();
  res.status(200).json({ message: "Ride removed" });
});

module.exports = {
  createRide,
  getRides,
  getRidesByFilter,
  getRideById,
  updateRideStatus,
  deleteRide,
};
