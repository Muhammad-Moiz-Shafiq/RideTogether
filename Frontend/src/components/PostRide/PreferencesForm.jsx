const PreferencesForm = ({ formData, handleInputChange }) => {
  return (
    <div className="mb-5">
      <h3 className="mb-4 fw-bold">
        <span className="badge bg-primary rounded-circle me-2">2</span>
        Set your Preferences
      </h3>

      {/* Ride Frequency Options */}
      <div className="mb-4">
        <label className="form-label">Ride Frequency</label>
        <div className="d-flex">
          <div className="form-check me-4">
            <input
              className="form-check-input"
              type="radio"
              name="rideFrequency"
              id="monthlyBasis"
              value="monthly"
              checked={formData.rideFrequency === "monthly"}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="monthlyBasis">
              Monthly basis
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="rideFrequency"
              id="dailyBasis"
              value="daily"
              checked={formData.rideFrequency === "daily"}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="dailyBasis">
              Daily basis
            </label>
          </div>
        </div>
      </div>

      {/* Trip Details Section */}
      <div id="tripDetailsSection">
        {/* Days available */}
        <div className="mb-4">
          <label className="form-label">
            Days Available<span className="text-danger">*</span>
          </label>
          <div className="row g-2">
            {/* Weekdays */}
            <div className="col-md-4 col-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="monday"
                  name="days[]"
                  value="monday"
                  checked={formData.daysAvailable.includes("monday")}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="monday">
                  Monday
                </label>
              </div>
            </div>
            <div className="col-md-4 col-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="tuesday"
                  name="days[]"
                  value="tuesday"
                  checked={formData.daysAvailable.includes("tuesday")}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="tuesday">
                  Tuesday
                </label>
              </div>
            </div>
            <div className="col-md-4 col-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="wednesday"
                  name="days[]"
                  value="wednesday"
                  checked={formData.daysAvailable.includes("wednesday")}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="wednesday">
                  Wednesday
                </label>
              </div>
            </div>
            <div className="col-md-4 col-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="thursday"
                  name="days[]"
                  value="thursday"
                  checked={formData.daysAvailable.includes("thursday")}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="thursday">
                  Thursday
                </label>
              </div>
            </div>
            <div className="col-md-4 col-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="friday"
                  name="days[]"
                  value="friday"
                  checked={formData.daysAvailable.includes("friday")}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="friday">
                  Friday
                </label>
              </div>
            </div>
            <div className="col-md-4 col-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="saturday"
                  name="days[]"
                  value="saturday"
                  checked={formData.daysAvailable.includes("saturday")}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="saturday">
                  Saturday
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Type (only for daily basis) */}
        <div className="mb-4" id="tripTypeSection">
          <label className="form-label">Trip Type</label>
          <div className="d-flex">
            <div className="form-check me-4">
              <input
                className="form-check-input"
                type="radio"
                name="tripType"
                id="roundTrip"
                value="round-trip"
                checked={formData.tripType === "round-trip"}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="roundTrip">
                Round trip
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="tripType"
                id="oneWay"
                value="one-way"
                checked={formData.tripType === "one-way"}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="oneWay">
                One-way trip
              </label>
            </div>
          </div>
        </div>

        {/* Times Section */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">
              Departure Time<span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="fas fa-clock text-primary"></i>
              </span>
              <input
                type="time"
                className="form-control"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {formData.tripType === "round-trip" && (
            <div className="col-md-6" id="returnTimeSection">
              <label className="form-label">
                Return Time<span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="fas fa-clock text-primary"></i>
                </span>
                <input
                  type="time"
                  className="form-control"
                  name="returnTime"
                  value={formData.returnTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="mb-4">
          <label className="form-label" id="priceLabel">
            Price per seat (PKR)<span className="text-danger">*</span>
          </label>
          <div className="input-group">
            <span className="input-group-text bg-light">
              <i className="fas fa-money-bill-wave text-primary"></i>
            </span>
            <input
              type="number"
              className="form-control"
              name="price"
              placeholder="Enter price"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <small className="text-muted ms-2" id="priceSuggestion">
            Suggested: PKR{" "}
            {formData.rideFrequency === "monthly" ? "3000-8000" : "150-500"} for
            Islamabad/Rawalpindi
          </small>
        </div>
      </div>
    </div>
  );
};

export default PreferencesForm;
