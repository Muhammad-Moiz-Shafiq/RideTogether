import React, { useState, useEffect } from "react";

const SearchForm = ({
  filters,
  handleFilterChange,
  applyFilters,
  resetFilters,
}) => {
  // State to handle radio button logic
  const [selectedRideType, setSelectedRideType] = useState("");

  // Update ride type and enable/disable date/month inputs
  const handleRideTypeChange = (event) => {
    const rideType = event.target.value;
    setSelectedRideType(rideType);
    handleFilterChange("rideType", rideType);
  };

  // Effect to handle enabling/disabling date and month inputs based on ride type
  useEffect(() => {
    if (selectedRideType === "Daily") {
      // Reset month when daily is selected
      handleFilterChange("month", "");
    } else if (selectedRideType === "Monthly") {
      // Reset date when monthly is selected
      handleFilterChange("date", "");
    }
  }, [selectedRideType, handleFilterChange]);

  return (
    <div className="search-box mb-5">
      <form id="search-form">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="startingPoint" className="form-label">
              Starting Point
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="startingPoint"
                placeholder="Enter starting location"
                value={filters.startingPoint}
                onChange={(e) =>
                  handleFilterChange("startingPoint", e.target.value)
                }
              />
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="endingPoint" className="form-label">
              Ending Point
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-map-marker"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="endingPoint"
                placeholder="Enter destination"
                value={filters.endingPoint}
                onChange={(e) =>
                  handleFilterChange("endingPoint", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="vehicleType" className="form-label">
              Vehicle Type
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-car"></i>
              </span>
              <select
                className="form-select"
                id="vehicleType"
                value={filters.vehicleType}
                onChange={(e) =>
                  handleFilterChange("vehicleType", e.target.value)
                }
              >
                <option value="">Any</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
              </select>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="passengers" className="form-label">
              Number of Passengers
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-users"></i>
              </span>
              <input
                type="number"
                className="form-control"
                id="passengers"
                min="1"
                placeholder="Number of seats"
                value={filters.passengers}
                onChange={(e) =>
                  handleFilterChange("passengers", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="budget" className="form-label">
              Max Budget (Rs)
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-rupee-sign"></i>
              </span>
              <input
                type="number"
                className="form-control"
                id="budget"
                min="0"
                placeholder="Maximum price"
                value={filters.budget}
                onChange={(e) => handleFilterChange("budget", e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="departureTime" className="form-label">
              Departure Time
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="far fa-clock"></i>
              </span>
              <input
                type="time"
                className="form-control"
                id="departureTime"
                value={filters.departureTime}
                onChange={(e) =>
                  handleFilterChange("departureTime", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* Ride Frequency Radio Buttons */}
        <div className="row mb-3">
          <div className="col-md-12">
            <label className="form-label">Select Ride Type</label>
            <div className="form-check form-check-inline ms-2">
              <input
                className="form-check-input"
                type="radio"
                name="rideType"
                id="dailyRide"
                value="Daily"
                checked={selectedRideType === "Daily"}
                onChange={handleRideTypeChange}
              />
              <label className="form-check-label" htmlFor="dailyRide">
                Daily
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="rideType"
                id="monthlyRide"
                value="Monthly"
                checked={selectedRideType === "Monthly"}
                onChange={handleRideTypeChange}
              />
              <label className="form-check-label" htmlFor="monthlyRide">
                Monthly
              </label>
            </div>
          </div>
        </div>

        {/* Date & Month Selection */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="date" className="form-label">
              Date (Daily rides)
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="far fa-calendar"></i>
              </span>
              <input
                type="date"
                className="form-control"
                id="date"
                disabled={selectedRideType !== "Daily"}
                value={filters.date}
                onChange={(e) => handleFilterChange("date", e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="month" className="form-label">
              Month (Monthly rides)
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="far fa-calendar-alt"></i>
              </span>
              <select
                className="form-select"
                id="month"
                disabled={selectedRideType !== "Monthly"}
                value={filters.month}
                onChange={(e) => handleFilterChange("month", e.target.value)}
              >
                <option value="">Any</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center">
            <button
              type="button"
              className="btn btn-primary pulse-animation px-4 py-2"
              onClick={applyFilters}
            >
              <i className="fas fa-search me-2"></i>Filter Rides
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary ms-2 px-4 py-2"
              onClick={resetFilters}
            >
              <i className="fas fa-undo me-2"></i>Reset Filters
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
