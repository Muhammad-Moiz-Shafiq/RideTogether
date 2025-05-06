import React from "react";
import { Link } from "react-router-dom";

const PopularRoutesSection = () => {
  return (
    <section className="popular-routes-section">
      <div className="container">
        <h2 className="text-center mb-4" data-aos="fade-up">
          Where do you want to go?
        </h2>

        <div className="row justify-content-center">
          <div className="col-md-10">
            <div
              className="route-card route-card-animated"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="route-path">
                <span>NUST</span>
                <div className="route-arrow">
                  <i className="fas fa-arrow-right arrow-icon"></i>
                  <div className="arrow-pulse"></div>
                </div>
                <span>F-10</span>
              </div>
              <Link
                to="/routes/nust-to-f10"
                className="btn btn-sm btn-outline-primary btn-hover-effect"
              >
                <i className="fas fa-chevron-right"></i>
              </Link>
            </div>

            <div
              className="route-card route-card-animated"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="route-path">
                <span>NUST</span>
                <div className="route-arrow">
                  <i className="fas fa-arrow-right arrow-icon"></i>
                  <div className="arrow-pulse"></div>
                </div>
                <span>Bahria</span>
              </div>
              <Link
                to="/routes/nust-to-bahria"
                className="btn btn-sm btn-outline-primary btn-hover-effect"
              >
                <i className="fas fa-chevron-right"></i>
              </Link>
            </div>

            <div
              className="route-card route-card-animated"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="route-path">
                <span>NUST</span>
                <div className="route-arrow">
                  <i className="fas fa-arrow-right arrow-icon"></i>
                  <div className="arrow-pulse"></div>
                </div>
                <span>Pindi Saddar</span>
              </div>
              <Link
                to="/routes/nust-to-pindi-saddar"
                className="btn btn-sm btn-outline-primary btn-hover-effect"
              >
                <i className="fas fa-chevron-right"></i>
              </Link>
            </div>

            <div
              className="text-center mt-3"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Link
                to="/popular-routes"
                className="see-more-link link-hover-effect"
              >
                See our most popular rides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularRoutesSection;
