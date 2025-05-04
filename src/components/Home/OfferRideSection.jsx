import React from "react";
import { Link } from "react-router-dom";
import picture2 from "../../images/picture2.jpg"; // Adjust the path as necessary

const OfferRideSection = () => {
  return (
    <section className="offer-ride-section py-5 bg-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className="driver-heading" data-aos="fade-right">
              Driving in your car soon?
            </h2>
            <p
              className="driver-subtitle"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              Let's make this your least expensive journey ever.
            </p>

            <div
              className="btn-animation-wrapper"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Link
                to="/post"
                className="btn btn-primary btn-lg mt-3 btn-animated"
              >
                <span className="btn-text-wrapper">
                  <i className="fas fa-plus-circle me-2"></i> Offer a ride
                </span>
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="animated-car-container"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <img
                src={picture2}
                alt="People carpooling"
                className="img-fluid driver-illustration"
              />
              <div className="floating-people"></div>
              <div className="car-path">
                <svg
                  width="100%"
                  height="20"
                  viewBox="0 0 200 20"
                  className="car-path-svg"
                >
                  <path
                    className="route-path-animation"
                    d="M0,10 C40,0 60,20 100,10 C140,0 160,20 200,10"
                    fill="none"
                    stroke="#007dfe"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferRideSection;
