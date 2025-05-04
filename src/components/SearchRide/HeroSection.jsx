import React from "react";

const HeroSection = () => {
  return (
    <header className="hero-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h1 className="display-4 fw-bold text-white mb-3">
              Find Your Perfect Ride
            </h1>
            <p className="lead text-white mb-0">
              Search through available rides and find the best match for your
              journey. Save money, reduce carbon footprint, and meet fellow
              travelers
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
