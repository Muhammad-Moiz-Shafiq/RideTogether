import React from "react";

const StatisticsSection = () => {
  return (
    <section className="statistics-section py-5 bg-primary text-white">
      <div className="container">
        <div className="row text-center">
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-users fa-3x mb-3"></i>
              </div>
              <h3 className="counter-value" data-count="500">
                0
              </h3>
              <p>Happy Students</p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-route fa-3x mb-3"></i>
              </div>
              <h3 className="counter-value" data-count="200">
                0
              </h3>
              <p>Rides Completed</p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-leaf fa-3x mb-3"></i>
              </div>
              <h3 className="counter-value" data-count="18">
                0
              </h3>
              <p>Tons CO₂ Saved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
