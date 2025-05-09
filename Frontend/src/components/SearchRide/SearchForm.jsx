import React, { useState } from "react";
import MapPicker from "../MapPicker";

const SearchForm = ({
  filters,
  handleFilterChange,
  applyFilters,
  resetFilters,
}) => {
  const [timeOfDay, setTimeOfDay] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [mapField, setMapField] = useState(null); // 'startingPoint' or 'destination'

  // Handle time of day selection (morning/evening)
  const handleTimeOfDayChange = (value) => {
    setTimeOfDay(value);

    // Convert selection to actual time range for filtering
    let timeValue = "";
    if (value === "morning") {
      timeValue = "08:00"; // The API will handle range matching
    } else if (value === "evening") {
      timeValue = "16:00"; // The API will handle range matching
    }

    handleFilterChange("departureTime", timeValue);
  };

  // Handle map selection
  const handleMapSelect = ({ address }) => {
    if (mapField) {
      handleFilterChange(mapField, address);
    }
    setShowMap(false);
    setMapField(null);
  };

  // Simple modal - no longer needed as MapPicker is self-contained
  const Modal = ({ children }) => <>{children}</>;

  return (
    <div className="search-box mb-5">
      {showMap && (
        <MapPicker
          onSelect={handleMapSelect}
          onClose={() => setShowMap(false)}
          type={mapField === "startingPoint" ? "start" : "destination"}
        />
      )}
      <form
        id="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          applyFilters();
        }}
      >
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
                name="startingPoint"
                placeholder="Enter starting location"
                value={filters.startingPoint}
                onChange={(e) =>
                  handleFilterChange("startingPoint", e.target.value)
                }
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                title="Pick on map"
                onClick={() => {
                  setShowMap(true);
                  setMapField("startingPoint");
                }}
              >
                <i className="fas fa-map"></i>
              </button>
            </div>
            <small className="text-muted">
              Search will include stops along the route as well
            </small>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="destination" className="form-label">
              Destination
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-map-pin"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="destination"
                name="destination"
                placeholder="Enter destination"
                value={filters.destination}
                onChange={(e) =>
                  handleFilterChange("destination", e.target.value)
                }
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                title="Pick on map"
                onClick={() => {
                  setShowMap(true);
                  setMapField("destination");
                }}
              >
                <i className="fas fa-map"></i>
              </button>
            </div>
            <small className="text-muted">
              Search will include stops along the route as well
            </small>
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
                <option value="car">Car</option>
                <option value="bike">Bike</option>
              </select>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="passengerCapacity" className="form-label">
              Passenger Capacity
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-users"></i>
              </span>
              <input
                type="number"
                className="form-control"
                id="passengerCapacity"
                min="1"
                placeholder="Minimum passenger capacity"
                value={filters.passengerCapacity}
                onChange={(e) =>
                  handleFilterChange("passengerCapacity", e.target.value)
                }
                disabled={filters.vehicleType === "bike"}
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
            <label className="form-label">Time of Day</label>
            <div className="d-flex">
              <div className="form-check me-4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="timeOfDay"
                  id="morningTime"
                  checked={timeOfDay === "morning"}
                  onChange={() => handleTimeOfDayChange("morning")}
                />
                <label className="form-check-label" htmlFor="morningTime">
                  Morning (8:00 - 11:00 AM)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="timeOfDay"
                  id="eveningTime"
                  checked={timeOfDay === "evening"}
                  onChange={() => handleTimeOfDayChange("evening")}
                />
                <label className="form-check-label" htmlFor="eveningTime">
                  Evening (4:00 - 6:00 PM)
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                resetFilters();
                setTimeOfDay("");
              }}
            >
              <i className="fas fa-redo me-1"></i> Reset Filters
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-search me-1"></i> Search Rides
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
