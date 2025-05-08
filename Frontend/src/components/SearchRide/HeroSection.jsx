import React from "react";

const HeroSection = () => {
  return (
    <header className="hero-section py-5 position-relative">
      <div
        className="hero-overlay position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,123,255,0.8) 0%, rgba(25,25,112,0.9) 100%)",
          zIndex: 1,
        }}
      ></div>
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h1 className="display-4 fw-bold text-white mb-3">
              Find Your Perfect Ride
            </h1>
            <p className="lead text-white mb-4">
              Connect with fellow NUST students for convenient, affordable and
              eco-friendly rides to and from campus.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <a
                href="#search-section"
                className="btn btn-primary btn-lg px-4 py-2"
              >
                <i className="fas fa-search me-2"></i>Search Now
              </a>
              <a
                href="/post-ride"
                className="btn btn-outline-light btn-lg px-4 py-2"
              >
                <i className="fas fa-car me-2"></i>Offer a Ride
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="wave-bottom position-absolute bottom-0 start-0 w-100">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path
            fill="#f8f9fa"
            fillOpacity="1"
            d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,48C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </header>
  );
};

export default HeroSection;
