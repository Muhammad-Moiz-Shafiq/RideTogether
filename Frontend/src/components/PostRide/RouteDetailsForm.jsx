import React, { useState } from "react";
import MapPicker from "../MapPicker";

const RouteDetailsForm = ({
  formData,
  handleInputChange,
  handleAddStop,
  handleRemoveStop,
  handleStopChange,
}) => {
  const [showMap, setShowMap] = useState(false);
  const [mapField, setMapField] = useState(null); // 'startingPoint' or 'destination'

  // Handle map selection
  const handleMapSelect = ({ address }) => {
    if (mapField) {
      handleInputChange({
        target: {
          name: mapField,
          value: address,
          type: "text",
        },
      });
    }
    setShowMap(false);
    setMapField(null);
  };

  // Simple modal - no longer needed as MapPicker is self-contained
  const Modal = ({ children }) => (
    <>{children}</>
  );

  return (
    <div className="mb-5">
      {showMap && (
        <MapPicker
          onSelect={handleMapSelect}
          onClose={() => setShowMap(false)}
          type={mapField === "startingPoint" ? "start" : "destination"}
        />
      )}
      <h3 className="mb-4 fw-bold">
        <span className="badge bg-primary rounded-circle me-2">1</span>
        Where are you driving?
      </h3>
      <div className="mb-4">
        <label className="form-label">
          Starting Point<span className="text-danger">*</span>
        </label>
        <div className="input-group mb-2">
          <span className="input-group-text bg-light">
            <i className="fas fa-map-marker-alt text-primary"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your starting location"
            name="startingPoint"
            value={formData.startingPoint}
            onChange={handleInputChange}
            required
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
        <div className="form-check ms-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="isNustStart"
            name="isNustStart"
            checked={formData.isNustStart}
            onChange={handleInputChange}
          />
          <label className="form-check-label small" htmlFor="isNustStart">
            This is NUST campus
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="form-label">
          Destination<span className="text-danger">*</span>
        </label>
        <div className="input-group mb-2">
          <span className="input-group-text bg-light">
            <i className="fas fa-map-marker text-primary"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your destination"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            required
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
        <div className="form-check ms-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="isNustDest"
            name="isNustDest"
            checked={formData.isNustDest}
            onChange={handleInputChange}
          />
          <label className="form-check-label small" htmlFor="isNustDest">
            This is NUST campus
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="form-label">Add Stops (Optional)</label>
        <div id="stopsContainer">
          {formData.stops.map((stop, index) => (
            <div className="input-group mb-2" key={index}>
              <span className="input-group-text bg-light">
                <i className="fas fa-map-pin text-primary"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter a stop on your route"
                value={stop}
                onChange={(e) => handleStopChange(index, e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => handleRemoveStop(index)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm mt-2"
          onClick={handleAddStop}
        >
          <i className="fas fa-plus me-1"></i> Add another stop
        </button>
      </div>
    </div>
  );
};

export default RouteDetailsForm;
