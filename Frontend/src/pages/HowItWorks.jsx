import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HowItWorks = () => (
  <>
    <Navbar />
    {/* Hero Section */}
    <section className="py-5 bg-primary text-white text-center">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8">
            <i className="fas fa-cogs fa-3x mb-3"></i>
            <h1 className="display-4 fw-bold mb-3">How RideTogether Works</h1>
            <p className="lead mb-0">Join our community and start sharing rides today!</p>
          </div>
        </div>
      </div>
    </section>

    {/* Step-by-Step Guide */}
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h2 className="text-center mb-4 text-primary">Step-by-Step Guide</h2>
            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 shadow border-0 p-3 text-center">
                  <i className="fas fa-user-plus fa-2x mb-3 text-primary"></i>
                  <h3 className="h5 mb-2">Sign Up</h3>
                  <p>Create your free account using your NUST email.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 shadow border-0 p-3 text-center">
                  <i className="fas fa-search fa-2x mb-3 text-primary"></i>
                  <h3 className="h5 mb-2">Search or Offer a Ride</h3>
                  <p>Find available rides or offer your own ride to share with others.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 shadow border-0 p-3 text-center">
                  <i className="fas fa-handshake fa-2x mb-3 text-primary"></i>
                  <h3 className="h5 mb-2">Connect</h3>
                  <p>Contact fellow students, coordinate pickup points, and travel together safely.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 shadow border-0 p-3 text-center">
                  <i className="fas fa-leaf fa-2x mb-3 text-primary"></i>
                  <h3 className="h5 mb-2">Save & Share</h3>
                  <p>Enjoy affordable commuting while making new friends and helping the environment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Call to Action */}
    <section className="py-5 bg-secondary text-white text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="mb-3">Ready to Ride Together?</h2>
            <p className="lead mb-4">Join RideTogether today and start sharing rides with your fellow NUST students.</p>
            <a href="/signup" className="btn btn-light btn-lg">Sign Up Now</a>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

export default HowItWorks; 