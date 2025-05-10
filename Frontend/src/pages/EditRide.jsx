import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import rideService from "../services/rideService";
import authService from "../services/authService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EditRide = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    startingPoint: "",
    destination: "",
    isNustStart: false,
    isNustDest: false,
    stops: [],
    rideFrequency: "daily",
    daysAvailable: [],
    tripType: "one-way",
    departureTime: "",
    returnTime: "",
    price: "",
    vehicleType: "car",
    vehicleDetails: "",
    passengerCapacity: "",
    preferences: {
      car: {
        airConditioned: false,
        smokingAllowed: false,
        petsAllowed: false,
        musicAllowed: false,
      },
      bike: {
        helmetProvided: false,
        rainGearAvailable: false,
      },
    },
    additionalInfo: "",
    status: "active",
  });

  // Available days for selection
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Check if user is logged in
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch ride data
  useEffect(() => {
    const fetchRide = async () => {
      try {
        setLoading(true);
        const data = await rideService.getRideById(id);

        // Check if the logged-in user is the ride owner
        const user = authService.getCurrentUser();
        if (user && data.rider && data.rider._id !== user._id) {
          navigate("/my-rides");
          return;
        }

        setFormData({
          ...data,
          stops: data.stops || [],
          daysAvailable: data.daysAvailable || [],
        });
      } catch (err) {
        setError("Failed to load ride details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRide();
  }, [id, navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (
        name === "isNustStart" ||
        name === "isNustDest" ||
        name.includes("preferences")
      ) {
        // Handle nested preferences objects
        if (name.includes("preferences")) {
          const [_, category, preference] = name.split(".");
          setFormData({
            ...formData,
            preferences: {
              ...formData.preferences,
              [category]: {
                ...formData.preferences[category],
                [preference]: checked,
              },
            },
          });
        } else {
          setFormData({
            ...formData,
            [name]: checked,
          });
        }
      } else if (name.includes("day-")) {
        // Handle days available
        const day = name.replace("day-", "");
        const updatedDays = checked
          ? [...formData.daysAvailable, day]
          : formData.daysAvailable.filter((d) => d !== day);

        setFormData({
          ...formData,
          daysAvailable: updatedDays,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle stops input (comma-separated)
  const handleStopsChange = (e) => {
    const stopsString = e.target.value;
    const stopsArray = stopsString
      .split(",")
      .map((stop) => stop.trim())
      .filter((stop) => stop);

    setFormData({
      ...formData,
      stops: stopsArray,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.daysAvailable.length === 0) {
      setError("Please select at least one day of the week.");
      return;
    }

    if (formData.tripType === "round-trip" && !formData.returnTime) {
      setError("Return time is required for round trips.");
      return;
    }

    try {
      setError(null);
      setSubmitting(true);

      await rideService.updateRide(id, formData);

      setSuccessMessage("Ride updated successfully!");

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/my-rides");
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to update ride. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          <h1 className="mb-4">Edit Ride</h1>
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading ride details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container py-5 fade-in">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Edit Ride</h1>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success" role="alert">
            <i className="fas fa-check-circle me-2"></i>
            {successMessage}
          </div>
        )}

        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Route Details Section */}
              <div className="mb-4">
                <h3 className="mb-3 border-bottom pb-2">Route Details</h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="startingPoint" className="form-label">
                      Starting Point*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="startingPoint"
                      name="startingPoint"
                      value={formData.startingPoint}
                      onChange={handleChange}
                      required
                    />
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="isNustStart"
                        name="isNustStart"
                        checked={formData.isNustStart}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="isNustStart">
                        This is NUST campus
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="destination" className="form-label">
                      Destination*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                    />
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="isNustDest"
                        name="isNustDest"
                        checked={formData.isNustDest}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="isNustDest">
                        This is NUST campus
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="stops" className="form-label">
                      Stops (comma-separated)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="stops"
                      name="stops"
                      value={formData.stops.join(", ")}
                      onChange={handleStopsChange}
                      placeholder="E.g. F-10 Markaz, Blue Area, F-6"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule & Preferences Section */}
              <div className="mb-4">
                <h3 className="mb-3 border-bottom pb-2">
                  Schedule & Preferences
                </h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="rideFrequency" className="form-label">
                      Ride Frequency*
                    </label>
                    <select
                      className="form-select"
                      id="rideFrequency"
                      name="rideFrequency"
                      value={formData.rideFrequency}
                      onChange={handleChange}
                      required
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="one-time">One-time</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="tripType" className="form-label">
                      Trip Type*
                    </label>
                    <select
                      className="form-select"
                      id="tripType"
                      name="tripType"
                      value={formData.tripType}
                      onChange={handleChange}
                      required
                    >
                      <option value="one-way">One-way</option>
                      <option value="round-trip">Round-trip</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Days Available*</label>
                    <div className="d-flex flex-wrap gap-3">
                      {days.map((day) => (
                        <div className="form-check" key={day}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`day-${day}`}
                            name={`day-${day}`}
                            checked={formData.daysAvailable.includes(day)}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`day-${day}`}
                          >
                            {day}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="departureTime" className="form-label">
                      Departure Time*
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="departureTime"
                      name="departureTime"
                      value={formData.departureTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {formData.tripType === "round-trip" && (
                    <div className="col-md-6">
                      <label htmlFor="returnTime" className="form-label">
                        Return Time*
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        id="returnTime"
                        name="returnTime"
                        value={formData.returnTime}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}
                  <div className="col-md-6">
                    <label htmlFor="price" className="form-label">
                      Price (Rs.)*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="E.g. 150 or 150-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Details Section */}
              <div className="mb-4">
                <h3 className="mb-3 border-bottom pb-2">Vehicle Details</h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="vehicleType" className="form-label">
                      Vehicle Type*
                    </label>
                    <select
                      className="form-select"
                      id="vehicleType"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      required
                    >
                      <option value="car">Car</option>
                      <option value="bike">Bike/Motorcycle</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="vehicleDetails" className="form-label">
                      Vehicle Details*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="vehicleDetails"
                      name="vehicleDetails"
                      value={formData.vehicleDetails}
                      onChange={handleChange}
                      placeholder="E.g. Honda Civic 2020, White"
                      required
                    />
                  </div>
                  {formData.vehicleType === "car" && (
                    <>
                      <div className="col-md-6">
                        <label
                          htmlFor="passengerCapacity"
                          className="form-label"
                        >
                          Passenger Capacity*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="passengerCapacity"
                          name="passengerCapacity"
                          value={formData.passengerCapacity}
                          onChange={handleChange}
                          placeholder="E.g. 3"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label d-block">
                          Car Preferences
                        </label>
                        <div className="row g-2">
                          <div className="col-md-3 col-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="airConditioned"
                                name="preferences.car.airConditioned"
                                checked={
                                  formData.preferences.car.airConditioned
                                }
                                onChange={handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="airConditioned"
                              >
                                Air Conditioned
                              </label>
                            </div>
                          </div>
                          <div className="col-md-3 col-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="smokingAllowed"
                                name="preferences.car.smokingAllowed"
                                checked={
                                  formData.preferences.car.smokingAllowed
                                }
                                onChange={handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="smokingAllowed"
                              >
                                Smoking Allowed
                              </label>
                            </div>
                          </div>
                          <div className="col-md-3 col-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="petsAllowed"
                                name="preferences.car.petsAllowed"
                                checked={formData.preferences.car.petsAllowed}
                                onChange={handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="petsAllowed"
                              >
                                Pets Allowed
                              </label>
                            </div>
                          </div>
                          <div className="col-md-3 col-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="musicAllowed"
                                name="preferences.car.musicAllowed"
                                checked={formData.preferences.car.musicAllowed}
                                onChange={handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="musicAllowed"
                              >
                                Music Allowed
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {formData.vehicleType === "bike" && (
                    <div className="col-12">
                      <label className="form-label d-block">
                        Bike Preferences
                      </label>
                      <div className="row g-2">
                        <div className="col-md-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="helmetProvided"
                              name="preferences.bike.helmetProvided"
                              checked={formData.preferences.bike.helmetProvided}
                              onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="helmetProvided"
                            >
                              Helmet Provided
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="rainGearAvailable"
                              name="preferences.bike.rainGearAvailable"
                              checked={
                                formData.preferences.bike.rainGearAvailable
                              }
                              onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="rainGearAvailable"
                            >
                              Rain Gear Available
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="col-12">
                    <label htmlFor="additionalInfo" className="form-label">
                      Additional Information
                    </label>
                    <textarea
                      className="form-control"
                      id="additionalInfo"
                      name="additionalInfo"
                      rows="3"
                      value={formData.additionalInfo || ""}
                      onChange={handleChange}
                      placeholder="Any other details about your ride"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Ride Status Section */}
              <div className="mb-4">
                <h3 className="mb-3 border-bottom pb-2">Ride Status</h3>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="status" className="form-label">
                      Status*
                    </label>
                    <select
                      className="form-select"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  onClick={() => navigate("/my-rides")}
                  className="btn btn-outline-secondary"
                >
                  <i className="fas fa-arrow-left me-1"></i> Back to My Rides
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-1"></i> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditRide;
