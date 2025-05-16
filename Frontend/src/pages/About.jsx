import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => (
  <>
    <Navbar />
    {/* Hero Section */}
    <section className="py-5 bg-primary text-white text-center">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8">
            <i className="fas fa-users fa-3x mb-3"></i>
            <h1 className="display-4 fw-bold mb-3">About RideTogether</h1>
            <p className="lead mb-0">
              Connecting NUST students for smarter, affordable, and eco-friendly commuting.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Main Content */}
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow border-0 p-4">
              <h2 className="mb-3 text-primary">Our Mission</h2>
              <p>
                RideTogether is dedicated to making daily travel easier, safer, and more sustainable for NUST students. We believe in the power of community and technology to solve real-world problems like traffic congestion, high commuting costs, and environmental impact.
              </p>
              <h3 className="mt-4 mb-2 text-secondary">What We Offer</h3>
              <ul className="list-unstyled mb-4">
                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> A platform to find and offer rides within the NUST community</li>
                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Secure, student-only access for safety and trust</li>
                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Cost savings and reduced carbon footprint</li>
                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Opportunities to meet new friends and network</li>
              </ul>
              <h3 className="mt-4 mb-2 text-secondary">Why RideTogether?</h3>
              <p>
                Whether you need a ride or want to offer one, RideTogether is here to help you save money, make connections, and contribute to a greener campus. Join us in building a smarter, more connected NUST!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

export default About; 