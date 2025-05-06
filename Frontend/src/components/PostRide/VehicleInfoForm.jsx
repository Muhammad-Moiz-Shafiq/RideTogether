import React from "react";

const VehicleInfoForm = ({
  formData,
  handleInputChange,
  handlePreferenceChange,
}) => {
  return (
    <div className="mb-5">
      <h3 className="mb-4 fw-bold">
        <span className="badge bg-primary rounded-circle me-2">3</span>
        Vehicle Information
      </h3>

      {/* Vehicle Type Selection */}
      <div className="mb-4">
        <label className="form-label">Vehicle Type</label>
        <div className="d-flex">
          <div className="form-check me-4">
            <input
              className="form-check-input"
              type="radio"
              name="vehicleType"
              id="carType"
              value="car"
              checked={formData.vehicleType === "car"}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="carType">
              <i className="fas fa-car me-2 text-primary"></i> Car
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vehicleType"
              id="bikeType"
              value="bike"
              checked={formData.vehicleType === "bike"}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="bikeType">
              <i className="fas fa-motorcycle me-2 text-primary"></i>
              Bike
            </label>
          </div>
        </div>
      </div>

      {/* Car Details */}
      <div
        id="carDetailsSection"
        className={`mb-4 ${formData.vehicleType !== "car" ? "d-none" : ""}`}
      >
        <label className="form-label">
          Vehicle Details<span className="text-danger">*</span>
        </label>
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-light">
              <i className="fas fa-car text-primary"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Car make & model"
              name="vehicleDetails"
              value={formData.vehicleDetails}
              onChange={handleInputChange}
              required={formData.vehicleType === "car"}
            />
          </div>
        </div>
      </div>

      {/* Passengers section (only for cars) */}
      <div
        id="passengersSection"
        className={`mb-4 ${formData.vehicleType !== "car" ? "d-none" : ""}`}
      >
        <label className="form-label">
          How many passengers can you take?
          <span className="text-danger">*</span>
        </label>
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-light">
              <i className="fas fa-user-friends text-primary"></i>
            </span>
            <select
              className="form-select"
              name="passengerCapacity"
              value={formData.passengerCapacity}
              onChange={handleInputChange}
              required={formData.vehicleType === "car"}
            >
              <option value="" disabled>
                Select number of seats
              </option>
              <option value="1">1 passenger</option>
              <option value="2">2 passengers</option>
              <option value="3">3 passengers</option>
              <option value="4">4 passengers</option>
              <option value="5">5 passengers</option>
              <option value="6">6+ passengers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bike Details */}
      <div
        id="bikeDetailsSection"
        className={`mb-4 ${formData.vehicleType !== "bike" ? "d-none" : ""}`}
      >
        <label className="form-label">
          Vehicle Details<span className="text-danger">*</span>
        </label>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="fas fa-motorcycle text-primary"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Bike make & model"
                name="vehicleDetails"
                value={formData.vehicleDetails}
                onChange={handleInputChange}
                required={formData.vehicleType === "bike"}
              />
            </div>
          </div>
        </div>
        {/* Note: No passenger selection for bikes as only 1 passenger is allowed */}
        <div className="mt-2 text-muted">
          <small>
            <i className="fas fa-info-circle me-1"></i> Bikes can take only 1
            passenger
          </small>
        </div>
      </div>

      {/* Car Preferences */}
      <div
        id="carPreferencesSection"
        className={`mb-4 ${formData.vehicleType !== "car" ? "d-none" : ""}`}
      >
        <label className="form-label">Ride Preferences</label>
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="airConditioned"
                    checked={formData.preferences.car.airConditioned}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "car",
                        "airConditioned",
                        e.target.checked
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor="airConditioned">
                    <i className="fas fa-snowflake me-2 text-primary"></i>
                    Air conditioned
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="smokingAllowed"
                    checked={formData.preferences.car.smokingAllowed}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "car",
                        "smokingAllowed",
                        e.target.checked
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor="smokingAllowed">
                    <i className="fas fa-smoking me-2 text-primary"></i>
                    Smoking allowed
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="petsAllowed"
                    checked={formData.preferences.car.petsAllowed}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "car",
                        "petsAllowed",
                        e.target.checked
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor="petsAllowed">
                    <i className="fas fa-paw me-2 text-primary"></i>
                    Pets allowed
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="musicAllowed"
                    checked={formData.preferences.car.musicAllowed}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "car",
                        "musicAllowed",
                        e.target.checked
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor="musicAllowed">
                    <i className="fas fa-music me-2 text-primary"></i>
                    Music during trip
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bike Preferences */}
      <div
        id="bikePreferencesSection"
        className={`mb-4 ${formData.vehicleType !== "bike" ? "d-none" : ""}`}
      >
        <label className="form-label">Ride Preferences</label>
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="helmetProvided"
                    checked={formData.preferences.bike.helmetProvided}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "bike",
                        "helmetProvided",
                        e.target.checked
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor="helmetProvided">
                    <i className="fas fa-hard-hat me-2 text-primary"></i>
                    Helmet provided
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rainGearAvailable"
                    checked={formData.preferences.bike.rainGearAvailable}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "bike",
                        "rainGearAvailable",
                        e.target.checked
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="rainGearAvailable"
                  >
                    <i className="fas fa-cloud-rain me-2 text-primary"></i>
                    Rain gear available
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label">Additional Information (Optional)</label>
        <div className="input-group">
          <span className="input-group-text bg-light">
            <i className="fas fa-info-circle text-primary"></i>
          </span>
          <textarea
            className="form-control"
            rows="3"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            placeholder="Add any details that might be helpful for passengers"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoForm;
