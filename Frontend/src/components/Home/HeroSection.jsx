import React, { useState } from "react";
import picture1 from "../../images/picture1.png"; // Adjust the path as necessary
import MapPicker from "../MapPicker";

const HeroSection = () => {
  const [formData, setFormData] = useState({
    startingPoint: "",
    destination: "",
    date: "",
    passengers: "1 passenger"
  });
  const [showMap, setShowMap] = useState(false);
  const [mapField, setMapField] = useState(null); // 'startingPoint' or 'destination'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle map selection
  const handleMapSelect = ({ address }) => {
    if (mapField) {
      setFormData(prev => ({
        ...prev,
        [mapField]: address
      }));
    }
    setShowMap(false);
    setMapField(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Search with:", formData);
    window.location.href = `/search?from=${encodeURIComponent(formData.startingPoint)}&to=${encodeURIComponent(formData.destination)}`;
  };

  return (
    <header className="hero-section">
      <div className="hero-parallax-bg"></div>
      <div className="container position-relative">
        {showMap && (
          <MapPicker
            onSelect={handleMapSelect}
            onClose={() => setShowMap(false)}
            type={mapField === "startingPoint" ? "start" : "destination"}
          />
        )}
        <div className="row mb-4">
          <div className="col-lg-7">
            <div className="hero-content">
              <h1
                className="display-4 fw-bold text-white"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                Find Your Campus Ride
              </h1>
              <p
                className="lead text-white tagline parallax-element"
                data-speed="0.3"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                Exclusive carpooling for NUST students. Save money, make
                friends, and travel together.
              </p>
            </div>
          </div>
        </div>

        <div className="row align-items-end">
          <div className="col-lg-5">
            <div className="search-box" data-aos="fade-up" data-aos-delay="600">
              <form onSubmit={handleSearch}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Leaving from</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter location"
                        name="startingPoint"
                        value={formData.startingPoint}
                        onChange={handleInputChange}
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
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Going to</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="fas fa-map-marker"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
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
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Date</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="fas fa-calendar"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="mm/dd/yyyy"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Passengers</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="fas fa-user-friends"></i>
                      </span>
                      <select 
                        className="form-select"
                        name="passengers"
                        value={formData.passengers}
                        onChange={handleInputChange}
                      >
                        <option>1 passenger</option>
                        <option>2 passengers</option>
                        <option>3 passengers</option>
                        <option>4 passengers</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-2" type="submit">
                      <i className="fas fa-search me-2"></i> Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-6 offset-lg-1">
            <div
              className="campus-image-container"
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              <div className="floating-animation">
                <img
                  src={picture1}
                  alt="NUST Campus"
                  className="campus-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
