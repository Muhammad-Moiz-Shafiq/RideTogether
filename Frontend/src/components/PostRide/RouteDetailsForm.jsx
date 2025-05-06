const RouteDetailsForm = ({
  formData,
  handleInputChange,
  handleAddStop,
  handleRemoveStop,
  handleStopChange,
}) => {
  return (
    <div className="mb-5">
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
