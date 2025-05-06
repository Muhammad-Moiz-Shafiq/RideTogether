import React from "react";

const FeaturesSection = () => {
  return (
    <section className="py-5 bg-light features-section">
      <div className="container">
        <h2 className="text-center mb-5" data-aos="fade-up">
          Why Choose RideTogether?
        </h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div
              className="card h-100 border-0 shadow-sm interactive-card"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="card-body text-center p-4">
                <div
                  className="feature-icon-wrapper"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <div className="feature-icon bg-primary text-white mb-3">
                    <i className="fas fa-coins fa-2x"></i>
                  </div>
                  <div className="feature-icon-ripple"></div>
                </div>
                <h4>Affordable Rides</h4>
                <p className="text-muted">
                  Split costs with fellow students and save up to 75% compared
                  to taking a taxi alone.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card h-100 border-0 shadow-sm interactive-card"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="card-body text-center p-4">
                <div
                  className="feature-icon-wrapper"
                  data-aos="zoom-in"
                  data-aos-delay="400"
                >
                  <div className="feature-icon bg-primary text-white mb-3">
                    <i className="fas fa-user-check fa-2x"></i>
                  </div>
                  <div className="feature-icon-ripple"></div>
                </div>
                <h4>Verified NUST Students</h4>
                <p className="text-muted">
                  Safety first! All users are verified NUST students with
                  institutional emails.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card h-100 border-0 shadow-sm interactive-card"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="card-body text-center p-4">
                <div
                  className="feature-icon-wrapper"
                  data-aos="zoom-in"
                  data-aos-delay="600"
                >
                  <div className="feature-icon bg-primary text-white mb-3">
                    <i className="fas fa-leaf fa-2x"></i>
                  </div>
                  <div className="feature-icon-ripple"></div>
                </div>
                <h4>Eco-Friendly Travel</h4>
                <p className="text-muted">
                  Every shared ride reduces carbon emissions and eases campus
                  parking congestion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
