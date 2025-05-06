import React from "react";

const HeroSection = () => {
  return (
    <section className="py-5 text-white hero-section">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold mb-4" data-aos="fade-up">
              Help Center
            </h1>
            <p className="lead" data-aos="fade-up" data-aos-delay="200">
              Find answers to your questions and get support from our team
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
